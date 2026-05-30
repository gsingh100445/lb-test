import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  InventoryTwoTone,
  LocalLaundryServiceTwoTone,
  LocalShippingTwoTone,
} from '@mui/icons-material';
import { firstOrderDiscount } from '../utils/config';

const items = [
  {
    icon: <LocalShippingTwoTone fontSize='large' />,
    title: '1. Pick Up',
    description:
      "A designated Laundry Basket driver arrives at the customer's location to collect the laundry at the scheduled time.",
  },
  {
    icon: <LocalLaundryServiceTwoTone fontSize='large' />,
    title: '2. Process',
    description:
      'Depending on your selected service— Wash & Fold, Wash & Iron, Dry Cleaning, or Iron, we carefully clean, iron, and prepare your garments with precision.',
  },
  {
    icon: <InventoryTwoTone fontSize='large' />,
    title: '3. Quality Check',
    description:
      'Each item pass through a rigorous quality check at Laundry Basket, ensuring they meet the highest standards.',
  },
  {
    icon: <LocalShippingTwoTone fontSize='large' />,
    title: '4. Delivery',
    description: 'Your fresh, clean laundry is delivered back to your doorstep, neatly packed and ready to use.',
  },
];

export default function Highlights() {
  return (
    <Container
      maxWidth='xlg'
      id='how-we-work'
      sx={{
        pt: { xs: 4, sm: 6 },
        pb: { xs: 8, sm: 8 },
      }}
    >
      <Grid container spacing={2.5} sx={{ px: { xs: 0, sm: 2, md: 5 } }}>
        <Grid sx={{ height: 'auto', alignContent: 'center' }} item xs={12} sm={12} md={7}>
          <Typography component='h2' variant='h3' sx={{ color: 'text.secondary', pl: { xs: 0, sm: 2 }, pb: 2, pt: 2 }}>
            How it works at{' '}
            <Typography variant='h3' component='span' sx={{ color: 'text.primary', display: 'inline' }}>
              Laundry Basket
            </Typography>
          </Typography>
          {items.map((item, index) => (
            <Grid key={index} container spacing={2.5} sx={{ mt: 0 }}>
              <Grid item xs={2} sm={2} md={2}>
                <Box
                  sx={{
                    borderRadius: '50px',
                    backgroundColor: 'action.selected',
                    padding: 1.5,
                    margin: 'auto',
                    width: 'fit-content',
                  }}
                >
                  {item.icon}
                </Box>
              </Grid>
              <Grid item xs={10} sm={10} md={10}>
                <Typography sx={{ pl: { xs: 2, sm: 0 }, color: 'text.secondary' }} component='h3' variant='h5'>
                  {item.title}
                </Typography>
                <Typography component='h4' sx={{ pl: { xs: 2, sm: 0 }, color: 'text.neutral' }} variant='subtitle2'>
                  {item.description}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid sx={{ height: 'auto', alignContent: 'center', mt: { xs: 5, sm: 0, md: 0 } }} item xs={12} sm={5} md={5}>
          <img
            className='how-it-works-img'
            src={require('../assets/images/how-it-work-2.webp')}
            alt={firstOrderDiscount + '% off first laundry order with free delivery'}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
