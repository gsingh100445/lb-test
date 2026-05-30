import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import {
  Add,
  AddLocation,
  ArrowBack,
  ArrowForward,
  AssignmentLate,
  AssignmentTurnedIn,
  CheckCircle,
  Check,
  DateRange,
  DryCleaning,
  Edit,
  KeyboardArrowDown,
  KeyboardArrowUp,
  LocationOn,
  PersonPin,
  Phone,
  Remove,
  TaskAlt,
  EventAvailable,
  Error,
} from '@mui/icons-material';
import moment from 'moment';
import ConfirmOrder from '../Modals/ConfirmOrder';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';
import { validateDiscount } from '../utils/api_base';
import { deliveryOfferAmount, firstOrderDiscount, maximumDiscount, minimumOrderAmount } from '../utils/config';

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className='QontoStepIcon-completedIcon' /> : <div className='QontoStepIcon-circle' />}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PersonPin />,
    2: <DateRange />,
    3: <DryCleaning />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

function BookOrder(props) {
  const navigate = useNavigate();
  const confirmRef = useRef();
  const itemsRef = useRef([]);
  const textFieldsRef = useRef([]);
  let todayDate = new Date();
  let nextDayDate = new Date();
  nextDayDate.setDate(nextDayDate.getDate() + 1);
  let next15DayDate = new Date();
  next15DayDate.setDate(next15DayDate.getDate() + 15);
  let next16DayDate = new Date();
  next16DayDate.setDate(next16DayDate.getDate() + 16);
  const [user, setUser] = useState();
  const [userLoaded, setUserLoaded] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const [holidays, setHolidays] = useState([]);

  const [addressSelected, setAddressSelected] = useState(false);
  const [addressNotes, setAddressNotes] = useState('');
  const [deliverySelected, setDeliverySelected] = useState(false);

  const [selectedDate, setSelectedDate] = useState();
  const [selectedDateObj, setSelectedDateObj] = useState(
    new Date().getHours() > 18
      ? {
          year: nextDayDate.getFullYear(),
          month: nextDayDate.getMonth() + 1,
          day: nextDayDate.getDate(),
        }
      : {
          year: todayDate.getFullYear(),
          month: todayDate.getMonth() + 1,
          day: todayDate.getDate(),
        }
  );
  const [selectedSlot, setSelectedSlot] = useState();
  const [timeSlots, setTimeSlots] = useState();
  const [slotError, setSlotError] = useState(null);

  const [cart, setCart] = useState([]);
  const [itemsError, setItemsError] = useState(null);
  const [amount, setAmount] = useState(0.0);
  const [services, setServices] = useState([]);
  const [servicesLoaded, setServicesLoaded] = useState(false);

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const [isFirstOrderDiscount, setFirstOrderDiscount] = useState(false);

  const [selectedServices, setSelectedServices] = useState([]);
  const [servicesError, setServicesError] = useState(null);

  const [typeValue, setTypeValue] = React.useState(1);

  const [isSlotStepEnabled, setIsSlotStepEnabled] = useState(false);
  const [isServicesStepEnabled, setIsServicesStepEnabled] = useState(false);

  const minimumDate =
    new Date().getHours() > 18
      ? {
          year: nextDayDate.getFullYear(),
          month: nextDayDate.getMonth() + 1,
          day: nextDayDate.getDate(),
        }
      : {
          year: todayDate.getFullYear(),
          month: todayDate.getMonth() + 1,
          day: todayDate.getDate(),
        };

  const maximumDate =
    new Date().getHours() > 18
      ? {
          year: next16DayDate.getFullYear(),
          month: next16DayDate.getMonth() + 1,
          day: next16DayDate.getDate(),
        }
      : {
          year: next15DayDate.getFullYear(),
          month: next15DayDate.getMonth() + 1,
          day: next15DayDate.getDate(),
        };

  const handleChange = (event, newValue) => {
    setTypeValue(newValue);
  };

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

  const getFormattedAddress = (index) => {
    let address = '';
    if (addresses[index]) {
      address =
        addresses[index].address1 +
        ', ' +
        addresses[index].address2 +
        ', ' +
        addresses[index].city +
        ', ' +
        addresses[index].state +
        ' ' +
        addresses[index].zipCode;
    }
    return address;
  };

  const steps = ['Address', 'Date', 'Services'];

  React.useEffect(() => {
    document.title = 'Schedule Pickup - Laundry Basket';
  }, []);

  useEffect(() => {
    if (props.isFirstLoadDone) {
      if (props.isLoggedIn === false) {
        navigate('/');
      }
    }
    if (props.tenant && props.tenant.holidays) {
      if (props.tenant.holidays.length) {
        let holidaysArr = [];
        props.tenant.holidays.forEach((holiday) => {
          let date = moment(holiday, 'YYYY-MM-DD');
          holidaysArr.push({ year: date.year(), month: date.month() + 1, day: date.date() });
        });
        setHolidays(holidaysArr);
      }
    }
    let res = localStorage.getItem('user');
    if (res) {
      const user = JSON.parse(res);
      if (user) {
        setUser(user);
        if (user && user.addresses && user.addresses.length) {
          let addressesArr = user.addresses;
          addressesArr.sort((a, b) => b.isDefault - a.isDefault);
          addressesArr.forEach((element, index) => {
            if (element.isDefault) {
              setSelectedAddress(index);
            }
          });
          setAddresses(addressesArr);
        }
      }
    }
    setUserLoaded(true);
  }, [navigate, props.isLoggedIn, props.user, props.isFirstLoadDone, props.tenant]);

  useEffect(() => {
    let servicesObj = [];
    if (props.servicesLoaded) {
      setServicesLoaded(props.servicesLoaded);
      props.services.forEach((service, index) => {
        if (!service.isItem) {
          servicesObj.push({ ...service, units: 0, isExpanded: false });
          servicesObj[index].items = [];
          if (service.items) {
            for (const item of service.items) {
              servicesObj[index].items.push({ ...item, units: 0 });
            }
          }
        } else {
          servicesObj.push({ ...service, units: 0 });
        }
      });
      setServices(servicesObj);
      setAmount(0.0);
      setCart([]);
    }
  }, [props.servicesLoaded, props.services, typeValue]);

  useEffect(() => {
    validateDiscount('FIRSTORDER').then((res) => {
      if (res) {
        setFirstOrderDiscount(true);
      }
    });
  }, []);

  const calculateAmount = (cart) => {
    let total = 0.0;
    for (const cartItem of cart) {
      total = Number(total + Number(cartItem.currentPrice || cartItem.startingPrice) * Number(cartItem.units));
    }
    setAmount(Number(total).toFixed(2));
  };

  const addToCart = (item) => {
    const index = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (index > -1) {
      let cartObj = [...cart];
      cartObj[index].units = cartObj[index].units + 1;
      setCart(cartObj);
      calculateAmount(cartObj);
    } else {
      setCart([...cart, { ...item, units: 1 }]);
      calculateAmount([...cart, { ...item, units: 1 }]);
    }
  };

  const removeFromCart = (item) => {
    const index = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (index > -1) {
      let cartObj = [...cart];
      if (cartObj[index].units > 1) {
        cartObj[index].units = cartObj[index].units - 1;
        setCart(cartObj);
        calculateAmount(cartObj);
      } else {
        cartObj.splice(index, 1);
        setCart(cartObj);
        calculateAmount(cartObj);
      }
    }
  };

  const updateCart = (item) => {
    const index = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (index > -1) {
      let cartObj = [...cart];
      if (item.units) {
        cartObj[index].units = item.units;
        setCart(cartObj);
        calculateAmount(cartObj);
      } else {
        cartObj.splice(index, 1);
        setCart(cartObj);
        calculateAmount(cartObj);
      }
    } else {
      if (item.units) {
        setCart([...cart, { ...item, units: item.units }]);
        calculateAmount([...cart, { ...item, units: item.units }]);
      }
    }
  };

  const handleWeightChange = (text, item, index) => {
    let weight = Number(text.replace(/[^0-9]/g, ''));
    if (weight < 1000) {
      let itemObj = { ...item };
      itemObj.units = weight;
      let servicesObj = [...services];
      servicesObj[index] = itemObj;
      setServices(servicesObj);
      updateCart(itemObj);
    }
  };

  const completeAddress = async () => {
    let isError = false;
    if (isError) {
      return;
    }
    setAddressSelected(true);
    setActiveStep(1);
    if (!selectedDate) {
      onDateSelect(selectedDateObj);
    }
    setIsSlotStepEnabled(true);
    window.scrollTo(0, 0);
  };

  const completeDelivery = async () => {
    let isError = false;
    if (!selectedSlot) {
      setSlotError('Oops! Don’t forget to choose a pickup time');
      setTimeout(() => {
        setSlotError(null);
      }, 5000);
      isError = true;
    }
    if (isError) {
      return;
    }
    setDeliverySelected(true);
    setActiveStep(2);
    setIsServicesStepEnabled(true);
    window.scrollTo(0, 0);
  };

  const bookOrder = async () => {
    let isError = false;
    if (typeValue === 0 && !cart.length) {
      setItemsError('To proceed, just add the items you’d like us to clean.');
      setTimeout(() => {
        setItemsError(null);
      }, 5000);
      isError = true;
    } else if (typeValue === 0 && amount < minimumOrderAmount) {
      setItemsError(`Add more items! Minimum order amount is $${minimumOrderAmount}.`);
      setTimeout(() => {
        setItemsError(null);
      }, 5000);
      isError = true;
    } else if (typeValue !== 0 && !selectedServices.length) {
      setServicesError('Oops! Please select at least one service before confirming your pickup.');
      setTimeout(() => {
        setServicesError(null);
      }, 5000);
      isError = true;
    }
    if (isError) {
      return;
    }
    setIsConfirmDialogOpen(true);
  };

  const onDateSelect = (dateObj) => {
    setSelectedSlot();
    let date = moment(
      `${dateObj.day < 10 ? '0' + Number(dateObj.day) : dateObj.day}-${
        dateObj.month < 10 ? '0' + Number(dateObj.month) : dateObj.month
      }-${dateObj.year}`,
      'DD-MM-YYYY'
    );
    date.set('hour', moment().get('hour')).set('minute', moment().get('minute'));
    setSelectedDateObj(dateObj);
    setSelectedDate(date);
    var iscurrentDate = moment(date).isSame(new Date(), 'day');
    if (iscurrentDate) {
      let hour = Number(moment(date).format('HH'));
      let isWeekEnd = moment(date).day() === 6 || moment(date).day() === 0;
      let newTimeSlots = [];
      if (hour < 11 && isWeekEnd) {
        newTimeSlots.push({
          code: 'mornning-1',
          title: '9 AM - 12 PM',
        });
      }
      if (hour < 14 && isWeekEnd) {
        newTimeSlots.push({
          code: 'mornning-2',
          title: '12 PM - 3 PM',
        });
      }
      if (hour < 17 && isWeekEnd) {
        newTimeSlots.push({
          code: 'afternoon',
          title: '3 PM - 6 PM',
        });
      }
      if (hour < 21) {
        newTimeSlots.push({
          code: 'evening',
          title: '6 PM - 10 PM',
        });
      }
      if (newTimeSlots.length === 1) {
        setSelectedSlot(newTimeSlots[0].title);
      }
      setTimeSlots(newTimeSlots);
    } else {
      if (date.day() === 6 || date.day() === 0) {
        setTimeSlots([
          {
            code: 'mornning-1',
            title: '9 AM - 12 PM',
          },
          {
            code: 'mornning-2',
            title: '12 PM - 3 PM',
          },
          {
            code: 'afternoon',
            title: '3 PM - 6 PM',
          },
          {
            code: 'evening',
            title: '6 PM - 10 PM',
          },
        ]);
      } else {
        setTimeSlots([
          {
            code: 'evening',
            title: '6 PM - 10 PM',
          },
        ]);
        setSelectedSlot('6 PM - 10 PM');
      }
    }
  };

  const selectUnselectService = (id) => {
    let services = [...selectedServices];
    if (services.indexOf(id) > -1) {
      services.splice(services.indexOf(id), 1);
    } else {
      services.push(id);
    }
    setSelectedServices(services);
  };

  const closeConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };

  const orderConfirmed = (id) => {
    setIsConfirmDialogOpen(false);
    navigate('/orders/' + id + '?success=true');
  };

  return (
    <Container maxWidth='xlg' id='features' sx={{ pt: { xs: 12, sm: 16 }, pb: { xs: 8, sm: 8 } }}>
      <Box
        sx={{
          width: { xs: '100%', sm: '90%', md: '90%', lg: '100%' },
          mx: 'auto',
          textAlign: 'center',
          pb: 4,
        }}
      >
        <Stepper
          sx={{ py: 2, display: { xs: 'flex', sm: 'flex', md: 'none' } }}
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  cursor: 'pointer',
                  '& .MuiStepLabel-labelContainer span': {
                    fontSize: 18,
                    fontWeight: 'bold',
                  },
                }}
                onClick={() => {
                  if (label === 'Address') {
                    setActiveStep(0);
                  }
                  if (label === 'Date' && addressSelected) {
                    setActiveStep(1);
                    setIsSlotStepEnabled(true);
                  }
                  window.scrollTo(0, 0);
                }}
                StepIconComponent={ColorlibStepIcon}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box
          sx={{
            display: { xs: 'inherit', sm: 'inherit', md: 'inherit', lg: 'flex' },
            flexDirection: { xs: 'inherit', sm: 'inherit', md: 'inherit', lg: 'row' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '100%', md: '100%', lg: '65%' }, px: { xs: 1, sm: 2.5, md: 5 }, mt: 2 }}>
            {activeStep === 0 && (
              <Box sx={{ px: { xs: 0, sm: 1 } }}>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                  sx={{
                    display: { xs: 'none', sm: 'flex', md: 'flex' },
                    mx: 'auto',
                    width: addresses.length === 1 ? '75%' : '100%',
                  }}
                >
                  <Typography component='h6' variant='title' sx={{ color: 'text.primary', pb: 2, textAlign: 'left' }}>
                    Pickup & Delivery Address
                  </Typography>
                  <Button
                    onClick={completeAddress}
                    sx={{ mb: 2, px: 4 }}
                    color='primary'
                    variant='contained'
                    endIcon={<ArrowForward />}
                  >
                    {loading ? (
                      <CircularProgress size={25} color='inherit' />
                    ) : (
                      <Typography sx={{ color: 'white' }} component='h6' variant='nav' textAlign='center'>
                        Next
                      </Typography>
                    )}
                  </Button>
                </Stack>
                <Box sx={{ display: { xs: 'block', sm: 'none', md: 'none' }, pb: 3 }}>
                  <Typography component='h6' variant='h6' sx={{ color: 'text.primary', pb: 2, textAlign: 'center' }}>
                    Pickup & Delivery Address
                  </Typography>
                  <Stack direction='row' justifyContent='end' alignItems='center'>
                    <Button
                      onClick={completeAddress}
                      sx={{ px: 2 }}
                      color='primary'
                      variant='contained'
                      endIcon={<ArrowForward />}
                    >
                      {loading ? (
                        <CircularProgress size={25} color='inherit' />
                      ) : (
                        <Typography sx={{ color: 'white' }} component='h6' variant='nav' textAlign='center'>
                          Next
                        </Typography>
                      )}
                    </Button>
                  </Stack>
                </Box>
                {userLoaded && (
                  <>
                    <Grid container alignItems='center' justifyContent='center' spacing={2.5} sx={{ pb: 2 }}>
                      {addresses.map((address, index) => (
                        <Grid
                          item
                          xs={12}
                          sm={addresses.length === 1 ? 9 : 6}
                          md={addresses.length === 1 ? 9 : 6}
                          key={index}
                        >
                          <div
                            style={{
                              position: 'relative',
                              cursor: 'pointer',
                            }}
                            onClick={() => setSelectedAddress(index)}
                          >
                            <Stack
                              direction='column'
                              spacing={1}
                              useFlexGap
                              justifyContent='center'
                              alignItems='start'
                              sx={{
                                borderRadius: '15px',
                                py: 1,
                                pr: 1,
                                border: index === selectedAddress ? '2.5px solid' : '1.5px solid',
                                borderColor: index === selectedAddress ? 'primary.main' : 'hsla(220, 25%, 25%, .3)',
                                boxShadow: 'none',
                                minHeight: '12vh',
                                pl: 2,
                                '& .MuiTypography-root': {
                                  userSelect: 'none',
                                },
                                '&:hover': {
                                  border: '2.5px solid',
                                },
                              }}
                            >
                              <Typography
                                sx={{ color: 'text.secondary', textAlign: 'left', fontWeight: 'bold' }}
                                variant='subtitle1'
                              >
                                {address.name}
                              </Typography>
                              <Typography sx={{ color: 'text.secondary', textAlign: 'left' }} variant='subtitle2'>
                                {address.address1}, {address.address2}, {address.city}
                              </Typography>
                              <Typography sx={{ color: 'text.secondary', textAlign: 'left' }} variant='subtitle2'>
                                {address.state} {address.zipCode}
                              </Typography>
                              <Typography sx={{ color: 'text.secondary', textAlign: 'left' }} variant='subtitle1'>
                                <Phone sx={{ fontSize: 16 }} /> {formatMobile(address.phone)}
                              </Typography>
                            </Stack>
                            {index === selectedAddress && (
                              <IconButton
                                className='flex items-center ml-3 px-3 py-1.5'
                                style={{
                                  position: 'absolute',
                                  top: 5,
                                  right: 5,
                                  marginLeft: 'auto',
                                  alignContent: 'flex-end',
                                  zIndex: 30,
                                }}
                              >
                                <CheckCircle sx={{ fontSize: 30 }} />
                              </IconButton>
                            )}
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                    <Grid container alignItems='center' justifyContent='center' spacing={2.5} sx={{ pb: 2 }}>
                      <Grid item xs={12} sm={addresses.length === 1 ? 9 : 6} md={addresses.length === 1 ? 9 : 6}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                          <LocationOn sx={{ mr: 1, my: 0.5 }} />
                          <TextField
                            inputProps={{ type: 'text', readOnly: loading }}
                            id='address-notes'
                            name='address notes'
                            label='Extra Details ( Buzzer Code, etc. )'
                            value={addressNotes}
                            fullWidth
                            onChange={(e) => {
                              setAddressNotes(e.target.value);
                            }}
                            variant='standard'
                            InputProps={{
                              style: { fontSize: { xs: 18, sm: 20, md: 20 } },
                            }}
                            InputLabelProps={{
                              style: { fontSize: { xs: 18, sm: 20, md: 20 } },
                            }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    <Button
                      sx={{ mt: 4 }}
                      color='primary'
                      onClick={() => navigate('/my-addresses')}
                      variant='contained'
                      startIcon={<AddLocation />}
                    >
                      <Typography
                        sx={{ color: 'white' }}
                        className='text-white-imp'
                        component='h6'
                        variant='nav'
                        textAlign='center'
                      >
                        Add Address
                      </Typography>
                    </Button>
                  </>
                )}
              </Box>
            )}
            {activeStep === 1 && (
              <Box sx={{ px: { xs: 0, sm: 1 } }}>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                  sx={{ display: { xs: 'none', sm: 'flex', md: 'flex' } }}
                >
                  <Typography component='h6' variant='title' sx={{ color: 'text.primary', pb: 2, pr: 5, textAlign: 'left' }}>
                    Select Pick Up Date & TimeSlot
                  </Typography>
                  <Stack direction='row' justifyContent='end' alignItems='center' spacing={2}>
                    <Button
                      onClick={() => {
                        setActiveStep(0);
                        window.scrollTo(0, 0);
                      }}
                      sx={{ mb: 2, px: 4, mr: 3, display: { xs: 'none', sm: 'flex', md: 'flex' } }}
                      color='primary'
                      variant='contained'
                      startIcon={<ArrowBack />}
                    >
                      {loading ? (
                        <CircularProgress size={25} color='inherit' />
                      ) : (
                        <Typography
                          sx={{ color: 'white' }}
                          className='text-white-imp'
                          component='h6'
                          variant='nav'
                          textAlign='center'
                        >
                          Back
                        </Typography>
                      )}
                    </Button>
                    <Button
                      onClick={completeDelivery}
                      sx={{ mb: 2, px: 4 }}
                      color='primary'
                      variant='contained'
                      endIcon={<ArrowForward />}
                    >
                      {loading ? (
                        <CircularProgress size={25} color='inherit' />
                      ) : (
                        <Typography
                          sx={{ color: 'white' }}
                          className='text-white-imp'
                          component='h6'
                          variant='nav'
                          textAlign='center'
                        >
                          Next
                        </Typography>
                      )}
                    </Button>
                  </Stack>
                </Stack>
                <Box sx={{ display: { xs: 'block', sm: 'none', md: 'none' }, pb: 3 }}>
                  <Typography component='h6' variant='h6' sx={{ color: 'text.primary', pb: 2, textAlign: 'center' }}>
                    Select Pick Up Date & TimeSlot
                  </Typography>
                  <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                    <Button
                      onClick={() => {
                        setActiveStep(0);
                        window.scrollTo(0, 0);
                      }}
                      sx={{ px: 2 }}
                      color='primary'
                      variant='contained'
                      startIcon={<ArrowBack />}
                    >
                      {loading ? (
                        <CircularProgress size={25} color='inherit' />
                      ) : (
                        <Typography
                          sx={{ color: 'white' }}
                          className='text-white-imp'
                          component='h6'
                          variant='nav'
                          textAlign='center'
                        >
                          Back
                        </Typography>
                      )}
                    </Button>
                    <Button
                      onClick={completeDelivery}
                      sx={{ px: 2 }}
                      color='primary'
                      variant='contained'
                      endIcon={<ArrowForward />}
                    >
                      {loading ? (
                        <CircularProgress size={25} color='inherit' />
                      ) : (
                        <Typography
                          sx={{ color: 'white' }}
                          className='text-white-imp'
                          component='h6'
                          variant='nav'
                          textAlign='center'
                        >
                          Next
                        </Typography>
                      )}
                    </Button>
                  </Stack>
                </Box>
                <Grid container spacing={{ xs: 2, sm: 2, md: 2, lg: 5 }}>
                  <Grid item xs={12} sm={12} md={12} lg={7}>
                    <Box
                      sx={{
                        width: '100%',
                        '& .responsive-calendar': {
                          fontSize: { xs: '11px', sm: '18px', md: '18px', lg: '13px' },
                        },
                        '& .Calendar': {
                          width: '100% !important',
                        },
                      }}
                    >
                      <Calendar
                        colorPrimary='hsl(205, 100%, 50%)'
                        colorPrimaryLight='hsla(205, 100%, 50%, 0.2)'
                        calendarClassName='responsive-calendar'
                        minimumDate={minimumDate}
                        maximumDate={maximumDate}
                        value={selectedDateObj}
                        disabledDays={holidays}
                        onChange={(newValue) => onDateSelect(newValue)}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={5}>
                    <Box sx={{ width: '100%' }}>
                      <Typography
                        sx={{
                          textAlign: 'left',
                          color: 'text.primary',
                          typography: { xs: 'subtitle1', sm: 'subtitle1', md: 'subtitle1', lg: 'subtitle1' },
                          fontWeight: 'bold !important',
                        }}
                      >
                        Timeslots:
                      </Typography>
                      <Grid container>
                        {timeSlots?.map((item, index) => (
                          <Grid item xs={12} sm={12} md={12} key={index}>
                            <div
                              style={{
                                position: 'relative',
                                cursor: 'pointer',
                              }}
                              onClick={() => setSelectedSlot(item.title)}
                            >
                              <Box
                                sx={{
                                  p: 1,
                                  border: selectedSlot === item.title ? '1.5px solid' : '1px solid',
                                  backgroundColor: selectedSlot === item.title ? 'primary.main' : 'actionLite.selected',
                                  borderColor: 'primary.main',
                                  mt: 2,
                                  borderRadius: '.3rem',
                                  '& .MuiTypography-root': {
                                    userSelect: 'none',
                                  },
                                  '&:hover': {
                                    '& .MuiTypography-root': {
                                      color: 'text.white',
                                    },
                                    border: '1.5px solid',
                                    backgroundColor: 'primary.main',
                                  },
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: selectedSlot === item.title ? 'text.white' : 'text.primary',
                                    typography: { xs: 'subtitle1', sm: 'h5', md: 'h5', lg: 'subtitle2' },
                                  }}
                                >
                                  {item.title}
                                </Typography>
                                {selectedSlot === item.title && (
                                  <EventAvailable
                                    sx={{
                                      fontSize: 30,
                                      color: 'white',
                                      position: 'absolute',
                                      top: 0,
                                      right: 10,
                                      zIndex: 30,
                                      alignSelf: 'anchor-center',
                                      marginTop: { xs: '10px', sm: '2px', md: '3px' },
                                    }}
                                  />
                                )}
                              </Box>
                            </div>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
            {activeStep === 2 && (
              <Box>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                  sx={{ display: { xs: 'none', sm: 'flex', md: 'flex' } }}
                >
                  <Typography component='h6' variant='title' sx={{ color: 'text.primary', pb: 2, textAlign: 'left' }}>
                    Select items now or at pickup
                  </Typography>
                  <Stack direction='row' justifyContent='end' alignItems='center' spacing={2}>
                    <Button
                      onClick={() => {
                        setActiveStep(1);
                        window.scrollTo(0, 0);
                      }}
                      sx={{ mb: 2, px: 4, display: { xs: 'none', sm: 'flex', md: 'flex' } }}
                      color='primary'
                      variant='contained'
                      startIcon={<ArrowBack />}
                    >
                      {loading ? (
                        <CircularProgress size={25} color='inherit' />
                      ) : (
                        <Typography
                          sx={{ color: 'white' }}
                          className='text-white-imp'
                          component='h6'
                          variant='nav'
                          textAlign='center'
                        >
                          Back
                        </Typography>
                      )}
                    </Button>
                    <Button
                      onClick={() => {
                        bookOrder();
                      }}
                      size='large'
                      sx={{ mb: 2, px: 4, display: { xs: 'flex', sm: 'flex', md: 'none' } }}
                      color='primary'
                      variant='contained'
                      endIcon={<TaskAlt />}
                    >
                      {loading ? (
                        <CircularProgress size={25} color='inherit' />
                      ) : (
                        <Typography sx={{ color: 'white' }} component='h6' variant='nav' textAlign='center'>
                          Confirm{typeValue === 1 && ' Pickup'}
                        </Typography>
                      )}
                    </Button>
                  </Stack>
                </Stack>
                <Box sx={{ display: { xs: 'block', sm: 'none', md: 'none' }, pb: 3 }}>
                  <Typography component='h6' variant='h6' sx={{ color: 'text.primary', pb: 2, textAlign: 'center' }}>
                    Select items now or at pickup
                  </Typography>
                  <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                    <Button
                      onClick={() => {
                        setActiveStep(1);
                        window.scrollTo(0, 0);
                      }}
                      sx={{ px: 2 }}
                      color='primary'
                      variant='contained'
                      startIcon={<ArrowBack />}
                    >
                      {loading ? (
                        <CircularProgress size={25} color='inherit' />
                      ) : (
                        <Typography
                          sx={{ color: 'white' }}
                          className='text-white-imp'
                          component='h6'
                          variant='nav'
                          textAlign='center'
                        >
                          Back
                        </Typography>
                      )}
                    </Button>
                    <Button
                      onClick={() => {
                        bookOrder();
                      }}
                      size='large'
                      sx={{ px: 2 }}
                      color='primary'
                      variant='contained'
                      endIcon={<TaskAlt />}
                    >
                      {loading ? (
                        <CircularProgress size={25} color='inherit' />
                      ) : (
                        <Typography sx={{ color: 'white' }} component='h6' variant='nav' textAlign='center'>
                          Confirm{typeValue === 1 && ' Pickup'}
                        </Typography>
                      )}
                    </Button>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    borderBottom: 1,
                    borderColor: 'divider',
                    background: '#eaeaf0',
                    borderTopLeftRadius: '15px',
                    borderTopRightRadius: '15px',
                  }}
                >
                  <Tabs
                    sx={{
                      '& .MuiTabs-flexContainer': {
                        justifyContent: 'center',
                      },
                      display: { xs: 'none', sm: 'flex' },
                    }}
                    value={typeValue}
                    onChange={handleChange}
                  >
                    <Tab
                      sx={{ width: '50%', fontSize: { xs: 14, sm: 18 }, fontWeight: 'bold', py: 2.5 }}
                      icon={<AssignmentTurnedIn sx={{ fontSize: { xs: 25, sm: 35 } }} />}
                      iconPosition='start'
                      label='Select Exact Items for Upfront Pricing'
                    />
                    <Tab
                      sx={{ width: '50%', fontSize: { xs: 14, sm: 18 }, fontWeight: 'bold' }}
                      icon={<AssignmentLate sx={{ fontSize: { xs: 25, sm: 35 } }} />}
                      iconPosition='start'
                      label='Confirm Items and Weight During Pickup'
                    />
                  </Tabs>
                  <Tabs
                    sx={{
                      '& .MuiTabs-flexContainer': {
                        justifyContent: 'center',
                      },
                      display: { xs: 'flex', sm: 'none' },
                    }}
                    value={typeValue}
                    onChange={handleChange}
                  >
                    <Tab
                      sx={{ width: '50%', fontSize: { xs: 15, sm: 18 }, fontWeight: 'bold', py: 2.5 }}
                      icon={<AssignmentTurnedIn sx={{ fontSize: { xs: 25, sm: 35 } }} />}
                      iconPosition='start'
                      label='Select Items Now'
                    />
                    <Tab
                      sx={{ width: '50%', fontSize: { xs: 15, sm: 18 }, fontWeight: 'bold' }}
                      icon={<AssignmentLate sx={{ fontSize: { xs: 25, sm: 35 } }} />}
                      iconPosition='start'
                      label='Confirm Items At Pickup'
                    />
                  </Tabs>
                </Box>
                {servicesLoaded ? (
                  <>
                    {typeValue === 0 ? (
                      <>
                        {services.map((item, index) => (
                          <Box
                            sx={{
                              backgroundColor: '#ededed',
                              borderRadius: '15px',
                              mt: 5,
                              px: 2,
                            }}
                            key={item.id}
                          >
                            {item.isItem ? (
                              <Box sx={{ pr: 0, pl: 0 }}>
                                <Grid
                                  container
                                  alignItems='center'
                                  justifyContent='center'
                                  spacing={2.5}
                                  sx={{
                                    pb: 1,
                                    '& .MuiGrid-item': {
                                      pt: 1,
                                    },
                                  }}
                                >
                                  <Grid
                                    style={{ paddingLeft: 0 }}
                                    sx={{ textAlign: 'start' }}
                                    item
                                    xs={2.5}
                                    sm={2}
                                    md={2}
                                    lg={1.5}
                                  >
                                    <img className='checkout-icon' src={item.pic2} alt='new' />
                                  </Grid>
                                  <Grid sx={{ textAlign: 'start' }} item xs={5.5} sm={8} md={8} lg={8.5}>
                                    <Typography variant='title' component='h6'>
                                      {item.name}
                                    </Typography>
                                    <Typography variant='title' component='h6'>
                                      $ {Number(item.currentPrice).toFixed(2)} / lbs
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    sx={{ pr: { xs: 0.5, sm: 0.5 }, py: 0.5 }}
                                    style={{ paddingLeft: 0 }}
                                    item
                                    xs={4}
                                    sm={2}
                                    md={2}
                                    lg={2}
                                  >
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        width: '90px',
                                        ml: 'auto',
                                        pr: '10px',
                                      }}
                                    >
                                      <TextField
                                        inputProps={{
                                          type: 'number',
                                          maxLength: 3,
                                        }}
                                        inputRef={(el) => (itemsRef.current[index] = el)}
                                        ref={(el) => (textFieldsRef.current[index] = el)}
                                        id='weight'
                                        name='weight'
                                        label='Weight'
                                        fullWidth
                                        variant='standard'
                                        onKeyUp={(e) => {
                                          if (e.key === 'Enter') {
                                            e.target.blur();
                                          } else if (e.key !== 'Backspace') {
                                            if (e.target.value.length > 3) {
                                              e.target.value = e.target.value.split('').slice(0, 3).join('');
                                            }
                                            var validkeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
                                            if (validkeys.indexOf(e.key) < 0) {
                                              if (item.units > 0) {
                                                e.target.value = item.units;
                                              } else {
                                                e.target.value = '';
                                              }
                                            }
                                          }
                                        }}
                                        onKey
                                        onChange={(e) => {
                                          setTimeout(() => {
                                            handleWeightChange(e.target.value, item, index);
                                          }, 350);
                                        }}
                                        InputLabelProps={{
                                          sx: {
                                            fontSize: { xs: 15, sm: 15, md: 15 },
                                            color: 'grey',
                                            marginTop: { xs: '4px', sm: '5px', md: '5px' },
                                          },
                                        }}
                                        InputProps={{
                                          endAdornment: (
                                            <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                                              lb
                                            </Typography>
                                          ),
                                          sx: {
                                            fontSize: { xs: 18, sm: 18, md: 18 },
                                          },
                                        }}
                                      />
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Box>
                            ) : (
                              <Box sx={{ pr: 0, pl: 0 }}>
                                <Grid
                                  onClick={() => {
                                    let itemObj = { ...item };
                                    itemObj.isExpanded = !itemObj.isExpanded;
                                    let servicesObj = [...services];
                                    servicesObj[index] = itemObj;
                                    setServices(servicesObj);
                                  }}
                                  container
                                  alignItems='center'
                                  justifyContent='center'
                                  spacing={2.5}
                                  sx={{
                                    pb: 2,
                                    '& .MuiGrid-item': {
                                      pt: 2,
                                    },
                                  }}
                                >
                                  <Grid
                                    style={{ paddingLeft: 0 }}
                                    sx={{ textAlign: 'start' }}
                                    item
                                    xs={2.5}
                                    sm={2}
                                    md={2}
                                    lg={1.5}
                                  >
                                    <img className='checkout-icon' src={item.pic2} alt='new' />
                                  </Grid>
                                  <Grid sx={{ textAlign: 'start' }} item xs={5.5} sm={7} md={7} lg={7}>
                                    <Typography variant='title' component='h6'>
                                      {item.name}
                                    </Typography>
                                  </Grid>
                                  <Grid sx={{ textAlign: 'end' }} item xs={4} sm={3} md={3} lg={3.5}>
                                    <IconButton>
                                      {!item.isExpanded && <KeyboardArrowDown sx={{ fontSize: 40 }} />}
                                      {item.isExpanded && <KeyboardArrowUp sx={{ fontSize: 40 }} />}
                                    </IconButton>
                                  </Grid>
                                </Grid>
                                <Box sx={{ pr: 0, pl: 2, pb: item.isExpanded ? 1 : 0 }}>
                                  {item.isExpanded &&
                                    item.items &&
                                    item.items.length &&
                                    item.items.map((serviceItem, serviceItemIndex) => (
                                      <Box
                                        key={serviceItemIndex}
                                        sx={{ pl: { xs: 0.5, sm: 2, md: 3 }, pr: { xs: 0, sm: 1.5, md: 2.5 } }}
                                      >
                                        <Grid
                                          key={'item' + serviceItemIndex}
                                          container
                                          alignItems='center'
                                          justifyContent='center'
                                          spacing={2.5}
                                          sx={{
                                            my: 2,
                                            pb: 1,
                                            backgroundColor: 'white',
                                            borderRadius: '15px',
                                            '& .MuiGrid-item': {
                                              pt: 1,
                                            },
                                          }}
                                        >
                                          <Grid
                                            style={{ paddingTop: 0, paddingLeft: 0 }}
                                            sx={{ textAlign: 'start' }}
                                            item
                                            xs={2}
                                            sm={2}
                                            md={2}
                                            lg={1.5}
                                          >
                                            <img className='checkout-icon-mini' src={serviceItem.pic} alt='new' />
                                          </Grid>
                                          <Grid
                                            style={{ paddingTop: 0, paddingLeft: '4px' }}
                                            sx={{ textAlign: 'start' }}
                                            item
                                            xs={6}
                                            sm={6}
                                            md={6}
                                            lg={6.5}
                                          >
                                            <Typography sx={{ fontWeight: 'bold' }} variant='subtitle1' component='h6'>
                                              {serviceItem.name}
                                            </Typography>
                                            {serviceItem.currentPrice && (
                                              <Typography sx={{ fontWeight: 'bold' }} variant='subtitle1' component='h6'>
                                                $ {Number(serviceItem.currentPrice).toFixed(2)}
                                              </Typography>
                                            )}
                                            {serviceItem.startingPrice && !serviceItem.currentPrice && (
                                              <>
                                                <Typography sx={{ fontWeight: 'bold' }} variant='subtitle1' component='h6'>
                                                  <Typography
                                                    sx={{
                                                      color: 'primary.main',
                                                      fontWeight: 'bold',
                                                      display: { xs: 'block', sm: 'inline' },
                                                    }}
                                                    variant='body2'
                                                  >
                                                    Starting from
                                                  </Typography>{' '}
                                                  $ {Number(serviceItem.startingPrice).toFixed(2)}
                                                </Typography>
                                                <Typography
                                                  sx={{
                                                    fontWeight: 'bold',
                                                    textAlign: 'left',
                                                    display: { xs: 'none', sm: 'none', md: 'block' },
                                                  }}
                                                  variant='body1'
                                                  component='h6'
                                                >
                                                  *{serviceItem.note}
                                                </Typography>
                                              </>
                                            )}
                                          </Grid>
                                          <Grid
                                            style={{ paddingLeft: 0, paddingTop: 0 }}
                                            sx={{ pr: { xs: 2, sm: 2 } }}
                                            item
                                            xs={4}
                                            sm={4}
                                            md={4}
                                            lg={4}
                                          >
                                            <Typography
                                              sx={{
                                                mx: { xs: 0, sm: 1 },
                                                textAlign: 'right',
                                                color: 'secondary',
                                                fontWeight: 'bold',
                                              }}
                                              variant='title'
                                              component='h6'
                                            >
                                              x {serviceItem.units}
                                            </Typography>
                                            <Box
                                              sx={{
                                                width: 'fit-content',
                                                ml: 'auto',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: { xs: 0.5, sm: 1, md: 1 },
                                              }}
                                            >
                                              <IconButton
                                                size='small'
                                                sx={{
                                                  borderRadius: '5px',
                                                  mt: 1,
                                                  ml: 1,
                                                  backgroundColor: 'grey',
                                                  color: 'text.white',
                                                  display: { md: 'none' },
                                                }}
                                                onClick={() => {
                                                  if (serviceItem.units > 0) {
                                                    let serviceItemObj = { ...serviceItem };
                                                    let itemObj = { ...item };
                                                    serviceItemObj.units = serviceItemObj.units - 1;
                                                    itemObj.items[serviceItemIndex] = serviceItemObj;
                                                    let servicesObj = [...services];
                                                    servicesObj[index] = itemObj;
                                                    setServices(servicesObj);
                                                    removeFromCart(serviceItemObj);
                                                  }
                                                }}
                                              >
                                                <Remove sx={{ fontSize: 20 }} />
                                              </IconButton>
                                              <IconButton
                                                size='small'
                                                sx={{
                                                  borderRadius: '5px',
                                                  mt: 1,
                                                  ml: 1,
                                                  backgroundColor: 'primary.main',
                                                  color: 'text.white',
                                                  display: { md: 'none' },
                                                }}
                                                onClick={() => {
                                                  if (serviceItem.units < 100) {
                                                    let serviceItemObj = { ...serviceItem };
                                                    let itemObj = { ...item };
                                                    serviceItemObj.units = serviceItemObj.units + 1;
                                                    itemObj.items[serviceItemIndex] = serviceItemObj;
                                                    let servicesObj = [...services];
                                                    servicesObj[index] = itemObj;
                                                    setServices(servicesObj);
                                                    addToCart(serviceItemObj);
                                                  }
                                                }}
                                              >
                                                <Add sx={{ fontSize: 20 }} />
                                              </IconButton>
                                              <IconButton
                                                size='medium'
                                                sx={{
                                                  borderRadius: '5px',
                                                  mt: 1,
                                                  ml: 1,
                                                  backgroundColor: 'grey',
                                                  color: 'text.white',
                                                  display: { xs: 'none', sm: 'none', md: 'flex' },
                                                }}
                                                onClick={() => {
                                                  if (serviceItem.units > 0) {
                                                    let serviceItemObj = { ...serviceItem };
                                                    let itemObj = { ...item };
                                                    serviceItemObj.units = serviceItemObj.units - 1;
                                                    itemObj.items[serviceItemIndex] = serviceItemObj;
                                                    let servicesObj = [...services];
                                                    servicesObj[index] = itemObj;
                                                    setServices(servicesObj);
                                                    removeFromCart(serviceItemObj);
                                                  }
                                                }}
                                              >
                                                <Remove sx={{ fontSize: 25 }} />
                                              </IconButton>
                                              <IconButton
                                                size='medium'
                                                sx={{
                                                  borderRadius: '5px',
                                                  mt: 1,
                                                  ml: 1,
                                                  backgroundColor: 'primary.main',
                                                  color: 'text.white',
                                                  display: { xs: 'none', sm: 'none', md: 'flex' },
                                                }}
                                                onClick={() => {
                                                  if (serviceItem.units < 100) {
                                                    let serviceItemObj = { ...serviceItem };
                                                    let itemObj = { ...item };
                                                    serviceItemObj.units = serviceItemObj.units + 1;
                                                    itemObj.items[serviceItemIndex] = serviceItemObj;
                                                    let servicesObj = [...services];
                                                    servicesObj[index] = itemObj;
                                                    setServices(servicesObj);
                                                    addToCart(serviceItemObj);
                                                  }
                                                }}
                                              >
                                                <Add sx={{ fontSize: 25 }} />
                                              </IconButton>
                                            </Box>
                                          </Grid>
                                          {serviceItem.note && (
                                            <Grid
                                              style={{ paddingTop: 0 }}
                                              sx={{
                                                pl: { xs: 1, sm: 2, md: 10 },
                                                display: { xs: 'block', sm: 'block', md: 'none' },
                                              }}
                                              item
                                              xs={12}
                                              sm={12}
                                              md={12}
                                            >
                                              <Typography
                                                sx={{
                                                  fontWeight: 'bold',
                                                  textAlign: { xs: 'left', sm: 'left', md: 'center' },
                                                }}
                                                variant='body1'
                                                component='h6'
                                              >
                                                *{serviceItem.note}
                                              </Typography>
                                            </Grid>
                                          )}
                                        </Grid>
                                      </Box>
                                    ))}
                                </Box>
                              </Box>
                            )}
                          </Box>
                        ))}
                      </>
                    ) : (
                      <>
                        <Grid container alignItems='center' justifyContent='center' spacing={5} sx={{ pt: 4, pb: 4 }}>
                          {services.map((serviceItem, index) => (
                            <Grid item xs={6} sm={6} md={4} key={index} sx={{ height: 'auto' }}>
                              <div
                                onClick={() => selectUnselectService(serviceItem.id)}
                                style={{ height: '100%', position: 'relative', cursor: 'pointer' }}
                              >
                                <Card
                                  sx={[
                                    {
                                      py: 2,
                                    },
                                    (theme) => ({
                                      boxShadow: `0 3px 12px hsla(210, 98%, 42%, 0.2)`,
                                      ...theme.applyStyles('dark', {
                                        boxShadow: `0 3px 12px hsla(0, 0%, 0%, 0.8)`,
                                      }),
                                    }),
                                  ]}
                                >
                                  <Box
                                    className='icon-box'
                                    sx={[
                                      {
                                        alignContent: 'center',
                                        borderRadius: '50%',
                                      },
                                      (theme) => ({
                                        backgroundColor: theme.palette.mode === 'light' ? 'transparent' : 'white',
                                        ...theme.applyStyles('dark', {
                                          boxShadow: `0 0 12px hsla(0, 0%, 0%, 0.8)`,
                                        }),
                                      }),
                                    ]}
                                  >
                                    <img
                                      style={{
                                        height: '45px',
                                        marginRight: 'auto',
                                        marginLeft: 'auto',
                                      }}
                                      src={serviceItem.pic2}
                                      alt='new'
                                    />
                                  </Box>
                                  <Typography
                                    sx={{
                                      mt: 1.5,
                                      typography: { xs: 'h6', sm: 'h6', md: 'h6' },
                                      color: 'text.secondary',
                                      textAlign: 'center',
                                    }}
                                    component='h6'
                                    className='card-typo'
                                  >
                                    {serviceItem.name}
                                  </Typography>
                                </Card>
                                {selectedServices.indexOf(serviceItem.id) > -1 && (
                                  <IconButton sx={{ position: 'absolute', top: 5, right: 5, marginLeft: 'auto' }}>
                                    <CheckCircle sx={{ fontSize: 35 }}></CheckCircle>
                                  </IconButton>
                                )}
                              </div>
                            </Grid>
                          ))}
                        </Grid>
                      </>
                    )}
                  </>
                ) : null}
                {typeValue === 0 && (
                  <Button
                    endIcon={<TaskAlt />}
                    onClick={bookOrder}
                    sx={{ mt: 4, px: 4, display: { xs: 'none', sm: 'none' } }}
                    color='primary'
                    variant='contained'
                  >
                    {loading ? (
                      <CircularProgress size={25} color='inherit' />
                    ) : (
                      <Typography sx={{ color: 'white' }} component='h6' variant='nav' textAlign='center'>
                        Confirm{typeValue === 1 && ' Pickup'}
                      </Typography>
                    )}
                  </Button>
                )}
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: { xs: '100%', sm: '100%', md: '100%', lg: '35%' },
              mt: { xs: 5, sm: 5, md: 2 },
              px: { xs: 1, sm: 2.5, md: 5, lg: 2 },
              ml: 'auto',
              mr: '2.5%',
            }}
          >
            <List sx={{ width: '100%', bgcolor: 'hsla(205, 100%, 50%, 0.1)', borderRadius: '15px' }}>
              <Stepper
                sx={{ py: 2, display: { xs: 'none', sm: 'none', md: 'flex' } }}
                alternativeLabel
                activeStep={activeStep}
                connector={<ColorlibConnector />}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      sx={{
                        cursor: 'pointer',
                        '& .MuiStepLabel-labelContainer span': {
                          fontSize: 18,
                          fontWeight: 'bold',
                        },
                      }}
                      onClick={() => {
                        if (label === 'Address') {
                          setActiveStep(0);
                        }
                        if (label === 'Date' && addressSelected) {
                          setActiveStep(1);
                          setIsSlotStepEnabled(true);
                        }
                        window.scrollTo(0, 0);
                      }}
                      StepIconComponent={ColorlibStepIcon}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Typography
                sx={{ py: 2, color: 'text.primary', display: { xs: 'block', sm: 'block', md: 'none' } }}
                variant='h6'
                textAlign='center'
              >
                -- Summary --
              </Typography>
              <ListItem
                sx={{ height: '100px' }}
                secondaryAction={
                  <IconButton
                    onClick={() => {
                      setActiveStep(0);
                      window.scrollTo(0, 0);
                    }}
                    edge='end'
                    aria-label='delete'
                  >
                    <Edit />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
                    }}
                  >
                    <PersonPin />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primaryTypographyProps={{ variant: 'subtitle1' }}
                  secondaryTypographyProps={{ variant: 'subtitle1' }}
                  primary='Address'
                  secondary={selectedAddress > -1 ? getFormattedAddress(selectedAddress) : ''}
                />
              </ListItem>
              {isSlotStepEnabled && (
                <ListItem
                  sx={{ height: '100px' }}
                  secondaryAction={
                    <>
                      {addressSelected && (
                        <IconButton
                          onClick={() => {
                            setActiveStep(1);
                            setIsSlotStepEnabled(false);
                            window.scrollTo(0, 0);
                          }}
                          edge='end'
                          aria-label='delete'
                        >
                          <Edit />
                        </IconButton>
                      )}
                    </>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
                      }}
                    >
                      <DateRange />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primaryTypographyProps={{ variant: 'subtitle1' }}
                    secondaryTypographyProps={{ variant: 'subtitle1' }}
                    primary='Date'
                    secondary={
                      (selectedDate ? `${moment(selectedDate).format('ddd DD, MMM YYYY')} ` : '') +
                      (selectedSlot ? `${selectedSlot}` : '')
                    }
                  />
                </ListItem>
              )}
              {isServicesStepEnabled && (
                <>
                  <ListItem
                    sx={{ mt: 1, pb: 2 }}
                    secondaryAction={
                      <>
                        {deliverySelected && (
                          <IconButton
                            ref={confirmRef}
                            onClick={() => {
                              setActiveStep(2);
                              setIsServicesStepEnabled(true);
                              window.scrollTo(0, 0);
                            }}
                            edge='end'
                            aria-label='delete'
                          >
                            <Edit />
                          </IconButton>
                        )}
                      </>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          background: 'radial-gradient(circle at 50% 0%, hsl(205, 98%, 35%), hsl(205, 100%, 16%))',
                        }}
                      >
                        <DryCleaning />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primaryTypographyProps={{ variant: 'subtitle1' }}
                      secondaryTypographyProps={{ variant: 'subtitle1' }}
                      primary={typeValue === 0 ? 'Items' : 'Services'}
                      secondary={
                        typeValue === 0
                          ? null
                          : selectedServices
                              .reverse()
                              .map((i) => services[services.findIndex((x) => x.id === i)].name)
                              .join(', ')
                      }
                    />
                  </ListItem>
                  {typeValue === 0 &&
                    cart
                      .sort((a, b) => a.order - b.order)
                      .map((item, index) => (
                        <Box key={index} sx={{ pl: 4.5, pr: 2.5 }}>
                          <Grid container alignItems='center' justifyContent='center' spacing={1}>
                            <Grid sx={{ textAlign: 'start' }} item xs={7} sm={7} md={7}>
                              <Typography sx={{ color: 'text.secondary' }} variant='subtitle1' component='h6'>
                                {item.name}{' '}
                                <b>
                                  ({item.units}
                                  {item.isItem && ' lbs'})
                                </b>
                              </Typography>
                            </Grid>
                            <Grid item xs={5} sm={5} md={5}>
                              <Box
                                sx={{
                                  width: 'fit-content',
                                  ml: 'auto',
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}
                              >
                                {item.currentPrice && (
                                  <Typography sx={{ color: 'text.secondary' }} variant='subtitle1' component='h6'>
                                    $ {(Number(item.currentPrice) * item.units).toFixed(2)}
                                  </Typography>
                                )}
                                {item.startingPrice && !item.currentPrice && (
                                  <Typography sx={{ color: 'text.secondary' }} variant='subtitle1' component='h6'>
                                    ~ $ {(Number(item.startingPrice) * item.units).toFixed(2)}
                                  </Typography>
                                )}
                              </Box>
                            </Grid>
                          </Grid>
                          {item.startingPrice && !item.currentPrice && item.note && (
                            <Typography
                              sx={{ color: 'text.secondary', textAlign: 'left', pt: 0.5, fontWeight: 'bold' }}
                              variant='body1'
                              component='h6'
                            >
                              {item.note}
                            </Typography>
                          )}
                        </Box>
                      ))}
                  {typeValue === 0 && isFirstOrderDiscount && (
                    <Grid container alignItems='center' justifyContent='center' spacing={1} sx={{ pl: 4.5, pr: 2.5 }}>
                      <Grid sx={{ textAlign: 'start' }} item xs={7} sm={7} md={7}>
                        <Typography sx={{ color: 'text.secondary' }} variant='subtitle1' component='h6'>
                          Sub Total
                        </Typography>
                      </Grid>
                      <Grid item xs={5} sm={5} md={5}>
                        <Box
                          sx={{
                            width: 'fit-content',
                            ml: 'auto',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Typography sx={{ color: 'text.secondary' }} variant='subtitle1' component='h6'>
                            $ {Number(amount).toFixed(2)}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  )}
                  {typeValue === 0 && isFirstOrderDiscount && (
                    <Grid container alignItems='center' justifyContent='center' spacing={1} sx={{ pl: 4.5, pr: 2.5 }}>
                      <Grid sx={{ textAlign: 'start' }} item xs={5} sm={5} md={5}>
                        <Typography sx={{ color: 'text.secondary' }} variant='subtitle1' component='h6'>
                          Discount
                        </Typography>
                      </Grid>
                      <Grid item xs={7} sm={7} md={7}>
                        <Box
                          sx={{
                            width: 'fit-content',
                            ml: 'auto',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Typography sx={{ color: 'text.secondary' }} variant='subtitle1' component='h6'>
                            <Typography
                              sx={{
                                color: 'text.secondary',
                                textDecoration: 'underline',
                                display: 'inline',
                              }}
                              variant='subtitle1'
                            >
                              FIRSTORDER
                            </Typography>{' '}
                            ({firstOrderDiscount}%)
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  )}
                  {typeValue === 0 && (
                    <Grid container alignItems='center' justifyContent='center' spacing={1} sx={{ pl: 4.5, pr: 2.5 }}>
                      <Grid sx={{ textAlign: 'start' }} item xs={7} sm={7} md={7}>
                        <Typography sx={{ color: 'text.secondary', fontWeight: 'bold' }} variant='subtitle1' component='h6'>
                          Total
                        </Typography>
                      </Grid>
                      <Grid item xs={5} sm={5} md={5}>
                        <Box
                          sx={{
                            width: 'fit-content',
                            ml: 'auto',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Typography
                            sx={{ color: 'text.secondary', fontWeight: 'bold' }}
                            variant='subtitle1'
                            component='h6'
                          >
                            ${' '}
                            {Number(
                              isFirstOrderDiscount
                                ? amount -
                                    ((amount * firstOrderDiscount) / 100 > maximumDiscount
                                      ? maximumDiscount
                                      : (amount * firstOrderDiscount) / 100)
                                : amount
                            ).toFixed(2)}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  )}
                  {typeValue === 0 && (
                    <Typography
                      sx={{
                        pl: 4.5,
                        pr: 2.5,
                        pb: 2,
                        color: 'text.secondary',
                        textAlign: 'left',
                        textDecoration: 'underline',
                        fontWeight: 'bold',
                      }}
                      variant='subtitle1'
                      component='p'
                    >
                      {Number(
                        isFirstOrderDiscount
                          ? amount -
                              ((amount * firstOrderDiscount) / 100 > maximumDiscount
                                ? maximumDiscount
                                : (amount * firstOrderDiscount) / 100)
                          : amount
                      ) < minimumOrderAmount && `*A minimum order of $${minimumOrderAmount} is required for all purchases.`}
                      {Number(
                        isFirstOrderDiscount
                          ? amount -
                              ((amount * firstOrderDiscount) / 100 > maximumDiscount
                                ? maximumDiscount
                                : (amount * firstOrderDiscount) / 100)
                          : amount
                      ) >= minimumOrderAmount &&
                        Number(
                          isFirstOrderDiscount
                            ? amount -
                                ((amount * firstOrderDiscount) / 100 > maximumDiscount
                                  ? maximumDiscount
                                  : (amount * firstOrderDiscount) / 100)
                            : amount
                        ) < deliveryOfferAmount &&
                        `*Spend $${deliveryOfferAmount} and receive your delivery benefits on us.`}
                      {Number(
                        isFirstOrderDiscount
                          ? amount -
                              ((amount * firstOrderDiscount) / 100 > maximumDiscount
                                ? maximumDiscount
                                : (amount * firstOrderDiscount) / 100)
                          : amount
                      ) >= deliveryOfferAmount &&
                        `*Congratulations! Your $${deliveryOfferAmount} order has unlocked complimentary delivery benefits.`}
                    </Typography>
                  )}
                </>
              )}
              {activeStep === 0 && (
                <Button
                  size='large'
                  endIcon={<ArrowForward />}
                  onClick={completeAddress}
                  sx={{ mt: 2, mb: 2, px: 4 }}
                  color='primary'
                  variant='contained'
                >
                  {loading ? (
                    <CircularProgress size={25} color='inherit' />
                  ) : (
                    <Typography sx={{ color: 'white' }} component='h6' variant='nav' textAlign='center'>
                      Next
                    </Typography>
                  )}
                </Button>
              )}
              {activeStep === 1 && (
                <Button
                  size='large'
                  endIcon={<ArrowForward />}
                  onClick={completeDelivery}
                  sx={{ mt: 2, mb: 2, px: 4 }}
                  color='primary'
                  variant='contained'
                >
                  {loading ? (
                    <CircularProgress size={25} color='inherit' />
                  ) : (
                    <Typography sx={{ color: 'white' }} component='h6' variant='nav' textAlign='center'>
                      Next
                    </Typography>
                  )}
                </Button>
              )}
              {activeStep === 2 && (
                <Button
                  size='large'
                  endIcon={<TaskAlt />}
                  onClick={bookOrder}
                  sx={{ mt: 2, mb: 2, px: 4 }}
                  color='primary'
                  variant='contained'
                >
                  {loading ? (
                    <CircularProgress size={25} color='inherit' />
                  ) : (
                    <Typography sx={{ color: 'white' }} component='h6' variant='nav' textAlign='center'>
                      Confirm{typeValue === 1 && ' Pickup'}
                    </Typography>
                  )}
                </Button>
              )}
            </List>
          </Box>
        </Box>
      </Box>
      <Modal
        open={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div>
          <ConfirmOrder
            closeModal={closeConfirmDialog}
            orderConfirmed={orderConfirmed}
            address={addresses[selectedAddress]}
            addressNotes={addressNotes}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            cart={cart}
            amount={amount}
            services={services}
            selectedServices={selectedServices}
            typeValue={typeValue}
            isFirstOrderDiscount={isFirstOrderDiscount}
            setIsLoggedIn={props.setIsLoggedIn}
            setUser={props.setUser}
            navigate={navigate}
          ></ConfirmOrder>
        </div>
      </Modal>
      <Snackbar
        sx={{
          marginBottom: 5,
          '& .MuiAlert-root': {
            alignItems: 'center',
            backgroundColor: '#C80815',
          },
          '& .MuiAlert-icon': {
            fontSize: 25,
            color: 'white',
          },
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!!slotError}
        key={'bottomcenter1'}
      >
        <Alert icon={<Error fontSize='inherit' />} variant='filled' sx={{ width: '100%' }}>
          <Typography sx={{ color: 'white', fontWeight: 'bold' }} variant='subtitle1'>
            {slotError}
            <Typography
              sx={{ color: 'white', fontWeight: 'bold', display: { xs: 'inline', sm: 'none', md: 'none' } }}
              variant='subtitle1'
            >
              {' - '}Scroll down to view options.
            </Typography>
          </Typography>
        </Alert>
      </Snackbar>
      <Snackbar
        sx={{
          marginBottom: 5,
          '& .MuiAlert-root': {
            alignItems: 'center',
            backgroundColor: '#C80815',
          },
          '& .MuiAlert-icon': {
            fontSize: 25,
            color: 'white',
          },
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!!itemsError}
        key={'bottomcenter2'}
      >
        <Alert icon={<Error fontSize='inherit' />} variant='filled' sx={{ width: '100%' }}>
          <Typography sx={{ color: 'white', fontWeight: 'bold' }} variant='subtitle1'>
            {itemsError}
          </Typography>
        </Alert>
      </Snackbar>
      <Snackbar
        sx={{
          marginBottom: 5,
          '& .MuiAlert-root': {
            alignItems: 'center',
            backgroundColor: '#C80815',
          },
          '& .MuiAlert-icon': {
            fontSize: 25,
            color: 'white',
          },
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={!!servicesError}
        key={'bottomcenter3'}
      >
        <Alert icon={<Error fontSize='inherit' />} variant='filled' sx={{ width: '100%' }}>
          <Typography sx={{ color: 'white', fontWeight: 'bold' }} variant='subtitle1'>
            {servicesError}
          </Typography>
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default BookOrder;
