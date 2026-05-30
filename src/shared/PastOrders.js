import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Container, CircularProgress, Backdrop } from '@mui/material';
import moment from 'moment';
import { getOrders } from '../utils/api_base';
import Icon from '@mui/material/Icon';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { useNavigate } from 'react-router-dom';
import { DryCleaning, LocationOn } from '@mui/icons-material';

const PastOrders = (props) => {
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(1);
  const [loadedPages, setLoadedPages] = useState(0);
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLoadedPages(1);
    setIsLoading(true);
    getCurrentOrder();
  }, [props.user]);

  const getCurrentOrder = async () => {
    let page = await getOrders({
      status: 'past',
      limit: 20,
      category: 'laundry',
    });
    if (page && page.items && page.items.length) {
      setListData(page.items);
    } else {
      setListData([]);
    }
    setIsLoading(false);
  };

  const getData = async (page) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (page <= totalPages) {
          resolve([]);
        } else {
          resolve([]);
        }
      }, 2000);
    });
  };

  const loadMoreData = async () => {
    if (loadedPages < totalPages) {
      setIsLoading(true);
      setLoadedPages(loadedPages + 1);
      let extraData = await getData(loadedPages + 1);
      setListData([...listData, ...extraData]);
      setIsLoading(false);
    }
  };

  const getTitleCase = (stringData) => {
    if (stringData && stringData.length) {
      return stringData.replace(/\b(\w)/g, (k) => k.toUpperCase());
    } else {
      return '';
    }
  };

  const getProgress = (status) => {
    let progress = 0;
    switch (status) {
      case 'pending':
        progress = 0;
        break;
      case 'placed':
        progress = 10;
        break;
      case 'assigned':
        progress = 20;
        break;
      case 'picked-up':
        progress = 40;
        break;
      case 'in-progress':
        progress = 60;
        break;
      case 'completed':
        progress = 90;
        break;
      case 'delivered':
        progress = 100;
        break;
    }
    return progress;
  };

  const getIcon = (item) => {
    if (item.status === 'delivered') {
      return 'assignment_turned_in';
    }
    let iconName = '';
    if (item.items && item.items.length) {
      let randomIndex = Math.floor(Math.random() * item.items.length);
      let iconItem = item.items.sort((a, b) => b.units - a.units)[randomIndex || 0];
      if (iconItem.isItem) {
        iconName = iconItem.icon;
      } else {
        iconName = iconItem.service.icon;
      }
    } else {
      let randomIndex = Math.floor(Math.random() * item.services.length);
      iconName = item.services[randomIndex || 0].icon;
    }
    if (iconName === 'tumble-dryer') {
      return 'local_laundry_service';
    } else if (iconName === 'washing-machine') {
      return 'local_laundry_service';
    } else if (iconName === 'hanger') {
      return 'dry_cleaning';
    } else if (iconName === 'bed-king') {
      return 'king_bed';
    } else if (iconName === 'shoe-sneaker') {
      // return 'steps';
      return 'local_laundry_service';
    } else if (iconName === 'iron') {
      return 'iron';
    } else {
      return 'local_laundry_service';
    }
  };

  const getFormattedMiniAddress = (selectedAddress) => {
    let address = '';
    if (selectedAddress) {
      address = selectedAddress.address1 + ', ' + selectedAddress.city + ', ' + selectedAddress.zipCode;
    }
    return address;
  };

  return (
    <div>
      {isLoading && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
      <Box
        sx={{
          position: 'relative',
        }}
      >
        {listData.map((item, index) => (
          <Container sx={{ py: 1 }}>
            <div className='order-list' key={index} onClick={() => navigate('/orders/' + item.id)}>
              <Box
                sx={{
                  px: { xs: 1.5, sm: 3 },
                  pt: { xs: 3, sm: 0 },
                  pb: { xs: 0, sm: 1 },
                  backgroundColor: 'actionLite.selected',
                  borderRadius: '25px',
                  mt: 3,
                }}
              >
                <Grid container alignItems='center' justifyContent='center' spacing={1}>
                  <Grid
                    xs={12}
                    sm={12}
                    md={12}
                    container
                    alignItems='center'
                    justifyContent='center'
                    spacing={1}
                    style={{
                      paddingTop: '2px',
                      paddingBottom: '2px',
                    }}
                    sx={{ display: { xs: 'flex', sm: 'none' }, borderBottomWidth: 1 }}
                  >
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={6}
                      alignItems='center'
                      justifyContent='center'
                      spacing={1}
                      style={{
                        paddingTop: '2px',
                      }}
                    >
                      <Typography
                        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', pl: 1 }}
                        variant='subtitle1'
                      >
                        <b>Order ID: </b>
                        <Typography sx={{ display: 'inline', color: 'text.secondary' }} variant='subtitle1'>
                          {item.code}
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid
                      style={{
                        paddingTop: '2px',
                        textAlign: 'end',
                      }}
                      item
                      xs={6}
                      sm={6}
                      md={6}
                      alignItems='center'
                      justifyContent='center'
                      spacing={1}
                    >
                      <Typography
                        sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
                        variant='subtitle1'
                      >
                        <b>Status: </b>
                        <Typography sx={{ display: 'inline', color: 'text.secondary' }} variant='subtitle1'>
                          {getTitleCase(item.status)}
                        </Typography>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    style={{
                      paddingBottom: '0px',
                    }}
                    item
                    xs={3}
                    sm={2}
                    md={2}
                    alignItems='center'
                    justifyContent='center'
                    spacing={1}
                    sx={{ my: 1, pb: 1 }}
                  >
                    <Box className='progress-box'>
                      <CircularProgressbarWithChildren
                        styles={buildStyles({
                          pathColor: `hsl(205, 100%, 50%)`,
                          trailColor: '#d6d6d6',
                        })}
                        value={getProgress(item.status)}
                      >
                        <Icon sx={{ fontSize: { xs: 35, sm: 45, md: 50 } }} color='primary'>
                          {getIcon(item)}
                        </Icon>
                      </CircularProgressbarWithChildren>
                    </Box>
                  </Grid>
                  <Grid
                    style={{
                      paddingBottom: '0px',
                    }}
                    item
                    xs={9}
                    sm={5}
                    md={3}
                    alignItems='center'
                    justifyContent='center'
                    spacing={1}
                    sx={{ my: 1, pb: 1, display: { xs: 'none', sm: 'block' } }}
                  >
                    <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                      Order ID:{' '}
                      <Typography sx={{ display: 'inline', fontWeight: 'bold', color: 'primary.main' }} variant='subtitle1'>
                        {item.code}
                      </Typography>
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                      Status:{' '}
                      <Typography sx={{ display: 'inline', fontWeight: 'bold', color: 'primary.main' }} variant='subtitle1'>
                        {getTitleCase(item.status)}
                      </Typography>
                    </Typography>
                    {item.type === 'prepared' && (
                      <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                        Total:{' '}
                        <Typography
                          sx={{ display: 'inline', fontWeight: 'bold', color: 'primary.main' }}
                          variant='subtitle1'
                        >
                          $ {Number(item.currentTotal).toFixed(2)}
                        </Typography>
                      </Typography>
                    )}
                    {item.currentAgent && (
                      <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                        Agent:{' '}
                        <Typography
                          sx={{ display: 'inline', fontWeight: 'bold', color: 'primary.main' }}
                          variant='subtitle1'
                        >
                          {item.currentAgent.name}
                        </Typography>
                      </Typography>
                    )}
                  </Grid>
                  <Grid
                    style={{
                      paddingBottom: '0px',
                    }}
                    item
                    xs={9}
                    sm={5}
                    md={3}
                    alignItems='center'
                    justifyContent='center'
                    spacing={1}
                    sx={{ my: 1, pb: 1, display: { xs: 'block', sm: 'none' } }}
                  >
                    {item.type === 'prepared' && Boolean(item.items) && item.items.length > 0 && (
                      <>
                        <Typography variant='subtitle1' sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                          <DryCleaning sx={{ mb: 0.5, mr: 0.5 }} />
                          {Boolean(item.items) &&
                            (item.items.length > 4 ? item.items.slice(0, 4) : item.items).map(
                              (itemsItem, itemsItemIndex) => (
                                <Typography
                                  sx={{ display: 'inline', color: 'primary.main', fontWeight: 'bold' }}
                                  key={itemsItemIndex}
                                  variant='subtitle1'
                                >
                                  {itemsItemIndex !== 0 && ', '}
                                  {itemsItem.name}
                                  {Boolean(item.items) && itemsItemIndex === 3 && item.items.length > 4 && '...'}
                                </Typography>
                              )
                            )}
                        </Typography>
                      </>
                    )}
                    {item.type !== 'prepared' && Boolean(item.services) && item.services.length > 0 && (
                      <>
                        <Typography variant='subtitle1' sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                          <DryCleaning sx={{ mb: 0.5, mr: 0.5 }} />
                          {Boolean(item.services) &&
                            (item.services.length > 4 ? item.services.slice(0, 4) : item.services).map(
                              (itemsItem, itemsItemIndex) => (
                                <Typography
                                  sx={{ display: 'inline', color: 'primary.main', fontWeight: 'bold' }}
                                  key={itemsItemIndex}
                                  variant='subtitle1'
                                >
                                  {itemsItemIndex !== 0 && ', '}
                                  {itemsItem.name}
                                  {Boolean(item.services) && itemsItemIndex === 3 && item.services.length > 4 && '...'}
                                </Typography>
                              )
                            )}
                        </Typography>
                      </>
                    )}
                    <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                      <b>Booked On: </b>
                      {moment(item.createdDate).format('ddd, DD MMM YYYY')}
                    </Typography>
                    {item.status === 'assigned' && Boolean(item.pickUpDate) && (
                      <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                        <b>Expected Pickup: </b>
                        {moment(item.pickUpDate).format('ddd, DD MMM YYYY') + ' ' + item.pickUpSlot}
                      </Typography>
                    )}
                    {item.status === 'in-progress' && Boolean(item.expectedCompleteDate) && (
                      <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                        <b>Expected Ready to Pickup: </b>
                        {moment(item.expectedCompleteDate).format('ddd, DD MMM YYYY')}
                      </Typography>
                    )}
                    {item.status === 'completed' && Boolean(item.expectedDeliveryDate) && (
                      <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                        <b>Expected Delivery: </b>
                        {moment(item.expectedDeliveryDate).format('ddd, DD MMM YYYY')}
                      </Typography>
                    )}
                    {item.status === 'delivered' && Boolean(item.deliveryDate) && (
                      <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                        <b>Delivered On: </b>
                        {moment(item.deliveryDate).format('ddd, DD MMM YYYY')}
                      </Typography>
                    )}
                    {item.currentAgent && (
                      <Typography sx={{ color: 'text.secondary', fontWeight: 'bold' }} variant='subtitle1'>
                        Agent:{' '}
                        <Typography sx={{ display: 'inline', color: 'text.secondary' }} variant='subtitle1'>
                          {item.currentAgent.name}
                        </Typography>
                      </Typography>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={6}
                    alignItems='center'
                    justifyContent='center'
                    spacing={1}
                    sx={{ my: 1, pb: 1 }}
                  >
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                      {item.type === 'prepared' && Boolean(item.items) && item.items.length > 0 && (
                        <>
                          <Typography variant='subtitle1' sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                            <DryCleaning sx={{ mb: 0.5, mr: 1 }} />
                            {Boolean(item.items) &&
                              (item.items.length > 4 ? item.items.slice(0, 4) : item.items).map(
                                (itemsItem, itemsItemIndex) => (
                                  <Typography
                                    sx={{ display: 'inline', color: 'primary.main', fontWeight: 'bold' }}
                                    key={itemsItemIndex}
                                    variant='subtitle1'
                                  >
                                    {itemsItemIndex !== 0 && ', '}
                                    {itemsItem.name}
                                    {Boolean(item.items) && itemsItemIndex === 3 && item.items.length > 4 && '...'}
                                  </Typography>
                                )
                              )}
                          </Typography>
                        </>
                      )}
                      {item.type !== 'prepared' && Boolean(item.services) && item.services.length > 0 && (
                        <>
                          <Typography variant='subtitle1' sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                            <DryCleaning sx={{ mb: 0.5, mr: 1 }} />
                            {Boolean(item.services) &&
                              (item.services.length > 4 ? item.services.slice(0, 4) : item.services).map(
                                (itemsItem, itemsItemIndex) => (
                                  <Typography
                                    sx={{ display: 'inline', color: 'primary.main', fontWeight: 'bold' }}
                                    key={itemsItemIndex}
                                    variant='subtitle1'
                                  >
                                    {itemsItemIndex !== 0 && ', '}
                                    {itemsItem.name}
                                    {Boolean(item.services) && itemsItemIndex === 3 && item.services.length > 4 && '...'}
                                  </Typography>
                                )
                              )}
                          </Typography>
                        </>
                      )}
                      <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                        <b>Booked On: </b>
                        {moment(item.createdDate).format('ddd, DD MMM YYYY')}
                      </Typography>
                      {item.status === 'assigned' && Boolean(item.pickUpDate) && (
                        <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                          <b>Expected Pickup: </b>
                          {moment(item.pickUpDate).format('ddd, DD MMM YYYY') + ' ' + item.pickUpSlot}
                        </Typography>
                      )}
                      {item.status === 'in-progress' && Boolean(item.expectedCompleteDate) && (
                        <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                          <b>Expected Ready to Pickup: </b>
                          {moment(item.expectedCompleteDate).format('ddd, DD MMM YYYY')}
                        </Typography>
                      )}
                      {item.status === 'completed' && Boolean(item.expectedDeliveryDate) && (
                        <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                          <b>Expected Delivery: </b>
                          {moment(item.expectedDeliveryDate).format('ddd, DD MMM YYYY')}
                        </Typography>
                      )}
                      {item.status === 'delivered' && Boolean(item.deliveryDate) && (
                        <Typography sx={{ color: 'text.secondary' }} variant='subtitle1'>
                          <b>Delivered On: </b>
                          {moment(item.deliveryDate).format('ddd, DD MMM YYYY')}
                        </Typography>
                      )}
                      <Typography sx={{ color: 'text.secondary', mt: 0.5 }} variant='subtitle1'>
                        <LocationOn sx={{ mb: 0.5, mr: 0.5 }} />
                        {'  '}
                        <Typography sx={{ display: 'inline', color: 'text.secondary' }} variant='subtitle1'>
                          {getFormattedMiniAddress(item.address)}
                        </Typography>
                      </Typography>
                    </Box>
                    <Grid
                      container
                      alignItems='center'
                      justifyContent='center'
                      spacing={1}
                      style={{
                        paddingTop: '2px',
                        paddingBottom: '2px',
                      }}
                      sx={{ display: { xs: 'flex', sm: 'none' }, borderTopWidth: 1 }}
                    >
                      <Grid
                        item
                        xs={item.type === 'prepared' ? 9 : 12}
                        sm={4}
                        md={4}
                        alignItems='center'
                        justifyContent='center'
                        spacing={1}
                        style={{
                          paddingTop: '2px',
                        }}
                      >
                        <Typography
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            color: 'text.secondary',
                          }}
                          variant='subtitle1'
                        >
                          <LocationOn sx={{ mb: 0.5, mr: 0.5, color: 'primary.main' }} />
                          {getFormattedMiniAddress(item.address)}
                        </Typography>
                      </Grid>
                      {item.type === 'prepared' && (
                        <Grid
                          style={{
                            paddingTop: '2px',
                          }}
                          item
                          xs={3}
                          sm={4}
                          md={4}
                          alignItems='center'
                          justifyContent='center'
                          spacing={1}
                        >
                          <Typography
                            sx={{ fontWeight: 'bold', textAlign: 'end', color: 'primary.main', pr: 1 }}
                            variant='subtitle1'
                          >
                            $ {Number(item.currentTotal).toFixed(2)}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </Container>
        ))}
      </Box>
    </div>
  );
};

export default PastOrders;