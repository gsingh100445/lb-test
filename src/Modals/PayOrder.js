import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Backdrop, Box, Button, CircularProgress, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createOrder, createTransactionOrder } from '../utils/api_base';
import { firstOrderDiscount } from '../utils/config';

const modalStyle = {
  position: 'absolute',
  width: { xs: '90%', sm: '50%' },
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'model.lite',
  borderRadius: '15px',
  boxShadow: 24,
  px: 4,
  py: 2,
  textAlign: 'center',
};

const CheckoutForm = forwardRef((props, ref) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useImperativeHandle(ref, () => ({
    initiate() {
      initiatePayment();
    },
    initiatePaymentWithOrder(order) {
      initiatePaymentWithOrder(order);
    },
  }));

  const initiatePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    let client_secret = '';
    for (const transaction of props.orderObj.transactions) {
      if (transaction.status === 'pending') {
        client_secret = transaction.paymentIntent.client_secret;
      }
    }

    setIsLoading(true);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setIsLoading(false);
      console.error(submitError);
      setErrorMessage(submitError.message);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret: client_secret,
      confirmParams: {
        return_url: 'https://www.laundrybasket.ca/orders/' + props.orderObj.id + '?success=true',
      },
    });

    if (error) {
      console.error(error.message);
      setErrorMessage(error.message);
    } else {
      console.log('Payment Presented');
    }

    setIsLoading(false);
  };

  const initiatePaymentWithOrder = async (order) => {
    let client_secret = '';
    for (const transaction of order.transactions) {
      if (transaction.status === 'pending') {
        client_secret = transaction.paymentIntent.client_secret;
      }
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret: client_secret,
      confirmParams: {
        return_url: 'https://www.laundrybasket.ca/orders/' + order.id + '?success=true',
      },
    });

    if (error) {
      console.error(error.message);
    } else {
      console.log('Payment Presented');
    }
  };

  return (
    <form id='payment-form' onSubmit={initiatePayment}>
      {(!stripe || !elements || props.loading || isLoading) && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={!stripe || !elements || props.loading || isLoading}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
      <PaymentElement />
      <Button
        type='submit'
        disabled={!stripe || !elements || props.loading || isLoading}
        id='submit'
        sx={{ mt: 2, px: 4 }}
        variant='contained'
      >
        {props.loading || isLoading ? (
          <CircularProgress size={25} color='inherit' />
        ) : (
          <Typography variant='subtitle1'>Pay Now</Typography>
        )}
      </Button>
      {/* {errorMessage && (
        <Typography variant='subtitle2' component='p' sx={{ color: '#df1b41', pt: 1 }}>
          Plase fix the errors and try again.
        </Typography>
      )} */}
    </form>
  );
});

function PayOrder(props) {
  const stripePromise = loadStripe(
    'pk_live_51REttGDgVylxnOOnNOmeVEa2arYkZqXULa5JDCvJGwhNvtaTmKdiCsZzlc4F1e6c0rpfoJrYebO4itDP2sXTWawn0021jd6Q7k'
  );

  const childRef = useRef();
  const initialized = useRef(false);

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0.0);
  const [order, setOrder] = useState(null);
  const [isFailed, setIsFailed] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const appearance = {
    theme: 'stripe',
  };
  const loader = 'auto';

  useEffect(() => {
    if (props.cart.length) {
      if (props.amount) {
        setAmount(props.amount);
      }
      if (!initialized.current) {
        initialized.current = true;
        create();
      }
    }
  }, []);

  const create = async () => {
    if (order) {
      if (isFailed) {
        console.log('Failed Create Transaction');
        let orderModel = {
          type: 'prepared',
          method: 'online',
        };
        let orderObj = await createTransactionOrder(order.id, orderModel);
        setLoading(true);
        childRef.current.initiatePaymentWithOrder(orderObj);
        return;
      }
      setLoading(true);
      childRef.current.initiatePaymentWithOrder(order);
      return;
    }
    let orderModel = {
      type: 'prepared',
      discount: 0,
      pickUpDate: props.selectedDate,
      pickUpSlot: props.selectedSlot,
      address: props.address,
      items: props.cart,
      category: 'laundry',
      method: 'online',
      deliveryType: props.delivery,
    };
    if (props.isFirstOrderDiscount) {
      orderModel.discount = firstOrderDiscount;
      orderModel.discountCode = 'FIRSTORDER';
    }
    setLoading(true);
    try {
      let orderObj = await createOrder(orderModel);
      if (orderObj) {
        setOrder(orderObj);
        props.setOrder(orderObj);
        for (const transaction of orderObj.transactions) {
          if (transaction.status === 'pending') {
            setClientSecret(transaction.paymentIntent.client_secret);
          }
        }
        setLoading(false);
      } else {
        setLoading(false);
        props.setPaymentModel(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      props.setPaymentModel(false);
    }
  };

  return (
    <>
      {!clientSecret && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={!clientSecret}>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
      {clientSecret && (
        <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
          <Box sx={modalStyle}>
            <IconButton
              sx={{
                mt: 1,
                mb: 2,
              }}
              onClick={() => props.setPaymentModel(false)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zindex: 999,
              }}
              aria-label='delete'
              size='large'
            >
              <ArrowBackIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <Typography sx={{ mt: 1, mb: 2, color: 'text.primary' }} variant='h6' textAlign='center'>
              Payment{' '}
              <Typography sx={{ mt: 1, mb: 2, color: 'text.primary', display: 'inline' }} variant='title' textAlign='center'>
                ($ {Number(order.currentTotal).toFixed(2)})
              </Typography>
            </Typography>
            <CheckoutForm orderObj={order} ref={childRef} create={create} loading={loading} />
          </Box>
        </Elements>
      )}
    </>
  );
}

export default PayOrder;
