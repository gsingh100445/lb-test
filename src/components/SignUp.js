import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { MuiOtpInput } from 'mui-one-time-password-input';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputLabel,
  Modal,
  Snackbar,
  TextField,
  ThemeProvider,
  createTheme,
  Typography,
  Stack,
  Alert,
} from '@mui/material';
import { getError, post } from '../utils/api_base';
import { useNavigate, useSearchParams } from 'react-router-dom';
import banner4 from '../assets/images/banner-4.webp';
import { AddLocation, Edit, Error, LocationOn, Mail, Person, Phone } from '@mui/icons-material';
import AddressPicker from '../Modals/AddressPicker';
import getLPTheme from '../getLPTheme';

export function matchIsNumeric(text) {
  const isNumber = typeof text === 'number';
  const isString = typeof text === 'string';
  return (isNumber || (isString && text !== '')) && !isNaN(Number(text));
}

export default function SignUp(props) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const otpRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const addressButtonRef = useRef();

  const [mode, setMode] = useState('dark');
  const LPtheme = createTheme(getLPTheme(mode));

  const [otpSent, setOtpSent] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState(null);

  const [isVerified, setIsVerified] = useState(false);

  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState(null);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [address, setAddress] = useState(null);
  const [isAddressAdded, setIsAddressAdded] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [addressError, setAddressError] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Login - Laundry Basket, Laundry & Dry Cleaning, Pickup and Delivery!';
  }, []);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const handleMobileChange = (text) => {
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
    setMobile(cleaned);
    if (cleaned.replace(/[^0-9]/g, '').length === 10) {
      sendOtp(cleaned);
    }
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

  const validateChar = (value, index) => {
    return matchIsNumeric(value);
  };

  useEffect(() => {
    props.setIsLoggedIn(false);
    let res = localStorage.getItem('user');
    const user = JSON.parse(res);
    if (user && user.name && user.addresses && user.addresses.length) {
      if (redirectTo) {
        navigate('/' + redirectTo);
      } else {
        navigate('/');
      }
      props.setIsLoggedIn(true);
    } else if (user && (!user.name || !user.addresses || !user.addresses.length)) {
      navigate('/login');
    }
    if (searchParams.get('redirect')) {
      setRedirectTo(searchParams.get('redirect'));
    }
  }, []);

  const sendOtp = async (number) => {
    let mobileNum = number || mobile;
    if (!mobileNum || mobileNum.replace(/[^0-9]/g, '').length !== 10) {
      setMobileError('Invalid Mobile Number');
      setTimeout(() => {
        setMobileError(null);
      }, 4000);
      return;
    }
    setLoading(true);
    try {
      let user = await post('users/sendOtp', {
        phone: mobileNum.replace(/[^0-9]/g, ''),
      });
      setLoading(false);
      if (user) {
        if (user.isValidated) {
          setIsVerified(true);
        }
        setOtpSent(true);
      } else {
        setApiError(getError(''));
        setTimeout(() => {
          setApiError(null);
        }, 4000);
      }
    } catch (err) {
      setApiError(getError(err));
      setTimeout(() => {
        setApiError(null);
      }, 4000);
      setLoading(false);
    }
  };

  const signUp = async (code) => {
    if (!code) {
      code = otp;
    }
    let isError = false;
    if (!isVerified) {
      if (!email || email.length < 8) {
        setEmailError('Invalid Email');
        setTimeout(() => {
          setEmailError(null);
        }, 5000);
        isError = true;
        if (emailRef.current) {
          emailRef.current.focus();
        }
      }
      let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(email) === false) {
        setEmailError('Invalid Email');
        setTimeout(() => {
          setEmailError(null);
        }, 5000);
        isError = true;
        if (emailRef.current) {
          emailRef.current.focus();
        }
      }
      if (!name || name.length < 3) {
        setNameError('Invalid Name');
        setTimeout(() => {
          setNameError(null);
        }, 5000);
        isError = true;
        if (nameRef.current) {
          nameRef.current.focus();
        }
      }
    }
    if (!code || code.length !== 4) {
      setOtpError('Invalid OTP');
      setOtp('');
      setTimeout(() => {
        setOtpError(null);
      }, 5000);
      isError = true;
      if (
        otpRef.current &&
        otpRef.current.firstElementChild &&
        otpRef.current.firstElementChild.firstElementChild &&
        otpRef.current.firstElementChild.firstElementChild.firstChild &&
        otpRef.current.firstElementChild.firstElementChild.firstChild.focus
      ) {
        otpRef.current.firstElementChild.firstElementChild.firstChild.focus();
      }
    }
    if (isError) {
      return;
    }
    if (!isAddressAdded && !isVerified) {
      setAddressError('Address is Required! Please Add Address');
      setTimeout(() => {
        setAddressError(null);
      }, 5000);
      if (addressButtonRef.current) {
        addressButtonRef.current.focus();
      }
      isError = true;
    }
    if (isError) {
      return;
    }
    setLoading(true);
    let userObj = {
      phone: mobile.replace(/[^0-9]/g, ''),
      otp: code,
    };
    if (!isVerified) {
      userObj.name = name;
      userObj.email = email;
      userObj.addresses = [address];
    }
    try {
      let user = await post('users/confirm', userObj);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('session', JSON.stringify(user.session));
        props.setIsLoggedIn(true);
        props.setUser(user);
        setTimeout(() => {
          if (redirectTo) {
            navigate('/' + redirectTo);
          } else {
            navigate('/');
          }
        }, 100);
      } else {
        setApiError(getError(''));
        setTimeout(() => {
          setApiError(null);
        }, 4000);
      }
      setLoading(false);
    } catch (err) {
      if (err === 'OTP_INVALID') {
        setOtp('');
        setOtpError('Invalid OTP');
        if (
          otpRef.current &&
          otpRef.current.firstElementChild &&
          otpRef.current.firstElementChild.firstElementChild &&
          otpRef.current.firstElementChild.firstElementChild &&
          otpRef.current.firstElementChild.firstElementChild.firstChild &&
          otpRef.current.firstElementChild.firstElementChild.firstChild.focus
        ) {
          otpRef.current.firstElementChild.firstElementChild.firstChild.focus();
        }
      } else {
        setApiError(getError(err));
        setTimeout(() => {
          setApiError(null);
        }, 4000);
      }
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    try {
      let user = await post('users/sendOtp', {
        phone: mobile.replace(/[^0-9]/g, ''),
      });
      setLoading(false);
      if (user) {
        if (user.isValidated) {
          setIsVerified(true);
        }
        setOtpSent(true);
      } else {
        setApiError(getError(''));
        setTimeout(() => {
          setApiError(null);
        }, 4000);
      }
    } catch (err) {
      setApiError(getError(err));
      setTimeout(() => {
        setApiError(null);
      }, 4000);
      setLoading(false);
    }
  };

  const openAddressDialog = () => {
    setTimeout(() => {
      setIsAddressDialogOpen(true);
    });
  };

  const addAddress = (address) => {
    setAddress(address);
    setIsAddressAdded(true);
  };

  const closeAddressDialog = (id) => {
    setIsAddressDialogOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          pt: { xs: otpSent ? '14vh' : '5vh', sm: otpSent ? '14vh' : '5vh', md: '16vh' },
          pb: { xs: otpSent ? '7vh' : 0, sm: otpSent ? '7vh' : 0, md: '8vh' },
          width: '100%',
        }}
      >
        <Container
          id='features'
          sx={{
            width: { xs: '80%', sm: '80%', md: '60%' },
            margin: 'auto',
            py: { xs: 4, sm: 6, md: 6 },
            px: { xs: 2, sm: 4, md: 4 },
            borderRadius: '15px',
            backgroundPosition: 'right',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url(${banner4})`,
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', sm: '90%' },
              margin: 'auto',
              textAlign: 'center',
              pb: 5,
            }}
          >
            <Typography component='h2' variant='h2' sx={{ color: 'text.primary', typography: { xs: 'h3', sm: 'h2' } }}>
              Login / SignUp
            </Typography>
            <Typography component='p' sx={{ color: 'text.white', pt: 1, typography: { xs: 'subtitile1', sm: 'title' } }}>
              To schedule your Laundry Basket pickup and track your order, please log in or create an account. It's quick and
              easy!
            </Typography>
          </Box>
          <ThemeProvider theme={LPtheme}>
            <Grid container spacing={5} justifyContent='center' alignItems='flex-start'>
              <Grid sx={{ height: 'auto' }} item xs={12} sm={isVerified || !otpSent ? 8 : 6} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Phone sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    inputProps={{
                      type: 'tel',
                      readOnly: otpSent || loading,
                      maxLength: 14,
                      style: {
                        paddingLeft: '.3rem',
                      },
                    }}
                    color='primary'
                    id='phone'
                    size='medium'
                    name='phone'
                    label='Mobile'
                    value={mobile}
                    fullWidth
                    InputProps={{
                      style: { fontSize: 17, fontWeight: 'bold', color: '#FFFFFF' },
                    }}
                    onChange={(e) => {
                      handleMobileChange(e.target.value);
                    }}
                    variant='standard'
                    InputLabelProps={{
                      style: { fontSize: 17, color: '#FFFFFF' },
                    }}
                  />
                </Box>
                {mobileError ? (
                  <Box
                    sx={{
                      display: 'flex',
                      textAlign: 'left',
                      justifyContent: 'start',
                      pt: 1,
                      pl: 1,
                    }}
                  >
                    <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>{mobileError}</Typography>
                  </Box>
                ) : null}
                {otpSent && (
                  <Box sx={{ mt: 5 }}>
                    <Box
                      sx={{
                        width: { xs: '100%', sm: '90%' },
                        margin: 'auto',
                        display: 'flex',
                        textAlign: 'start',
                      }}
                    >
                      <InputLabel shrink={true} htmlFor='otp'>
                        <Typography sx={{ fontSize: 17, color: '#FFFFFF' }}>OTP</Typography>
                      </InputLabel>
                    </Box>
                    <Box
                      sx={{
                        width: { xs: '100%', sm: '100%' },
                        margin: 'auto',
                        display: 'flex',
                        textAlign: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <MuiOtpInput
                        ref={otpRef}
                        TextFieldsProps={{
                          type: 'tel',
                          name: 'otp',
                          disabled: loading,
                          placeholder: '-',
                        }}
                        validateChar={validateChar}
                        className='w-full'
                        value={otp}
                        autoFocus
                        sx={{ gap: 3 }}
                        onChange={handleChange}
                        onComplete={(value) => {
                          setOtp(value);
                          if (isVerified) {
                            signUp(value);
                          } else {
                            if (!name.length) {
                              if (nameRef.current) {
                                nameRef.current.focus();
                              }
                            } else if (!email.length) {
                              if (emailRef.current) {
                                emailRef.current.focus();
                              }
                            } else {
                              if (addressButtonRef.current) {
                                addressButtonRef.current.focus();
                              }
                            }
                          }
                        }}
                        length={4}
                      />
                    </Box>
                    {otpError ? (
                      <Box
                        sx={{
                          display: 'flex',
                          textAlign: !isVerified ? 'left' : 'center',
                          justifyContent: !isVerified ? 'start' : 'center',
                          pt: 1,
                          pl: 1,
                        }}
                      >
                        <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>{otpError}</Typography>
                      </Box>
                    ) : null}
                    {!isVerified ? (
                      <>
                        <Box sx={{ mt: 3, display: { xs: 'none', sm: 'block', md: 'none' } }}>
                          <Button
                            size='small'
                            disabled={loading}
                            onClick={resendOtp}
                            color='secondary'
                            variant='contained'
                            sx={{ mt: 2 }}
                          >
                            <Typography variant='body1'>Resend OTP</Typography>
                          </Button>
                          <Button
                            size='small'
                            disabled={loading}
                            onClick={() => {
                              setOtpSent(false);
                              setOtp('');
                              setIsVerified(false);
                              setAddress({ ...address, phone: '' });
                            }}
                            color='secondary'
                            variant='contained'
                            sx={{ mt: 2 }}
                          >
                            <Typography variant='body1'>Change Phone Number</Typography>
                          </Button>
                        </Box>
                        <Stack
                          direction='row'
                          alignItems='center'
                          justifyContent='start'
                          gap={2}
                          sx={{ mt: 3, display: { xs: 'flex', sm: 'none', md: 'flex' } }}
                        >
                          <Button
                            size='small'
                            disabled={loading}
                            onClick={resendOtp}
                            color='secondary'
                            variant='contained'
                            sx={{ mt: 2 }}
                          >
                            <Typography variant='body1'>Resend OTP</Typography>
                          </Button>
                          <Button
                            size='small'
                            disabled={loading}
                            onClick={() => {
                              setOtpSent(false);
                              setOtp('');
                              setIsVerified(false);
                              setAddress({ ...address, phone: '' });
                            }}
                            color='secondary'
                            variant='contained'
                            sx={{ mt: 2 }}
                          >
                            <Typography variant='body1'>Change Phone Number</Typography>
                          </Button>
                        </Stack>
                      </>
                    ) : (
                      <Stack
                        direction='row'
                        alignItems='center'
                        justifyContent={!isVerified ? 'start' : 'center'}
                        gap={2}
                        sx={{ mt: 4 }}
                      >
                        <Button size='small' disabled={loading} onClick={resendOtp} color='secondary' variant='contained'>
                          <Typography variant='body1'>Resend OTP</Typography>
                        </Button>
                        <Button
                          size='small'
                          disabled={loading}
                          onClick={() => {
                            setOtpSent(false);
                            setIsVerified(false);
                          }}
                          color='secondary'
                          variant='contained'
                        >
                          <Typography variant='body1'>Change Phone Number</Typography>
                        </Button>
                      </Stack>
                    )}
                  </Box>
                )}
              </Grid>
              {otpSent && !isVerified && (
                <Grid sx={{ height: 'auto' }} item xs={12} sm={6} md={6}>
                  <Box sx={{ textAlign: 'start' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <Person sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField
                        inputRef={nameRef}
                        inputProps={{
                          type: 'text',
                          readOnly: loading,
                          style: {
                            paddingLeft: '.3rem',
                          },
                        }}
                        color='primary'
                        id='name'
                        size='medium'
                        name='name'
                        label='Name'
                        value={name}
                        fullWidth
                        InputProps={{
                          style: { fontSize: 17, fontWeight: 'bold', color: '#FFFFFF' },
                        }}
                        onKeyUp={(e) => {
                          if (e.key === 'Enter') {
                            if (!email.length) {
                              if (emailRef.current) {
                                emailRef.current.focus();
                              }
                            } else if (!otp.length) {
                              if (
                                otpRef.current &&
                                otpRef.current.firstElementChild &&
                                otpRef.current.firstElementChild.firstElementChild &&
                                otpRef.current.firstElementChild.firstElementChild.firstChild &&
                                otpRef.current.firstElementChild.firstElementChild.firstChild.focus
                              ) {
                                otpRef.current.firstElementChild.firstElementChild.firstChild.focus();
                              }
                            } else {
                              if (addressButtonRef.current) {
                                addressButtonRef.current.focus();
                              }
                            }
                          }
                        }}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        variant='standard'
                        InputLabelProps={{
                          style: { fontSize: 17, color: '#FFFFFF' },
                        }}
                      />
                    </Box>
                    {nameError ? (
                      <Box
                        sx={{
                          display: 'flex',
                          textAlign: 'left',
                          justifyContent: 'start',
                          pt: 1,
                          pl: 1,
                        }}
                      >
                        <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>{nameError}</Typography>
                      </Box>
                    ) : null}
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <Mail sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <TextField
                        inputRef={emailRef}
                        inputProps={{
                          type: 'email',
                          readOnly: loading,
                          style: {
                            paddingLeft: '.3rem',
                          },
                        }}
                        id='email'
                        sx={{ mt: 5 }}
                        name='email'
                        size='medium'
                        label='Email'
                        value={email}
                        fullWidth
                        onKeyUp={(e) => {
                          if (e.key === 'Enter') {
                            if (!name.length) {
                              if (nameRef.current) {
                                nameRef.current.focus();
                              }
                            } else if (!otp.length) {
                              if (
                                otpRef.current &&
                                otpRef.current.firstElementChild &&
                                otpRef.current.firstElementChild.firstElementChild &&
                                otpRef.current.firstElementChild.firstElementChild.firstChild &&
                                otpRef.current.firstElementChild.firstElementChild.firstChild.focus
                              ) {
                                otpRef.current.firstElementChild.firstElementChild.firstChild.focus();
                              }
                            } else {
                              if (addressButtonRef.current) {
                                addressButtonRef.current.focus();
                              }
                            }
                          }
                        }}
                        InputLabelProps={{
                          style: { fontSize: 17, color: '#FFFFFF' },
                        }}
                        InputProps={{
                          style: { fontSize: 17, fontWeight: 'bold', color: '#FFFFFF' },
                        }}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        variant='standard'
                      />
                    </Box>
                    {emailError ? (
                      <Box
                        sx={{
                          display: 'flex',
                          textAlign: 'left',
                          justifyContent: 'start',
                          pt: 1,
                          pl: 1,
                        }}
                      >
                        <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>{emailError}</Typography>
                      </Box>
                    ) : null}
                    {!isAddressAdded ? (
                      <Button
                        ref={addressButtonRef}
                        sx={{ mt: 6, mb: 2 }}
                        color='primary'
                        onClick={openAddressDialog}
                        variant='contained'
                        startIcon={<AddLocation />}
                      >
                        <Typography sx={{ color: 'white' }} component='h6' variant='nav' textAlign='center'>
                          Add Address
                        </Typography>
                      </Button>
                    ) : (
                      <Box
                        alignItems={'center'}
                        sx={{
                          textAlign: 'center',
                          bgcolor: 'model.lite',
                          borderRadius: '15px',
                          boxShadow: 0,
                          p: 2,
                          mt: 2,
                          position: 'relative',
                        }}
                      >
                        <IconButton
                          onClick={() => openAddressDialog()}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            zIndex: 999,
                          }}
                          aria-label='delete'
                          size='large'
                        >
                          <Edit sx={{ fontSize: 17 }} />
                        </IconButton>
                        <Box
                          sx={{
                            width: '100%',
                            textAlign: 'center',
                          }}
                        >
                          <Stack direction='row' alignItems='center' justifyContent={'start'} gap={1}>
                            <LocationOn />
                            <Typography sx={{ color: 'text.secondary', textAlign: 'start', pr: 3 }} variant='body1'>
                              {address.name} - {address.address1}, {address.address2}, {address.city}, {address.state}{' '}
                              {address.zipCode}
                            </Typography>
                          </Stack>
                          {address.phone && (
                            <Stack direction='row' alignItems='center' justifyContent={'start'} gap={1}>
                              <Phone />
                              <Typography sx={{ color: 'text.secondary', textAlign: 'start' }} variant='subtitle2'>
                                {formatMobile(address.phone)}
                              </Typography>
                            </Stack>
                          )}
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Grid>
              )}
            </Grid>
          </ThemeProvider>
          <Box
            sx={{
              width: { xs: '100%', sm: '50%' },
              margin: 'auto',
              textAlign: 'center',
              pb: 4,
            }}
          ></Box>
          <ThemeProvider theme={LPtheme}>
            <div className='text-center pt-1'>
              {otpSent ? (
                <Button
                  sx={{ fontSize: 18, fontWeight: 600, px: 5, mt: 2 }}
                  color='primary'
                  onClick={() => {
                    signUp();
                  }}
                  disabled={loading}
                  variant='contained'
                >
                  {loading ? (
                    <CircularProgress size={25} color='inherit' />
                  ) : isVerified ? (
                    <Typography sx={{ color: 'white' }} component='h6' variant='nav' textAlign='center'>
                      Login
                    </Typography>
                  ) : (
                    <Typography sx={{ color: 'white' }} component='h6' variant='nav' textAlign='center'>
                      Complete SignUp
                    </Typography>
                  )}
                </Button>
              ) : (
                <Button
                  sx={{ fontSize: 18, fontWeight: 600, px: 5, mt: 2 }}
                  color='primary'
                  onClick={() => {
                    sendOtp();
                  }}
                  disabled={loading}
                  variant='contained'
                >
                  {loading ? (
                    <CircularProgress size={25} color='inherit' />
                  ) : (
                    <Typography sx={{ color: 'white' }} component='h6' variant='nav' textAlign='center'>
                      Send OTP
                    </Typography>
                  )}
                </Button>
              )}
            </div>
          </ThemeProvider>
          <Modal
            open={isAddressDialogOpen}
            onClose={() => setIsAddressDialogOpen(false)}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <div>
              <AddressPicker
                tenant={props.tenant}
                closeModal={closeAddressDialog}
                addAddress={addAddress}
                user={{ name: name, phone: mobile }}
              ></AddressPicker>
            </div>
          </Modal>
          <Box sx={{ width: 500 }}>
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
              open={!!addressError}
              key={'bottomcenter3'}
            >
              <Alert icon={<Error fontSize='inherit' />} variant='filled' sx={{ width: '100%' }}>
                <Typography sx={{ color: 'white', fontWeight: 'bold' }} variant='subtitle1'>
                  {addressError}
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
              open={!!apiError}
              key={'bottomcenter4'}
            >
              <Alert icon={<Error fontSize='inherit' />} variant='filled' sx={{ width: '100%' }}>
                <Typography sx={{ color: 'white', fontWeight: 'bold' }} variant='subtitle1'>
                  {apiError}
                </Typography>
              </Alert>
            </Snackbar>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
