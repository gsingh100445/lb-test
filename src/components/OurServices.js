import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button, Grid, Paper } from '@mui/material';
import cover from '../assets/images/saloon.webp';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function OurServices(props) {
  const navigate = useNavigate();
  const [servicesLoaded, setServicesLoaded] = React.useState(false);

  React.useEffect(() => {
    if (props.servicesLoaded) {
      setServicesLoaded(props.servicesLoaded);
    }
  }, [props.servicesLoaded]);

  React.useEffect(() => {
    document.title = 'Services - Laundry Basket, Laundry & Dry Cleaning, Pickup and Delivery!';
  }, []);

  return (
    <Container
      maxWidth='xlg'
      style={{
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '60px',
        paddingBottom: '90px',
        maxWidth: 'none',
      }}
      sx={{ width: '100%' }}
    >
      <Paper
        sx={{
          height: { xs: '100px', sm: '150px' },
          width: '100%',
          borderRadius: 0,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${cover})`,
        }}
      >
        <div
          className='wrapper'
          style={{
            height: '100%',
            backgroundColor: 'rgba(0,0,0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
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
          <div style={{ zIndex: 99 }} className='text-center'>
            <div className='text-center'>
              <Typography
                component='h1'
                className='text-center'
                sx={{ color: 'text.white', typography: { sm: 'h3', xs: 'h3' } }}
              >
                Our Services
              </Typography>
            </div>
          </div>
        </div>
      </Paper>
      <Helmet>
        <meta
          name='description'
          content='Discover our range of laundry services including Wash & Fold, Dry Cleaning, Home Care, Shoe Cleaning, and more. Enjoy hassle-free laundry with Laundry Basket!'
        />
        <meta name='keywords' content='Laundry, Dry Cleaning, Wash & Fold, Wash & Iron, Home Care, Shoe Cleaning, Ironing' />
        <link rel='canonical' href='https://www.laundrybasket.ca/services' />
      </Helmet>
      {servicesLoaded && (
        <Box sx={{ width: { xs: '90%', sm: '90%', md: '95%' }, mx: 'auto' }}>
          {/* Wash & Fold */}
          <Grid
            container
            spacing={2.5}
            sx={{
              pt: { xs: 6, sm: 9 },
              px: { xs: 0, sm: 2, md: 5 },
            }}
          >
            <Grid sx={{ height: 'auto', alignContent: 'center' }} item xs={12} sm={12} md={7}>
              <Box sx={{ width: { xs: '100%', sm: '100%', md: '95%' }, mr: 'auto' }}>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/wash-and-fold');
                  }}
                >
                  <a
                    style={{ cursor: 'pointer', color: '#0095ff' }}
                    href='https://www.laundrybasket.ca/wash-and-fold'
                    rel='noopener noreferrer'
                  >
                    <Typography component='h3' variant='h3' sx={{ color: 'text.secondary', pb: 1.5 }}>
                      Wash &
                      <Typography variant='h3' sx={{ color: 'text.primary', display: 'inline' }}>
                        {' '}
                        Fold
                      </Typography>
                    </Typography>
                  </a>
                  <Typography variant='subtitle2' sx={{ color: 'text.secondary', pb: 1 }}>
                    Tired of spending your precious time sorting, washing, and folding laundry? With{' '}
                    <b>
                      <a
                        style={{ cursor: 'pointer', color: '#0095ff' }}
                        href='https://www.laundrybasket.ca/wash-and-fold'
                        rel='noopener noreferrer'
                      >
                        Laundry Basket's Wash and Fold
                      </a>{' '}
                    </b>{' '}
                    service, you can skip laundry day altogether and reclaim your time and peace of mind.
                  </Typography>
                  <Typography variant='subtitle2' sx={{ color: 'text.secondary', pb: 1 }}>
                    We’ll pick up your laundry, wash it exactly how you like, and deliver it fresh and neatly folded right to
                    your doorstep. Each order is washed in its own machine, with care taken to follow your personal
                    preferences — yes, even your socks are paired!
                  </Typography>
                  <Typography variant='subtitle2' sx={{ color: 'text.secondary', pb: 1 }}>
                    Let{' '}
                    <b>
                      <a
                        style={{ cursor: 'pointer', color: '#0095ff' }}
                        href='https://www.laundrybasket.ca'
                        rel='noopener noreferrer'
                      >
                        Laundry Basket
                      </a>
                    </b>{' '}
                    handle the laundry, so you can focus on what truly matters — work, family, or simply enjoying more of
                    your day.
                  </Typography>
                  <Typography variant='title' sx={{ color: 'primary.main', pb: 2 }}>
                    Price: $ 1.99 / lb
                  </Typography>
                  <br />
                </div>
                <Button sx={{ mt: { xs: 1, sm: 1 }, fontSize: 18, fontWeight: 600, px: 1 }} variant='contained'>
                  <Link to={props.isLoggedIn ? '/book-order' : '/login?redirect=book-order'}>Schedule PickUp</Link>
                </Button>
              </Box>
            </Grid>
            <Grid sx={{ height: 'auto', alignContent: 'center', mt: { xs: 1, sm: 0 } }} item xs={12} sm={12} md={5}>
              <img
                className='how-it-works-img'
                src={require('../assets/images/services/wash-fold.webp')}
                alt='Neatly folded clothes from our wash and fold service'
              />
            </Grid>
          </Grid>

          {/* Wash & Iron */}
          <Grid
            container
            spacing={2.5}
            sx={{
              pt: { xs: 6, sm: 9 },
              px: { xs: 0, sm: 2, md: 5 },
            }}
          >
            <Grid
              sx={{ height: 'auto', alignContent: 'center', display: { xs: 'none', sm: 'none', md: 'flex' } }}
              item
              xs={12}
              sm={12}
              md={5}
            >
              <img
                className='how-it-works-img'
                src={require('../assets/images/services/wash-iron.webp')}
                alt='Professionally washed and ironed shirts ready for delivery'
              />
            </Grid>
            <Grid sx={{ height: 'auto', alignContent: 'center' }} item xs={12} sm={12} md={7}>
              <Box sx={{ width: { xs: '100%', sm: '100%', md: '95%' }, ml: 'auto' }}>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/wash-and-iron');
                  }}
                >
                  <a
                    style={{ cursor: 'pointer', color: '#0095ff' }}
                    href='https://www.laundrybasket.ca/wash-and-iron'
                    rel='noopener noreferrer'
                  >
                    <Typography component='h3' variant='h3' sx={{ color: 'text.secondary', pb: 1.5 }}>
                      Wash &
                      <Typography variant='h3' sx={{ color: 'text.primary', display: 'inline' }}>
                        {' '}
                        Iron
                      </Typography>
                    </Typography>
                  </a>
                  <Typography variant='subtitle2' sx={{ color: 'text.secondary', pb: 1 }}>
                    Take the hassle out of laundry with our{' '}
                    <a
                      style={{ cursor: 'pointer', color: '#0095ff' }}
                      href='https://www.laundrybasket.ca/wash-and-iron'
                      rel='noopener noreferrer'
                    >
                      Wash and Iron
                    </a>{' '}
                    service — perfect for everyday wear that needs to look clean and crisp. We wash your clothes with care,
                    iron them to perfection, and return them neatly folded or hung, ready to wear. It’s the easiest way to
                    keep your wardrobe fresh and polished without the effort.
                  </Typography>
                  <Typography variant='subtitle2' sx={{ color: 'text.secondary', pb: 1 }}>
                    We handle each item with attention to detail, so you get laundry that feels and looks great — every
                    single time.
                  </Typography>
                  <Typography variant='subtitle2' sx={{ color: 'text.secondary', pb: 2, fontWeight: 'bold' }}>
                    Cleaned. Pressed. Delivered.
                  </Typography>
                  <Typography variant='title' sx={{ color: 'primary.main', pb: 2 }}>
                    Price: $ 4.25 / lb
                  </Typography>
                  <br />
                </div>
                <Button sx={{ mt: { xs: 1, sm: 1 }, fontSize: 18, fontWeight: 600, px: 1 }} variant='contained'>
                  <Link to={props.isLoggedIn ? '/book-order' : '/login?redirect=book-order'}>Schedule PickUp</Link>
                </Button>
              </Box>
            </Grid>
            <Grid
              sx={{
                height: 'auto',
                alignContent: 'center',
                display: { xs: 'block', sm: 'block', md: 'none' },
                mt: { xs: 1, sm: 0 },
              }}
              item
              xs={12}
              sm={12}
              md={5}
            >
              <img
                className='how-it-works-img'
                src={require('../assets/images/services/wash-iron.webp')}
                alt='Professionally washed and ironed shirts ready for delivery'
              />
            </Grid>
          </Grid>

          {/* Dry Cleaning */}
          <Grid
            container
            spacing={2.5}
            sx={{
              pt: { xs: 6, sm: 9 },
              px: { xs: 0, sm: 2, md: 5 },
            }}
          >
            <Grid sx={{ height: 'auto', alignContent: 'center' }} item xs={12} sm={12} md={7}>
              <Box sx={{ width: { xs: '100%', sm: '100%', md: '95%' }, mr: 'auto' }}>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/dry-cleaning');
                  }}
                >
                  <a
                    style={{ cursor: 'pointer', color: '#0095ff' }}
                    href='https://www.laundrybasket.ca/dry-cleaning'
                    rel='noopener noreferrer'
                  >
                    <Typography component='h3' variant='h3' sx={{ color: 'text.secondary', pb: 1.5 }}>
                      Dry
                      <Typography variant='h3' sx={{ color: 'text.primary', display: 'inline' }}>
                        {' '}
                        Cleaning
                      </Typography>
                    </Typography>
                  </a>
                  <Typography variant='subtitle2' sx={{ color: 'text.secondary', pb: 1 }}>
                    Got clothes that need extra care? Our Dry Cleaning & Press service is perfect for garments that deserve
                    to be cleaned professionally and returned looking sharp — pressed and hung, ready to wear.
                  </Typography>
                  <Typography variant='subtitle2' sx={{ color: 'text.secondary', pb: 1 }}>
                    We bring the quality of premium dry cleaning right to your door, so you never have to make a trip to the
                    cleaners again. Just schedule a pickup, and we’ll handle the rest — with expert care and attention to
                    detail.
                  </Typography>
                  <Typography variant='subtitle2' sx={{ color: 'text.secondary', pb: 2 }}>
                    Enjoy the convenience of at-home service with the same high-end finish you expect from your favorite
                    local dry cleaner.
                  </Typography>
                  <Typography variant='title' sx={{ color: 'primary.main', pb: 2 }}>
                    Starting from: $ 5.99 / Item
                  </Typography>
                  <br />
                </div>
                <Button sx={{ mt: { xs: 1, sm: 1 }, fontSize: 18, fontWeight: 600, px: 1 }} variant='contained'>
                  <Link to={props.isLoggedIn ? '/book-order' : '/login?redirect=book-order'}>Schedule PickUp</Link>
                </Button>
              </Box>
            </Grid>
            <Grid sx={{ height: 'auto', alignContent: 'center', mt: { xs: 1, sm: 0 } }} item xs={12} sm={12} md={5}>
              <img
                className='how-it-works-img'
                src={require('../assets/images/services/dry-cleaning.webp')}
                alt='Premium dry cleaning service for delicate fabrics'
              />
            </Grid>
          </Grid>

          {/* Home Care */}
          <Grid
            container
            spacing={2.5}
            sx={{
              pt: { xs: 6, sm: 9 },
              px: { xs: 0, sm: 2, md: 5 },
            }}
          >
            <Grid
              sx={{ height: 'auto', alignContent: 'center', display: { xs: 'none', sm: 'none', md: 'flex' } }}
              item
              xs={12}
              sm={12}
              md={5}
            >
              <img
                className='how-it-works-img'
                src={require('../assets/images/services/home-care.webp')}
                alt='Curtains and bedsheets after professional home laundry'
              />
            </Grid>
            <Grid sx={{ height: 'auto', alignContent: 'center' }} item xs={12} sm={12} md={7}>
              <Box sx={{ width: { xs: '100%', sm: '100%', md: '95%' }, ml: 'auto' }}>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/home-care');
                  }}
                >
                  <a
                    style={{ cursor: 'pointer', color: '#0095ff' }}
                    href='https://www.laundrybasket.ca/home-care'
                    rel='noopener noreferrer'
                  >
                    <Typography component='h3' variant='h3' sx={{ color: 'text.secondary', pb: 1.5 }}>
                      Home
                      <Typography variant='h3' sx={{ color: 'text.primary', display: 'inline' }}>
                        {' '}
                        Care
                      </Typography>
                    </Typography>
                  </a>
                  <Typography variant='subtitle2' sx={{ color: 'text.secondary', pb: 1 }}>
                    Give your home essentials the professional care they deserve. Our Home Care service covers everything
                    from comforters and bedsheets to pillow covers and curtains. We deep clean bulky and delicate items to
                    keep your space feeling fresh, hygienic, and cozy.
                  </Typography>
                  <Typography variant='subtitle2' sx={{ color: 'text.secondary', pb: 1 }}>
                    Enjoy hotel-like freshness without leaving your home — we pick up and deliver right to your door.
                  </Typography>
                  <Typography variant='subtitle2' sx={{ color: 'text.secondary', pb: 2, fontWeight: 'bold' }}>
                    Clean home, happy you. Let us handle the heavy stuff.
                  </Typography>
                  <Typography variant='title' sx={{ color: 'primary.main', pb: 2 }}>
                    Starting from: $ 3.49 / Item
                  </Typography>
                  <br />
                </div>
                <Button sx={{ mt: { xs: 1, sm: 1 }, fontSize: 18, fontWeight: 600, px: 1 }} variant='contained'>
                  <Link to={props.isLoggedIn ? '/book-order' : '/login?redirect=book-order'}>Schedule PickUp</Link>
                </Button>
              </Box>
            </Grid>
            <Grid
              sx={{
                height: 'auto',
                alignContent: 'center',
                display: { xs: 'block', sm: 'block', md: 'none' },
                mt: { xs: 1, sm: 0 },
              }}
              item
              xs={12}
              sm={12}
              md={5}
            >
              <img
                className='how-it-works-img'
                src={require('../assets/images/services/home-care.webp')}
                alt='Curtains and bedsheets after professional home laundry'
              />
            </Grid>
          </Grid>

          {/* Shoe Cleaning */}
          <Grid
            container
            spacing={2.5}
            sx={{
              pt: { xs: 6, sm: 9 },
              px: { xs: 0, sm: 2, md: 5 },
            }}
          >
            <Grid sx={{ height: 'auto', alignContent: 'center' }} item xs={12} sm={12} md={7}>
              <Box sx={{ width: { xs: '100%', sm: '100%', md: '95%' }, mr: 'auto' }}>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/shoe-cleaning');
                  }}
                >
                  <a
                    style={{ cursor: 'pointer', color: '#0095ff' }}
                    href='https://www.laundrybasket.ca/shoe-cleaning'
                    rel='noopener noreferrer'
                  >
                    <Typography component='h3' variant='h3' sx={{ color: 'text.secondary', pb: 1.5 }}>
                      Shoe
                      <Typography variant='h3' sx={{ color: 'text.primary', display: 'inline' }}>
                        {' '}
                        Cleaning
                      </Typography>
                    </Typography>
                  </a>
                  <Typography variant='subtitle2' sx={{ color: 'text.secondary', pb: 1 }}>
                    Your shoes take you everywhere — let us take care of them. Our Shoe Cleaning service restores your
                    favorite pairs with expert care, removing dirt, stains, and odors while protecting the material and
                    shape. From sneakers to formal shoes, we bring back their fresh, like-new look.
                  </Typography>
                  <Typography variant='subtitle2' sx={{ color: 'text.secondary', pb: 1 }}>
                    We clean, polish, and refresh your shoes, then deliver them right back to your door — ready to wear and
                    impress.
                  </Typography>
                  <Typography variant='subtitle2' sx={{ color: 'text.secondary', pb: 2, fontWeight: 'bold' }}>
                    Step out in style. We bring your shoes back to life.
                  </Typography>
                  <Typography variant='title' sx={{ color: 'primary.main', pb: 2 }}>
                    Starting from: $ 19.99 / Pair
                  </Typography>
                  <br />
                </div>
                <Button sx={{ mt: { xs: 1, sm: 1 }, fontSize: 18, fontWeight: 600, px: 1 }} variant='contained'>
                  <Link to={props.isLoggedIn ? '/book-order' : '/login?redirect=book-order'}>Schedule PickUp</Link>
                </Button>
              </Box>
            </Grid>
            <Grid sx={{ height: 'auto', alignContent: 'center', mt: { xs: 1, sm: 0 } }} item xs={12} sm={12} md={5}>
              <img
                className='how-it-works-img'
                src={require('../assets/images/services/shoe-clean.webp')}
                alt='Shiny, fresh shoes from expert shoe cleaning service'
              />
            </Grid>
          </Grid>

          {/* Iron Only */}
          <Grid
            container
            spacing={2.5}
            sx={{
              pt: { xs: 6, sm: 9 },
              px: { xs: 0, sm: 2, md: 5 },
            }}
          >
            <Grid
              sx={{ height: 'auto', alignContent: 'center', display: { xs: 'none', sm: 'none', md: 'flex' } }}
              item
              xs={12}
              sm={12}
              md={5}
            >
              <img
                className='how-it-works-img'
                src={require('../assets/images/services/iron.webp')}
                alt='Perfectly ironed clothes stacked and ready'
              />
            </Grid>
            <Grid sx={{ height: 'auto', alignContent: 'center' }} item xs={12} sm={12} md={7}>
              <Box sx={{ width: { xs: '100%', sm: '100%', md: '95%' }, ml: 'auto' }}>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/ironing');
                  }}
                >
                  <a
                    style={{ cursor: 'pointer', color: '#0095ff' }}
                    href='https://www.laundrybasket.ca/ironing'
                    rel='noopener noreferrer'
                  >
                    <Typography component='h3' variant='h3' sx={{ color: 'text.secondary', pb: 1.5 }}>
                      Ironing
                    </Typography>
                  </a>
                  <Typography variant='subtitle2' sx={{ color: 'text.secondary', pb: 1 }}>
                    Already did the laundry but dreading the ironing? Our Iron Only service takes freshly washed clothes and
                    returns them perfectly pressed, wrinkle-free, and hanger-ready. Ideal for workwear, formal outfits, or
                    anything that needs that crisp, clean finish.
                  </Typography>
                  <Typography variant='subtitle2' sx={{ color: 'text.secondary', pb: 1 }}>
                    We handle each garment with expert care and attention to detail, ensuring every piece is crisply pressed
                    and neatly returned — so you can look sharp and feel confident, all without lifting a finger.
                  </Typography>
                  <Typography variant='subtitle2' sx={{ color: 'text.secondary', pb: 2, fontWeight: 'bold' }}>
                    We press, you impress.
                    <br />
                    Freshly ironed, flawlessly delivered.
                  </Typography>
                  <Typography variant='title' sx={{ color: 'primary.main', pb: 2 }}>
                    Price: $ 4.99 / lb
                  </Typography>
                  <br />
                </div>
                <Button sx={{ mt: { xs: 1, sm: 1 }, fontSize: 18, fontWeight: 600, px: 1 }} variant='contained'>
                  <Link to={props.isLoggedIn ? '/book-order' : '/login?redirect=book-order'}>Schedule PickUp</Link>
                </Button>
              </Box>
            </Grid>
            <Grid
              sx={{
                height: 'auto',
                alignContent: 'center',
                display: { xs: 'block', sm: 'block', md: 'none' },
                mt: { xs: 1, sm: 0 },
              }}
              item
              xs={12}
              sm={12}
              md={5}
            >
              <img
                className='how-it-works-img'
                src={require('../assets/images/services/iron.webp')}
                alt='Perfectly ironed clothes stacked and ready'
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}
