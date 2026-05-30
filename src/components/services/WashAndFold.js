import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, Paper, Stack } from '@mui/material';
import coverSM from '../../assets/images/banner-2.webp';
import { useNavigate } from 'react-router-dom';
import { AssignmentTurnedIn, Inventory2, LocalLaundryService, SwitchAccessShortcut } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { firstOrderDiscount } from '../../utils/config';

export default function WashAndFold(props) {
  const navigation = useNavigate();

  React.useEffect(() => {
    document.title = 'Wash and Fold - Laundry Basket';
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
                  Wash & Fold
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
                  Wash and Fold is the perfect service to use if you want to avoid doing laundry and save your time and your
                  sanity.
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
                  do your laundry for you so you can focus on more important things.
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
          content='Wash and Fold is the perfect service to use if you want to avoid doing laundry and save your time and your sanity. Let Laundry Basket do your laundry for you so you can focus on more important things.'
        />
        <meta name='keywords' content='Wash and Fold, Laundry Service, Laundry Basket, North York, Vaughan, Richmond Hill' />
        <link rel='canonical' href='https://www.laundrybasket.ca/wash-and-fold' />
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
              Careful Cleaning
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
              , we fold everything so you don’t have to. Your clothes are crisply folded, your socks are neatly paired, and
              everything is prepared to be worn or put away as soon as it's delivered to your door. We take pride in making
              laundry day easy for you.
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
              Sit back and relax with fresh {props.isDryClean ? ' clothes ' : ' laundry '} delivered right to your door.
              Standard turnaround is 24-48 hours, with faster options available. On your delivery day, we’ll text you with
              your driver’s estimated arrival time.
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
                , we offer flexible pricing tailored to your laundry needs. Whether it’s a small load or a full week’s worth
                of clothes, you’ll enjoy clear, upfront rates with no hidden fees. Pay only for what you need, when you need
                it.
              </Typography>
              <Typography sx={{ color: 'white', pt: 2 }} variant='title' component='p' textAlign='left'>
                $ 1.99 / lb
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3.5} md={3.5} sx={{ pt: { xs: 3, sm: 0 } }}>
              <img
                className='how-it-works-img'
                src={require('../../assets/images/services/wash-fold.webp')}
                alt='North York, Vaughan and Richmond Hill laundry pickup and folded clothes delivery'
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
