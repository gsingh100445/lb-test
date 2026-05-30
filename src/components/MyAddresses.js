import React, { useEffect, useState } from 'react';
import AddressPicker from '../Modals/AddressPicker';
import { useNavigate } from 'react-router-dom';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { AddLocation, Delete, Edit, Phone } from '@mui/icons-material';
import { updateUser } from '../utils/api_base';

function MyAddresses(props) {
  const navigate = useNavigate();

  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [addresseLoaded, setAddresseLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'My Addresses - Laundry Basket';
  }, []);

  useEffect(() => {
    if (props.isFirstLoadDone) {
      if (props.isLoggedIn === false) {
        navigate('/');
      }
    }
    let res = localStorage.getItem('user');
    if (res) {
      const user = JSON.parse(res);
      if (user && user.addresses && user.addresses.length) {
        let addressesArr = user.addresses;
        addressesArr.sort((a, b) => b.isDefault - a.isDefault);
        setAddresses(addressesArr);
      }
    }
    setAddresseLoaded(true);
  }, [navigate, props.isLoggedIn, props.isFirstLoadDone]);

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

  const openAddressDialog = (id) => {
    if (id || id === 0) {
      setAddressId(id);
    }
    setTimeout(() => {
      setIsAddressDialogOpen(true);
    });
  };

  const closeAddressDialog = () => {
    setAddressId(null);
    setIsAddressDialogOpen(false);
  };

  const refreshAddress = () => {
    let res = localStorage.getItem('user');
    if (res) {
      const user = JSON.parse(res);
      if (user && user.addresses && user.addresses.length) {
        let addressesArr = user.addresses;
        addressesArr.sort((a, b) => b.isDefault - a.isDefault);
        setAddresses(addressesArr);
        props.setUser(user);
      }
    }
    setAddresseLoaded(true);
  };

  const deleteAddress = async (index) => {
    let addressesArr = [...addresses];
    addressesArr.splice(index, 1);
    setAddresses(addressesArr);
    setIsLoading(true);
    let userResp = await updateUser(props.user.id, {
      addresses: addressesArr,
    });
    if (userResp) {
      localStorage.setItem('user', JSON.stringify(userResp));
      props.setUser(userResp);
    }
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
      <Container maxWidth='lg' id='features' sx={{ pt: { xs: 12, sm: 16 }, pb: { xs: 6, sm: 68 } }}>
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
            pb: 4,
          }}
        >
          <Typography component='h4' variant='h4' sx={{ color: 'text.primary' }}>
            My Addresses
          </Typography>

          {addresseLoaded && (
            <Grid
              container
              alignItems='center'
              justifyContent='center'
              spacing={1}
              sx={{ pt: { xs: 3, sm: 6 }, pb: { xs: 1, sm: 4 }, mx: 'auto' }}
            >
              {addresses.map((address, index) => (
                <Grid item xs={12} sm={12} md={6} key={index} sx={{ px: 2, py: 2 }}>
                  <Stack
                    direction='column'
                    spacing={1}
                    useFlexGap
                    sx={{
                      borderRadius: '15px',
                      py: 4,
                      px: 2,
                      border: '1.5px solid',
                      borderColor: 'hsla(220, 25%, 25%, .5)',
                      boxShadow: 'none',
                      position: 'relative',
                    }}
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={9} sm={9} md={9}>
                        <Typography sx={{ color: 'text.secondary', textAlign: 'start', pb: 1 }} variant='h6'>
                          {address.name}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', textAlign: 'start' }} variant='subtitle1'>
                          {address.address1}, {address.address2}{' '}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', textAlign: 'start' }} variant='subtitle1'>
                          {address.city}, {address.state}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', textAlign: 'start' }} variant='subtitle1'>
                          {address.zipCode}
                        </Typography>
                        <Typography
                          sx={{ color: 'text.secondary', textAlign: 'start', fontWeight: 'bold', pt: 0.5 }}
                          variant='h6'
                        >
                          <Phone sx={{ fontSize: 18 }} /> {formatMobile(address.phone)}
                        </Typography>
                        {address.isDefault && (
                          <Box
                            className='flex items-center ml-3 px-3 py-1.5'
                            style={{
                              borderTopRightRadius: '13px',
                              borderBottomLeftRadius: '14px',
                              backgroundColor: '#0095ff',
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              marginLeft: 'auto',
                              alignContent: 'flex-end',
                              zIndex: 30,
                            }}
                          >
                            <Typography variant='subtitle1' className='text-white text-center'>
                              Default
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                      <Grid item xs={3} sm={3} md={3} key={index}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '100%',
                            justifyContent: 'end',
                          }}
                        >
                          <IconButton onClick={() => openAddressDialog(index)} className='flex items-center justify-center'>
                            <Edit sx={{ fontSize: 27 }}></Edit>
                          </IconButton>
                          {!address.isDefault && (
                            <IconButton
                              onClick={() => deleteAddress(index)}
                              className='ml-3 flex items-center justify-center'
                            >
                              <Delete sx={{ fontSize: 27 }}></Delete>
                            </IconButton>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          )}
          <Button
            sx={{ mb: 2 }}
            color='primary'
            onClick={() => openAddressDialog(null)}
            variant='contained'
            startIcon={<AddLocation />}
          >
            <Typography sx={{ color: 'white' }} component='h6' variant='nav' textAlign='center'>
              New Address
            </Typography>
          </Button>
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
                refreshAddress={refreshAddress}
                addressId={addressId}
                canUpdate={true}
                user={props.user}
                addresses={addresses}
              ></AddressPicker>
            </div>
          </Modal>
        </Box>
      </Container>
    </div>
  );
}

export default MyAddresses;
