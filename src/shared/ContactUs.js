import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { EmailOutlined, PhoneOutlined } from '@mui/icons-material';

export default function ContactUs(props) {
  return (
    <Container
      maxWidth='xlg'
      id='how-we-work'
      sx={{
        pt: { xs: 4, sm: 8 },
        pb: { xs: 8, sm: 16 },
        px: { xs: 2, sm: 5, md: 8 },
      }}
    >
      <Grid container sx={{ background: '#13263d', borderRadius: '15px' }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={5.5}
          sx={{
            pl: { xs: 0, sm: 0, md: 2 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            height: 'auto',
          }}
        >
          <Box sx={{ width: { xs: '90%', sm: '90%', md: '90%' }, margin: 'auto', py: { xs: 4, sm: 4, md: 4 } }}>
            <Typography component='h4' variant='h3' sx={{ color: 'primary.main' }}>
              <Typography component='span' variant='h3' sx={{ color: 'white', display: 'inline' }}>
                Contact{' '}
              </Typography>
              Us
            </Typography>
            <Typography component='p' variant='subtitle2' sx={{ color: 'text.white', mt: 1, pb: 1 }}>
              Have questions about your laundry or dry cleaning order? We’re here to help! Reach out to Laundry Basket for
              quick, friendly support from our Toronto-based team. Whether it's pickup, delivery, or anything in
              between—we're just a call away.
            </Typography>
            <a href='tel:6472476745' style={{ width: 'fit-content', display: 'block' }}>
              <Stack direction='row' justifyContent='start' alignItems='center' spacing={2} sx={{ mt: 2 }}>
                <Box sx={{ borderRadius: '50%', backgroundColor: 'white', p: 0.8 }}>
                  <PhoneOutlined sx={{ fontSize: 35 }} />
                </Box>
                <Box>
                  <Typography sx={{ color: 'white', fontWeight: 'bold', mr: 1 }} component='p' variant='subtitle2'>
                    Phone number
                  </Typography>
                  <Typography sx={{ color: 'white' }} component='p' variant='title'>
                    647-247-6745
                  </Typography>
                </Box>
              </Stack>
            </a>
            <a href='mailto:contact@laundrybasket.ca' style={{ width: 'fit-content', display: 'block' }}>
              <Stack direction='row' justifyContent='start' alignItems='center' spacing={2} sx={{ mt: 2 }}>
                <Box sx={{ borderRadius: '50%', backgroundColor: 'white', p: 0.8 }}>
                  <EmailOutlined sx={{ fontSize: 35 }} />
                </Box>
                <Box>
                  <Typography sx={{ color: 'white', fontWeight: 'bold', mr: 1 }} component='p' variant='subtitle2'>
                    Email
                  </Typography>
                  <Typography sx={{ color: 'white' }} component='p' variant='title'>
                    contact@laundrybasket.ca
                  </Typography>
                </Box>
              </Stack>
            </a>
            <Box sx={{ width: '100%', borderBottomWidth: 1, my: 4 }}></Box>
            <Typography component='h5' variant='h6' sx={{ color: 'text.white' }}>
              Follow Us
            </Typography>
            <Typography component='p' variant='subtitle2' sx={{ color: 'text.white', mt: 1 }}>
              Stay connected with us on social media for the latest updates, promotions, and laundry tips. Join our community
              and share your laundry journey with us!
            </Typography>
            <Stack sx={{ pt: 2 }} spacing={2} direction='row' useFlexGap justifyContent='start' alignItems='start'>
              <a href='https://www.instagram.com/laundry_basket_tdot/' target='_blank' rel='noopener noreferrer'>
                <svg
                  style={{ height: 35, width: 35 }}
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  viewBox='0,0,256,256'
                >
                  <g
                    fill='#ffffff'
                    fillRule='nonzero'
                    stroke='none'
                    strokeWidth='1'
                    strokeLinecap='butt'
                    strokeLinejoin='miter'
                    strokeMiterlimit='10'
                    strokeDasharray=''
                    strokeDashoffset='0'
                    fontFamily='none'
                    fontWeight='none'
                    fontSize='none'
                    textAnchor='none'
                  >
                    <g transform='scale(5.12,5.12)'>
                      <path d='M16,3c-7.17,0 -13,5.83 -13,13v18c0,7.17 5.83,13 13,13h18c7.17,0 13,-5.83 13,-13v-18c0,-7.17 -5.83,-13 -13,-13zM37,11c1.1,0 2,0.9 2,2c0,1.1 -0.9,2 -2,2c-1.1,0 -2,-0.9 -2,-2c0,-1.1 0.9,-2 2,-2zM25,14c6.07,0 11,4.93 11,11c0,6.07 -4.93,11 -11,11c-6.07,0 -11,-4.93 -11,-11c0,-6.07 4.93,-11 11,-11zM25,16c-4.96,0 -9,4.04 -9,9c0,4.96 4.04,9 9,9c4.96,0 9,-4.04 9,-9c0,-4.96 -4.04,-9 -9,-9z'></path>
                    </g>
                  </g>
                </svg>
              </a>
              <a href='https://www.facebook.com/profile.php?id=61575150972747' target='_blank' rel='noopener noreferrer'>
                <svg
                  style={{ height: 35, width: 35 }}
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  viewBox='0,0,256,256'
                >
                  <g
                    fill='#ffffff'
                    fillRule='nonzero'
                    stroke='none'
                    strokeWidth='1'
                    strokeLinecap='butt'
                    strokeLinejoin='miter'
                    strokeMiterlimit='10'
                    strokeDasharray=''
                    strokeDashoffset='0'
                    fontFamily='none'
                    fontWeight='none'
                    fontSize='none'
                    textAnchor='none'
                  >
                    <g transform='scale(5.12,5.12)'>
                      <path d='M41,4h-32c-2.76,0 -5,2.24 -5,5v32c0,2.76 2.24,5 5,5h32c2.76,0 5,-2.24 5,-5v-32c0,-2.76 -2.24,-5 -5,-5zM37,19h-2c-2.14,0 -3,0.5 -3,2v3h5l-1,5h-4v15h-5v-15h-4v-5h4v-3c0,-4 2,-7 6,-7c2.9,0 4,1 4,1z'></path>
                    </g>
                  </g>
                </svg>
              </a>
              {/* <IconButton>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  style={{ height: 35, width: 35 }}
                  viewBox='0,0,256,256'
                >
                  <g
                    fill='#ffffff'
                    fillRule='nonzero'
                    stroke='none'
                    strokeWidth='1'
                    strokeLinecap='butt'
                    strokeLinejoin='miter'
                    strokeMiterlimit='10'
                    strokeDasharray=''
                    strokeDashoffset='0'
                    fontFamily='none'
                    fontWeight='none'
                    fontSize='none'
                    textAnchor='none'
                  >
                    <g transform='scale(5.12,5.12)'>
                      <path d='M11,4c-3.866,0 -7,3.134 -7,7v28c0,3.866 3.134,7 7,7h28c3.866,0 7,-3.134 7,-7v-28c0,-3.866 -3.134,-7 -7,-7zM13.08594,13h7.9375l5.63672,8.00977l6.83984,-8.00977h2.5l-8.21094,9.61328l10.125,14.38672h-7.93555l-6.54102,-9.29297l-7.9375,9.29297h-2.5l9.30859,-10.89648zM16.91406,15l14.10742,20h3.06445l-14.10742,-20z'></path>
                    </g>
                  </g>
                </svg>
              </IconButton> */}
              <a href='https://www.tiktok.com/@laundry_basket_tdot' target='_blank' rel='noopener noreferrer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  style={{ height: 35, width: 35 }}
                  viewBox='0,0,256,256'
                >
                  <g
                    fill='#ffffff'
                    fillRule='nonzero'
                    stroke='none'
                    strokeWidth='1'
                    strokeLinecap='butt'
                    strokeLinejoin='miter'
                    strokeMiterlimit='10'
                    strokeDasharray=''
                    strokeDashoffset='0'
                    fontFamily='none'
                    fontWeight='none'
                    fontSize='none'
                    textAnchor='none'
                  >
                    <g transform='scale(5.12,5.12)'>
                      <path d='M41,4h-32c-2.757,0 -5,2.243 -5,5v32c0,2.757 2.243,5 5,5h32c2.757,0 5,-2.243 5,-5v-32c0,-2.757 -2.243,-5 -5,-5zM37.006,22.323c-0.227,0.021 -0.457,0.035 -0.69,0.035c-2.623,0 -4.928,-1.349 -6.269,-3.388c0,5.349 0,11.435 0,11.537c0,4.709 -3.818,8.527 -8.527,8.527c-4.709,0 -8.527,-3.818 -8.527,-8.527c0,-4.709 3.818,-8.527 8.527,-8.527c0.178,0 0.352,0.016 0.527,0.027v4.202c-0.175,-0.021 -0.347,-0.053 -0.527,-0.053c-2.404,0 -4.352,1.948 -4.352,4.352c0,2.404 1.948,4.352 4.352,4.352c2.404,0 4.527,-1.894 4.527,-4.298c0,-0.095 0.042,-19.594 0.042,-19.594h4.016c0.378,3.591 3.277,6.425 6.901,6.685z'></path>
                    </g>
                  </g>
                </svg>
              </a>
              <a href='https://www.linkedin.com/company/laundry-basket-tdot/' target='_blank' rel='noopener noreferrer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  style={{ height: 35, width: 35 }}
                  viewBox='0,0,256,256'
                >
                  <g
                    fill='#ffffff'
                    fillRule='nonzero'
                    stroke='none'
                    strokeWidth='1'
                    strokeLinecap='butt'
                    strokeLinejoin='miter'
                    strokeMiterlimit='10'
                    strokeDasharray=''
                    strokeDashoffset='0'
                    fontFamily='none'
                    fontWeight='none'
                    fontSize='none'
                    textAnchor='none'
                  >
                    <g transform='scale(5.12,5.12)'>
                      <path d='M41,4h-32c-2.76,0 -5,2.24 -5,5v32c0,2.76 2.24,5 5,5h32c2.76,0 5,-2.24 5,-5v-32c0,-2.76 -2.24,-5 -5,-5zM17,20v19h-6v-19zM11,14.47c0,-1.4 1.2,-2.47 3,-2.47c1.8,0 2.93,1.07 3,2.47c0,1.4 -1.12,2.53 -3,2.53c-1.8,0 -3,-1.13 -3,-2.53zM39,39h-6c0,0 0,-9.26 0,-10c0,-2 -1,-4 -3.5,-4.04h-0.08c-2.42,0 -3.42,2.06 -3.42,4.04c0,0.91 0,10 0,10h-6v-19h6v2.56c0,0 1.93,-2.56 5.81,-2.56c3.97,0 7.19,2.73 7.19,8.26z'></path>
                    </g>
                  </g>
                </svg>
              </a>
            </Stack>
          </Box>
        </Grid>
        <Grid sx={{ display: { xs: 'none', sm: 'none', md: 'block' }, height: 'auto' }} item xs={12} sm={12} md={6.5}>
          <iframe
            width='100%'
            height='100%'
            style={{ border: '0', borderTopRightRadius: '15px', borderBottomRightRadius: '15px' }}
            loading='lazy'
            allowFullScreen
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184551.9097724892!2d-79.54286602848246!3d43.71837095812316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4201d80073ee7f59%3A0xdd0eaea006fa18e5!2sLaundry%20Basket%20-%20Laundry%20%26%20Dry%20Cleaning%2C%20Pickup%20and%20Delivery!5e0!3m2!1sen!2sca!4v1745094585206!5m2!1sen!2sca'
          ></iframe>
        </Grid>
        <Grid
          sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, height: 'fit-content' }}
          item
          xs={12}
          sm={12}
          md={6.5}
        >
          <iframe
            width='100%'
            height='380px'
            style={{ border: '0', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}
            loading='lazy'
            allowFullScreen
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184551.9097724892!2d-79.54286602848246!3d43.71837095812316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4201d80073ee7f59%3A0xdd0eaea006fa18e5!2sLaundry%20Basket%20-%20Laundry%20%26%20Dry%20Cleaning%2C%20Pickup%20and%20Delivery!5e0!3m2!1sen!2sca!4v1745094585206!5m2!1sen!2sca'
          ></iframe>
        </Grid>
      </Grid>
    </Container>
  );
}
