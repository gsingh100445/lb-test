import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, Paper, Stack } from '@mui/material';
import coverSM from '../../assets/images/banner-2.webp';
import { useNavigate } from 'react-router-dom';
import { AssignmentTurnedIn, Inventory2, LocalLaundryService, SwitchAccessShortcut } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { firstOrderDiscount } from '../../utils/config';

export default function WashAndIronjs(props) {
  const navigation = useNavigate();

  React.useEffect(() => {
    document.title = 'Wash and Iron - Laundry Basket';
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
                width: { md: '60%', sm: '100%', xs: '100%' },
                height: '100%',
                mr: 'auto',
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
                    color: 'primary.main',
                    textAlign: 'left',
                    typography: { md: 'h2', sm: 'h2', xs: 'h2' },
                    display: 'block',
                  }}
                >
                  Wash & Iron
                </Typography>
                <Typography
                  component='p'
                  sx={{
                    textAlign: 'left',
                    typography: 'title',
                    pt: 1,
                    color: 'white',
                  }}
                >
                  Wash and Fold is the perfect service if you want freshly cleaned and perfectly pressed clothes without
                  lifting
                </Typography>
                <Typography
                  component='p'
                  sx={{
                    textAlign: 'left',
                    typography: 'title',
                    pt: 1,
                    pb: 3,
                    color: 'white',
                  }}
                >
                  Let{' '}
                  <a
                    style={{ cursor: 'pointer', color: '#0095ff' }}
                    href='https://www.laundrybasket.ca'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Laundry Basket
                  </a>{' '}
                  wash and iron your clothes so you can enjoy fresh, perfectly pressed outfits without lifting a finger.
                </Typography>
                <Grid
                  spacing={2}
                  container
                  sx={{ justifyContent: { md: 'left', sm: 'center', xs: 'left' } }}
                  alignItems='center'
                >
                  <Grid item xs={12} sm={12} md={12} sx={{ textAlign: 'left' }}>
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
        <title>Wash and Iron - Laundry Basket</title>
        <meta
          name='description'
          content='Wash and Iron service by Laundry Basket offers expertly cleaned and pressed clothes with convenient pickup and delivery in North York, Vaughan and Richmond Hill.'
        />
        <meta
          name='keywords'
          content='Wash and Iron, laundry service, North York, Vaughan, Richmond Hill, clothing care, ironing service, pickup and delivery'
        />
        <link rel='canonical' href='https://www.laundrybasket.ca/wash-and-iron' />
      </Helmet>
      <Box sx={{ width: '90%', mx: 'auto', pt: { xs: 4, sm: 6 } }}>
        <Typography sx={{ color: 'text.secondary' }} variant='h5' component='h5' textAlign='left'>
          How it works
        </Typography>
        <Grid spacing={8} sx={{ pt: 3 }} alignItems='stretch' container>
          <Grid item xs={12} sm={4} md={4}>
            <Stack sx={{ pt: 2 }} spacing={2} direction='row' useFlexGap justifyContent='start' alignItems='center'>
              <Box
                sx={{
                  backgroundColor: 'model.lite',
                  padding: 1,
                  borderRadius: '50%',
                }}
              >
                <AssignmentTurnedIn sx={{ fontSize: 35 }} />
              </Box>
              <Box sx={{ background: 'gray', width: '90%', height: '.5px' }}></Box>
            </Stack>
            <Typography
              sx={{ color: 'text.secondary', pt: 3, fontWeight: 'bold' }}
              variant='title'
              component='p'
              textAlign='left'
            >
              Clothes Inspection
            </Typography>
            <Typography sx={{ color: 'text.secondary', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
              At{' '}
              <a
                style={{ cursor: 'pointer', color: '#0095ff' }}
                href='https://www.laundrybasket.ca'
                target='_blank'
                rel='noopener noreferrer'
              >
                Laundry Basket
              </a>
              , we take extra care with your garments. As part of our service, we carefully inspect all clothes and check
              every pocket before washing. This extra step helps protect your belongings and maintain the quality and safety
              of your laundry.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Stack sx={{ pt: 2 }} spacing={2} direction='row' useFlexGap justifyContent='start' alignItems='center'>
              <Box
                sx={{
                  backgroundColor: 'model.lite',
                  padding: 1,
                  borderRadius: '50%',
                }}
              >
                <LocalLaundryService sx={{ fontSize: 35 }} />
              </Box>
              <Box sx={{ background: 'gray', width: '90%', height: '.5px' }}></Box>
            </Stack>
            <Typography
              sx={{ color: 'text.secondary', pt: 3, fontWeight: 'bold' }}
              variant='title'
              component='p'
              textAlign='left'
            >
              Careful Cleaning and Ironing
            </Typography>
            <Typography sx={{ color: 'text.secondary', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
              Your clothes are washed with the right care to preserve fabric quality, then expertly ironed to a crisp, smooth
              finish. Each item is checked to ensure it's fresh, clean, and perfectly pressed.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Stack sx={{ pt: 2 }} spacing={2} direction='row' useFlexGap justifyContent='start' alignItems='center'>
              <Box
                sx={{
                  backgroundColor: 'model.lite',
                  padding: 1,
                  borderRadius: '50%',
                }}
              >
                <Inventory2 sx={{ fontSize: 35 }} />
              </Box>
              <Box sx={{ background: 'gray', width: '90%', height: '.5px' }}></Box>
            </Stack>
            <Typography
              sx={{ color: 'text.secondary', pt: 3, fontWeight: 'bold' }}
              variant='title'
              component='p'
              textAlign='left'
            >
              Folding and Finishing
            </Typography>
            <Typography sx={{ color: 'text.secondary', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
              Ironed clothes are folded neatly or hung (based on your preferences) and prepared for easy use. We’ll text you
              with your delivery driver's estimated arrival time on your delivery day.
            </Typography>
          </Grid>
        </Grid>
        <Button
          sx={{
            mt: 3,
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
        <Typography
          sx={{ color: 'text.secondary', pt: 1, fontWeight: 'bold' }}
          variant='subtitle'
          component='p'
          textAlign='left'
        >
          <SwitchAccessShortcut sx={{ mb: 2.5, fontSize: 30 }} /> {firstOrderDiscount}% OFF on first order
        </Typography>
      </Box>

      <Box
        sx={{
          width: '90%',
          mx: 'auto',
          background: '#13263d',
          mt: { xs: 4, sm: 8 },
          mb: { xs: 6, sm: 8 },
          borderRadius: '15px',
        }}
      >
        <Box sx={{ width: { xs: '90%', sm: '95%' }, mx: 'auto', py: { xs: 2, sm: 3 } }}>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item xs={12} sm={8} md={8}>
              <Typography sx={{ color: 'white', pt: 2 }} variant='h6' component='h6' textAlign='left'>
                Pricing That Fits Your Needs
              </Typography>
              <Typography sx={{ color: 'white', pt: 2 }} variant='subtitle1' component='p' textAlign='left'>
                At{' '}
                <a
                  style={{ cursor: 'pointer', color: '#0095ff' }}
                  href='https://www.laundrybasket.ca'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Laundry Basket
                </a>
                , we offer flexible pricing for Wash & Iron services based on garment type and quantity. Enjoy clear, upfront
                rates with no hidden fees — only pay for the care you need.
              </Typography>
              <Typography sx={{ color: 'white', pt: 2 }} variant='title' component='p' textAlign='left'>
                $ 4.25 / lb
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3.5} md={3.5} sx={{ pt: { xs: 3, sm: 0 } }}>
              <img
                className='how-it-works-img'
                src={require('../../assets/images/services/wash-iron.webp')}
                alt='Expert wash and iron laundry with pickup in North York, Vaughan and Richmond Hill'
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
