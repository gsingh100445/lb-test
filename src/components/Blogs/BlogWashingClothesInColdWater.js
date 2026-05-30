import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Paper, Stack } from '@mui/material';
import cover from '../../assets/images/saloon.webp';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';

export default function BlogWashingClothesInColdWater(props) {
  const [heading, setHeading] = React.useState('Why Washing Clothes in Cold Water is a Smart (and Eco-Friendly) Choice');
  const [blog, setBlog] = React.useState({
    id: '683883ee966dcb1a609bd58d',
    code: 'washing-clothes-in-cold-water',
    heading: 'Why Washing Clothes in Cold Water is a Smart (and Eco-Friendly) Choice',
    subHeading:
      'When it comes to doing laundry, most people don’t think much about water temperature. But at Laundry Basket, it’s something we pay close attention to — because washing your clothes in cold water doesn’t just protect fabrics, it also saves energy and helps the environment.',
    pic: 'https://iili.io/3yBzCpS.webp',
    status: 'active',
    description:
      'When it comes to doing laundry, most people don’t think much about water temperature. But at Laundry Basket, it’s something we pay close attention to — because washing your clothes in cold water doesn’t just protect fabrics, it also saves energy and helps the environment.',
    type: 'Article',
    date: '2025-05-29T00:00:00.000Z',
    content: [
      {
        textType: 'title',
        textValue: '1. Cold Water is Gentler on Clothes',
      },
      {
        textType: 'subtitle1',
        textValue:
          'Hot water can cause shrinkage, fading, and even damage to delicate fabrics. At Laundry Basket, we always sort your clothes by fabric type and color, and we wash most items in cold water to preserve their quality. This approach helps your clothes last longer and look newer.',
      },
      {
        textType: 'title',
        textValue: '2. Better for the Planet and Your Bills',
      },
      {
        textType: 'subtitle1',
        textValue:
          'Did you know that nearly 90% of the energy used in a washing cycle goes into heating the water? By using cold water, we reduce energy use significantly — which is not only eco-friendly but also cost-effective. At Laundry Basket, we’re committed to sustainability in every step of our process.',
      },
      {
        textType: 'title',
        textValue: '3. Cold Water, Same Clean',
      },
      {
        textType: 'subtitle1',
        textValue:
          'Thanks to high-efficiency detergents we use at Laundry Basket, cold water is just as effective at removing stains and killing bacteria. Your clothes come back fresh, clean, and well cared for — without the need for hot water.',
      },
      {
        textType: 'title',
        textValue: 'Our Promise',
      },
      {
        textType: 'subtitle1',
        textValue:
          'From sorting and treating stains to choosing the right temperature and cycle, every step at Laundry Basket is done with care. Washing in cold water is one of the many ways we make sure your clothes are handled with love — and responsibility.',
      },
      {
        textType: 'subtitle1',
        textValue:
          'Looking for a laundry service that puts care first? Schedule your next pickup with Laundry Basket and experience the difference.',
      },
    ],
  });
  React.useEffect(() => {
    document.title = heading + ' - Laundry Basket';
    window.scrollTo(0, 0);
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
              <Typography className='text-center' sx={{ color: 'text.white', typography: { sm: 'h5', xs: 'h5' } }}>
                {heading}
              </Typography>
            </div>
          </div>
        </div>
      </Paper>
      <Helmet>
        <meta name='description' content={blog.subHeading} />
        <meta name='keywords' content='Laundry Basket, Washing Clothes, Cold Water, Eco-Friendly Laundry' />
      </Helmet>
      <Box sx={{ width: '90%', mx: 'auto', pt: { xs: 3, sm: 5 }, px: { xs: 0, sm: 2, md: 5 } }}>
        <Box sx={{ width: { xs: '100%', sm: '100%', md: '95%' }, ml: 'auto' }}>
          <Stack direction='row' alignItems='center' justifyContent='center' gap={5} sx={{ py: 1, width: '100%' }}>
            <Box
              sx={{
                borderRadius: '50px',
                borderColor: 'primary.main',
                borderWidth: 1,
                py: 1,
                px: 1.5,
                width: 'fit-content',
              }}
            >
              <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }} variant='title'>
                {blog.type}
              </Typography>
            </Box>
            <Typography sx={{ color: 'text.neutral' }} variant='title'>
              {moment(blog.createdAt).format('MMMM Do YYYY')}
            </Typography>
          </Stack>
          <Typography
            dangerouslySetInnerHTML={{
              __html: blog.subHeading.replaceAll(
                'Laundry Basket',
                `<a
                  style="cursor: pointer; color: #0095ff;"
                  href='https://www.laundrybasket.ca'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Laundry Basket
                </a>`
              ),
            }}
            component='h6'
            variant='h6'
            sx={{ color: 'text.secondary', mt: 2 }}
          ></Typography>
          <Box sx={{ width: '75%', mx: 'auto', my: 5 }}>
            <img className='how-it-works-img' src={blog.pic} alt={heading} />
          </Box>
          {blog.content &&
            blog.content.length &&
            blog.content.map((item, index) => (
              <Box sx={{ pt: 1 }} key={index}>
                {item.textType === 'title' && (
                  <Typography
                    dangerouslySetInnerHTML={{
                      __html: item.textValue.replaceAll(
                        'Laundry Basket',
                        `<a
                          style="cursor: pointer; color: #0095ff;"
                          href='https://www.laundrybasket.ca'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Laundry Basket
                        </a>`
                      ),
                    }}
                    variant='title'
                    component='p'
                    sx={{ color: 'text.secondary', pb: 1 }}
                  ></Typography>
                )}
                {item.textType === 'subtitle1' && (
                  <Typography
                    dangerouslySetInnerHTML={{
                      __html: item.textValue.replaceAll(
                        'Laundry Basket',
                        `<a
                          style="cursor: pointer; color: #0095ff;"
                          href='https://www.laundrybasket.ca'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Laundry Basket
                        </a>`
                      ),
                    }}
                    variant='subtitle1'
                    component='p'
                    sx={{ color: 'text.secondary', pb: 1 }}
                  ></Typography>
                )}
                {item.textType === 'ul' && (
                  <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                    {item.textValue.split('|').map((listItem, listIndex) => (
                      <li key={listIndex}>
                        <Typography variant='subtitle1' component='p' sx={{ color: 'text.secondary', pb: 1 }}>
                          {listItem}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                )}
              </Box>
            ))}
        </Box>
      </Box>
    </Container>
  );
}
