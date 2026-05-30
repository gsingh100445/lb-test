import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, Paper, Stack } from '@mui/material';
import coverSM from '../../assets/images/banner-2.webp';
import { useNavigate } from 'react-router-dom';
import { AssignmentTurnedIn, Inventory2, LocalLaundryService, SwitchAccessShortcut } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { firstOrderDiscount } from '../../utils/config';

export default function HomeCare(props) {
  const navigation = useNavigate();

  const [service, setService] = React.useState();

  React.useEffect(() => {
    document.title = 'Home Care - Laundry Basket';
  }, []);

  React.useEffect(() => {}, [service]);

  React.useEffect(() => {
    if (props.servicesLoaded) {
      for (const serviceItem of props.services) {
        if (serviceItem.name === 'Home Care') {
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
                  Home Care
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
                  Home Care is your solution for cleaning household items like curtains, bedsheets, comforters, and more —
                  freshening up your living space easily.
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
                  refresh your home essentials so you can relax in a cleaner, more comfortable space.
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
          content='Laundry Basket offers Home Care services for cleaning household items like curtains, bedsheets, and comforters. Enjoy fresh, clean living spaces with our easy pickup and delivery service.'
        />
        <meta
          name='keywords'
          content='Home Care, laundry service, household cleaning, curtains, bedsheets, comforters, North York, Vaughan, Richmond Hill, easy pickup and delivery'
        />
        <meta name='canonical' href='https://www.laundrybasket.ca/home-care' />
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
              Item Inspection
            </Typography>
            <Typography sx={{ color: 'text.secondary', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
              We carefully inspect all home items for stains, material sensitivities, and special washing instructions to
              ensure the right treatment.
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
              Gentle Cleaning
            </Typography>
            <Typography sx={{ color: 'text.secondary', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
              Large and delicate items are cleaned using methods that protect their fabrics and preserve their appearance,
              softness, and durability.
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
              Items are neatly folded and packaged after cleaning, ready for immediate use or easy storage. We’ll notify you
              when your delivery is on the way.
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
            <Grid item xs={12} sm={5} md={5}>
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
                    sx={{ my: 1, width: { xs: '100%', sm: '75%' }, mr: 'auto', borderBottomWidth: '.5px' }}
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
            <Grid item xs={12} sm={7} md={7} sx={{ pt: { xs: 3, sm: 0 } }}>
              <img
                className='how-it-works-img'
                src={require('../../assets/images/services/home-care.webp')}
                alt='Home laundry service with free pickup in North York, Vaughan and Richmond Hill'
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
