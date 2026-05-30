import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Bolt, DryCleaning, LocalLaundryService, PhoneIphone, SwitchAccessShortcut } from '@mui/icons-material';
import { firstOrderDiscount } from '../../utils/config';

export default function HowLBWorks(props) {
  const navigation = useNavigate();

  React.useEffect(() => {}, []);

  return (
    <Box sx={{ width: '90%', mx: 'auto', pt: { xs: 4, sm: 6 } }}>
      <Typography sx={{ color: 'text.secondary' }} variant='h5' component='h5' textAlign='left'>
        How{' '}
        <a
          style={{ cursor: 'pointer', color: '#0095ff' }}
          href='https://www.laundrybasket.ca'
          target='_blank'
          rel='noopener noreferrer'
        >
          Laundry Basket
        </a>{' '}
        Works
      </Typography>
      <Grid spacing={8} sx={{ pt: 3 }} alignItems='stretch' container>
        <Grid item xs={12} sm={4} md={4}>
          <Stack sx={{ pt: 2 }} spacing={2} direction='row' useFlexGap justifyContent='start' alignItems='center'>
            <Box
              sx={{
                backgroundColor: 'model.lite',
                padding: 1,
                borderRadius: '50%',
              }}
            >
              <PhoneIphone sx={{ fontSize: 35 }} />
            </Box>
            <Box sx={{ background: 'gray', width: '90%', height: '.5px' }}></Box>
          </Stack>
          <Typography
            sx={{ color: 'text.secondary', pt: 3, fontWeight: 'bold' }}
            variant='title'
            component='p'
            textAlign='left'
          >
            Convenience
          </Typography>
          <Typography sx={{ color: 'text.secondary', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
            Easily schedule your{' '}
            <a
              style={{ cursor: 'pointer', color: '#0095ff' }}
              href='https://www.laundrybasket.ca'
              target='_blank'
              rel='noopener noreferrer'
            >
              Laundry Basket
            </a>{' '}
            pickup online, by text, or by call. We operate 7 days a week with convenient hours from 9 AM to 11 PM — no need
            to be home!
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Stack sx={{ pt: 2 }} spacing={2} direction='row' useFlexGap justifyContent='start' alignItems='center'>
            <Box
              sx={{
                backgroundColor: 'model.lite',
                padding: 1,
                borderRadius: '50%',
              }}
            >
              {props.isDryClean ? <DryCleaning sx={{ fontSize: 35 }} /> : <LocalLaundryService sx={{ fontSize: 35 }} />}
            </Box>
            <Box sx={{ background: 'gray', width: '90%', height: '.5px' }}></Box>
          </Stack>
          <Typography
            sx={{ color: 'text.secondary', pt: 3, fontWeight: 'bold' }}
            variant='title'
            component='p'
            textAlign='left'
          >
            Expert cleaning
          </Typography>
          <Typography sx={{ color: 'text.secondary', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
            Enjoy the extra 3 hours you save each week with{' '}
            <a
              style={{ cursor: 'pointer', color: '#0095ff' }}
              href='https://www.laundrybasket.ca'
              target='_blank'
              rel='noopener noreferrer'
            >
              Laundry Basket
            </a>{' '}
            while your
            {props.isDryClean ? ' clothes are ' : ' laundry is '}professionally cleaned by experts who know how to care for
            every fabric.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Stack sx={{ pt: 2 }} spacing={2} direction='row' useFlexGap justifyContent='start' alignItems='center'>
            <Box
              sx={{
                backgroundColor: 'model.lite',
                padding: 1,
                borderRadius: '50%',
              }}
            >
              <Bolt sx={{ fontSize: 35 }} />
            </Box>
            <Box sx={{ background: 'gray', width: '90%', height: '.5px' }}></Box>
          </Stack>
          <Typography
            sx={{ color: 'text.secondary', pt: 3, fontWeight: 'bold' }}
            variant='title'
            component='p'
            textAlign='left'
          >
            Fast turnaround
          </Typography>
          <Typography sx={{ color: 'text.secondary', pt: 2 }} variant='subtitle2' component='p' textAlign='left'>
            Sit back and relax with fresh {props.isDryClean ? ' clothes ' : ' laundry '} delivered right to your door.
            Standard turnaround is 24-48 hours, with faster options available. On your delivery day, we’ll text you with your
            driver’s estimated arrival time.
          </Typography>
        </Grid>
      </Grid>
      <Button
        sx={{
          mt: 1,
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
      <Typography
        sx={{ color: 'text.secondary', pt: 1, fontWeight: 'bold' }}
        variant='subtitle'
        component='p'
        textAlign='left'
      >
        <SwitchAccessShortcut sx={{ mb: 2.5, fontSize: 30 }} /> {firstOrderDiscount}% OFF on first order
      </Typography>
    </Box>
  );
}
