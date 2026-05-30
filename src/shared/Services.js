import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';

library.add(faUser);

export default function Services(props) {
  const navigate = useNavigate();

  React.useEffect(() => {}, [props]);

  return (
    <Container
      maxWidth='xlg'
      sx={{
        pt: { xs: 4, sm: 6 },
        pb: { xs: 8, sm: 6 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '100%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Grid
          container
          justifyContent='space-between'
          spacing={{ xs: 2, sm: 2, md: 2 }}
          sx={{
            px: { xs: 0, sm: 2, md: 5 },
          }}
        >
          <Grid sx={{ height: 'auto' }} container justifyContent='start' alignItems='center' item xs={12} sm={12} md={5}>
            <Typography component='h2' variant='h3' sx={{ color: 'text.secondary', textAlign: 'left' }}>
              A Wide Range of
              <Typography variant='h3' component='span' sx={{ color: 'text.primary', display: 'inline', textAlign: 'left' }}>
                {' '}
                Laundry and Dry Cleaning{' '}
              </Typography>
              Services
            </Typography>
          </Grid>
          <Grid sx={{ height: 'auto' }} container justifyContent='start' alignItems='center' item xs={12} sm={12} md={4}>
            <Typography component="h3" variant='subtitle2' sx={{ color: 'text.neutral', mt: 2, textAlign: 'left' }}>
              Tired of spending hours at the laundromat or dealing with endless laundry piles? At Laundry Basket, we make
              laundry and dry cleaning effortless with free pickup and delivery, ensuring fresh, clean clothes without the
              hassle.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {props.servicesLoaded ? (
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 2 }}
          sx={{
            justifyContent: 'center',
            px: { xs: 0, sm: 2, md: 5 },
          }}
        >
          {props.services.map((service, index) => (
            <Grid sx={{ height: 'auto' }} item key={service.id} xs={6} sm={4} md={2}>
              <div
                style={{ cursor: 'pointer', height: '100%' }}
                onClick={() =>
                  navigate({
                    pathname: '/pricing',
                    search: `?${createSearchParams({
                      selectedIndex: index,
                    })}`,
                  })
                }
              >
                <Card
                  sx={[
                    {
                      display: 'flex',
                      height: '100%',
                      flexDirection: 'column',
                      gap: 4,
                      '& .card-typo': {
                        color: 'text.secondary',
                      },
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        '& .card-typo': {
                          color: 'white',
                        },
                      },
                    },
                    (theme) => ({
                      boxShadow: `0 3px 12px hsla(210, 98%, 42%, 0.2)`,
                      ...theme.applyStyles('dark', {
                        '&:hover': {
                          '& .icon-box': {
                            backgroundColor: 'hsla(0, 0%, 0%, 0)',
                          },
                        },
                        boxShadow: `0 3px 12px hsla(0, 0%, 0%, 0.8)`,
                      }),
                    }),
                  ]}
                >
                  <Box
                    sx={{
                      px: 2,
                      py: 2,
                    }}
                  >
                    <Box
                      sx={[
                        {
                          textAlign: 'left',
                          justifyItems: 'left',
                          gap: 2,
                        },
                      ]}
                    >
                      <Box
                        className='icon-box'
                        sx={[
                          {
                            justifyContent: 'center',
                            padding: 1.5,
                            borderRadius: '50%',
                          },
                        ]}
                      >
                        <img
                          style={{
                            height: '45px',
                          }}
                          src={service.pic2}
                          alt='new'
                        />
                      </Box>

                      <Box sx={{ display: { xs: 'none', sm: 'block', md: 'block' } }}>
                        <Typography
                          sx={{
                            mt: 2,
                            typography: { xs: 'h4', sm: 'h4', md: 'h4' },
                          }}
                          component='h4'
                          className='card-typo'
                        >
                          {service.name}
                        </Typography>
                        <Typography
                          variant='subtitle2'
                          component="h5"
                          sx={{
                            mt: 2,
                          }}
                          className='card-typo'
                        >
                          {service.description}
                        </Typography>
                      </Box>
                      <Box sx={{ display: { xs: 'block', sm: 'none', md: 'none' } }}>
                        <Typography
                          sx={{
                            mt: 2,
                          }}
                          className='card-typo'
                          component='h5'
                          variant='h5'
                        >
                          {service.name}
                        </Typography>
                        <Typography
                          variant='subtitle2'
                          component="h5"
                          className='card-typo'
                          sx={{
                            mt: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '3',
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {service.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </div>
            </Grid>
          ))}
        </Grid>
      ) : null}
      <Stack
        direction='row'
        alignItems='center'
        gap={5}
        sx={{ my: 1, pt: 1, width: '100%', justifyContent: { xs: 'space-between', sm: 'center' } }}
      >
        <Button
          sx={{
            width: { xs: '47%', sm: 'auto' },
            px: 2,
            mr: 2,
          }}
          onClick={() => {
            navigate(props.isLoggedIn ? '/book-order' : '/login?redirect=book-order');
          }}
          color='primary'
          variant='contained'
        >
          <Typography sx={{ color: 'white', fontWeight: 'bold' }} variant='subtitle1' textAlign='center'>
            Schedule PickUp
          </Typography>
        </Button>
        <Button
          sx={{
            width: { xs: '47%', sm: 'auto' },
            px: 2,
            mr: 2,
          }}
          onClick={() => {
            navigate('/services');
          }}
          color='secondary'
          variant='contained'
        >
          <Typography sx={{ color: 'white', fontWeight: 'bold' }} variant='subtitle1' textAlign='center'>
            Our Services
          </Typography>
        </Button>
      </Stack>
    </Container>
  );
}
