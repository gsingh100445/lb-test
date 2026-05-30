import React, { useEffect, useState } from 'react';
import { Paper, Button, Box, Stack, CardContent, Card, Grid } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import cover from '../assets/images/banner-3.webp';
import coverSM from '../assets/images/banner-2.webp';
import coverXS from '../assets/images/banner-xs-new.webp';
import bookImg from '../assets/images/book.webp';
import pickUpImg from '../assets/images/pick-up.webp';
import washImg from '../assets/images/wash.webp';
import deliveryImg from '../assets/images/delivery.webp';
import { EventAvailable, Inventory, LocalLaundryService, LocalShipping } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Banners(props) {
  const navigation = useNavigate();
  const [steps, setSteps] = useState([
    {
      img: bookImg,
      icon: (
        <EventAvailable
          sx={{
            color: '#13263d',
            fontSize: 25,
          }}
        />
      ),
      text: 'Place your order in just a few taps! Select your preferred service and schedule a pickup at a convenient time that works for you.',
      title: 'Schedule Your PickUp',
    },
    {
      img: pickUpImg,
      icon: (
        <Inventory
          sx={{
            color: '#13263d',
            fontSize: 25,
          }}
        />
      ),
      text: 'Our team arrives at your doorstep to collect your laundry. Just bag your clothes, and we’ll handle the rest fast and with care.',
      title: 'We Pick It Up Fast',
    },
    {
      img: washImg,
      icon: (
        <LocalLaundryService
          sx={{
            color: '#13263d',
            fontSize: 25,
          }}
        />
      ),
      text: 'Your laundry is cleaned using top-quality detergents and eco-friendly methods. We ensure the best while keeping your fabrics safe.',
      title: 'Expert Cleaning and Care',
    },
    {
      img: deliveryImg,
      icon: (
        <LocalShipping
          sx={{
            color: '#13263d',
            fontSize: 25,
          }}
        />
      ),
      text: 'Sit back and relax! We’ll deliver your freshly cleaned laundry straight to your doorstep—crisp, spotless, neatly folded, and ready to wear.',
      title: 'Deliver Fresh Laundry',
    },
  ]);

  useEffect(() => {}, []);

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
          height: { xs: '92vh', sm: '42vh', md: '60vh', lg: '65vh' },
          width: '100%',
          pt: { xs: 0, sm: 2, md: 4 },
          pb: { xs: 4, sm: 0, md: 0 },
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundImage: { xs: `url(${coverXS})`, sm: `url(${coverSM})`, md: `url(${cover})` },
        }}
      >
        <div
          className='wrapper'
          style={{
            height: '100%',
            backgroundColor: { xs: 'rgba(0,0,0,0.8)', sm: 'rgba(0,0,0, 0.4)', md: 'none' },
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
                width: { md: '80%', sm: '100%', xs: '100%' },
                height: { md: '100%', sm: '100%', xs: '100%' },
                mt: 'auto',
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
                    color: 'white',
                    textAlign: { md: 'left', sm: 'center', xs: 'left' },
                    typography: { md: 'h3', sm: 'h3', xs: 'h3' },
                    display: { xs: 'none', sm: 'block', md: 'block' },
                  }}
                >
                  <Typography
                    component='span'
                    sx={{
                      textAlign: { md: 'left', sm: 'center', xs: 'left' },
                      typography: { md: 'h3', sm: 'h3', xs: 'h3' },
                      pt: 5,
                      display: 'inline',
                      color: 'primary.main',
                    }}
                  >
                    Laundry and Dry Cleaning Services in Toronto{' '}
                  </Typography>
                  Free pickup and 24hr doorstep delivery!
                </Typography>
                <Typography
                  component='h1'
                  sx={{
                    color: 'white',
                    textAlign: { md: 'left', sm: 'center', xs: 'left' },
                    typography: { md: 'h3', sm: 'h3', xs: 'h3' },
                    display: { xs: 'block', sm: 'none', md: 'none' },
                  }}
                >
                  Laundry and Dry Cleaning Services in Toronto - Free pickup and 24hr doorstep delivery!
                </Typography>
                <Typography
                  className='text-white'
                  component='h2'
                  sx={{
                    textAlign: { md: 'left', sm: 'center', xs: 'left' },
                    typography: { md: 'subtitle1', sm: 'subtitle1', xs: 'subtitle1' },
                    pt: 1,
                    pb: { md: 5, sm: 5, xs: 5 },
                  }}
                >
                  Freshly washed laundry and professionally dry cleaned garments delivered next day in Toronto. Enjoy free
                  pickup and delivery, save big, and hassle-free service with Laundry Basket.
                </Typography>
                <Grid
                  spacing={2}
                  container
                  sx={{ justifyContent: { md: 'left', sm: 'center', xs: 'left' } }}
                  alignItems='center'
                >
                  <Grid item xs={12} sm={6} md={6} sx={{ textAlign: { md: 'left', sm: 'center', xs: 'left' } }}>
                    <Button
                      sx={{
                        px: 2,
                        mr: 2,
                      }}
                      onClick={() => {
                        navigation(props.isLoggedIn ? '/book-order' : '/login?redirect=book-order');
                      }}
                      color='primary'
                      variant='contained'
                    >
                      <Typography sx={{ color: 'white', fontWeight: 'bold' }} component="h3" variant='subtitle1' textAlign='center'>
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
      <Container
        sx={{ display: { xs: 'none', sm: 'block', md: 'block' } }}
        style={{
          paddingLeft: '0px',
          paddingRight: '0px',
          paddingTop: '45px',
          maxWidth: 'none',
        }}
        maxWidth='xlg'
      >
        <Grid spacing={2} sx={{ pb: 3, px: { xs: 2, sm: 2, md: 5 } }} alignItems='stretch' container>
          {steps.map((step, i) => (
            <Grid key={i} item xs={6} sm={6} md={3}>
              <Card
                sx={[
                  {
                    py: { xs: 0, sm: 2, md: 1 },
                    px: { xs: 0, sm: 2, md: 1 },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    height: '100%',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url(${step.img})`,
                  },
                  (theme) => ({
                    border: 'none',
                    boxShadow: `0 0 12px hsla(210, 98%, 42%, 0.2)`,
                    ...theme.applyStyles('dark', {
                      boxShadow: `0 0 12px hsla(0, 0%, 0%, 0.8)`,
                    }),
                  }),
                ]}
              >
                <CardContent>
                  <Stack direction='row' useFlexGap justifyContent='between' alignItems='center' sx={{ pb: 1 }}>
                    <Typography className='w-full text-left text-white' sx={{ pr: 3 }} variant='h6'>
                      {step.title}
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: 'text.white',
                        borderRadius: '50%',
                        padding: '5px',
                      }}
                    >
                      {step.icon}
                    </Box>
                  </Stack>
                  <Typography className='w-full text-left text-white pt-2' sx={{ lineHeight: 1 }} variant='subtitle2'>
                    {step.text}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}
