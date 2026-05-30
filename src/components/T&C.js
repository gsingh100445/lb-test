import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Paper } from '@mui/material';
import cover from '../assets/images/saloon.webp';

export default function TNC(props) {
  React.useEffect(() => {
    document.title = 'Terms and Conditions - Laundry Basket, Laundry & Dry Cleaning, Pickup and Delivery!';
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
                Terms and Conditions
              </Typography>
            </div>
          </div>
        </div>
      </Paper>
      <Box sx={{ width: '90%', mx: 'auto', pt: { xs: 4, sm: 6 }, px: { xs: 0, sm: 2, md: 5 } }}>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary', fontWeight: 'bold', pb: 2 }}>
          Welcome to Laundry Basket! By using our services, you agree to the following terms and conditions. Please read them
          carefully.
        </Typography>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
          1. General Information Laundry Basket provides laundry and dry cleaning services with pickup and delivery across
          North York, Vaughan and Richmond Hill. By placing an order, you agree to these terms and conditions.
        </Typography>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
          2. Services Provided We offer Wash & Fold, Wash & Iron, Dry Cleaning, Home Care, Shoe Cleaning, and Iron Only
          services. Dry cleaning and certain high-value items are outsourced to our partner facilities.
        </Typography>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
          3. Orders and Payment Orders can be placed via our website or mobile app. Payment must be made at the time of order
          confirmation. We accept major credit/debit cards and other approved payment methods. Handling fees may apply for
          orders below the free delivery threshold.
        </Typography>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
          4. Pickup and Delivery Free standard delivery for orders above $40. Express delivery is available at an additional
          charge. Customers must ensure accessibility for pickup and delivery. Unattended delivery is at the customer's risk.
        </Typography>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
          5. Garment Care and Liability Customers must ensure all items are suitable for the selected service. Laundry Basket
          is not responsible for damage to items due to pre-existing conditions, manufacturer defects, or incorrect labeling.
          We take utmost care, but minor shrinkage, color bleeding, or wear and tear may occur. Claims for lost or damaged
          items must be reported within 24 hours of delivery.
        </Typography>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
          6. Cancellation and Refund Policy Orders can be canceled before pickup. Refunds are processed within 5-7 business
          days, subject to deduction for services already performed. No refunds for completed services.
        </Typography>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
          7. Express Services and Priority Handling Express service is available at an extra charge. Priority items are
          handled with care but are subject to availability.
        </Typography>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
          8. Privacy Policy Customer information is used solely for order processing and service improvement. We do not share
          personal data with third parties without consent.
        </Typography>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
          9. Changes to Terms Laundry Basket reserves the right to modify these terms at any time. Updated terms will be
          posted on our website.
        </Typography>
      </Box>
    </Container>
  );
}
