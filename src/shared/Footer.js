import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link as LinkM } from '@mui/material';
import { Container, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import logoDark from '../assets/images/logo-dark.svg';

function Copyright() {
  return (
    <Typography variant='subtitle2' color='white' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
      {'Copyright © '}
      <LinkM color='inherit' to='/'>
        Laundry Basket Tdot Inc.
      </LinkM>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter(props) {
  const pages = [
    {
      title: 'Ironing Service Near Me',
      url: '/ironing-service-near-me',
    },
    {
      title: 'Pressing Service Near Me',
      url: '/pressing-service-near-me',
    },
    {
      title: 'Dry Cleaner Near Me',
      url: '/dry-cleaner-near-me',
    },
    {
      title: 'Dry Cleaner North York',
      url: '/dry-cleaner-north-york',
    },
    {
      title: 'Dry Cleaner Vaughan',
      url: '/dry-cleaner-vaughan',
    },
    {
      title: 'Dry Cleaner Richmond Hill',
      url: '/dry-cleaner-richmond-hill',
    },
    {
      title: 'Dry Cleaner Thornhill',
      url: '/dry-cleaner-thornhill',
    },
    {
      title: 'Dry Cleaning Pick Up and Drop Off',
      url: '/dry-cleaning-pick-up-and-drop-off',
    },
    {
      title: 'Dry Cleaner Pick Up Service',
      url: '/dry-cleaner-pick-up-service',
    },
    // {
    //   title: 'Laundromat Near Me',
    //   url: '/laundromat-near-me',
    // },
    // {
    //   title: 'Laundry Pickup and Delivery Service Near Me',
    //   url: '/laundry-pickup-and-delivery-service-near-me',
    // },
    // {
    //   title: 'Laundry Pickup and Delivery',
    //   url: '/laundry-pickup-and-delivery',
    // },
    // {
    //   title: 'Laundry Pick Up and Drop Off',
    //   url: '/laundry-pick-up-and-drop-off',
    // },
    // {
    //   title: 'Laundry Service North York',
    //   url: '/laundry-service-north-york',
    // },
    // {
    //   title: 'Laundry Service Vaughan',
    //   url: '/laundry-service-vaughan',
    // },
    // {
    //   title: 'Laundry Service Richmond Hill',
    //   url: '/laundry-service-richmond-hill',
    // },
    // {
    //   title: 'Laundry Service Thornhill',
    //   url: '/laundry-service-thornhill',
    // },
  ];

  return (
    <Box
      style={{
        paddingLeft: 0,
        paddingRight: 0,
      }}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 'auto',
        minHeight: '25vh',
        background: '#13263d',
      }}
    >
      <CssBaseline />
      <Container
        maxWidth='xlg'
        component='footer'
        sx={{
          pt: 3,
          pb: 2,
          backgroundColor: (theme) => (theme.palette.mode === 'light' ? '' : theme.palette.grey[800]),
        }}
      >
        <Grid container sx={{ borderBottomWidth: 1, borderBottomColor: 'gray', pb: 3 }}>
          <Grid item xs={12} sm={6} md={3.5} sx={{ pr: 10 }}>
            <Box
              sx={{
                backgroundImage: `url(${logoDark})`,
              }}
              className='footer-logo'
            ></Box>
            <Typography sx={{ fontWeight: 'bold', color: 'white', pt: 1, pl: 1 }} variant='subtitle2'>
              Fresh Laundry, Hassle-Free! Free Pickup, Expert Cleaning and Fast Delivery – Because Your Time Matters!
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={2} sx={{ pt: { xs: 3, sm: 1, md: 1 } }}>
            <Typography sx={{ color: 'white', fontWeight: 'bold', pl: { xs: 1, sm: 0, md: 0 } }} component='h6' variant='h6'>
              Quick Links
            </Typography>
            <Link sx={{ display: 'block', width: 'fit-content', cursor: 'pointer' }} to='/'>
              <Typography
                sx={{ color: 'white', fontWeight: 'bold', pt: 1.5, pl: { xs: 1, sm: 0, md: 0 } }}
                component='p'
                variant='subtitle2'
              >
                Home
              </Typography>
            </Link>
            <Link sx={{ display: 'block', width: 'fit-content', cursor: 'pointer' }} to='/about'>
              <Typography
                sx={{ color: 'white', fontWeight: 'bold', pt: 1, pl: { xs: 1, sm: 0, md: 0 } }}
                component='p'
                variant='subtitle2'
              >
                About Us
              </Typography>
            </Link>
            <Link sx={{ display: 'block', width: 'fit-content', cursor: 'pointer' }} to='/pricing'>
              <Typography
                sx={{ color: 'white', fontWeight: 'bold', pt: 1, pl: { xs: 1, sm: 0, md: 0 } }}
                component='p'
                variant='subtitle2'
              >
                Pricing
              </Typography>
            </Link>
            <Link sx={{ display: 'block', width: 'fit-content', cursor: 'pointer' }} to='/blogs'>
              <Typography
                sx={{ color: 'white', fontWeight: 'bold', pt: 1, pl: { xs: 1, sm: 0, md: 0 } }}
                component='p'
                variant='subtitle2'
              >
                Blogs
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={6} sm={6} md={2} sx={{ pt: { xs: 3, sm: 1, md: 1 } }}>
            <Link sx={{ display: 'block', width: 'fit-content', cursor: 'pointer' }} to='/services'>
              <Typography
                sx={{ color: 'white', fontWeight: 'bold', pl: { xs: 1, sm: 0, md: 0 } }}
                component='h6'
                variant='h6'
              >
                Services
              </Typography>
            </Link>
            <Link sx={{ display: 'block', width: 'fit-content', cursor: 'pointer' }} to='/wash-and-fold'>
              <Typography
                sx={{ color: 'white', fontWeight: 'bold', pt: 1.5, pl: { xs: 1, sm: 0, md: 0 } }}
                component='p'
                variant='subtitle2'
              >
                Wash & Fold
              </Typography>
            </Link>
            <Link sx={{ display: 'block', width: 'fit-content', cursor: 'pointer' }} to='/wash-and-iron'>
              <Typography
                sx={{ color: 'white', fontWeight: 'bold', pt: 1, pl: { xs: 1, sm: 0, md: 0 } }}
                component='p'
                variant='subtitle2'
              >
                Wash & Iron
              </Typography>
            </Link>
            <Link sx={{ display: 'block', width: 'fit-content', cursor: 'pointer' }} to='/dry-cleaning'>
              <Typography
                sx={{ color: 'white', fontWeight: 'bold', pt: 1.5, pl: { xs: 1, sm: 0, md: 0 } }}
                component='p'
                variant='subtitle2'
              >
                Dry Cleaning
              </Typography>
            </Link>
            <Link sx={{ display: 'block', width: 'fit-content', cursor: 'pointer' }} to='/home-care'>
              <Typography
                sx={{ color: 'white', fontWeight: 'bold', pt: 1, pl: { xs: 1, sm: 0, md: 0 } }}
                component='p'
                variant='subtitle2'
              >
                Home Care
              </Typography>
            </Link>
            <Link sx={{ display: 'block', width: 'fit-content', cursor: 'pointer' }} to='/shoe-cleaning'>
              <Typography
                sx={{ color: 'white', fontWeight: 'bold', pt: 1, pl: { xs: 1, sm: 0, md: 0 } }}
                component='p'
                variant='subtitle2'
              >
                Shoe Cleaning
              </Typography>
            </Link>
            <Link sx={{ display: 'block', width: 'fit-content', cursor: 'pointer' }} to='/ironing'>
              <Typography
                sx={{ color: 'white', fontWeight: 'bold', pt: 1, pl: { xs: 1, sm: 0, md: 0 } }}
                component='p'
                variant='subtitle2'
              >
                Iron Only
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={6} sm={6} md={2} sx={{ pt: { xs: 3, sm: 3, md: 1 } }}>
            <Typography sx={{ color: 'white', fontWeight: 'bold', pl: { xs: 0, sm: 1, md: 0 } }} component='h6' variant='h6'>
              Company
            </Typography>
            <a
              style={{ display: 'block', width: 'fit-content', cursor: 'pointer' }}
              href='https://www.laundrybasket.ca/terms-and-conditions'
            >
              <Typography
                sx={{ width: 'fit-content', color: 'white', fontWeight: 'bold', pt: 1.5, pl: { xs: 0, sm: 1, md: 0 } }}
                component='p'
                variant='subtitle2'
              >
                Terms & Conditions
              </Typography>
            </a>
            <a
              style={{ display: 'block', width: 'fit-content', cursor: 'pointer' }}
              href='https://www.laundrybasket.ca/privacy-policy'
            >
              <Typography
                sx={{ width: 'fit-content', color: 'white', fontWeight: 'bold', pt: 1.5, pl: { xs: 0, sm: 1, md: 0 } }}
                component='p'
                variant='subtitle2'
              >
                Privacy Policy
              </Typography>
            </a>
            <a
              style={{ display: 'block', width: 'fit-content', cursor: 'pointer' }}
              href='https://www.laundrybasket.ca/refund-policy'
            >
              <Typography
                sx={{ width: 'fit-content', color: 'white', fontWeight: 'bold', pt: 1.5, pl: { xs: 0, sm: 1, md: 0 } }}
                component='p'
                variant='subtitle2'
              >
                Refund Policy
              </Typography>
            </a>
          </Grid>
          <Grid item xs={6} sm={6} md={2.5} sx={{ pt: { xs: 3, sm: 3, md: 1 } }}>
            <Typography sx={{ color: 'white', pl: { xs: 1, sm: 0, md: 1 } }} component='h6' variant='h6'>
              Contact Us
            </Typography>
            <Typography
              sx={{ color: 'white', pt: 2, fontWeight: 'bold', pl: { xs: 1, sm: 0, md: 1 } }}
              component='p'
              variant='subtitle2'
            >
              <a href='tel:6472476745'>647-247-6745</a>
            </Typography>
            <Typography
              sx={{ color: 'white', fontWeight: 'bold', pt: 0.5, pl: { xs: 1, sm: 0, md: 1 } }}
              component='p'
              variant='subtitle2'
            >
              <a href='mailto:contact@laundrybasket.ca'>contact@laundrybasket.ca</a>
            </Typography>
            <Stack sx={{ pt: 2, pl: 1 }} spacing={2} direction='row' useFlexGap justifyContent='start' alignItems='start'>
              <a href='https://www.instagram.com/laundry_basket_tdot/' target='_blank' rel='noopener noreferrer'>
                <svg
                  style={{ height: 30, width: 30 }}
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  viewBox='0,0,256,256'
                >
                  <g
                    fill='#ffffff'
                    fillRule='nonzero'
                    stroke='none'
                    strokeWidth='1'
                    strokeLinecap='butt'
                    strokeLinejoin='miter'
                    strokeMiterlimit='10'
                    strokeDasharray=''
                    strokeDashoffset='0'
                    fontFamily='none'
                    fontWeight='none'
                    fontSize='none'
                    textAnchor='none'
                  >
                    <g transform='scale(5.12,5.12)'>
                      <path d='M16,3c-7.17,0 -13,5.83 -13,13v18c0,7.17 5.83,13 13,13h18c7.17,0 13,-5.83 13,-13v-18c0,-7.17 -5.83,-13 -13,-13zM37,11c1.1,0 2,0.9 2,2c0,1.1 -0.9,2 -2,2c-1.1,0 -2,-0.9 -2,-2c0,-1.1 0.9,-2 2,-2zM25,14c6.07,0 11,4.93 11,11c0,6.07 -4.93,11 -11,11c-6.07,0 -11,-4.93 -11,-11c0,-6.07 4.93,-11 11,-11zM25,16c-4.96,0 -9,4.04 -9,9c0,4.96 4.04,9 9,9c4.96,0 9,-4.04 9,-9c0,-4.96 -4.04,-9 -9,-9z'></path>
                    </g>
                  </g>
                </svg>
              </a>
              <a href='https://www.facebook.com/profile.php?id=61575150972747' target='_blank' rel='noopener noreferrer'>
                <svg
                  style={{ height: 30, width: 30 }}
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  viewBox='0,0,256,256'
                >
                  <g
                    fill='#ffffff'
                    fillRule='nonzero'
                    stroke='none'
                    strokeWidth='1'
                    strokeLinecap='butt'
                    strokeLinejoin='miter'
                    strokeMiterlimit='10'
                    strokeDasharray=''
                    strokeDashoffset='0'
                    fontFamily='none'
                    fontWeight='none'
                    fontSize='none'
                    textAnchor='none'
                  >
                    <g transform='scale(5.12,5.12)'>
                      <path d='M41,4h-32c-2.76,0 -5,2.24 -5,5v32c0,2.76 2.24,5 5,5h32c2.76,0 5,-2.24 5,-5v-32c0,-2.76 -2.24,-5 -5,-5zM37,19h-2c-2.14,0 -3,0.5 -3,2v3h5l-1,5h-4v15h-5v-15h-4v-5h4v-3c0,-4 2,-7 6,-7c2.9,0 4,1 4,1z'></path>
                    </g>
                  </g>
                </svg>
              </a>
              {/* <IconButton>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              x='0px'
                              y='0px'
                              style={{ height: 30, width: 30 }}
                              viewBox='0,0,256,256'
                            >
                              <g
                                fill='#ffffff'
                                fillRule='nonzero'
                                stroke='none'
                                strokeWidth='1'
                                strokeLinecap='butt'
                                strokeLinejoin='miter'
                                strokeMiterlimit='10'
                                strokeDasharray=''
                                strokeDashoffset='0'
                                fontFamily='none'
                                fontWeight='none'
                                fontSize='none'
                                textAnchor='none'
                              >
                                <g transform='scale(5.12,5.12)'>
                                  <path d='M11,4c-3.866,0 -7,3.134 -7,7v28c0,3.866 3.134,7 7,7h28c3.866,0 7,-3.134 7,-7v-28c0,-3.866 -3.134,-7 -7,-7zM13.08594,13h7.9375l5.63672,8.00977l6.83984,-8.00977h2.5l-8.21094,9.61328l10.125,14.38672h-7.93555l-6.54102,-9.29297l-7.9375,9.29297h-2.5l9.30859,-10.89648zM16.91406,15l14.10742,20h3.06445l-14.10742,-20z'></path>
                                </g>
                              </g>
                            </svg>
                          </IconButton> */}
              <a href='https://www.tiktok.com/@laundry_basket_tdot' target='_blank' rel='noopener noreferrer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  style={{ height: 30, width: 30 }}
                  viewBox='0,0,256,256'
                >
                  <g
                    fill='#ffffff'
                    fillRule='nonzero'
                    stroke='none'
                    strokeWidth='1'
                    strokeLinecap='butt'
                    strokeLinejoin='miter'
                    strokeMiterlimit='10'
                    strokeDasharray=''
                    strokeDashoffset='0'
                    fontFamily='none'
                    fontWeight='none'
                    fontSize='none'
                    textAnchor='none'
                  >
                    <g transform='scale(5.12,5.12)'>
                      <path d='M41,4h-32c-2.757,0 -5,2.243 -5,5v32c0,2.757 2.243,5 5,5h32c2.757,0 5,-2.243 5,-5v-32c0,-2.757 -2.243,-5 -5,-5zM37.006,22.323c-0.227,0.021 -0.457,0.035 -0.69,0.035c-2.623,0 -4.928,-1.349 -6.269,-3.388c0,5.349 0,11.435 0,11.537c0,4.709 -3.818,8.527 -8.527,8.527c-4.709,0 -8.527,-3.818 -8.527,-8.527c0,-4.709 3.818,-8.527 8.527,-8.527c0.178,0 0.352,0.016 0.527,0.027v4.202c-0.175,-0.021 -0.347,-0.053 -0.527,-0.053c-2.404,0 -4.352,1.948 -4.352,4.352c0,2.404 1.948,4.352 4.352,4.352c2.404,0 4.527,-1.894 4.527,-4.298c0,-0.095 0.042,-19.594 0.042,-19.594h4.016c0.378,3.591 3.277,6.425 6.901,6.685z'></path>
                    </g>
                  </g>
                </svg>
              </a>
              <a href='https://www.linkedin.com/company/laundry-basket-tdot/' target='_blank' rel='noopener noreferrer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  style={{ height: 30, width: 30 }}
                  viewBox='0,0,256,256'
                >
                  <g
                    fill='#ffffff'
                    fillRule='nonzero'
                    stroke='none'
                    strokeWidth='1'
                    strokeLinecap='butt'
                    strokeLinejoin='miter'
                    strokeMiterlimit='10'
                    strokeDasharray=''
                    strokeDashoffset='0'
                    fontFamily='none'
                    fontWeight='none'
                    fontSize='none'
                    textAnchor='none'
                  >
                    <g transform='scale(5.12,5.12)'>
                      <path d='M41,4h-32c-2.76,0 -5,2.24 -5,5v32c0,2.76 2.24,5 5,5h32c2.76,0 5,-2.24 5,-5v-32c0,-2.76 -2.24,-5 -5,-5zM17,20v19h-6v-19zM11,14.47c0,-1.4 1.2,-2.47 3,-2.47c1.8,0 2.93,1.07 3,2.47c0,1.4 -1.12,2.53 -3,2.53c-1.8,0 -3,-1.13 -3,-2.53zM39,39h-6c0,0 0,-9.26 0,-10c0,-2 -1,-4 -3.5,-4.04h-0.08c-2.42,0 -3.42,2.06 -3.42,4.04c0,0.91 0,10 0,10h-6v-19h6v2.56c0,0 1.93,-2.56 5.81,-2.56c3.97,0 7.19,2.73 7.19,8.26z'></path>
                    </g>
                  </g>
                </svg>
              </a>
            </Stack>
          </Grid>
        </Grid>
        <Stack
          sx={{ pt: 1.5, borderBottomWidth: 1, borderBottomColor: 'gray', pb: 2, flexWrap: 'wrap' }}
          spacing={2}
          direction='row'
          useFlexGap
          justifyContent='start'
          alignItems='start'
        >
          {pages.map((item, index) => (
            <Link key={index} sx={{ display: 'block', width: 'fit-content', cursor: 'pointer' }} to={item.url}>
              <Typography
                sx={{ color: 'white', fontWeight: 'bold', pt: 0, minWidth: '100px' }}
                component='p'
                variant='body2'
              >
                {item.title}
              </Typography>
            </Link>
          ))}
        </Stack>
        <Box sx={{ pt: 2 }}>
          <Copyright />
        </Box>
      </Container>
    </Box>
  );
}
