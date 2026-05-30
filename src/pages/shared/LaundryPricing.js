import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LaundryPricing(props) {
  const navigation = useNavigate();

  const [tenant, setTenant] = React.useState({});
  const [services, setServices] = React.useState([]);
  const [servicesLoaded, setServicesLoaded] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (props.tenant) {
      setTenant(props.tenant);
    }
    if (props.servicesLoaded) {
      setServicesLoaded(props.servicesLoaded);
      setServices(props.services);
    }
  }, [props.services, props.servicesLoaded, props.tenant, index]);

  const getUrl = (name) => {
    if (name === 'Wash & Fold') {
      return 'wash-and-fold';
    }
    if (name === 'Dry Cleaning') {
      return 'dry-cleaning';
    }
    if (name === 'Shoe Cleaning') {
      return 'shoe-cleaning';
    }
    if (name === 'Wash & Iron') {
      return 'wash-and-iron';
    }
    if (name === 'Home Care') {
      return 'home-care';
    }
    if (name === 'Iron Only') {
      return 'ironing';
    }
  };

  return (
    <Container
      style={{
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '1px',
        paddingBottom: '15px',
        maxWidth: 'none',
      }}
      sx={{ width: '90%', mx: 'auto' }}
    >
      {servicesLoaded && (
        <>
          <Typography sx={{ mt: 4, color: 'text.secondary' }} variant='h5'>
            Pricing
          </Typography>
          <Grid container spacing={5} sx={{ pt: 4, pb: 4 }}>
            {services
              .filter((serviceItem) => serviceItem.isItem)
              .map((serviceItem, itemIndex) => (
                <Grid key={itemIndex} sx={{ height: 'auto' }} item xs={12} sm={4} md={4}>
                  <Box
                    sx={{
                      width: '100%',
                      backgroundColor: 'actionLite.selected',
                      py: 3,
                      px: 3,
                      borderRadius: '25px',
                    }}
                  >
                    <a
                      style={{ cursor: 'pointer', color: '#0095ff' }}
                      href={`https://www.laundrybasket.ca/${getUrl(serviceItem.name)}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Typography variant='h5' sx={{ color: 'text.secondary' }}>
                        {serviceItem.name}
                      </Typography>
                    </a>
                    <Typography sx={{ mt: 2, color: 'text.secondary' }} variant='subtitle2'>
                      {serviceItem.description}
                    </Typography>
                    <Typography sx={{ mt: 2, color: 'text.primary' }} variant='h6'>
                      Price: ${Number(serviceItem.currentPrice).toFixed(2)} / lbs
                    </Typography>
                    <Button
                      sx={{
                        mt: 2,
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
                  </Box>
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </Container>
  );
}
