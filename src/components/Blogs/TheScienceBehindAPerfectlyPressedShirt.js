import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Paper, Stack } from '@mui/material';
import cover from '../../assets/images/saloon.webp';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';

export default function TheScienceBehindAPerfectlyPressedShirt(props) {
  const [heading, setHeading] = React.useState('The Science Behind a Perfectly Pressed Shirt');
  const [blog, setBlog] = React.useState({
    id: '6898c0530b7e65ec4a033252',
    code: 'the-science-behind-a-perfectly-pressed-shirt',
    heading: 'The Science Behind a Perfectly Pressed Shirt',
    subHeading:
      'A crisp, wrinkle-free shirt doesn’t just look good—it makes a powerful impression. Whether you’re heading to a business meeting, a wedding, or simply want to look sharp, the way your shirt is pressed matters. But there’s more to ironing than just gliding a hot plate over fabric—it’s a blend of heat, moisture, and technique.',
    pic: 'https://iili.io/FQHr45J.jpg',
    status: 'active',
    description:
      'A crisp, wrinkle-free shirt doesn’t just look good—it makes a powerful impression. Whether you’re heading to a business meeting, a wedding, or simply want to look sharp, the way your shirt is pressed matters. But there’s more to ironing than just gliding a hot plate over fabric—it’s a blend of heat, moisture, and technique.',
    type: 'Article',
    date: '2025-08-10T19:22:29.833Z',
    content: [
      {
        textType: 'title',
        textValue: 'The Art and Science of Shirt Pressing',
      },
      {
        textType: 'subtitle1',
        textValue:
          'A perfectly pressed shirt is more than just a mark of style—it’s a combination of precision, fabric knowledge, and the right techniques. Whether you’re preparing for a big meeting or a formal event, understanding the science behind ironing ensures your shirt looks crisp, smooth, and professional all day long.',
      },
      {
        textType: 'title',
        textValue: 'Understanding Fabric Composition',
      },
      {
        textType: 'subtitle1',
        textValue:
          'The way a shirt reacts to heat, steam, and pressure depends heavily on its fabric. Cotton, for example, can withstand high heat and benefits from ample steam, while delicate fabrics like silk require lower temperatures and a gentler touch. Knowing the fiber content helps in selecting the correct ironing settings to avoid scorching or damaging the fabric.',
      },
      {
        textType: 'title',
        textValue: 'The Role of Heat and Steam',
      },
      {
        textType: 'subtitle1',
        textValue:
          'Heat loosens the fibers in the fabric, while steam adds moisture, allowing them to be reshaped smoothly. Together, they work to eliminate wrinkles and set the shirt into a neat, flat shape. Without the right balance of heat and steam, pressing can either leave stubborn creases or risk damaging the material.',
      },
      {
        textType: 'title',
        textValue: 'Importance of Ironing Sequence',
      },
      {
        textType: 'subtitle1',
        textValue:
          'The order in which you iron each section of the shirt greatly affects the final look. Professionals start with smaller areas like the collar and cuffs before moving to the sleeves and body. This prevents newly pressed areas from wrinkling while working on other sections, ensuring the shirt stays sharp from start to finish.',
      },
      {
        textType: 'title',
        textValue: 'Pressure and Technique',
      },
      {
        textType: 'subtitle1',
        textValue:
          'It’s not just about gliding the iron over the shirt; consistent, gentle pressure helps set the fibers in place without stretching or flattening them too harshly. A smooth, steady motion combined with slight lifts at the end of each stroke ensures no fabric distortion while delivering a crisp finish.',
      },
      {
        textType: 'title',
        textValue: 'The Final Touch',
      },
      {
        textType: 'subtitle1',
        textValue:
          'Once the shirt is pressed, allowing it to cool on a hanger helps the fibers settle into their new shape. This “cooling period” is essential to lock in the smoothness, preventing wrinkles from reappearing too quickly. For an extra touch of freshness, some people use a light fabric spray to give their shirt a clean scent along with its polished look.',
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
                          'Wash and Iron',
                          `<a
                          style="cursor: pointer; color: #0095ff !important;"
                          href='https://www.laundrybasket.ca/wash-and-iron'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Wash and Iron
                        </a>`
                        )
                        .replaceAll(
                          'Iron Only',
                          `<a
                          style="cursor: pointer; color: #0095ff !important;"
                          href='https://www.laundrybasket.ca/ironing'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          Iron Only
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
