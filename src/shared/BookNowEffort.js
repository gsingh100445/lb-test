import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BookNowEffort(props) {
  const navigation = useNavigate();

  return (
    <Container
      maxWidth='xlg'
      id='how-we-work'
      style={{ paddingRight: 0, paddingLeft: 0 }}
      sx={{
        pt: { xs: 4, sm: 8 },
        pb: { xs: 8, sm: 6 },
      }}
    >
      <Grid container sx={{ background: '#13263d' }}>
        <Grid sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} item xs={12} sm={6} md={6}>
          <img
            style={{ width: '75%', marginLeft: 'auto', marginRight: 'auto', marginTop: '-3rem' }}
            src='https://iili.io/2QrA63g.png'
            alt='new'
          />
        </Grid>
        <Grid sx={{ display: { xs: 'none', sm: 'block', md: 'none' } }} item xs={12} sm={6} md={6}>
          <img
            style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', marginTop: '3rem' }}
            src='https://iili.io/2QrA63g.png'
            alt='new'
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{
            pl: { xs: 0, sm: 2 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <Box sx={{ width: { xs: '90%', sm: '90%', md: '80%' }, margin: 'auto', py: { xs: 4, sm: 4, md: 1 } }}>
            <Typography component='h4' variant='h3' sx={{ color: 'text.white' }}>
              Effortless Laundry,
            </Typography>
            <Typography component='h4' variant='h3' sx={{ color: 'text.primary', pb: 1 }}>
              Every Time!
            </Typography>
            <Typography component='h5' variant='h6' sx={{ color: 'text.white' }}>
              Convenient, Reliable, and Ready When You Are.
            </Typography>
            <br></br>
            <Button
              sx={{
                px: 2,
                mr: 2,
              }}
              onClick={() => {
                navigation(props.isLoggedIn ? '/book-order' : '/login?redirect=book-order');
              }}
              color='primary'
              variant='contained'
            >
              <Typography sx={{ color: 'white', fontWeight: 'bold' }} variant='subtitle1' textAlign='center'>
                Schedule PickUp
              </Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
