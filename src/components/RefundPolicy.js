import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Box, Paper } from '@mui/material';
import cover from '../assets/images/saloon.webp';

export default function RefundPolicy(props) {
  React.useEffect(() => {
    document.title = 'Refund Policy - Laundry Basket, Laundry & Dry Cleaning, Pickup and Delivery!';
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
                Refund Policy
              </Typography>
            </div>
          </div>
        </div>
      </Paper>
      <Box sx={{ width: '90%', mx: 'auto', pt: { xs: 4, sm: 6 }, px: { xs: 0, sm: 2, md: 5 } }}>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary', fontWeight: 'bold', pb: 2 }}>
          At Laundry Basket, we strive to provide high-quality laundry and dry cleaning services to our customers. Our refund
          policy is designed to ensure fairness and transparency while addressing any concerns that may arise.
        </Typography>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
          1. If you are dissatisfied with our service due to an error on our part, such as a lost item, damage caused by our
          cleaning process, or an incorrect order fulfillment, we encourage you to contact us within 24 hours of receiving
          your order. We will investigate the issue and, if found valid, offer a refund, re-cleaning, or credit towards
          future services at our discretion. and preferences, to enhance user experience.
        </Typography>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
          2. Refunds will not be issued for issues beyond our control, such as normal wear and tear, pre-existing damage, or
          items that are not suitable for cleaning but were sent for processing. Additionally, we do not provide refunds for
          slight variations in results due to fabric type, age, or manufacturer specifications.
        </Typography>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
          3. For any refund requests, please provide supporting details, including order number, images (if applicable), and
          a description of the concern. We aim to resolve all claims promptly and fairly. Approved refunds will be processed
          to the original payment method within 5-7 business days.
        </Typography>
        <Typography variant='subtitle1' sx={{ color: 'text.secondary', pb: 2 }}>
          4. For express or urgent services, additional fees apply, and these charges are non-refundable unless the service
          was not delivered as promised. If an order is canceled before pickup, a full refund may be issued. However, once
          processing has begun, cancellation may not be possible.
        </Typography>
      </Box>
    </Container>
  );
}
