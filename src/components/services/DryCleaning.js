import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, ImageList, ImageListItem, Paper, Stack } from '@mui/material';
import coverSM from '../../assets/images/banner-2.webp';
import { useNavigate } from 'react-router-dom';
import { AssignmentTurnedIn, Inventory2, LocalLaundryService, SwitchAccessShortcut } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';
import { firstOrderDiscount } from '../../utils/config';

export default function DryCleaning(props) {
  const navigation = useNavigate();

  const [service, setService] = React.useState();

  React.useEffect(() => {
    document.title = 'Dry Cleaning - Laundry Basket';
  }, []);

  React.useEffect(() => {}, [service]);

  React.useEffect(() => {
    if (props.servicesLoaded) {
      for (const serviceItem of props.services) {
        if (serviceItem.name === 'Dry Cleaning') {
          setService(serviceItem);
        }
      }
    }
  }, [props.services, props.servicesLoaded]);

  const getTags = (items) => {
    let tags = new Set();
    if (items) {
      for (const item of items) {
        tags.add(item.tag);
      }
    }
    return Array.from(tags);
  };

  const getTagItems = (items, tag) => {
    let tagItems = [];
    for (const item of items) {
      if (tag === item.tag) {
        tagItems.push(item);
      }
    }
    tagItems = tagItems.sort((a, b) => (a.currentPrice || 0) - (b.currentPrice || 0));
    tagItems = [...tagItems.filter((item) => item.currentPrice > 0), ...tagItems.filter((item) => item.startingPrice > 0)];
    return tagItems;
  };

  const getTitleCase = (stringData) => {
    if (stringData && stringData.length) {
      return stringData.replace(/\b(\w)/g, (k) => k.toUpperCase());
    } else {
      return '';
    }
  };

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
                  Dry Cleaning
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
                  Dry Cleaning is the service you can trust for your delicate, high-end, and specialty clothing that deserves
                  extra care.
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
                  Trust{' '}
                  <a
                    style={{ cursor: 'pointer', color: '#0095ff' }}
                    href='https://www.laundrybasket.ca'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Laundry Basket
                  </a>{' '}
                  with your delicate and specialty garments so you can focus on what truly matters.
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
          content='Dry Cleaning service by Laundry Basket. Expert care for delicate and specialty garments.'
        />
        <meta
          name='keywords'
          content='Dry Cleaning, Laundry Basket, Delicate Garments, Specialty Clothing, Professional Cleaning'
        />
        <link rel='canonical' href='https://www.laundrybasket.ca/dry-cleaning' />
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
              Garment Inspection
            </Typography>
            <Typography sx={{ color: 'text.secondary', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
              We carefully inspect every garment before cleaning, noting any stains, delicate fabrics, or special care
              instructions to ensure the best treatment.
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
              Expert Cleaning
            </Typography>
            <Typography sx={{ color: 'text.secondary', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
              Using industry-approved dry cleaning methods, we gently clean your items to protect their color, texture, and
              structure — giving them a fresh, professional finish.
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
              Pressing and Finishing
            </Typography>
            <Typography sx={{ color: 'text.secondary', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
              After cleaning, garments are expertly pressed, shaped, and finished. They are then protected in garment covers
              and delivered right to your door.
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

      <Box sx={{ width: '90%', mx: 'auto', py: { xs: 2, sm: 3 } }}>
        <Typography sx={{ color: 'text.secondary', pt: 3 }} variant='h5' component='h5' textAlign='left'>
          Pricing That Fits Your Needs
        </Typography>
        <ImageList sx={{ display: { xs: 'none', sm: 'none', md: 'block' }, mt: 3 }} variant='masonry' cols={3} gap={20}>
          {service &&
            service.items &&
            service.items.length &&
            getTags(service.items).map((tag, tagIndex) => (
              <ImageListItem key={tagIndex}>
                <Box
                  sx={{
                    backgroundColor: (theme) => 'actionLite.selected',
                    padding: 3,
                    borderRadius: '25px',
                  }}
                >
                  <img
                    style={{
                      height: '60px',
                      marginBottom: '0.5rem',
                      marginTop: '0.2rem',
                    }}
                    src={getTagItems(service.items, tag)[0].pic}
                    alt='new'
                  />
                  <Typography variant='title' sx={{ color: 'text.secondary' }}>
                    {getTitleCase(tag)}
                  </Typography>
                  {getTagItems(service.items, tag).map((tagItem, tagItemIndex) => (
                    <Stack
                      key={tagItemIndex}
                      direction='row'
                      alignItems='center'
                      justifyContent='space-between'
                      gap={2}
                      sx={{ my: 1 }}
                    >
                      <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                        {tagItem.name}
                      </Typography>
                      {tagItem.currentPrice && (
                        <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }} variant='subtitle1'>
                          ${Number(tagItem.currentPrice).toFixed(2)}
                        </Typography>
                      )}
                      {tagItem.startingPrice && !tagItem.currentPrice && (
                        <Typography
                          sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'right' }}
                          variant='subtitle1'
                        >
                          <Typography sx={{ color: 'primary.main', fontWeight: 'bold', display: 'inline' }} variant='body1'>
                            Starting from
                          </Typography>{' '}
                          ${Number(tagItem.startingPrice).toFixed(2)}
                        </Typography>
                      )}
                    </Stack>
                  ))}
                </Box>
              </ImageListItem>
            ))}
        </ImageList>
        <ImageList sx={{ display: { xs: 'none', sm: 'block', md: 'none' }, mt: 3 }} variant='masonry' cols={2} gap={20}>
          {service &&
            service.items &&
            service.items.length &&
            getTags(service.items).map((tag, tagIndex) => (
              <ImageListItem key={tagIndex}>
                <Box
                  sx={{
                    backgroundColor: (theme) => 'actionLite.selected',
                    padding: 3,
                    borderRadius: '25px',
                  }}
                >
                  <img
                    style={{
                      height: '60px',
                      marginBottom: '0.5rem',
                      marginTop: '0.2rem',
                    }}
                    src={getTagItems(service.items, tag)[0].pic}
                    alt='new'
                  />
                  <Typography variant='title' sx={{ color: 'text.secondary' }}>
                    {getTitleCase(tag)}
                  </Typography>
                  {getTagItems(service.items, tag).map((tagItem, tagItemIndex) => (
                    <Stack
                      key={tagItemIndex}
                      direction='row'
                      alignItems='center'
                      justifyContent='space-between'
                      gap={2}
                      sx={{ my: 1 }}
                    >
                      <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                        {tagItem.name}
                      </Typography>
                      {tagItem.currentPrice && (
                        <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }} variant='subtitle1'>
                          ${Number(tagItem.currentPrice).toFixed(2)}
                        </Typography>
                      )}
                      {tagItem.startingPrice && !tagItem.currentPrice && (
                        <Typography
                          sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'right' }}
                          variant='subtitle1'
                        >
                          <Typography sx={{ color: 'primary.main', fontWeight: 'bold', display: 'inline' }} variant='body1'>
                            Starting from
                          </Typography>{' '}
                          ${Number(tagItem.startingPrice).toFixed(2)}
                        </Typography>
                      )}
                    </Stack>
                  ))}
                </Box>
              </ImageListItem>
            ))}
        </ImageList>
        <ImageList sx={{ display: { xs: 'block', sm: 'none', md: 'none' }, mt: 3 }} variant='masonry' cols={1} gap={20}>
          {service &&
            service.items &&
            service.items.length &&
            getTags(service.items).map((tag, tagIndex) => (
              <ImageListItem key={tagIndex}>
                <Box
                  sx={{
                    backgroundColor: (theme) => 'actionLite.selected',
                    padding: 3,
                    borderRadius: '25px',
                  }}
                >
                  <img
                    style={{
                      height: '60px',
                      marginBottom: '0.5rem',
                      marginTop: '0.2rem',
                    }}
                    src={getTagItems(service.items, tag)[0].pic}
                    alt='new'
                  />
                  <Typography variant='title' sx={{ color: 'text.secondary' }}>
                    {getTitleCase(tag)}
                  </Typography>
                  {getTagItems(service.items, tag).map((tagItem, tagItemIndex) => (
                    <Stack
                      key={tagItemIndex}
                      direction='row'
                      alignItems='center'
                      justifyContent='space-between'
                      gap={2}
                      sx={{ my: 1 }}
                    >
                      <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                        {tagItem.name}
                      </Typography>
                      {tagItem.currentPrice && (
                        <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }} variant='subtitle1'>
                          ${Number(tagItem.currentPrice).toFixed(2)}
                        </Typography>
                      )}
                      {tagItem.startingPrice && !tagItem.currentPrice && (
                        <Typography
                          sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'right' }}
                          variant='subtitle1'
                        >
                          <Typography sx={{ color: 'primary.main', fontWeight: 'bold', display: 'inline' }} variant='body1'>
                            Starting from
                          </Typography>{' '}
                          ${Number(tagItem.startingPrice).toFixed(2)}
                        </Typography>
                      )}
                    </Stack>
                  ))}
                </Box>
              </ImageListItem>
            ))}
        </ImageList>
      </Box>
    </Container>
  );
}
