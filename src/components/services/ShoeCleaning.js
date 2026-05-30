import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, Paper, Stack } from '@mui/material';
import coverSM from '../../assets/images/banner-2.webp';
import { useNavigate } from 'react-router-dom';
import { AssignmentTurnedIn, Inventory2, LocalLaundryService, SwitchAccessShortcut } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { firstOrderDiscount } from '../../utils/config';

export default function ShoeCleaning(props) {
  const navigation = useNavigate();

  const [service, setService] = React.useState();

  React.useEffect(() => {
    document.title = 'Shoe Cleaning - Laundry Basket';
  }, []);

  React.useEffect(() => {}, [service]);

  React.useEffect(() => {
    if (props.servicesLoaded) {
      for (const serviceItem of props.services) {
        if (serviceItem.name === 'Shoe Cleaning') {
          setService(serviceItem);
        }
      }
    }
  }, [props.services, props.servicesLoaded]);

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
                  Shoe Cleaning
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
                  Shoe Cleaning is perfect for restoring the look and lifespan of your favorite footwear, from sneakers to
                  formal shoes.
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
                  Leave your shoe care to{' '}
                  <a
                    style={{ cursor: 'pointer', color: '#0095ff' }}
                    href='https://www.laundrybasket.ca'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Laundry Basket
                  </a>{' '}
                  so you can step out in style without the hassle.
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
        <meta
          name='description'
          content='Shoe Cleaning is perfect for restoring the look and lifespan of your favorite footwear, from sneakers to formal shoes. Leave your shoe care to Laundry Basket so you can step out in style without the hassle.'
        />
        <meta
          name='keywords'
          content='Shoe Cleaning, Footwear Care, Sneaker Cleaning, Formal Shoe Cleaning, Laundry Basket'
        />
        <meta name='canonical' content='https://www.laundrybasket.ca/shoe-cleaning' />
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
              Inspection and Assessment
            </Typography>
            <Typography sx={{ color: 'text.secondary', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
              We thoroughly inspect your shoes for material type, wear, stains, and necessary repairs to determine the best
              cleaning approach.
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
              Professional Cleaning
            </Typography>
            <Typography sx={{ color: 'text.secondary', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
              Each shoe is cleaned carefully by hand or machine (depending on material) to lift dirt, refresh color, and
              restore original condition.
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
              Drying and Finishing
            </Typography>
            <Typography sx={{ color: 'text.secondary', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
              Shoes are air-dried, conditioned, and finished with care. We ensure they're ready to wear again — clean, fresh,
              and revitalized.
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
            <Grid item xs={12} sm={6} md={6}>
              <Typography sx={{ color: 'white', pt: 2, pb: 2 }} variant='h5' component='h5' textAlign='left'>
                Pricing That Fits Your Needs
              </Typography>
              {service &&
                service.items.map((serviceItem, index) => (
                  <Stack
                    key={index}
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                    gap={2}
                    sx={{ my: 1, width: { xs: '100%', sm: '75%' }, mr: 'auto', borderBottomWidth: '.5px', pb: 0.5 }}
                  >
                    <Typography sx={{ color: 'white' }} variant='subtitle1'>
                      {serviceItem.name}
                    </Typography>
                    {serviceItem.currentPrice && (
                      <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }} variant='subtitle1'>
                        ${Number(serviceItem.currentPrice).toFixed(2)}
                      </Typography>
                    )}
                    {serviceItem.startingPrice && !serviceItem.currentPrice && (
                      <Typography sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'right' }} variant='subtitle1'>
                        <Typography sx={{ color: 'primary.main', fontWeight: 'bold', display: 'inline' }} variant='body1'>
                          Starting from
                        </Typography>{' '}
                        ${Number(serviceItem.startingPrice).toFixed(2)}
                      </Typography>
                    )}
                  </Stack>
                ))}
            </Grid>
            <Grid item xs={12} sm={5.5} md={5.5} sx={{ pt: { xs: 3, sm: 0 } }}>
              <img
                className='how-it-works-img'
                src={require('../../assets/images/services/shoe-clean.webp')}
                alt='Sneaker and boot cleaning with North York, Vaughan and Richmond Hill pickup'
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
