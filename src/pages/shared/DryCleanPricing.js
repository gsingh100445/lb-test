import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Button, Grid, ImageList, ImageListItem, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function DryCleanPricing(props) {
  const navigation = useNavigate();

  const [tenant, setTenant] = React.useState({});
  const [services, setServices] = React.useState([]);
  const [servicesLoaded, setServicesLoaded] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (props.tenant) {
      setTenant(props.tenant);
    }
    if (props.servicesLoaded) {
      setServicesLoaded(props.servicesLoaded);
      setServices(props.services);
    }
  }, [props.services, props.servicesLoaded, props.tenant, index]);

  const getTags = (items) => {
    let tags = new Set();
    if (items) {
      for (const item of items) {
        tags.add(item.tag);
      }
    }
    return Array.from(tags);
  };

  const getTagItems = (items, tag) => {
    let tagItems = [];
    for (const item of items) {
      if (tag === item.tag) {
        tagItems.push(item);
      }
    }
    tagItems = tagItems.sort((a, b) => (a.currentPrice || 0) - (b.currentPrice || 0));
    tagItems = [...tagItems.filter((item) => item.currentPrice > 0), ...tagItems.filter((item) => item.startingPrice > 0)];
    return tagItems;
  };

  const getTitleCase = (stringData) => {
    if (stringData && stringData.length) {
      return stringData.replace(/\b(\w)/g, (k) => k.toUpperCase());
    } else {
      return '';
    }
  };

  return (
    <Container
      style={{
        paddingLeft: '0px',
        paddingRight: '0px',
        paddingTop: '1px',
        paddingBottom: '15px',
        maxWidth: 'none',
      }}
      sx={{ width: '90%', mx: 'auto' }}
    >
      {servicesLoaded && (
        <>
          <Typography sx={{ mt: 4, color: 'text.secondary' }} variant='h5'>
            Pricing
          </Typography>
          <ImageList sx={{ display: { xs: 'none', sm: 'none', md: 'block' }, mt: 4 }} variant='masonry' cols={4} gap={20}>
            {services
              .filter((serviceItem) => !serviceItem.isItem)
              .map((serviceItem, itemIndex) => (
                <>
                  {serviceItem.items &&
                    serviceItem.items.length &&
                    getTags(serviceItem.items).map((tag, tagIndex) => (
                      <ImageListItem key={tagIndex}>
                        <Box
                          sx={{
                            backgroundColor: (theme) => 'actionLite.selected',
                            padding: 3,
                            borderRadius: '25px',
                          }}
                        >
                          <img
                            style={{
                              height: '60px',
                              marginBottom: '0.5rem',
                              marginTop: '0.2rem',
                            }}
                            src={getTagItems(serviceItem.items, tag)[0].pic}
                            alt='new'
                          />
                          <Typography variant='title' sx={{ color: 'text.secondary' }}>
                            {getTitleCase(tag)}
                          </Typography>
                          {getTagItems(serviceItem.items, tag).map((tagItem, tagItemIndex) => (
                            <Stack
                              key={tagItemIndex}
                              direction='row'
                              alignItems='center'
                              justifyContent='space-between'
                              gap={2}
                              sx={{ my: 1 }}
                            >
                              <Typography sx={{ color: 'text.secondary' }} variant='subtitle2'>
                                {tagItem.name}
                              </Typography>
                              {tagItem.currentPrice && (
                                <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }} variant='subtitle2'>
                                  ${Number(tagItem.currentPrice).toFixed(2)}
                                </Typography>
                              )}
                              {tagItem.startingPrice && !tagItem.currentPrice && (
                                <Typography
                                  sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'right' }}
                                  variant='subtitle2'
                                >
                                  <Typography
                                    sx={{ color: 'primary.main', fontWeight: 'bold', display: 'inline' }}
                                    variant='body2'
                                  >
                                    Starting from
                                  </Typography>{' '}
                                  ${Number(tagItem.startingPrice).toFixed(2)}
                                </Typography>
                              )}
                            </Stack>
                          ))}
                        </Box>
                      </ImageListItem>
                    ))}
                </>
              ))}
          </ImageList>
          <ImageList sx={{ display: { xs: 'block', sm: 'none', md: 'none' }, mt: 4 }} variant='masonry' cols={2} gap={20}>
            {services
              .filter((serviceItem) => !serviceItem.isItem)
              .map((serviceItem, itemIndex) => (
                <>
                  {serviceItem.items &&
                    serviceItem.items.length &&
                    getTags(serviceItem.items).map((tag, tagIndex) => (
                      <ImageListItem key={tagIndex}>
                        <Box
                          sx={{
                            backgroundColor: (theme) => 'actionLite.selected',
                            padding: 3,
                            borderRadius: '25px',
                          }}
                        >
                          <img
                            style={{
                              height: '60px',
                              marginBottom: '0.5rem',
                              marginTop: '0.2rem',
                            }}
                            src={getTagItems(serviceItem.items, tag)[0].pic}
                            alt='new'
                          />
                          <Typography variant='title' sx={{ color: 'text.secondary' }}>
                            {getTitleCase(tag)}
                          </Typography>
                          {getTagItems(serviceItem.items, tag).map((tagItem, tagItemIndex) => (
                            <Stack
                              key={tagItemIndex}
                              direction='row'
                              alignItems='center'
                              justifyContent='space-between'
                              gap={2}
                              sx={{ my: 1 }}
                            >
                              <Typography sx={{ color: 'text.secondary' }} variant='subtitle2'>
                                {tagItem.name}
                              </Typography>
                              {tagItem.currentPrice && (
                                <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }} variant='subtitle2'>
                                  ${Number(tagItem.currentPrice).toFixed(2)}
                                </Typography>
                              )}
                              {tagItem.startingPrice && !tagItem.currentPrice && (
                                <Typography
                                  sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'right' }}
                                  variant='subtitle2'
                                >
                                  <Typography
                                    sx={{ color: 'primary.main', fontWeight: 'bold', display: 'inline' }}
                                    variant='body2'
                                  >
                                    Starting from
                                  </Typography>{' '}
                                  ${Number(tagItem.startingPrice).toFixed(2)}
                                </Typography>
                              )}
                            </Stack>
                          ))}
                        </Box>
                      </ImageListItem>
                    ))}
                </>
              ))}
          </ImageList>
          <ImageList sx={{ display: { xs: 'none', sm: 'block', md: 'none' }, mt: 4 }} variant='masonry' cols={3} gap={20}>
            {services
              .filter((serviceItem) => !serviceItem.isItem)
              .map((serviceItem, itemIndex) => (
                <>
                  {serviceItem.items &&
                    serviceItem.items.length &&
                    getTags(serviceItem.items).map((tag, tagIndex) => (
                      <ImageListItem key={tagIndex}>
                        <Box
                          sx={{
                            backgroundColor: (theme) => 'actionLite.selected',
                            padding: 3,
                            borderRadius: '25px',
                          }}
                        >
                          <img
                            style={{
                              height: '60px',
                              marginBottom: '0.5rem',
                              marginTop: '0.2rem',
                            }}
                            src={getTagItems(serviceItem.items, tag)[0].pic}
                            alt='new'
                          />
                          <Typography variant='title' sx={{ color: 'text.secondary' }}>
                            {getTitleCase(tag)}
                          </Typography>
                          {getTagItems(serviceItem.items, tag).map((tagItem, tagItemIndex) => (
                            <Stack
                              key={tagItemIndex}
                              direction='row'
                              alignItems='center'
                              justifyContent='space-between'
                              gap={2}
                              sx={{ my: 1 }}
                            >
                              <Typography sx={{ color: 'text.secondary' }} variant='subtitle2'>
                                {tagItem.name}
                              </Typography>
                              {tagItem.currentPrice && (
                                <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }} variant='subtitle2'>
                                  ${Number(tagItem.currentPrice).toFixed(2)}
                                </Typography>
                              )}
                              {tagItem.startingPrice && !tagItem.currentPrice && (
                                <Typography
                                  sx={{ color: 'primary.main', fontWeight: 'bold', textAlign: 'right' }}
                                  variant='subtitle2'
                                >
                                  <Typography
                                    sx={{ color: 'primary.main', fontWeight: 'bold', display: 'inline' }}
                                    variant='body2'
                                  >
                                    Starting from
                                  </Typography>{' '}
                                  ${Number(tagItem.startingPrice).toFixed(2)}
                                </Typography>
                              )}
                            </Stack>
                          ))}
                        </Box>
                      </ImageListItem>
                    ))}
                </>
              ))}
          </ImageList>
        </>
      )}
    </Container>
  );
}
