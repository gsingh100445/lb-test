import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, Paper } from '@mui/material';
import coverSM from '../assets/images/banner-2.webp';
import { useNavigate } from 'react-router-dom';
import HowLBWorks from './shared/HowLBWorks';

export default function DryCleanerThornhill(props) {
  const navigation = useNavigate();

  React.useEffect(() => {
    document.title = 'Dry Cleaner Thornhill - Dry Clean PickUp and Delivery from Laundry Basket';
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
                  component='h2'
                  sx={{
                    color: 'white',
                    textAlign: 'center',
                    typography: { md: 'h4', sm: 'h4', xs: 'h4' },
                    display: 'block',
                    pb: { md: 5, sm: 5, xs: 5 },
                  }}
                >
                  Skip the hassle of dry cleaner trips.
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
                    Laundry Basket picks up, cleans, and delivers{' '}
                  </Typography>
                  right to your door in Thornhill.
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
      <HowLBWorks isDryClean={true}></HowLBWorks>
      <Box sx={{ background: '#13263d', mt: { xs: 4, sm: 8 }, mb: { xs: 6, sm: 4 } }}>
        <Box sx={{ width: '90%', mx: 'auto', py: { xs: 4, sm: 6 } }}>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item xs={12} sm={6} md={6}>
              <Typography sx={{ color: 'white', pt: 2 }} variant='title' component='p' textAlign='left'>
                Dry Cleaner Thornhill
              </Typography>
              <Typography sx={{ color: 'white', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
                Searching for a dependable dry cleaner in Thornhill? Laundry Basket makes it easy with professional dry
                cleaning pickup and delivery to your home!
              </Typography>
              <Typography sx={{ color: 'white', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
                Enjoy expert cleaning with a strong focus on eco-friendly methods and customer satisfaction. Trust Laundry
                Basket to keep your clothes fresh and perfectly cleaned without any hassle.
              </Typography>
              <Typography sx={{ color: 'white', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
                Schedule your Thornhill dry cleaning pickup online or through our app — available 7 days a week!
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5} md={5}>
              <img
                className='how-it-works-img'
                src={require('../assets/images/services/dry-cleaning.webp')}
                alt='Dry cleaned clothes with pickup and delivery in Thornhill'
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
