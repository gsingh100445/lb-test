import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router';
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Modal,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { createTransactionOrder, getOrder } from '../utils/api_base';
import moment from 'moment';
import {
  ArrowBack,
  CreditCard,
  Delete,
  EventAvailable,
  Inventory2,
  LocalLaundryService,
  LocalShipping,
  Phone,
  SupportAgent,
  WhereToVote,
} from '@mui/icons-material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import PayExistingOrder from '../Modals/PayExistingOrder';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.mode === 'light' ? 'white' : 'hsla(220, 0%, 0%, 0.7)',
    color: theme.palette.mode === 'light' ? 'hsl(220, 25%, 10%)' : 'hsl(220, 20%, 65%)',
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: theme.palette.mode === 'light' ? 'white' : 'hsla(220, 0%, 0%, 0.7)',
    color: theme.palette.mode === 'light' ? 'hsl(220, 25%, 10%)' : 'hsl(220, 20%, 65%)',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const getTitleCase = (stringData) => {
  if (stringData && stringData.length) {
    return stringData.replace(/\b(\w)/g, (k) => k.toUpperCase());
  } else {
    return '';
  }
};

function OrderDetails(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [order, setOrder] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const [nextStep, setNextStep] = useState(null);
  const [isPaidOff, setIsPaidOff] = useState(false);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const [progress, setProgress] = useState({
    conformation: 0,
    pickUp: 0,
    inProgress: 0,
    shipped: 0,
    delivered: 0,
  });

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[800],
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
      ...theme.applyStyles('dark', {
        backgroundColor: '#308fe8',
      }),
    },
  }));

  useEffect(() => {
    if (id) {
      setTimeout(() => {
        checkOrder(id);
      }, 2500);
    }
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setIsSuccess(true);
      setSearchParams({});
      setTimeout(() => {
        setIsSuccess(false);
      }, 8000);
    }
    if (searchParams.get('pay-success') === 'true') {
      setIsPaymentSuccess(true);
      setSearchParams({});
      setTimeout(() => {
        setIsPaymentSuccess(false);
      }, 8000);
    }
  }, [searchParams]);

  useEffect(() => {
    if (props.isFirstLoadDone) {
      if (props.isLoggedIn === false) {
        navigate('/login?redirect=orders/' + id);
      }
    }
  }, [navigate, props.isLoggedIn, props.isFirstLoadDone]);

  useEffect(() => {
    document.title = 'Order Details - Laundry Basket';
  }, []);

  const formatMobile = (text) => {
    let cleaned = text;
    if (text.includes('+')) {
      let textArr = text.split(' ');
      if (textArr.length > 1) {
        textArr.shift();
        cleaned = textArr.join(' ');
      }
    }
    cleaned = cleaned.replace(/[^0-9]/g, '');
    var size = cleaned.length;
    if (size > 0) {
      cleaned = '(' + cleaned;
    }
    if (size > 3) {
      cleaned = cleaned.slice(0, 4) + ') ' + cleaned.slice(4);
    }
    if (size > 6) {
      cleaned = cleaned.slice(0, 9) + '-' + cleaned.slice(9);
    }
    return cleaned;
  };

  const checkOrder = async (orderId) => {
    try {
      var orderObj = await getOrder(orderId);
    } catch (err) {
      console.error(err);
    }
    if (orderObj) {
      setOrder(orderObj);
      getNextStep(orderObj);
      let isPending = false;
      let paidAmount = 0;
      for (const transaction of orderObj.transactions) {
        if (transaction.status === 'pending') {
          isPending = true;
        }
        if (transaction.status === 'paid') {
          paidAmount = paidAmount + Number(transaction.amount);
        }
      }
      if (isPending) {
        setIsTransactionPending(true);
      }
      if (paidAmount >= Number(orderObj.currentTotal)) {
        setIsPaidOff(true);
      } else {
        setPendingAmount(Number(orderObj.currentTotal) - paidAmount);
      }
    }
    setLoading(false);
  };

  const getNextStep = (orderObj) => {
    if (orderObj && orderObj.status === 'assigned' && orderObj.pickUpDate) {
      var date1Today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
      var date1Tomorrow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
      let diff = moment(orderObj.pickUpDate).diff(moment(), 'days');
      if (
        date1Today.getFullYear() === new Date(orderObj.pickUpDate).getFullYear() &&
        date1Today.getMonth() === new Date(orderObj.pickUpDate).getMonth() &&
        date1Today.getDate() === new Date(orderObj.pickUpDate).getDate()
      ) {
        setNextStep({
          time: `Pick Up Today ${orderObj.pickUpSlot}`,
          agent: orderObj.pickUpAgent ? orderObj.pickUpAgent.name : null,
        });
      } else if (
        date1Tomorrow.getFullYear() === new Date(orderObj.pickUpDate).getFullYear() &&
        date1Tomorrow.getMonth() === new Date(orderObj.pickUpDate).getMonth() &&
        date1Tomorrow.getDate() === new Date(orderObj.pickUpDate).getDate()
      ) {
        setNextStep({
          time: `Pick Up Tomorrow ${orderObj.pickUpSlot}`,
          agent: orderObj.pickUpAgent ? orderObj.pickUpAgent.name : null,
        });
      } else if (diff < 6) {
        setNextStep({
          time: `Pick Up ${moment(orderObj.pickUpDate).format('dddd')} ${orderObj.pickUpSlot}`,
          agent: orderObj.pickUpAgent ? orderObj.pickUpAgent.name : null,
        });
      }
      if (diff > 7) {
        setNextStep({
          time: `Pick Up ${moment(orderObj.pickUpDate).format('DD MMM')} ${orderObj.pickUpSlot}`,
          agent: orderObj.pickUpAgent ? orderObj.pickUpAgent.name : null,
        });
      }
    } else if (orderObj && orderObj.status === 'picked-up') {
      setNextStep({
        time: `Your items are on their way to our washing facility for processing`,
        agent: orderObj.pickUpAgent ? orderObj.pickUpAgent.name : null,
      });
    } else if (orderObj && orderObj.status === 'in-progress' && !orderObj.expectedCompleteDate) {
      setNextStep({
        time: `Your items are being processed. We’ll update you with the expected finish time soon.`,
      });
    } else if (orderObj && orderObj.status === 'in-progress' && orderObj.expectedCompleteDate) {
      let date1Today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
      let date1Tomorrow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
      let diff = moment(orderObj.expectedCompleteDate).diff(moment(), 'days');
      if (
        date1Today.getFullYear() === new Date(orderObj.expectedCompleteDate).getFullYear() &&
        date1Today.getMonth() === new Date(orderObj.expectedCompleteDate).getMonth() &&
        date1Today.getDate() === new Date(orderObj.expectedCompleteDate).getDate()
      ) {
        setNextStep({
          time: `Your items are being processed and will be ready by Today ${moment(orderObj.expectedCompleteDate).format(
            'h A'
          )}`,
        });
      } else if (
        date1Tomorrow.getFullYear() === new Date(orderObj.expectedCompleteDate).getFullYear() &&
        date1Tomorrow.getMonth() === new Date(orderObj.expectedCompleteDate).getMonth() &&
        date1Tomorrow.getDate() === new Date(orderObj.expectedCompleteDate).getDate()
      ) {
        setNextStep({
          time: `Your items are being processed and will be ready by Tomorrow ${moment(orderObj.expectedCompleteDate).format(
            'h A'
          )}`,
        });
      } else if (diff < 6) {
        setNextStep({
          time: `Your items are being processed and will be ready by ${moment(orderObj.expectedCompleteDate).format(
            'dddd'
          )} ${moment(orderObj.expectedCompleteDate).format('h A')}`,
        });
      }
      if (diff > 7) {
        setNextStep({
          time: `Your items are being processed and will be ready by ${moment(orderObj.expectedCompleteDate).format(
            'DD MMM'
          )} ${moment(orderObj.expectedCompleteDate).format('h A')}`,
        });
      }
    } else if (orderObj && orderObj.status === 'completed' && !orderObj.expectedDeliveryDate) {
      setNextStep({
        time: `Your items are ready! We’ll update you with the delivery time shortly.`,
      });
    } else if (orderObj && orderObj.status === 'completed' && orderObj.expectedDeliveryDate) {
      let date1Today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
      let date1Tomorrow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
      let diff = moment(orderObj.expectedDeliveryDate).diff(moment(), 'days');
      if (
        date1Today.getFullYear() === new Date(orderObj.expectedDeliveryDate).getFullYear() &&
        date1Today.getMonth() === new Date(orderObj.expectedDeliveryDate).getMonth() &&
        date1Today.getDate() === new Date(orderObj.expectedDeliveryDate).getDate()
      ) {
        setNextStep({
          time: `Your items are ready and will be delivered by Today ${moment(orderObj.expectedDeliveryDate).format('h A')}`,
        });
      } else if (
        date1Tomorrow.getFullYear() === new Date(orderObj.expectedDeliveryDate).getFullYear() &&
        date1Tomorrow.getMonth() === new Date(orderObj.expectedDeliveryDate).getMonth() &&
        date1Tomorrow.getDate() === new Date(orderObj.expectedDeliveryDate).getDate()
      ) {
        setNextStep({
          time: `Your items are ready and will be delivered by Tomorrow ${moment(orderObj.expectedDeliveryDate).format(
            'h A'
          )}`,
        });
      } else if (diff < 6) {
        setNextStep({
          time: `Your items are ready and will be delivered by ${moment(orderObj.expectedDeliveryDate).format(
            'dddd'
          )} ${moment(orderObj.expectedDeliveryDate).format('h A')}`,
        });
      }
      if (diff > 7) {
        setNextStep({
          time: `Your items are ready and will be delivered by ${moment(orderObj.expectedDeliveryDate).format(
            'DD MMM'
          )} ${moment(orderObj.expectedDeliveryDate).format('h A')}`,
        });
      }
    } else if (orderObj && orderObj.status === 'delivered') {
      setNextStep({
        time: `Your order has been delivered. Fresh laundry, ready to wear!`,
      });
    }
    if (orderObj) {
      if (orderObj.status === 'assigned') {
        setProgress({ conformation: 100, pickUp: 50, inProgress: 0, shipped: 0, delivered: 0 });
      } else if (orderObj.status === 'picked-up') {
        setProgress({ conformation: 100, pickUp: 100, inProgress: 25, shipped: 0, delivered: 0 });
      } else if (orderObj.status === 'in-progress') {
        setProgress({ conformation: 100, pickUp: 100, inProgress: 50, shipped: 0, delivered: 0 });
      } else if (orderObj.status === 'completed') {
        setProgress({ conformation: 100, pickUp: 100, inProgress: 100, shipped: 50, delivered: 0 });
      } else if (orderObj.status === 'delivered') {
        setProgress({ conformation: 100, pickUp: 100, inProgress: 100, shipped: 100, delivered: 100 });
      }
    }
  };

  const payOnline = async () => {
    setLoading(true);
    let isOnlinePending = false;
    for (const transaction of order.transactions) {
      if (transaction.status === 'pending' && transaction.method === 'online') {
        isOnlinePending = true;
      }
    }
    if (!isOnlinePending) {
      let orderObj = await createTransactionOrder(order.id, { method: 'online' });
      if (orderObj) {
        setOrder(orderObj);
        // console.log('Success');
        setLoading(false);
        setIsPaymentDialogOpen(true);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setIsPaymentDialogOpen(true);
    }
  };

  return (
    <div>
      {isLoading && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
      <Container maxWidth='lg' id='features' sx={{ pt: { xs: 4, sm: 8 }, pb: { xs: 8, sm: 8 } }}>
        {order && (
          <>
            <Grid container alignItems='center' justifyContent='center' spacing={2.5} sx={{ pt: { xs: 6, sm: 4 }, pb: 4 }}>
              <Grid item xs={12} sm={6} md={6}>
                <Stack direction='row' alignItems='center' gap={1} sx={{ mb: 1 }}>
                  <IconButton
                    onClick={() => navigate('/orders')}
                    sx={{
                      alignSelf: 'center',
                    }}
                  >
                    <ArrowBack />
                  </IconButton>
                  <Typography
                    component='h6'
                    variant='h6'
                    sx={{ color: 'text.primary', textAlign: { xs: 'center', sm: 'left' } }}
                  >
                    Orders
                  </Typography>
                </Stack>
                <Typography
                  component='h2'
                  variant='h4'
                  sx={{ color: 'text.primary', textAlign: { xs: 'center', sm: 'left' } }}
                >
                  Order ID: {order.code}
                  <Typography
                    component='h6'
                    variant='subtitle1'
                    sx={{ color: 'text.neutral', textAlign: { xs: 'center', sm: 'left' } }}
                  >
                    {moment(order.createdDate).format('ddd, DD MMM YYYY h:mm A')}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Stack
                  direction='row'
                  justifyContent='flex-end'
                  alignItems='center'
                  gap={1.5}
                  sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
                >
                  {!isPaidOff && order.type === 'prepared' && order.isFinalPrice && (
                    <Button onClick={payOnline} variant='outlined' startIcon={<CreditCard />}>
                      PayNow
                    </Button>
                  )}
                  {(order.status === 'placed' || order.status === 'assigned') && (
                    <Button
                      onClick={() => {
                        document.location.href = 'tel:6472476745';
                      }}
                      color='error'
                      variant='outlined'
                      startIcon={<Delete />}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      document.location.href = 'tel:6472476745';
                    }}
                    color='secondary'
                    variant='outlined'
                    startIcon={<SupportAgent />}
                  >
                    Call Us
                  </Button>
                </Stack>
              </Grid>
            </Grid>
            <Box
              sx={{
                px: { xs: 1.5, sm: 3 },
                py: { xs: 2, sm: 3 },
                backgroundColor: 'actionLite.selected',
                borderRadius: '25px',
                mt: { xs: 0.5, sm: 3 },
              }}
            >
              {Boolean(nextStep) && Boolean(nextStep.time) && (
                <Box sx={{ pb: 2.5 }}>
                  {Boolean(nextStep.time) && (
                    <Typography sx={{ pb: 0.5, textAlign: { xs: 'center', sm: 'start' } }} variant='h5'>
                      {nextStep.time}
                    </Typography>
                  )}
                  {Boolean(nextStep.agent) && (
                    <Typography sx={{ textAlign: { xs: 'center', sm: 'start' } }} variant='h6'>
                      Agent: {nextStep.agent}
                    </Typography>
                  )}
                </Box>
              )}
              <Grid container alignItems='center' justifyContent='center' spacing={{ xs: 1.5, sm: 3 }}>
                <Grid item xs={6} sm={2.4} md={2.4}>
                  <Box
                    sx={{
                      width: '100%',
                      backgroundColor: (theme) => (theme.palette.mode === 'light' ? 'white' : 'hsla(220, 0%, 0%, 0.7)'),
                      px: { xs: 1, sm: 2 },
                      py: { xs: 2, sm: 2 },
                      borderRadius: '25px',
                    }}
                  >
                    <EventAvailable sx={{ color: 'text.primary', fontSize: 30 }} />
                    <Typography
                      component='h6'
                      variant='subtitle2'
                      sx={{ color: 'text.secondary', textAlign: 'left', pt: 0.5, pb: 2 }}
                    >
                      Conformation
                    </Typography>
                    <BorderLinearProgress variant='determinate' value={progress.conformation} />
                  </Box>
                </Grid>
                <Grid item xs={6} sm={2.4} md={2.4}>
                  <Box
                    sx={{
                      width: '100%',
                      backgroundColor: (theme) => (theme.palette.mode === 'light' ? 'white' : 'hsla(220, 0%, 0%, 0.7)'),
                      px: { xs: 1, sm: 2 },
                      py: { xs: 2, sm: 2 },
                      borderRadius: '25px',
                    }}
                  >
                    <Inventory2 sx={{ color: 'text.primary', fontSize: 30 }} />
                    <Typography
                      component='h6'
                      variant='subtitle1'
                      sx={{ color: 'text.secondary', textAlign: 'left', pt: 0.5, pb: 2 }}
                    >
                      Pickup
                    </Typography>
                    <BorderLinearProgress variant='determinate' value={progress.pickUp} />
                  </Box>
                </Grid>
                <Grid item xs={6} sm={2.4} md={2.4}>
                  <Box
                    sx={{
                      width: '100%',
                      backgroundColor: (theme) => (theme.palette.mode === 'light' ? 'white' : 'hsla(220, 0%, 0%, 0.7)'),
                      px: { xs: 1, sm: 2 },
                      py: { xs: 2, sm: 2 },
                      borderRadius: '25px',
                    }}
                  >
                    <LocalLaundryService sx={{ color: 'text.primary', fontSize: 30 }} />
                    <Typography
                      component='h6'
                      variant='subtitle1'
                      sx={{ color: 'text.secondary', textAlign: 'left', pt: 0.5, pb: 2 }}
                    >
                      In-Progress
                    </Typography>
                    <BorderLinearProgress variant='determinate' value={progress.inProgress} />
                  </Box>
                </Grid>
                <Grid item xs={6} sm={2.4} md={2.4}>
                  <Box
                    sx={{
                      width: '100%',
                      backgroundColor: (theme) => (theme.palette.mode === 'light' ? 'white' : 'hsla(220, 0%, 0%, 0.7)'),
                      px: { xs: 1, sm: 2 },
                      py: { xs: 2, sm: 2 },
                      borderRadius: '25px',
                    }}
                  >
                    <LocalShipping sx={{ color: 'text.primary', fontSize: 30 }} />
                    <Typography
                      component='h6'
                      variant='subtitle1'
                      sx={{ color: 'text.secondary', textAlign: 'left', pt: 0.5, pb: 2 }}
                    >
                      Shipped
                    </Typography>
                    <BorderLinearProgress variant='determinate' value={progress.shipped} />
                  </Box>
                </Grid>
                <Grid item xs={6} sm={2.4} md={2.4}>
                  <Box
                    sx={{
                      width: '100%',
                      backgroundColor: (theme) => (theme.palette.mode === 'light' ? 'white' : 'hsla(220, 0%, 0%, 0.7)'),
                      px: { xs: 1, sm: 2 },
                      py: { xs: 2, sm: 2 },
                      borderRadius: '25px',
                    }}
                  >
                    <WhereToVote sx={{ color: 'text.primary', fontSize: 30 }} />
                    <Typography
                      component='h6'
                      variant='subtitle1'
                      sx={{ color: 'text.secondary', textAlign: 'left', pt: 0.5, pb: 2 }}
                    >
                      Delivered
                    </Typography>
                    <BorderLinearProgress variant='determinate' value={progress.delivered} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            {order.type === 'prepared' && (
              <Box
                sx={{
                  px: { xs: 1.5, sm: 3 },
                  py: { xs: 2, sm: 3 },
                  backgroundColor: 'actionLite.selected',
                  borderRadius: '25px',
                  mt: { xs: 4, sm: 6 },
                }}
              >
                <Typography component='h6' variant='h5' sx={{ color: 'text.primary', textAlign: 'left' }}>
                  Items
                </Typography>
                <Typography variant='body1' sx={{ color: 'text.neutral', textAlign: 'left', pb: 2 }}>
                  Your Laundry Basket
                </Typography>

                <TableContainer sx={{ display: { xs: 'none', sm: 'block' } }} component={Paper}>
                  <Table sx={{ width: '100%' }} aria-label='simple table'>
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell>
                          <Typography variant='h6' component='h6'>
                            Item
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align='right'>
                          <Typography variant='h6' component='h6'>
                            Quantity
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align='right'>
                          <Typography variant='h6' component='h6'>
                            Price
                          </Typography>
                        </StyledTableCell>
                        {/* <StyledTableCell align='right'>
                          <Typography variant='h6' component='h6'>
                            Tax
                          </Typography>
                        </StyledTableCell> */}
                        <StyledTableCell align='right'>
                          <Typography variant='h6' component='h6'>
                            Amount
                          </Typography>
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {order.items.map((itemsItem, itemsItemIndex) => (
                        <StyledTableRow key={itemsItem.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <StyledTableCell component='th' scope='row'>
                            <Stack
                              direction='row'
                              justifyContent='flex-start'
                              alignItems='center'
                              gap={1}
                              sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
                            >
                              <img
                                style={{
                                  height: '40px',
                                }}
                                src={itemsItem.pic2 || itemsItem.pic}
                                alt='new'
                              />
                              <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                                {itemsItem.name}
                              </Typography>
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell align='right'>
                            <Typography variant='subtitle1'>
                              {itemsItem.service ? `${itemsItem.units}` : `${itemsItem.units} lbs`}
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell align='right'>
                            <Typography variant='subtitle1'>
                              {itemsItem.service ? `$ ${itemsItem.price}` : `$ ${itemsItem.price} / lbs`}
                            </Typography>
                          </StyledTableCell>
                          {/* <StyledTableCell align='right'>
                            <Typography variant='subtitle1'>0</Typography>
                          </StyledTableCell> */}
                          <StyledTableCell align='right'>
                            <Typography variant='subtitle1'>
                              $ {(Number(itemsItem.price) * itemsItem.units).toFixed(2)}
                            </Typography>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                      {order.discountPrice > 0 && (
                        <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <StyledTableCell component='th' scope='row'>
                            <Stack
                              direction='row'
                              justifyContent='flex-start'
                              alignItems='center'
                              gap={1}
                              sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
                            >
                              <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                                <Typography
                                  variant='subtitle1'
                                  sx={{ fontWeight: 'bold', display: 'inline', textDecoration: 'underline' }}
                                >
                                  {order.discountCode}
                                </Typography>{' '}
                                Discount
                              </Typography>
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell align='right'></StyledTableCell>
                          <StyledTableCell align='right'></StyledTableCell>
                          {/* <StyledTableCell align='right'>
                            <Typography variant='subtitle1'>0</Typography>
                          </StyledTableCell> */}
                          <StyledTableCell align='right'>
                            <Typography variant='subtitle1'>- $ {Number(order.discountPrice).toFixed(2)}</Typography>
                          </StyledTableCell>
                        </StyledTableRow>
                      )}
                      {order.deliveryPrice > 0 && (
                        <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <StyledTableCell component='th' scope='row'>
                            <Stack
                              direction='row'
                              justifyContent='flex-start'
                              alignItems='center'
                              gap={1}
                              sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
                            >
                              <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                                {getTitleCase(order.deliveryType)} Delivery and Handling
                              </Typography>
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell align='right'></StyledTableCell>
                          <StyledTableCell align='right'></StyledTableCell>
                          {/* <StyledTableCell align='right'>
                            <Typography variant='subtitle1'>0</Typography>
                          </StyledTableCell> */}
                          <StyledTableCell align='right'>
                            <Typography variant='subtitle1'>$ {order.deliveryPrice}</Typography>
                          </StyledTableCell>
                        </StyledTableRow>
                      )}
                      {order.handlingPrice > 0 && (
                        <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <StyledTableCell component='th' scope='row'>
                            <Stack
                              direction='row'
                              justifyContent='flex-start'
                              alignItems='center'
                              gap={1}
                              sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
                            >
                              <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                                Handling Fee
                              </Typography>
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell align='right'></StyledTableCell>
                          <StyledTableCell align='right'></StyledTableCell>
                          {/* <StyledTableCell align='right'>
                            <Typography variant='subtitle1'>0</Typography>
                          </StyledTableCell> */}
                          <StyledTableCell align='right'>
                            <Typography variant='subtitle1'>$ {order.handlingPrice}</Typography>
                          </StyledTableCell>
                        </StyledTableRow>
                      )}
                      <StyledTableRow>
                        <StyledTableCell align='right'>
                          <Typography variant='subtitle1' sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                            Total
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align='right'></StyledTableCell>
                        <StyledTableCell align='right'></StyledTableCell>
                        <StyledTableCell align='right'>
                          <Typography sx={{ fontWeight: 'bold' }} variant='subtitle1'>
                            $ {Number(order.currentTotal).toFixed(2)}
                          </Typography>
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <TableContainer sx={{ display: { xs: 'block', sm: 'none' } }} component={Paper}>
                  <Table sx={{ width: '100%' }} aria-label='simple table'>
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell>
                          <Typography variant='subtitle1' component='p'>
                            Item
                          </Typography>
                        </StyledTableCell>
                        {/* <StyledTableCell align='right'>
                          <Typography variant='subtitle1' component='p'>
                            Tax
                          </Typography>
                        </StyledTableCell> */}
                        <StyledTableCell align='right'>
                          <Typography variant='subtitle1' component='p'>
                            Amount
                          </Typography>
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {order.items.map((itemsItem, itemsItemIndex) => (
                        <StyledTableRow key={itemsItem.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <StyledTableCell component='th' scope='row'>
                            <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                              {itemsItem.name}
                            </Typography>
                            <Typography variant='subtitle2'>
                              ({itemsItem.service ? `$ ${itemsItem.price}` : `$ ${itemsItem.price} / lbs`})
                            </Typography>
                          </StyledTableCell>
                          {/* <StyledTableCell align='right'>
                            <Typography variant='subtitle2'>0</Typography>
                          </StyledTableCell> */}
                          <StyledTableCell align='right'>
                            <Typography variant='subtitle2'>
                              $ {(Number(itemsItem.price) * itemsItem.units).toFixed(2)}
                            </Typography>
                            <Typography variant='subtitle2'>
                              ({itemsItem.service ? `${itemsItem.units}` : `${itemsItem.units} lbs`})
                            </Typography>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                      {order.discountPrice > 0 && (
                        <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <StyledTableCell component='th' scope='row'>
                            <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                              <Typography
                                variant='subtitle2'
                                sx={{ fontWeight: 'bold', display: 'inline', textDecoration: 'underline' }}
                              >
                                {order.discountCode}
                              </Typography>{' '}
                              Discount
                            </Typography>
                          </StyledTableCell>
                          {/* <StyledTableCell align='right'>
                            <Typography variant='subtitle2'>0</Typography>
                          </StyledTableCell> */}
                          <StyledTableCell align='right'>
                            <Typography variant='subtitle2'>- $ {Number(order.discountPrice).toFixed(2)}</Typography>
                          </StyledTableCell>
                        </StyledTableRow>
                      )}
                      {order.deliveryPrice > 0 && (
                        <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <StyledTableCell component='th' scope='row'>
                            <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                              {getTitleCase(order.deliveryType)} Delivery and Handling
                            </Typography>
                          </StyledTableCell>
                          {/* <StyledTableCell align='right'>
                            <Typography variant='subtitle2'>0</Typography>
                          </StyledTableCell> */}
                          <StyledTableCell align='right'>
                            <Typography variant='subtitle2'>$ {order.deliveryPrice}</Typography>
                          </StyledTableCell>
                        </StyledTableRow>
                      )}
                      {order.handlingPrice > 0 && (
                        <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <StyledTableCell component='th' scope='row'>
                            <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                              Handling Fee
                            </Typography>
                          </StyledTableCell>
                          {/* <StyledTableCell align='right'>
                            <Typography variant='subtitle2'>0</Typography>
                          </StyledTableCell> */}
                          <StyledTableCell align='right'>
                            <Typography variant='subtitle2'>$ {order.handlingPrice}</Typography>
                          </StyledTableCell>
                        </StyledTableRow>
                      )}
                      <StyledTableRow>
                        <StyledTableCell align='right'>
                          <Typography variant='subtitle2' sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                            Total
                          </Typography>
                        </StyledTableCell>
                        {/* <StyledTableCell align='right'>
                          <Typography sx={{ fontWeight: 'bold' }} variant='subtitle2'>
                            0
                          </Typography>
                        </StyledTableCell> */}
                        <StyledTableCell align='right'>
                          <Typography sx={{ fontWeight: 'bold' }} variant='subtitle2'>
                            $ {Number(order.currentTotal).toFixed(2)}
                          </Typography>
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
            <Grid container alignItems='center' justifyContent='center' spacing={5} sx={{ mt: { xs: 1, sm: 1 } }}>
              <Grid item xs={12} sm={12} md={6} className='order-details-payment'>
                {order.type === 'prepared' ? (
                  <Box
                    sx={{
                      px: { xs: 1.5, sm: 3 },
                      py: { xs: 2, sm: 3 },
                      backgroundColor: 'actionLite.selected',
                      borderRadius: '25px',
                      mt: { xs: 0.5, sm: 3 },
                    }}
                  >
                    <Typography component='h6' variant='h5' sx={{ color: 'text.primary', textAlign: 'left' }}>
                      Payment
                    </Typography>
                    <Typography variant='body1' sx={{ color: 'text.neutral', textAlign: 'left', pb: 2 }}>
                      Final Payable Amount
                    </Typography>
                    <Box
                      sx={{
                        width: '100%',
                        backgroundColor: (theme) => (theme.palette.mode === 'light' ? 'white' : 'hsla(220, 0%, 0%, 0.7)'),
                        px: { xs: 1, sm: 2 },
                        py: { xs: 2, sm: 2 },
                        borderRadius: '25px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'center',
                        minHeight: { xs: '10vh', sm: '32vh' },
                      }}
                    >
                      <Box sx={{ width: '100%', pr: 2 }}>
                        <Stack
                          direction='row'
                          justifyContent='space-between'
                          alignItems='center'
                          gap={1.5}
                          sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
                        >
                          <Typography variant='subtitle1' sx={{ color: 'text.neutral', textAlign: 'left', pb: 0.5 }}>
                            Subtotal
                          </Typography>
                          <Typography variant='subtitle1' sx={{ color: 'text.secondary', textAlign: 'left', pb: 0.5 }}>
                            $ {order.originalTotal}
                          </Typography>
                        </Stack>
                        {order.discountPrice > 0 && (
                          <Stack
                            direction='row'
                            justifyContent='space-between'
                            alignItems='center'
                            gap={1.5}
                            sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
                          >
                            <Typography variant='subtitle1' sx={{ fontWeight: 'bold', color: 'text.neutral' }}>
                              <Typography
                                variant='subtitle1'
                                sx={{
                                  fontWeight: 'bold',
                                  display: 'inline',
                                  textDecoration: 'underline',
                                  color: 'text.neutral',
                                }}
                              >
                                {order.discountCode}
                              </Typography>{' '}
                              Discount
                            </Typography>
                            <Typography variant='subtitle1' sx={{ color: 'text.secondary', textAlign: 'left', pb: 0.5 }}>
                              - $ {Number(order.discountPrice).toFixed(2)}
                            </Typography>
                          </Stack>
                        )}
                        {order.deliveryPrice > 0 && (
                          <Stack
                            direction='row'
                            justifyContent='space-between'
                            alignItems='center'
                            gap={1.5}
                            sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
                          >
                            <Typography variant='subtitle1' sx={{ color: 'text.neutral', textAlign: 'left', pb: 0.5 }}>
                              {getTitleCase(order.deliveryType)} Delivery and Handling
                            </Typography>
                            <Typography variant='subtitle1' sx={{ color: 'text.secondary', textAlign: 'left', pb: 0.5 }}>
                              $ {order.deliveryPrice}
                            </Typography>
                          </Stack>
                        )}
                        {order.handlingPrice > 0 && (
                          <Stack
                            direction='row'
                            justifyContent='space-between'
                            alignItems='center'
                            gap={1.5}
                            sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
                          >
                            <Typography variant='subtitle1' sx={{ color: 'text.neutral', textAlign: 'left', pb: 0.5 }}>
                              Handling Fee
                            </Typography>
                            <Typography variant='subtitle1' sx={{ color: 'text.secondary', textAlign: 'left', pb: 0.5 }}>
                              $ {order.handlingPrice}
                            </Typography>
                          </Stack>
                        )}
                        {/* <Stack
                          direction='row'
                          justifyContent='space-between'
                          alignItems='center'
                          gap={1.5}
                          sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
                        >
                          <Typography variant='subtitle1' sx={{ color: 'text.neutral', textAlign: 'left', pb: 0.5 }}>
                            Tax (13%)
                          </Typography>
                          <Typography variant='subtitle1' sx={{ color: 'text.secondary', textAlign: 'left', pb: 0.5 }}>
                            $ 0
                          </Typography>
                        </Stack> */}
                        <Stack
                          direction='row'
                          justifyContent='space-between'
                          alignItems='center'
                          gap={1.5}
                          sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
                        >
                          <Typography variant='subtitle1' sx={{ color: 'text.neutral', textAlign: 'left', pb: 0.5 }}>
                            Total
                          </Typography>
                          <Typography variant='subtitle1' sx={{ color: 'text.secondary', textAlign: 'left', pb: 0.5 }}>
                            $ {Number(order.currentTotal).toFixed(2)}
                          </Typography>
                        </Stack>
                        <Stack
                          direction='row'
                          justifyContent='space-between'
                          alignItems='center'
                          gap={1.5}
                          sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
                        >
                          <Typography variant='subtitle1' sx={{ color: 'text.neutral', textAlign: 'left', pb: 0.5 }}>
                            Payment Status
                          </Typography>
                          <Typography variant='subtitle1' sx={{ color: 'text.secondary', textAlign: 'left', pb: 0.5 }}>
                            {isPaidOff ? 'Paid Off' : 'Pending'}
                          </Typography>
                        </Stack>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      px: { xs: 1.5, sm: 3 },
                      py: { xs: 2, sm: 3 },
                      backgroundColor: 'actionLite.selected',
                      borderRadius: '25px',
                      mt: { xs: 0.5, sm: 3 },
                    }}
                  >
                    <Typography component='h6' variant='h5' sx={{ color: 'text.primary', textAlign: 'left' }}>
                      Selected Services
                    </Typography>
                    <Typography variant='body1' sx={{ color: 'text.neutral', textAlign: 'left', pb: 2 }}>
                      Your Laundry Basket
                    </Typography>

                    <TableContainer component={Paper}>
                      <Table sx={{ width: '100%', minHeight: { xs: '10vh', sm: '32vh' } }} aria-label='simple table'>
                        <TableHead>
                          <StyledTableRow>
                            <StyledTableCell>
                              <Typography variant='h6' component='h6'>
                                Service
                              </Typography>
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                              <Typography variant='h6' component='h6'>
                                Price
                              </Typography>
                            </StyledTableCell>
                          </StyledTableRow>
                        </TableHead>
                        <TableBody>
                          {order.services.map((service, serviceIndex) => (
                            <StyledTableRow key={serviceIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <StyledTableCell component='th' scope='row'>
                                <Stack
                                  direction='row'
                                  justifyContent='flex-start'
                                  alignItems='center'
                                  gap={1}
                                  sx={{ my: 1, pl: { xs: 1, sm: 0 } }}
                                >
                                  <Box
                                    sx={{
                                      height: { xs: 50, sm: 60 },
                                    }}
                                  >
                                    <img
                                      style={{
                                        height: '100%',
                                      }}
                                      src={service.pic2 || service.pic}
                                      alt='new'
                                    />
                                  </Box>
                                  <Typography variant='subtitle1' sx={{ ml: { xs: 1, sm: 2 }, fontWeight: 'bold' }}>
                                    {service.name}
                                  </Typography>
                                </Stack>
                              </StyledTableCell>
                              <StyledTableCell align='right'>
                                <Typography variant='subtitle1'>
                                  {service.isItem ? `$ ${service.price} / lbs` : ''}
                                </Typography>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={6} className='order-details-address'>
                <Box
                  sx={{
                    px: { xs: 1.5, sm: 3 },
                    py: { xs: 2, sm: 3 },
                    backgroundColor: 'actionLite.selected',
                    borderRadius: '25px',
                    mt: { xs: 0.5, sm: 3 },
                    minHeight: { xs: '20vh', sm: '45vh' },
                  }}
                >
                  <Typography component='h6' variant='h5' sx={{ color: 'text.primary', textAlign: 'left' }}>
                    Address
                  </Typography>
                  <Typography variant='body1' sx={{ color: 'text.neutral', textAlign: 'left', pb: 2 }}>
                    Pickup and Delivery Details
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      minHeight: { xs: '10vh', sm: '32vh' },
                      backgroundColor: (theme) => (theme.palette.mode === 'light' ? 'white' : 'hsla(220, 0%, 0%, 0.7)'),
                      px: { xs: 1, sm: 2 },
                      py: { xs: 2, sm: 2 },
                      borderRadius: '25px',
                      height: '200px',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'start',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ width: '100%' }}>
                      <Typography sx={{ color: 'text.secondary', pb: 1 }} component='p' variant='title'>
                        {order.address.name}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', pb: 0.5 }} variant='subtitle1'>
                        {order.address.address1}, {order.address.address2}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', pb: 0.5 }} variant='subtitle1'>
                        {order.address.city}, {order.address.state}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', pb: 0.5 }} variant='subtitle1'>
                        {order.address.zipCode}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary', pb: 0.5 }} variant='subtitle1'>
                        <Phone sx={{ fontSize: 16 }} /> {formatMobile(order.address.phone)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Modal
              open={isPaymentDialogOpen}
              onClose={() => setIsPaymentDialogOpen(false)}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <div>
                <PayExistingOrder
                  setIsPaymentDialogOpen={setIsPaymentDialogOpen}
                  order={order}
                  amount={pendingAmount}
                  loading={isLoading}
                ></PayExistingOrder>
              </div>
            </Modal>
          </>
        )}
        <Snackbar
          sx={{
            marginBottom: 5,
            '& .MuiAlert-root': {
              alignItems: 'center',
              backgroundColor: 'primary.main',
            },
            '& .MuiAlert-icon': {
              fontSize: 30,
              color: 'white',
            },
          }}
          open={!!isSuccess}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          key={'bottomcenter1'}
        >
          <Alert variant='filled' sx={{ width: '100%' }}>
            <Typography sx={{ color: 'white' }} variant='title'>
              Order Placed Successfully
            </Typography>
          </Alert>
        </Snackbar>
        <Snackbar
          sx={{
            marginBottom: 5,
            '& .MuiAlert-root': {
              alignItems: 'center',
              backgroundColor: 'primary.main',
            },
            '& .MuiAlert-icon': {
              fontSize: 30,
              color: 'white',
            },
          }}
          open={!!isPaymentSuccess}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          key={'bottomcenter1'}
        >
          <Alert variant='filled' sx={{ width: '100%' }}>
            <Typography sx={{ color: 'white' }} variant='title'>
              Payment Confirmed
            </Typography>
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}

export default OrderDetails;
