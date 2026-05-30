import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid, Paper, Stack } from '@mui/material';
import cover from '../assets/images/saloon.webp';
import { getBlogs } from '../utils/api_base';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Blogs(props) {
  const navigate = useNavigate();

  const [tenant, setTenant] = React.useState({});
  const [blogs, setBlogs] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    document.title = 'Blogs - Laundry Basket';
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    getActiveBlogs();
  }, []);

  const getActiveBlogs = async () => {
    let page = await getBlogs({
      status: 'active',
      limit: 20,
      category: 'laundry',
    });
    if (page && page.items && page.items.length) {
      setBlogs(page.items);
    } else {
      setBlogs([]);
    }
    setIsLoading(false);
  };

  return (
    <Container
      style={{
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '60px',
        paddingBottom: '60px',
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
              <Typography className='text-center' sx={{ color: 'text.white', typography: { sm: 'h3', xs: 'h3' } }}>
                Blogs
              </Typography>
            </div>
          </div>
        </div>
      </Paper>
      <Helmet>
        <meta
          name='description'
          content='Explore our latest blogs on laundry tips, garment care, and dry cleaning services in North York, Vaughan and Richmond Hill. Stay informed with Laundry Basket!'
        />
        <meta
          name='keywords'
          content='laundry, dry cleaning, North York, Vaughan, Richmond Hill, laundry tips, garment care, eco-friendly cleaning, stain removal, laundry hacks'
        />
        <meta name='author' content='Laundry Basket' />
      </Helmet>
      <Box sx={{ width: '90%', mx: 'auto' }}>
        <Grid
          container
          spacing={2.5}
          sx={{
            pt: { xs: 6, sm: 10 },
            px: { xs: 0, sm: 2, md: 5 },
          }}
        >
          <Grid sx={{ height: 'auto', alignContent: 'center' }} item xs={12} sm={12} md={5}>
            <img
              className='how-it-works-img'
              src={require('../assets/images/blogs-cover.webp')}
              alt='Bolgs - Professional laundry and dry cleaning with free pickup and delivery in North York, Vaughan and Richmond Hill'
            />
          </Grid>
          <Grid sx={{ height: 'auto', alignContent: 'center' }} item xs={12} sm={12} md={7}>
            <Box sx={{ width: { xs: '100%', sm: '100%', md: '95%' }, ml: 'auto' }}>
              <Typography component='h3' variant='h3' sx={{ color: 'text.secondary', pb: 2.5, mt: 2 }}>
                Welcome to
                <a
                  style={{ cursor: 'pointer', color: '#0095ff' }}
                  href='https://www.laundrybasket.ca'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Typography variant='h3' sx={{ color: 'text.primary', display: 'inline' }}>
                    {' '}
                    Laundry Basket{' '}
                  </Typography>
                </a>
                Blogs
              </Typography>
              <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
                At{' '}
                <a
                  style={{ cursor: 'pointer', color: '#0095ff' }}
                  href='https://www.laundrybasket.ca'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Laundry Basket
                </a>
                , we believe that clean clothes bring confidence, comfort, and joy. Our blog is a space where we share tips,
                insights, and helpful guides to make your laundry and dry cleaning experience even better. Whether you’re
                looking for stain removal tricks, garment care advice, or updates about our services in North York, Vaughan and Richmond Hill, we’re here
                to keep you informed and inspired.
              </Typography>
              <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
                We created this page to connect with you beyond just pickups and deliveries. As your trusted laundry partner,
                we want to share our knowledge, answer your questions, and help you get the most out of every service. From
                eco-friendly cleaning methods to seasonal laundry hacks — we’ll cover it all here.
              </Typography>
              <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
                Thanks for stopping by. We’re glad to have you as part of the{' '}
                <a
                  style={{ cursor: 'pointer', color: '#0095ff' }}
                  href='https://www.laundrybasket.ca'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Laundry Basket
                </a>{' '}
                community!
              </Typography>
            </Box>
          </Grid>
        </Grid>
        {blogs.length > 0 && (
          <Box
            sx={{
              pt: { xs: 8, sm: 12 },
            }}
          >
            <Typography component='h3' variant='h3' sx={{ color: 'text.secondary', pb: 2.5, px: { xs: 0, sm: 2, md: 5 } }}>
              Latest Articles
            </Typography>
            <Grid
              container
              spacing={5}
              sx={{
                px: { xs: 0, sm: 2, md: 5 },
              }}
            >
              <Grid sx={{ height: 'auto', alignContent: 'center' }} item xs={12} sm={12} md={6}>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/blogs/' + blogs[0].code);
                  }}
                >
                  <Grid container spacing={2.5}>
                    <Grid sx={{ height: 'auto', alignContent: 'center' }} item xs={12} sm={12} md={12}>
                      <img className='how-it-works-img' src={blogs[0].pic} alt={blogs[0].heading} />
                    </Grid>
                    <Grid sx={{ height: 'auto', alignContent: 'center' }} item xs={12} sm={12} md={12}>
                      <Box sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, ml: 'auto' }}>
                        <Stack direction='row' alignItems='center' justifyContent='space-between' gap={2} sx={{ py: 1 }}>
                          <Box
                            sx={{
                              borderRadius: '50px',
                              borderColor: 'primary.main',
                              borderWidth: 1,
                              py: 0.5,
                              px: 1,
                              margin: 'auto',
                              width: 'fit-content',
                            }}
                          >
                            <Typography
                              sx={{ width: '100%', color: 'primary.main', fontWeight: 'bold' }}
                              variant='subtitle2'
                            >
                              {blogs[0].type}
                            </Typography>
                          </Box>
                          <Typography sx={{ width: '100%', color: 'text.neutral' }} variant='subtitle2'>
                            {moment(blogs[0].date).format('MMMM Do YYYY')}
                          </Typography>
                        </Stack>
                        <Typography component='h5' variant='h5' sx={{ color: 'text.secondary', pt: 1, pb: 2 }}>
                          {blogs[0].heading}
                        </Typography>
                        <Typography
                          variant='subtitle2'
                          sx={{
                            color: 'text.secondary',
                            height: '55px',
                            pb: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {blogs[0].description}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid sx={{ height: 'auto', alignContent: 'start' }} item xs={12} sm={12} md={6}>
                {[...blogs.slice(1)].map((item, index) => (
                  <div
                    key={index}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      navigate('/blogs/' + item.code);
                    }}
                  >
                    <Grid
                      container
                      spacing={2.5}
                      sx={{
                        pt: { xs: index > 0 ? 4 : 0, sm: index > 0 ? 6 : 0 },
                      }}
                    >
                      <Grid sx={{ height: 'auto', alignContent: 'center' }} item xs={5} sm={5} md={5}>
                        <img className='how-it-works-img' src={item.pic} alt={item.heading} />
                      </Grid>
                      <Grid sx={{ height: 'auto', alignContent: 'center' }} item xs={7} sm={7} md={7}>
                        <Box sx={{ width: { xs: '100%', sm: '100%', md: '100%' }, ml: 'auto' }}>
                          <Stack direction='row' alignItems='center' justifyContent='space-between' gap={2} sx={{ py: 1 }}>
                            <Box
                              sx={{
                                borderRadius: '50px',
                                borderColor: 'primary.main',
                                borderWidth: 1,
                                py: 0.5,
                                px: 1,
                                margin: 'auto',
                                width: 'fit-content',
                              }}
                            >
                              <Typography
                                sx={{ width: '100%', color: 'primary.main', fontWeight: 'bold' }}
                                variant='subtitle2'
                              >
                                {item.type}
                              </Typography>
                            </Box>
                            <Typography sx={{ width: '100%', color: 'text.neutral' }} variant='subtitle2'>
                              {moment(item.date).format('MMMM Do YYYY')}
                            </Typography>
                          </Stack>
                          <Typography component='h6' variant='h6' sx={{ color: 'text.secondary', pt: 0, pb: 0 }}>
                            {item.heading}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </div>
                ))}
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
}
