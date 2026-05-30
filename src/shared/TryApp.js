import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function TryApp(props) {
  return (
    <Container
      maxWidth='xlg'
      id='how-we-work'
      sx={{
        pt: { xs: 4, sm: 8 },
        pb: { xs: 8, sm: 16 },
      }}
    >
      <Grid container sx={{ background: '#13263d', borderRadius: '15px' }}>
        <Grid
          item
          xs={12}
          sm={8}
          md={8}
          sx={{
            pl: { xs: 0, sm: 2 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <Box sx={{ width: { xs: '90%', sm: '90%', md: '80%' }, margin: 'auto', py: { xs: 4, sm: 4, md: 1 } }}>
            <Typography component='h2' variant='h3' sx={{ color: 'text.white' }}>
              Try our
              <Typography sx={{ display: 'inline', color: 'primary.main' }} variant='h3'>
                {' '}
                Laundry Basket Mobile{' '}
              </Typography>
              App
            </Typography>
            <Typography component='p' variant='title' sx={{ color: 'text.white', pt: 4 }}>
              The First Step to Fresh, Clean Laundry! Schedule pickups, track orders & enjoy hassle-free service—Download Our
              App Now!
            </Typography>
            <Grid spacing={2.5} container sx={{ pt: 4 }}>
              <Grid item xs={6} sm={4} md={3}>
                <img
                  style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}
                  src={require('../assets/images/app-store.png')}
                  alt='new'
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <img
                  style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}
                  src={require('../assets/images/play-store.png')}
                  alt='new'
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          sx={{ display: { xs: 'none', sm: 'flex', md: 'flex' }, py: 5, justifyContent: 'center', alignItems: 'center' }}
          item
          xs={12}
          sm={4}
          md={4}
        >
          <img
            style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}
            src={require('../assets/images/ios-app-home.png')}
            alt='new'
          />
        </Grid>
      </Grid>
    </Container>
  );
}
