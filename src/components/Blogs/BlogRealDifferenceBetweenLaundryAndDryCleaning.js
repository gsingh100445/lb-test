import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Paper, Stack } from '@mui/material';
import cover from '../../assets/images/saloon.webp';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';

export default function BlogRealDifferenceBetweenLaundryAndDryCleaning(props) {
  const [heading, setHeading] = React.useState('The Real Difference Between Laundry and Dry Cleaning');
  const [blog, setBlog] = React.useState({
    id: '6838895b12808d1b248dcfe5',
    code: 'real-difference-between-laundry-and-dry-cleaning',
    heading: 'The Real Difference Between Laundry and Dry Cleaning',
    subHeading:
      'When it comes to caring for your clothes, the terms “laundry” and “dry cleaning” are often used interchangeably—but they’re not the same thing. At Laundry Basket, we believe it’s important to help our customers understand the difference so they can make the best choice for their garments. Let’s break it down simply.',
    pic: 'https://iili.io/3yCx7t9.webp',
    status: 'active',
    description:
      'When it comes to caring for your clothes, the terms “laundry” and “dry cleaning” are often used interchangeably—but they’re not the same thing. At Laundry Basket, we believe it’s important to help our customers understand the difference so they can make the best choice for their garments. Let’s break it down simply.',
    type: 'Article',
    date: '2025-05-29T16:20:43.824Z',
    content: [
      {
        textType: 'title',
        textValue: 'Laundry: The Traditional Wash',
      },
      {
        textType: 'subtitle1',
        textValue:
          'Laundry refers to the process of cleaning clothes using water and detergent. This is what most of us do at home or what we handle through our Wash & Fold or Wash & Iron services at Laundry Basket. Clothes are sorted by color and fabric type, washed in cold water to preserve quality, and then dried and folded or pressed.',
      },
      {
        textType: 'subtitle1',
        textValue: 'Laundry is ideal for:',
      },
      {
        textType: 'ul',
        textValue:
          'Everyday clothing like t-shirts, jeans, socks, and underwear|Towels, bedsheets, and washable home textiles|Activewear and baby clothes',
      },
      {
        textType: 'subtitle1',
        textValue:
          'At Laundry Basket, we always sort items carefully and wash them in cold water to minimize wear, prevent color bleeding, and save energy—good for your clothes and the planet.',
      },
      {
        textType: 'title',
        textValue: 'Dry Cleaning: A Waterless Method',
      },
      {
        textType: 'subtitle1',
        textValue:
          'Despite the name, dry cleaning isn’t entirely dry—but it doesn’t use water. Instead, it uses special chemical solvents to gently clean fabrics that can’t handle water without shrinking, fading, or becoming misshapen. After cleaning, clothes are steam-pressed and returned looking fresh and crisp.',
      },
      {
        textType: 'subtitle1',
        textValue: 'Dry Cleaning is best for:',
      },
      {
        textType: 'ul',
        textValue:
          'Suits, blazers, and dress shirts|Wool coats, silk dresses, and delicate fabrics|Heavily stained or structured garments',
      },
      {
        textType: 'subtitle1',
        textValue:
          'At Laundry Basket, our Dry Cleaning service ensures each item is handled with extra care, using high-quality solvents and professional equipment to extend the life of your wardrobe staples.',
      },
      {
        textType: 'title',
        textValue: 'So, Which One Do You Need?',
      },
      {
        textType: 'subtitle1',
        textValue:
          'If your garment has a “machine wash” tag, laundry is usually safe. If it says “dry clean only,” trust the professionals. When in doubt, our team at Laundry Basket is always happy to advise.',
      },
      {
        textType: 'subtitle1',
        textValue:
          'Whether it’s a quick wash or a deep clean, we’ve got you covered. Book a pickup today and let us take the load off your hands—literally.',
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
        <meta name='keywords' content='Laundry, Dry Cleaning, Laundry Basket, Clothing Care, Garment Cleaning' />
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
                  style="cursor: pointer; color: #0095ff !important;"
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
                          style="cursor: pointer; color: #0095ff !important;"
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
                      __html: item.textValue
                        .replaceAll(
                          'Laundry Basket',
                          `<a
                          style="cursor: pointer; color: #0095ff !important;"
                          href='https://www.laundrybasket.ca'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Laundry Basket
                        </a>`
                        )
                        .replaceAll(
                          'Dry Cleaning',
                          `<a
                          style="cursor: pointer; color: #0095ff !important;"
                          href='https://www.laundrybasket.ca/dry-cleaning'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Dry Cleaning
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
