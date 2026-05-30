import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, Paper } from '@mui/material';
import coverSM from '../assets/images/banner-2.webp';
import { useNavigate } from 'react-router-dom';
import HowLBWorks from './shared/HowLBWorks';
import LaundryPricing from './shared/LaundryPricing';
import { Helmet } from 'react-helmet-async';

export default function PressingServiceNearMe(props) {
  const navigation = useNavigate();

  React.useEffect(() => {
    document.title = 'Pressing Service Near Me - Laundry PickUp and Delivery from Laundry Basket';
  }, []);

  return (
    <Container
      style={{
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '60px',
        paddingBottom: '30px',
        maxWidth: 'none',
      }}
      sx={{ width: '100%' }}
    >
      <Paper
        style={{
          borderRadius: 0,
        }}
        sx={{
          height: '50vh',
          width: '100%',
          pt: 0,
          pb: 0,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${coverSM})`,
        }}
      >
        <div
          className='wrapper'
          style={{
            height: '100%',
            backgroundColor: 'rgba(0,0,0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            borderBottomLeftRadius: '0',
            borderBottomRightRadius: '0',
          }}
        >
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div className='wrapper-div'>
            <span className='dot'></span>
          </div>
          <div style={{ zIndex: 99, width: '100%', height: '100%', display: 'contents' }} className='text-center'>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                pl: { md: '4%', sm: '2%', xs: '2%' },
                pr: { md: '2%', sm: '0%', xs: '2%' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box className='wow fadeIn' sx={{ my: 'auto' }}>
                <Typography
                  component='h1'
                  sx={{
                    color: 'white',
                    textAlign: 'center',
                    typography: { md: 'h4', sm: 'h4', xs: 'h4' },
                    display: 'block',
                    pb: { md: 5, sm: 5, xs: 5 },
                  }}
                >
                  Say Goodbye to Wrinkles
                  <Typography
                    component='span'
                    sx={{
                      textAlign: 'center',
                      typography: { md: 'h4', sm: 'h4', xs: 'h4' },
                      pt: 5,
                      display: 'inline',
                      color: 'primary.main',
                    }}
                  >
                    {' '}
                    Let{' '}
                    <a
                      style={{ cursor: 'pointer', color: '#0095ff' }}
                      href='https://www.laundrybasket.ca'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Laundry Basket
                    </a>{' '}
                  </Typography>
                  Handle the Pressing!
                </Typography>
                <Grid
                  spacing={2}
                  container
                  sx={{ justifyContent: { md: 'left', sm: 'center', xs: 'left' } }}
                  alignItems='center'
                >
                  <Grid item xs={12} sm={12} md={12} sx={{ textAlign: 'center' }}>
                    <Button
                      sx={{
                        px: 3,
                        mr: 2,
                      }}
                      onClick={() => {
                        navigation(props.isLoggedIn ? '/book-order' : '/login?redirect=book-order');
                      }}
                      color='primary'
                      variant='contained'
                    >
                      <Typography sx={{ color: 'white' }} variant='title' textAlign='center'>
                        Schedule PickUp
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </div>
        </div>
      </Paper>
      <Helmet>
        <meta
          name='description'
          content='Discover professional pressing services near you with Laundry Basket. Enjoy wrinkle-free clothes delivered right to your door. Book now!'
        />
        <meta
          name='keywords'
          content='pressing service, pressing near me, laundry pickup, laundry delivery, wrinkle-free clothes, professional pressing, laundry basket'
        />
        <link rel='canonical' href='https://www.laundrybasket.ca/pressing-service-near-me' />
      </Helmet>
      <HowLBWorks isDryClean={false}></HowLBWorks>
      <Box sx={{ background: '#13263d', mt: { xs: 4, sm: 8 }, mb: { xs: 6, sm: 4 } }}>
        <Box sx={{ width: '90%', mx: 'auto', py: { xs: 4, sm: 6 } }}>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item xs={12} sm={6} md={6}>
              <Typography sx={{ color: 'white', pt: 2 }} variant='title' component='p' textAlign='left'>
                Pressing Service Near You
              </Typography>
              <Typography sx={{ color: 'white', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
                Tired of spending hours behind an pressing board? Looking for a reliable{' '}
                <a
                  style={{ cursor: 'pointer', color: '#0095ff' }}
                  href='https://www.laundrybasket.ca/wash-and-iron'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  wash and iron
                </a>{' '}
                or{' '}
                <a
                  style={{ cursor: 'pointer', color: '#0095ff' }}
                  href='https://www.laundrybasket.ca/ironing'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  pressing
                </a>{' '}
                service in your area?{' '}
                <a
                  style={{ cursor: 'pointer', color: '#0095ff' }}
                  href='https://www.laundrybasket.ca'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Laundry Basket
                </a>{' '}
                offers professional{' '}
                <a
                  style={{ cursor: 'pointer', color: '#0095ff' }}
                  href='https://www.laundrybasket.ca/wash-and-iron'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  wash & iron
                </a>{' '}
                and{' '}
                <a
                  style={{ cursor: 'pointer', color: '#0095ff' }}
                  href='https://www.laundrybasket.ca/ironing'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  pressing
                </a>{' '}
                pickup and delivery right from your home!
              </Typography>
              <Typography sx={{ color: 'white', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
                At{' '}
                <a
                  style={{ cursor: 'pointer', color: '#0095ff' }}
                  href='https://www.laundrybasket.ca'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Laundry Basket
                </a>
                , we understand the importance of well-pressed garments. That’s why our trained team uses professional
                equipment to deliver wrinkle-free results — from shirts and pants to linens and uniforms.
              </Typography>
              <Typography sx={{ color: 'white', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
                With our convenient scheduling, eco-conscious practices, and dedication to quality, we make it easy to look
                polished every day. Book your{' '}
                <a
                  style={{ cursor: 'pointer', color: '#0095ff' }}
                  href='https://www.laundrybasket.ca/wash-and-iron'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  wash and iron
                </a>{' '}
                or{' '}
                <a
                  style={{ cursor: 'pointer', color: '#0095ff' }}
                  href='https://www.laundrybasket.ca/ironing'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  pressing
                </a>{' '}
                service today through our simple website or mobile app — 7 days a week, no pressing board needed!
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} md={5}>
              <img
                className='how-it-works-img'
                src={require('../assets/images/services/wash-fold.webp')}
                alt='Customer receiving dry cleaned clothes at home'
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <LaundryPricing {...props}></LaundryPricing>
    </Container>
  );
}
