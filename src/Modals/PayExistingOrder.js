import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Box, Button, CircularProgress, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

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
  }));

  const initiatePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
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
      clientSecret: props.clientSecret,
      confirmParams: {
        return_url: 'https://gsingh100445.github.io/lb-test/orders/' + props.order.id + '?pay-success=true',
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

  return (
    <form id='payment-form' onSubmit={initiatePayment}>
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
      {/* Show error message to your customers */}
      {/* {errorMessage && (
        <Typography variant='subtitle2' component='p' sx={{ color: '#df1b41', pt: 1 }}>
          Plase fix the errors and try again.
        </Typography>
      )} */}
    </form>
  );
});

function PayExistingOrder(props) {
  const stripePromise = loadStripe(
    'pk_test_51REttMRm1ofrHhYUy4HmIdNc1Lr0pSNTbY15ZQtV5tjE5BH7nPP9rhLr7jUP31lNQx2pHoXCGQJkxUvMe0EYyW1M00E5Ju5yqY'
  );

  const childRef = useRef();

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
    if (props.order) {
      setOrder(props.order);
      setAmount(props.amount);
      for (const transaction of props.order.transactions) {
        if (transaction.status === 'pending' && transaction.method === 'online') {
          setClientSecret(transaction.paymentIntent.client_secret);
        }
      }
    }
  }, [props.order, props.amount]);

  return (
    <>
      {clientSecret ? (
        <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
          <Box sx={modalStyle}>
            <IconButton
              sx={{
                mt: 1,
                mb: 2,
              }}
              onClick={() => props.setIsPaymentDialogOpen(false)}
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
            <CheckoutForm order={order} clientSecret={clientSecret} ref={childRef} loading={loading} />
          </Box>
        </Elements>
      ) : (
        <Typography sx={{ my: 1, color: 'text.primary' }} variant='h6' textAlign='center'>
          Loading
        </Typography>
      )}
    </>
  );
}

export default PayExistingOrder;
