import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Delete, Edit, Mail, Person, Phone } from '@mui/icons-material';
import { updateUser } from '../utils/api_base';

function Profile(props) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState(null);
  const [name, setName] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const deleteImage = () => {
    if (image) {
      setImage();
      setImageUrl();
    } else {
      setUser({ ...user, pic: null });
    }
  };

  useEffect(() => {
    if (props.isFirstLoadDone) {
      if (props.isLoggedIn === false) {
        navigate('/');
      }
    }
    let res = localStorage.getItem('user');
    if (res) {
      const user = JSON.parse(res);
      if (user) {
        setUser(user);
        setEmail(user.email);
        setName(user.name);
        handleMobileChange(user.phone);
      }
    }
    setUserLoaded(true);
  }, [navigate, props.isLoggedIn, props.user, props.isFirstLoadDone]);

  useEffect(() => {
    document.title = 'My Profile - Laundry Basket, Laundry & Dry Cleaning, Pickup and Delivery!';
  }, []);

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
  };

  const refreshUser = () => {
    let res = localStorage.getItem('user');
    if (res) {
      const user = JSON.parse(res);
      if (user) {
        setUser(user);
        setEmail(user.email);
        setName(user.name);
        handleMobileChange(user.phone);
        props.setUser(user);
      }
    }
    setUserLoaded(true);
  };

  const update = async () => {
    let isError = false;
    if (!name || name.length < 3) {
      setNameError('Invalid Name');
      setTimeout(() => {
        setNameError(null);
      }, 4000);
      isError = true;
    }
    if (!email || email.length < 8) {
      setEmailError('Invalid Email');
      setTimeout(() => {
        setEmailError(null);
      }, 4000);
      isError = true;
    }
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      setEmailError('Invalid Email');
      setTimeout(() => {
        setEmailError(null);
      }, 4000);
      isError = true;
    }
    if (isError) {
      return;
    }
    var formData = new FormData();
    if (image) {
      formData.append('image', image);
    }
    if (!image && !user.pic) {
      formData.append('pic', 'delete');
    }
    formData.append('name', name);
    formData.append('email', email);
    setLoading(true);
    let userResp = await updateUser(user.id, formData);
    if (userResp) {
      localStorage.setItem('user', JSON.stringify(userResp));
      refreshUser();
    }
    setLoading(false);
  };

  const getInitials = (name) => {
    const initials = name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
    return initials.length > 2 ? initials.substring(0, 2) : initials;
  };

  return (
    <Container maxWidth='lg' id='features' sx={{ pt: { xs: 12, sm: 16 }, pb: { xs: 6, sm: 6 } }}>
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          pb: 4,
        }}
      >
        <Typography component='h2' variant='h4' sx={{ color: 'text.primary' }}>
          My Profile
        </Typography>

        {userLoaded && (
          <Grid container alignItems='center' justifyContent='center' spacing={2.5} sx={{ pt: 6, pb: 4 }}>
            <Grid item xs={12} sm={9} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: 'auto',
                  width: 'fit-content',
                }}
              >
                <Avatar
                  sx={{ backgroundColor: 'primary.main', color: 'white', width: 120, height: 120 }}
                  alt='username'
                  src={imageUrl || user.pic}
                >
                  <Typography style={{ margin: 0, padding: 0 }} variant='h4' component='h4' sx={{ color: 'white' }}>
                    {getInitials(user.name)}
                  </Typography>
                </Avatar>
                <Box
                  sx={{
                    display: 'grid',
                    marginLeft: 4,
                  }}
                >
                  <Button
                    variant='contained'
                    size='medium'
                    sx={{ marginBottom: 1, p: 1, fontSize: { xs: 16, sm: 20, md: 18 } }}
                    startIcon={<Edit sx={{ fontSize: { xs: 16, sm: 20, md: 18 } }} />}
                    component='label'
                    disabled={loading}
                  >
                    Change Pic
                    <input type='file' hidden accept='image/*' onChange={onImageChange} />
                  </Button>
                  <Button
                    color='error'
                    onClick={deleteImage}
                    variant='contained'
                    disabled={loading}
                    size='medium'
                    sx={{ marginBottom: 1, p: 1, fontSize: { xs: 16, sm: 20, md: 18 } }}
                    startIcon={<Delete sx={{ fontSize: { xs: 16, sm: 20, md: 18 } }} />}
                  >
                    Delete Pic{'  '}
                  </Button>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Person sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  sx={{ mt: 3 }}
                  inputProps={{ type: 'text', readOnly: loading }}
                  id='name'
                  name='name'
                  label='Name'
                  value={name}
                  fullWidth
                  onChange={(e) => {
                    setName(e.target.value);
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
              {nameError ? <FormHelperText error>{nameError}</FormHelperText> : null}
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Mail sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  sx={{ mt: 3 }}
                  inputProps={{ type: 'email', readOnly: loading }}
                  id='email'
                  name='email'
                  label='Email'
                  value={email}
                  fullWidth
                  onChange={(e) => {
                    setEmail(e.target.value);
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
              {emailError ? <FormHelperText error>{emailError}</FormHelperText> : null}
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Phone sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField
                  sx={{ mt: 3 }}
                  inputProps={{ type: 'tel', readOnly: true || loading }}
                  id='phone'
                  name='phone'
                  label='Mobile'
                  value={mobile}
                  fullWidth
                  onChange={(e) => {
                    handleMobileChange(e.target.value);
                  }}
                  variant='standard'
                />
              </Box>
              {mobileError ? <FormHelperText error>{mobileError}</FormHelperText> : null}
              <Button onClick={update} sx={{ mt: 4 }} variant='contained'>
                {loading ? <CircularProgress size={25} color='inherit' /> : 'Update'}
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default Profile;
