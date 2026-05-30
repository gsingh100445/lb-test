import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, Paper } from '@mui/material';
import coverSM from '../assets/images/banner-2.webp';
import { useNavigate } from 'react-router-dom';
import HowLBWorks from './shared/HowLBWorks';
import LaundryPricing from './shared/LaundryPricing';
import { Helmet } from 'react-helmet-async';

export default function LaundryServiceNorthYork(props) {
  const navigation = useNavigate();

  React.useEffect(() => {
    document.title = 'Laundry Service North York - Laundry PickUp and Delivery from Laundry Basket';
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
                  Laundry made simple in North York. Pickup, clean, and delivery — all handled by
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
                    <a
                      style={{ cursor: 'pointer', color: '#0095ff' }}
                      href='https://www.laundrybasket.ca'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Laundry Basket
                    </a>
                    .
                  </Typography>
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
          content='Laundry Basket offers convenient laundry pickup and delivery services in North York. Enjoy wash and fold, wash and iron, or dry cleaning with eco-friendly solutions. Schedule your service today!'
        />
        <meta
          name='keywords'
          content='Laundry Service North York, laundry pickup and delivery, wash and fold, wash and iron, dry cleaning, eco-friendly laundry service'
        />
        <link rel='canonical' href='https://www.laundrybasket.ca/laundry-service-north-york' />
      </Helmet>
      <HowLBWorks isDryClean={false}></HowLBWorks>
      <Box sx={{ background: '#13263d', mt: { xs: 4, sm: 8 }, mb: { xs: 6, sm: 4 } }}>
        <Box sx={{ width: '90%', mx: 'auto', py: { xs: 4, sm: 6 } }}>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item xs={12} sm={6} md={6}>
              <Typography sx={{ color: 'white', pt: 2 }} variant='title' component='p' textAlign='left'>
                Laundry Service North York
              </Typography>
              <Typography sx={{ color: 'white', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
                <a
                  style={{ cursor: 'pointer', color: '#0095ff' }}
                  href='https://www.laundrybasket.ca'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Laundry Basket
                </a>{' '}
                makes laundry day effortless with expert pickup and delivery services in North York.
              </Typography>
              <Typography sx={{ color: 'white', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
                Whether it's{' '}
                <a
                  style={{ cursor: 'pointer', color: '#0095ff' }}
                  href='https://www.laundrybasket.ca/wash-and-fold'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  wash and fold
                </a>
                ,{' '}
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
                  href='https://www.laundrybasket.ca/dry-cleaning'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  dry cleaning
                </a>
                , trust our team to handle your garments with care and eco-friendly solutions.
              </Typography>
              <Typography sx={{ color: 'white', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
                Schedule your North York laundry service today and reclaim your free time!
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} md={5}>
              <img
                className='how-it-works-img'
                src={require('../assets/images/services/wash-fold.webp')}
                alt='Professional laundry pickup and delivery in North York'
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <LaundryPricing {...props}></LaundryPricing>
    </Container>
  );
}
