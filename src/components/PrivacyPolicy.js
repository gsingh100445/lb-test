import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Paper } from '@mui/material';
import cover from '../assets/images/saloon.webp';

export default function PrivacyPolicy(props) {
  React.useEffect(() => {
    document.title = 'Privacy Policy - Laundry Basket, Laundry & Dry Cleaning, Pickup and Delivery!';
  }, []);

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
                Privacy Policy
              </Typography>
            </div>
          </div>
        </div>
      </Paper>
      <Box sx={{ width: '90%', mx: 'auto', pt: { xs: 4, sm: 6 }, px: { xs: 0, sm: 2, md: 5 } }}>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary', fontWeight: 'bold', pb: 2 }}>
          Welcome to Laundry Basket! Your privacy is important to us. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you use our website, mobile app, and services.
        </Typography>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
          1. We collect personal information such as your name, contact details, address, and payment information when you
          place an order through our website or mobile application. This data is used solely for processing your orders,
          providing customer support, and improving our services. We may also collect usage data, such as browsing history
          and preferences, to enhance user experience.
        </Typography>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
          2. Laundry Basket does not sell, trade, or rent your personal information to third parties. However, we may share
          necessary details with trusted partners, such as payment processors and delivery service providers, to ensure
          seamless service. These third parties are bound by confidentiality agreements and are only permitted to use your
          information for the intended purpose.
        </Typography>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
          3. We implement industry-standard security measures to protect your data from unauthorized access, alteration, or
          disclosure. Despite our efforts, no method of transmission over the internet is 100% secure, and we encourage users
          to take precautions when sharing sensitive information.
        </Typography>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
          4. By using our services, you consent to the collection and use of your information as described in this Privacy
          Policy. We reserve the right to update this policy as needed, and any changes will be posted on our website. If you
          have any questions or concerns regarding your privacy, please contact us through our official channels.
        </Typography>
      </Box>
    </Container>
  );
}
