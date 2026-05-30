import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Paper, Stack } from '@mui/material';
import cover from '../../assets/images/saloon.webp';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';

export default function BlogTop5BenefitsOfProfessionallyIronedClothes(props) {
  const [heading, setHeading] = React.useState('Top 5 Benefits of Professionally Ironed Clothes');
  const [blog, setBlog] = React.useState({
    id: '6838a80112808d1b248dcfe6',
    code: 'top-5-benefits-of-professionally-ironed-clothes',
    heading: 'Top 5 Benefits of Professionally Ironed Clothes',
    subHeading:
      'In today’s fast-paced world, appearances matter — whether it’s for work, events, or simply feeling confident in your own skin. While most people handle their laundry at home, many overlook the importance of professionally ironed clothes. At Laundry Basket, we understand the difference that crisp, neatly pressed garments can make — not just in looks, but also in how long your clothes last.',
    pic: 'https://iili.io/3yIDPTJ.webp',
    status: 'active',
    description:
      'In today’s fast-paced world, appearances matter — whether it’s for work, events, or simply feeling confident in your own skin. While most people handle their laundry at home, many overlook the importance of professionally ironed clothes. At Laundry Basket, we understand the difference that crisp, neatly pressed garments can make — not just in looks, but also in how long your clothes last.',
    type: 'Article',
    date: '2025-05-29T18:31:29.833Z',
    content: [
      {
        textType: 'subtitle1',
        textValue: 'Here are the top 5 benefits of trusting professionals with your ironing:',
      },
      {
        textType: 'title',
        textValue: '1. A Sharp, Polished Look Every Time',
      },
      {
        textType: 'subtitle1',
        textValue:
          'Nothing beats the flawless finish of a professional iron. Our expert team ensures each crease is perfectly placed and each fabric type is treated with the right heat and care. You step out looking sharp, confident, and ready to impress.',
      },
      {
        textType: 'title',
        textValue: '2. Fabric-Safe Techniques',
      },
      {
        textType: 'subtitle1',
        textValue:
          'At Laundry Basket, we know different fabrics require different approaches. Whether it’s delicate silk or sturdy cotton, we use the right equipment and techniques to prevent damage, shine marks, or burning.',
      },
      {
        textType: 'title',
        textValue: '3. Saves You Time and Hassle',
      },
      {
        textType: 'subtitle1',
        textValue:
          "Let’s face it — ironing is time-consuming. From sorting clothes to managing temperature settings, it’s not everyone's favorite chore. With our Iron-Only service, you get perfectly pressed clothes without lifting a finger.",
      },
      {
        textType: 'title',
        textValue: '4. Extends the Life of Your Clothes',
      },
      {
        textType: 'subtitle1',
        textValue:
          'Improper ironing can wear out fabrics and weaken fibers. Our professional handling ensures your clothes maintain their texture, shape, and quality for longer.',
      },
      {
        textType: 'title',
        textValue: '5. Wrinkle-Free Delivery to Your Doorstep',
      },
      {
        textType: 'subtitle1',
        textValue:
          'When you choose Laundry Basket, your clothes are returned neatly folded or on hangers, wrinkle-free and ready to wear. It’s convenience, care, and class — all in one.',
      },
      {
        textType: 'subtitle1',
        textValue:
          'At Laundry Basket, we believe in delivering more than clean clothes — we deliver confidence and comfort. Try our Iron Only or Wash and Iron service and feel the difference for yourself!',
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
                      ).replaceAll('Wash and Iron', `<a
                          style="cursor: pointer; color: #0095ff !important;"
                          href='https://www.laundrybasket.ca/wash-and-iron'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Wash and Iron
                        </a>`).replaceAll('Iron Only', `<a
                          style="cursor: pointer; color: #0095ff !important;"
                          href='https://www.laundrybasket.ca/ironing'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Iron Only
                        </a>`)
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
