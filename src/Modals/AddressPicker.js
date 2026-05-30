import { Box, Button, CircularProgress, Grid, IconButton, InputLabel, Switch, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { updateUser } from '../utils/api_base';
import { CloseRounded, Home, LocationCity, LocationOn, Map, Person, Phone, Signpost } from '@mui/icons-material';
import GooglePlacesInput from '../shared/GooglePlacesInput';

const modalStyle = {
  position: 'absolute',
  width: { xs: '90%', sm: '45%' },
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'model.lite',
  borderRadius: '15px',
  boxShadow: 24,
  px: { xs: 2, sm: 4 },
  py: 2,
};

export default function AddressPicker(props) {
  const googleRef = useRef();
  const address1Ref = useRef();
  const address2Ref = useRef();
  const phoneRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipCodeRef = useRef();
  const nameRef = useRef();

  const [isgoogleEditable, setGoogleEditable] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressId, setAddressId] = useState(null);
  const [userId, setUserId] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const [isDefaultError, setIsDefaultError] = useState(null);
  const [isDefaultOtherExists, setIsDefaultOtherExists] = useState(false);
  const [address1, setAddres1] = useState('');
  const [address1Error, setAddres1Error] = useState(null);
  const [address2, setAddres2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address2Error, setAddres2Error] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [cityError, setCityError] = useState(null);
  const [stateError, setStateError] = useState(null);
  const [zipCodeError, setZipCodeError] = useState(null);
  const [addressString, setAddressString] = useState(null);
  const [country, setCountry] = useState('Canada');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

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
    setPhone(cleaned);
  };

  const makeLocationsErrorString = (arr) => {
    if (!arr || !arr.length) return '';
    if (arr.length === 1) return arr[0];
    const firsts = arr.slice(0, arr.length - 1);
    const last = arr[arr.length - 1];
    return firsts.join(', ') + ' and ' + last + ' only';
  };

  const validateServiceArea = (cleanedZipCode, serviceLocalitiesZipCodes) => {
    const fsa = cleanedZipCode.slice(0, 3).toUpperCase();
    for (const area of serviceLocalitiesZipCodes) {
      if (area.fsas.includes(fsa)) {
        return true;
      }
    }
    return false;
  };

  const getFormattedAddress = (place) => {
    if (!place) {
      return null;
    }
    let location_obj = {
      formatted_address: '',
      locality: '',
      street_number: '',
      admin_area_l1: '',
      route: '',
      country: '',
      sublocality: '',
      postal_code: '',
      latitude: '',
      longitude: '',
    };
    for (let i in place.address_components) {
      let item = place.address_components[i];

      location_obj['formatted_address'] = place.formatted_address || place.name;
      if (item['types'].indexOf('locality') > -1) {
        location_obj['locality'] = item['long_name'];
      } else if (item['types'].indexOf('administrative_area_level_1') > -1) {
        location_obj['admin_area_l1'] = item['long_name'];
      } else if (item['types'].indexOf('street_number') > -1) {
        location_obj['street_number'] = item['long_name'];
      } else if (item['types'].indexOf('route') > -1) {
        location_obj['route'] = item['long_name'];
      } else if (item['types'].indexOf('country') > -1) {
        location_obj['country'] = item['long_name'];
      } else if (item['types'].indexOf('postal_code') > -1) {
        location_obj['postal_code'] = item['long_name'];
      } else if (item['types'].indexOf('sublocality') > -1) {
        location_obj['sublocality'] = item['long_name'];
      }
    }

    if (props.tenant.serviceLocalities.indexOf(location_obj['locality']) < 0) {
      setZipCodeError(
        `We are currently serving ${makeLocationsErrorString(
          props.tenant.serviceLocalitiesError || props.tenant.serviceLocalities
        )}. We look forward to reaching your area as we continue to grow. Thank you for your patience and support!`
      );
      setTimeout(() => {
        setZipCodeError(null);
      }, 10000);
      return;
    }

    if (place.geometry && place.geometry.location) {
      location_obj.latitude = place.geometry.location.lat();
      location_obj.longitude = place.geometry.location.lng();
    }

    return location_obj;
  };

  const getFormattedLocationAddress = (results) => {
    let location_obj = {
      formatted_address: '',
      locality: '',
      street_number: '',
      admin_area_l1: '',
      route: '',
      country: '',
      sublocality: '',
      postal_code: '',
    };
    let data;
    if (results.length) {
      data = results[0];
    }
    if (!data) {
      return null;
    }
    for (let i in data.address_components) {
      let item = data.address_components[i];

      location_obj['formatted_address'] = data.formatted_address || data.name;
      if (item['types'].indexOf('locality') > -1) {
        location_obj['locality'] = item['long_name'];
      } else if (item['types'].indexOf('administrative_area_level_1') > -1) {
        location_obj['admin_area_l1'] = item['long_name'];
      } else if (item['types'].indexOf('street_number') > -1) {
        location_obj['street_number'] = item['long_name'];
      } else if (item['types'].indexOf('route') > -1) {
        location_obj['route'] = item['long_name'];
      } else if (item['types'].indexOf('country') > -1) {
        location_obj['country'] = item['long_name'];
      } else if (item['types'].indexOf('postal_code') > -1) {
        location_obj['postal_code'] = item['long_name'];
      } else if (item['types'].indexOf('sublocality') > -1) {
        location_obj['sublocality'] = item['long_name'];
      }
    }

    if (props.tenant.serviceLocalities.indexOf(location_obj['locality']) < 0) {
      setZipCodeError(
        `We are currently serving ${makeLocationsErrorString(
          props.tenant.serviceLocalitiesError || props.tenant.serviceLocalities
        )}. We look forward to reaching your area as we continue to grow. Thank you for your patience and support!`
      );
      setTimeout(() => {
        setZipCodeError(null);
      }, 10000);
      return;
    }

    return location_obj;
  };

  const setLocationAddress = (details) => {
    let address = getFormattedLocationAddress(details);
    if (address) {
      if (address.formatted_address) {
        setGoogleEditable(false);
        setTimeout(() => {
          if (googleRef.current) {
            googleRef.current.updateAddress(address.formatted_address);
            if (address1Ref.current) {
              address1Ref.current.focus();
            }
          }
        });
      }
      setAddressString(address.formatted_address);
      if (address.street_number && address.street_number.trim()) {
        setAddres1(address.street_number + (address.route.trim() ? ', ' + address.route : ''));
      } else {
        setAddres1(address.route);
      }
      setCity(address.sublocality || address.locality);
      setState(address.admin_area_l1);
      setZipCode(address.postal_code);
      setCountry(address.country);
    }
    setIsLoading(false);
  };

  const setAddress = (details) => {
    let address = getFormattedAddress(details);
    if (address) {
      setAddressString(address.formatted_address);
      if (address.street_number && address.street_number.trim()) {
        setAddres1(address.street_number + (address.route.trim() ? ', ' + address.route : ''));
      } else {
        setAddres1(address.route);
      }
      setCity(address.sublocality || address.locality);
      setState(address.admin_area_l1);
      setZipCode(address.postal_code);
      setCountry(address.country);
      setLatitude(address.latitude || '');
      setLongitude(address.longitude || '');
      if (address2Ref.current) {
        address2Ref.current.focus();
      }
    }
  };

  useEffect(() => {
    setIsDefaultOtherExists(false);
    if (props.addressId || props.addressId === 0) {
      setAddressId(props.addressId);
      let res = localStorage.getItem('user');
      if (res) {
        const user = JSON.parse(res);
        setUserId(user.id);
        let addressesArr = props.addresses || user.addresses;
        if (addressesArr && addressesArr.length) {
          setAddresses(addressesArr);
          setName(addressesArr[props.addressId].name || props.user.name);
          handleMobileChange(addressesArr[props.addressId].phone || props.user.phone);
          setZipCode(addressesArr[props.addressId].zipCode);
          setState(addressesArr[props.addressId].state);
          setCity(addressesArr[props.addressId].city);
          setAddres1(addressesArr[props.addressId].address1);
          setAddres2(addressesArr[props.addressId].address2);
          setCountry(addressesArr[props.addressId].country);
          setLatitude(addressesArr[props.addressId].latitude);
          setLongitude(addressesArr[props.addressId].longitude);
          setAddressString(addressesArr[props.addressId].addressString);
          if (addressesArr[props.addressId].addressString) {
            setTimeout(() => {
              googleRef.current.updateAddress(addressesArr[props.addressId].addressString);
            });
          }
          setIsDefault(addressesArr[props.addressId].isDefault || false);
          addressesArr.forEach((element, index) => {
            if (index !== props.addressId) {
              if (element.isDefault) {
                setIsDefaultOtherExists(true);
              }
            }
          });
        }
      }
    } else {
      setName(props.user.name || '');
      handleMobileChange(props.user.phone || '');
      if (props.canUpdate) {
        let res = localStorage.getItem('user');
        if (res) {
          const user = JSON.parse(res);
          setUserId(user.id);
          let addressesArr = props.addresses || user.addresses;
          if (addressesArr && addressesArr.length) {
            setAddresses(addressesArr);
            addressesArr.forEach((element, index) => {
              if (index !== props.addressId) {
                if (element.isDefault) {
                  setIsDefaultOtherExists(true);
                }
              }
            });
          }
        }
      }
      setIsLoading(true);
      setTimeout(() => {
        (async () => {
          setIsLoading(true);
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (locationData) {
              console.log(locationData);
              setLatitude(locationData.coords.latitude || '');
              setLongitude(locationData.coords.longitude || '');
              if (locationData && locationData.coords) {
                axios
                  .get(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${locationData.coords.latitude},${locationData.coords.longitude}&key=AIzaSyCO9AFZPIDwfLkoaPV36NNewB5MfwwYDX4`
                  )
                  .then((response) => {
                    if (response.data && response.data.results) {
                      setLocationAddress(response.data.results);
                    }
                  })
                  .catch((error) => {
                    setIsLoading(false);
                    console.error(error);
                  });
              } else {
                setIsLoading(false);
              }
            });
          } else {
            setIsLoading(false);
            console.log('Geolocation is not available in your browser.');
          }
        })();
        setIsLoading(false);
      }, 4000);
      if (!props.canUpdate) {
        if (props.address) {
          setName(props.address.name || props.user.name);
          handleMobileChange(props.address.phone || props.user.phone);
          setZipCode(props.address.zipCode);
          setState(props.address.state);
          setCity(props.address.city);
          setAddres1(props.address.address1);
          setAddres2(props.address.address2);
          setCountry(props.address.country);
          setLatitude(props.address.latitude);
          setLongitude(props.address.longitude);
          setAddressString(props.address.addressString);
          if (props.address.addressString) {
            setTimeout(() => {
              googleRef.current.updateAddress(props.address.addressString);
            });
          }
          setIsDefault(props.address.isDefault || false);
        }
        if (props.addresses) {
          props.addresses.forEach((element, index) => {
            if (element.addressString !== props.address.addressString) {
              if (element.isDefault) {
                setIsDefaultOtherExists(true);
              }
            }
          });
        } else {
          setIsDefaultOtherExists(false);
          setIsDefault(true);
        }
      }
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (zipCode.replace(/\s+/g, '').length >= 3) {
        if (!validateServiceArea(zipCode, props.tenant.serviceLocalitiesZipCodes)) {
          setZipCodeError(
            `We are currently serving ${makeLocationsErrorString(
              props.tenant.serviceLocalitiesError || props.tenant.serviceLocalities
            )}. We look forward to reaching your area as we continue to grow. Thank you for your patience and support!`
          );
          if (zipCodeRef.current) {
            zipCodeRef.current.focus();
          }
          setTimeout(() => {
            setZipCodeError(null);
          }, 7000);
        } else {
          setZipCodeError(null);
        }
      } else {
        setZipCodeError(null);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [zipCode]);

  const addAddress = async () => {
    let isError = false;
    if (!zipCode || zipCode.length < 6) {
      setZipCodeError('Invalid Postal Code. Accepted format: M3N 1W7');
      setTimeout(() => {
        setZipCodeError(null);
      }, 7000);
      isError = true;
      if (zipCodeRef.current) {
        zipCodeRef.current.focus();
      }
    }
    if (zipCode && zipCode.length >= 6) {
      const cleaned = zipCode.replace(/\s+/g, '').toUpperCase();
      if (cleaned.length !== 6) {
        setZipCodeError('Invalid Postal Code. Accepted format: M3N 1W7');
        setTimeout(() => {
          setZipCodeError(null);
        }, 7000);
        isError = true;
        if (zipCodeRef.current) {
          zipCodeRef.current.focus();
        }
      } else {
        const isZipValid = /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]\d[ABCEGHJKLMNPRSTVWXYZ]\d$/.test(cleaned);
        if (!isZipValid) {
          setZipCodeError('Invalid Postal Code. Accepted format: M3N 1W7');
          setTimeout(() => {
            setZipCodeError(null);
          }, 7000);
          isError = true;
          if (zipCodeRef.current) {
            zipCodeRef.current.focus();
          }
        } else {
          if (!validateServiceArea(zipCode, props.tenant.serviceLocalitiesZipCodes)) {
            setZipCodeError(
              `We are currently serving ${makeLocationsErrorString(
                props.tenant.serviceLocalitiesError || props.tenant.serviceLocalities
              )}. We look forward to reaching your area as we continue to grow. Thank you for your patience and support!`
            );
            setTimeout(() => {
              setZipCodeError(null);
            }, 7000);
            isError = true;
            if (zipCodeRef.current) {
              zipCodeRef.current.focus();
            }
          }
        }
      }
    }
    if (!state || state.length < 2) {
      setStateError('Invalid State');
      setTimeout(() => {
        setStateError(null);
      }, 4000);
      isError = true;
    }
    if (!city || city.length < 3) {
      setCityError('Invalid City');
      setTimeout(() => {
        setCityError(null);
      }, 4000);
      isError = true;
      if (cityRef.current) {
        cityRef.current.focus();
      }
    }
    if (!address1 || address1.length < 3) {
      setAddres1Error('Invalid Address 1');
      setTimeout(() => {
        setAddres1Error(null);
      }, 4000);
      isError = true;
      if (address1Ref.current) {
        address1Ref.current.focus();
      }
    }
    if (phone && phone.replace(/[^0-9]/g, '').length !== 10) {
      setPhoneError('Invalid Contact No.');
      setTimeout(() => {
        setPhoneError(null);
      }, 4000);
      isError = true;
      if (phoneRef.current) {
        phoneRef.current.focus();
      }
    }
    if (!isDefaultOtherExists && !isDefault) {
      setIsDefaultError('Atleast One Default Address Required');
      setTimeout(() => {
        setIsDefaultError(null);
      }, 4000);
      isError = true;
    }
    if (isError) {
      return;
    }
    if (props.canUpdate) {
      const addressesArr = [...addresses];
      if (isDefault) {
        addressesArr.forEach((element, index) => {
          addressesArr[index].isDefault = false;
        });
      }
      if (addressId || addressId === 0) {
        addressesArr[addressId].name = name;
        addressesArr[addressId].phone = phone.replace(/[^0-9]/g, '');
        addressesArr[addressId].zipCode = zipCode;
        addressesArr[addressId].state = state;
        addressesArr[addressId].city = city;
        addressesArr[addressId].address1 = address1;
        addressesArr[addressId].address2 = address2;
        addressesArr[addressId].country = country;
        addressesArr[addressId].addressString = addressString;
        addressesArr[addressId].isDefault = isDefault;
        addressesArr[addressId].latitude = latitude;
        addressesArr[addressId].longitude = longitude;
      } else {
        addressesArr.push({
          name,
          phone: phone.replace(/[^0-9]/g, ''),
          zipCode,
          state,
          city,
          address1,
          address2,
          country,
          addressString,
          isDefault,
          latitude,
          longitude,
        });
      }
      setIsLoading(true);
      let userResp = await updateUser(userId, {
        addresses: addressesArr,
      });
      if (userResp) {
        localStorage.setItem('user', JSON.stringify(userResp));
        props.refreshAddress();
        props.closeModal();
      }
      setIsLoading(false);
    } else {
      let address = {
        name,
        phone: phone.replace(/[^0-9]/g, ''),
        zipCode,
        state,
        city,
        address1,
        address2,
        country,
        addressString,
        isDefault,
        latitude,
        longitude,
      };
      props.addAddress(address);
      props.closeModal();
    }
  };

  return (
    <Box sx={modalStyle}>
      <IconButton
        onClick={() => props.closeModal()}
        style={{
          position: 'absolute',
          top: 2,
          right: 2,
          zindex: 999,
        }}
        aria-label='delete'
        size='large'
      >
        <CloseRounded sx={{ fontSize: 30 }} />
      </IconButton>
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          pb: 2,
        }}
      >
        <Typography component='h4' variant='h5' sx={{ color: 'text.primary' }}>
          {addressId || addressId === 0 ? 'Edit' : 'New'} Address
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          margin: 'auto',
          textAlign: 'center',
          pb: 2,
          flex: 1,
        }}
      >
        <GooglePlacesInput ref={googleRef} editable={isgoogleEditable} setAddress={setAddress}></GooglePlacesInput>
      </Box>
      <Grid container spacing={{ xs: 1.5, sm: 2.5 }}>
        <Grid item xs={6} sm={6} md={6}>
          <Box
            sx={{
              width: '100%',
              margin: 'auto',
              textAlign: 'center',
              pb: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Person sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                inputProps={{ type: 'text' }}
                id='name'
                name='name'
                required
                label='Name'
                value={name}
                fullWidth
                inputRef={nameRef}
                InputProps={{
                  style: { fontSize: 15 },
                }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                variant='standard'
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    e.target.blur();
                    if (phoneRef.current) {
                      phoneRef.current.focus();
                    }
                  }
                }}
                InputLabelProps={{
                  style: { fontSize: 15 },
                }}
              />
            </Box>
            {nameError ? (
              <Box
                sx={{
                  display: 'flex',
                  textAlign: 'left',
                  justifyContent: 'start',
                  pt: 0.5,
                }}
              >
                <Typography variant='subtitle2' sx={{ color: 'red' }}>
                  {nameError}
                </Typography>
              </Box>
            ) : null}
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <Box
            sx={{
              width: '100%',
              margin: 'auto',
              textAlign: 'center',
              pb: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Phone sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                inputProps={{ type: 'tel' }}
                id='phone'
                name='phone'
                required
                inputRef={phoneRef}
                label='Contact No.'
                value={phone}
                fullWidth
                onChange={(e) => {
                  handleMobileChange(e.target.value);
                }}
                variant='standard'
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    e.target.blur();
                    if (address1Ref.current) {
                      address1Ref.current.focus();
                    }
                  }
                }}
                InputProps={{
                  style: { fontSize: 15 },
                }}
                InputLabelProps={{
                  style: { fontSize: 15 },
                }}
              />
            </Box>
            {phoneError ? (
              <Box
                sx={{
                  display: 'flex',
                  textAlign: 'left',
                  justifyContent: 'start',
                  pt: 0.5,
                }}
              >
                <Typography variant='subtitle2' sx={{ color: 'red' }}>
                  {phoneError}
                </Typography>
              </Box>
            ) : null}
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: '100%',
          margin: 'auto',
          textAlign: 'center',
          pb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Signpost sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            inputProps={{ type: 'text' }}
            id='address1'
            name='address1'
            label='Address 1'
            value={address1}
            required
            fullWidth
            inputRef={address1Ref}
            onChange={(e) => {
              setAddres1(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                e.target.blur();
                if (address2Ref.current) {
                  address2Ref.current.focus();
                }
              }
            }}
            variant='standard'
            InputProps={{
              style: { fontSize: 15 },
            }}
            InputLabelProps={{
              style: { fontSize: 15 },
            }}
          />
        </Box>
        {address1Error ? (
          <Box
            sx={{
              display: 'flex',
              textAlign: 'left',
              justifyContent: 'start',
              pt: 0.5,
            }}
          >
            <Typography variant='subtitle2' sx={{ color: 'red' }}>
              {address1Error}
            </Typography>
          </Box>
        ) : null}
      </Box>
      <Box
        sx={{
          width: '100%',
          margin: 'auto',
          textAlign: 'center',
          pb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Home sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            inputProps={{ type: 'text' }}
            id='address2'
            name='address2'
            label='Address 2'
            value={address2}
            fullWidth
            inputRef={address2Ref}
            onChange={(e) => {
              setAddres2(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                e.target.blur();
                if (cityRef.current) {
                  cityRef.current.focus();
                }
              }
            }}
            variant='standard'
            InputProps={{
              style: { fontSize: 15 },
            }}
            InputLabelProps={{
              style: { fontSize: 15 },
            }}
          />
        </Box>
      </Box>
      <Grid container spacing={{ xs: 1.5, sm: 2.5 }}>
        <Grid item xs={6} sm={6} md={6}>
          <Box
            sx={{
              width: '100%',
              margin: 'auto',
              textAlign: 'center',
              pb: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <LocationCity sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                inputProps={{ type: 'text' }}
                id='city'
                name='city'
                required
                inputRef={cityRef}
                label='City'
                value={city}
                fullWidth
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                variant='standard'
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    e.target.blur();
                    if (stateRef.current) {
                      stateRef.current.focus();
                    }
                  }
                }}
                InputProps={{
                  style: { fontSize: 15 },
                }}
                InputLabelProps={{
                  style: { fontSize: 15 },
                }}
              />
            </Box>
            {cityError ? (
              <Box
                sx={{
                  display: 'flex',
                  textAlign: 'left',
                  justifyContent: 'start',
                  pt: 0.5,
                }}
              >
                <Typography variant='subtitle2' sx={{ color: 'red' }}>
                  {cityError}
                </Typography>
              </Box>
            ) : null}
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <Box
            sx={{
              width: '100%',
              margin: 'auto',
              textAlign: 'center',
              pb: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <LocationOn sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                inputProps={{ type: 'text' }}
                id='state'
                name='state'
                required
                inputRef={stateRef}
                label='State'
                value={state}
                fullWidth
                onChange={(e) => {
                  setState(e.target.value);
                }}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    e.target.blur();
                    if (zipCodeRef.current) {
                      zipCodeRef.current.focus();
                    }
                  }
                }}
                variant='standard'
                InputProps={{
                  style: { fontSize: 15 },
                }}
                InputLabelProps={{
                  style: { fontSize: 15 },
                }}
              />
            </Box>
            {stateError ? (
              <Box
                sx={{
                  display: 'flex',
                  textAlign: 'left',
                  justifyContent: 'start',
                  pt: 0.5,
                }}
              >
                <Typography variant='subtitle2' sx={{ color: 'red' }}>
                  {stateError}
                </Typography>
              </Box>
            ) : null}
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: '100%',
          margin: 'auto',
          textAlign: 'center',
          pb: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Map sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField
            inputProps={{ type: 'text' }}
            id='zip'
            name='zip'
            required
            inputRef={zipCodeRef}
            label='Postal Code'
            value={zipCode}
            fullWidth
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                e.target.blur();
                addAddress();
              }
            }}
            onChange={(e) => {
              if (e.target.value) {
                setZipCode(e.target.value.toUpperCase());
              } else {
                setZipCode(e.target.value);
              }
            }}
            variant='standard'
            InputProps={{
              style: { fontSize: 15 },
            }}
            InputLabelProps={{
              style: { fontSize: 15 },
            }}
          />
        </Box>
        {zipCodeError ? (
          <Box
            sx={{
              display: 'flex',
              textAlign: 'left',
              justifyContent: 'start',
              pt: 0.5,
            }}
          >
            <Typography variant='subtitle3' sx={{ color: 'red' }}>
              {zipCodeError}
            </Typography>
          </Box>
        ) : null}
      </Box>
      <Box
        sx={{
          width: '100%',
          margin: 'auto',
          textAlign: 'start',
          pb: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <InputLabel sx={{ marginBottom: 0 }} shrink={false} htmlFor='is-default'>
            <Typography>Is Default{isDefaultOtherExists ? '' : '*'}</Typography>
          </InputLabel>
          <Switch
            variant='standard'
            name='is-default'
            checked={isDefault}
            onChange={() => setIsDefault(!isDefault)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>
        {isDefaultError ? (
          <Box
            sx={{
              display: 'flex',
              textAlign: 'left',
              justifyContent: 'start',
              pt: 0.5,
            }}
          >
            <Typography variant='subtitle2' sx={{ color: 'red' }}>
              {isDefaultError}
            </Typography>
          </Box>
        ) : null}
      </Box>
      <Box
        sx={{
          width: '100%',
          margin: 'auto',
          textAlign: 'center',
          pb: 2,
        }}
      >
        <Button
          onClick={addAddress}
          disabled={isLoading}
          type='submit'
          variant='contained'
          sx={{ width: { xs: '75%', sm: '25%' } }}
        >
          {isLoading ? <CircularProgress size={25} color='inherit' /> : 'Save'}
        </Button>
      </Box>
    </Box>
  );
}
