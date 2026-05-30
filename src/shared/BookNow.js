import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Phone } from '@mui/icons-material';
import { Button } from '@mui/material';

export default function BookNow() {
  return (
    <Container
      maxWidth='xlg'
      id='how-we-work'
      style={{ paddingRight: 0, paddingLeft: 0 }}
      sx={{
        pt: { xs: 4, sm: 6 },
        pb: { xs: 8, sm: 6 },
      }}
    >
      <Grid sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>
        <Grid item xs={12} sm={5.5} md={5.5}>
          <img style={{ width: '100%' }} src={require('../assets/images/Laundry-1.webp')} alt='Laundry and dry cleaning with pickup and delivery in Toronto' />
        </Grid>
        <Grid
          item
          xs={3}
          sm={1}
          md={1}
          sx={{ backgroundColor: '#13263d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Box
            sx={{
              backgroundColor: '#13263d',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              margin: 'auto',
              marginLeft: '-140px',
            }}
          >
            <Box
              sx={{
                backgroundColor: 'primary.main',
                width: '215px',
                height: '215px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Box>
                <Typography variant='body1' sx={{ color: 'text.white', fontWeight: 600 }}>
                  Starting at only
                </Typography>
                <Typography component='h3' variant='h1' sx={{ color: 'text.white', marginTop: '-5px' }}>
                  $1.99
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={9}
          sm={5.5}
          md={5.5}
          sx={{
            backgroundColor: '#13263d',
            pl: { xs: 0, sm: 2 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <Box sx={{ width: '85%', mr: 'auto', pl: 2 }}>
            <Typography component='h2' variant='h3' sx={{ color: 'text.white', pb: 2 }}>
              Quality laundry and dry cleaning with free{' '}
              <Typography variant='h3' component='span' sx={{ color: 'text.primary', display: 'inline' }}>
                pickup and delivery
              </Typography>
            </Typography>
            <Typography component="h3" variant='subtitle2' sx={{ color: 'text.white' }}>
              Experience premium laundry care with expert cleaning and meticulous attention to detail. Enjoy free pickup and
              delivery for ultimate convenience!
            </Typography>
            <br></br>
            <a href='tel:6472476745'>
              <Button size='large' sx={{ mt: 3, fontSize: 30, fontWeight: 600, color: 'text.white' }}>
                <Phone
                  sx={{
                    color: 'text.white',
                    mr: 1.5,
                    fontSize: 42,
                    backgroundColor: 'primary.main',
                    borderRadius: '50%',
                    padding: 0.8,
                  }}
                />
                647-247-6745
              </Button>
            </a>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, backgroundColor: '#13263d' }}>
        <Box
          sx={{
            backgroundColor: '#13263d',
            pl: { xs: 0, sm: 2 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '85%', pt: 5, textAlign: 'center', backgroundColor: '#13263d' }}>
            <Typography component='h2' variant='h3' sx={{ color: 'text.white', pb: 2 }}>
              Quality laundry and dry cleaning with free{' '}
              <Typography variant='h3' component='span' sx={{ color: 'text.primary', display: 'inline' }}>
                pickup and delivery
              </Typography>
            </Typography>
            <Typography component="h3" variant='subtitle2' sx={{ color: 'text.white' }}>
              Experience premium laundry care with expert cleaning and meticulous attention to detail. Enjoy free pickup and
              delivery for ultimate convenience!
            </Typography>
            <br />
            <a href='tel:6472476745'>
              <Button size='large' sx={{ mt: 0, fontSize: 30, fontWeight: 600, color: 'text.white' }}>
                <Phone
                  sx={{
                    color: 'text.white',
                    mr: 1.5,
                    fontSize: 42,
                    backgroundColor: 'primary.main',
                    borderRadius: '50%',
                    padding: 0.8,
                  }}
                />
                647-247-6745
              </Button>
            </a>
          </Box>
        </Box>
        <Box sx={{ backgroundColor: '#13263d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box
            sx={{
              backgroundColor: '#13263d',
              width: '230px',
              height: '230px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              margin: 'auto',
              marginBottom: '-115px',
            }}
          >
            <Box
              sx={{
                backgroundColor: 'primary.main',
                width: '190px',
                height: '190px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Box>
                <Typography variant='body1' sx={{ color: 'text.white', fontWeight: 600 }}>
                  Starting at only
                </Typography>
                <Typography component='h3' variant='h1' sx={{ color: 'text.white', marginTop: '-5px' }}>
                  $1.99
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <img style={{ width: '100%' }} src={require('../assets/images/Laundry-1.webp')} alt='Laundry and dry cleaning with pickup and delivery in Toronto' />
      </Box>
    </Container>
  );
}
