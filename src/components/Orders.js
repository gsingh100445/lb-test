import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Paper, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import CurrentOrders from '../shared/CurrentOrders';
import PastOrders from '../shared/PastOrders';
import cover from '../assets/images/saloon.webp';

function Orders(props) {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (props.isFirstLoadDone) {
      if (props.isLoggedIn === false) {
        navigate('/login?redirect=orders');
      }
    }
  }, [navigate, props.isLoggedIn, props.isFirstLoadDone]);

  useEffect(() => {
    document.title = 'My Orders - Laundry Basket';
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
                Orders
              </Typography>
            </div>
          </div>
        </div>
      </Paper>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab sx={{ width: '50%' }} icon={<CheckroomIcon />} label='RECENT' iconPosition='start' />
          <Tab sx={{ width: '50%' }} icon={<AssignmentTurnedInIcon />} label='PAST' iconPosition='start' />
        </Tabs>
      </Box>
      {value === 0 ? (
        <Box sx={{ pt: 5 }}>
          <CurrentOrders></CurrentOrders>
        </Box>
      ) : (
        <Box sx={{ pt: 5 }}>
          <PastOrders></PastOrders>
        </Box>
      )}
    </Container>
  );
}

export default Orders;
