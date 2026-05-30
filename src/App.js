import { Box, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import getLPTheme from './getLPTheme';
import AppAppBar from './shared/AppAppBar';
import { getItems, getServices, getTenantData, getUser } from './utils/api_base';
import Dashboard from './components/Dashboard';
import StickyFooter from './shared/Footer';
import SignUp from './components/SignUp';
import MyAddresses from './components/MyAddresses';
import Profile from './components/Profile';
import Pricing from './components/Pricing';
import BookOrder from './components/BookOrder';
import OrderDetails from './components/OrderDetails';
import Orders from './components/Orders';
import AboutUs from './components/AboutUs';
import OurServices from './components/OurServices';
import ScrollToTop from './utils/ScrollToTop';
import TNC from './components/T&C';
import PrivacyPolicy from './components/PrivacyPolicy';
import RefundPolicy from './components/RefundPolicy';
import DryCleanerNearMe from './pages/DryCleanerNearMe';
import LaundromatNearMe from './pages/LaundromatNearMe';
import DryCleanerToronto from './pages/DryCleanerToronto';
import DryCleanerRichmondHill from './pages/DryCleanerRichmondHill';
import DryCleanerThornhill from './pages/DryCleanerThornhill';
import DryCleanerNorthYork from './pages/DryCleanerNorthYork';
import DryCleanerVaughan from './pages/DryCleanerVaughan';
import TorontoDryCleaning from './pages/TorontoDryCleaning';
import DryCleaningPickUpAndDropOff from './pages/DryCleaningPickUpAndDropOff';
import DryCleanerPickUpService from './pages/DryCleanerPickUpService';
import LaundryPickupAndDeliveryServiceNearMe from './pages/LaundryPickupAndDeliveryServiceNearMe';
import LaundryPickupAndDelivery from './pages/LaundryPickupAndDelivery';
import LaundryPickUpAndDropOff from './pages/LaundryPickUpAndDropOff';
import LaundryServiceVaughan from './pages/LaundryServiceVaughan';
import LaundryServiceNorthYork from './pages/LaundryServiceNorthYork';
import LaundryServiceRichmondHill from './pages/LaundryServiceRichmondHill';
import LaundryServiceThornhill from './pages/LaundryServiceThornhill';
import WashAndFold from './components/services/WashAndFold';
import WashAndIron from './components/services/WashAndIron';
import DryCleaning from './components/services/DryCleaning';
import HomeCare from './components/services/HomeCare';
import IronOnly from './components/services/IronOnly';
import ShoeCleaning from './components/services/ShoeCleaning';
import Blogs from './components/Blogs';
import BlogRealDifferenceBetweenLaundryAndDryCleaning from './components/Blogs/BlogRealDifferenceBetweenLaundryAndDryCleaning';
import BlogWashingClothesInColdWater from './components/Blogs/BlogWashingClothesInColdWater';
import BlogTop5BenefitsOfProfessionallyIronedClothes from './components/Blogs/BlogTop5BenefitsOfProfessionallyIronedClothes';
import TheScienceBehindAPerfectlyPressedShirt from './components/Blogs/TheScienceBehindAPerfectlyPressedShirt';
import { HelmetProvider } from 'react-helmet-async';
import IroningServiceNearMe from './pages/IroningServiceNearMe';
import PressingServiceNearMe from './pages/PressingServiceNearMe';

function App() {
  const [mode, setMode] = useState('light');
  const LPtheme = createTheme(getLPTheme(mode));
  const [tenant, setTenant] = useState({});
  const [services, setServices] = useState([]);
  const [servicesLoaded, setServicesLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstLoadDone, setFirstLoadDone] = useState(false);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    getTenant();
    getServicesData();
  }, []);

  const getServicesData = async () => {
    let servicesData = await getServices({ category: 'laundry' });
    if (servicesData) {
      let requestArray = [];
      servicesData.forEach((service) => {
        if (!service.isItem) {
          requestArray.push(getItems({ service: service.id }));
        }
      });
      const itemsArray = await Promise.all(requestArray);
      itemsArray.forEach((items) => {
        if (items.length) {
          let serviceIndex = servicesData.findIndex((service) => service.id === items[0].service.id);
          if (serviceIndex >= 0) {
            if (items && items.length) {
              servicesData[serviceIndex].items = items;
            }
          }
        }
      });
      setServices(servicesData);
      setServicesLoaded(true);
    }
  };

  const getTenant = async () => {
    let tenantObj = await getTenantData();
    if (tenantObj) {
      setTenant(tenantObj);
    }
  };

  const _retriveData = async () => {
    let res = localStorage.getItem('user');
    if (!res) {
      setIsLoggedIn(false);
    }
    const user = JSON.parse(res);
    if (user && user.name && user.addresses && user.addresses.length) {
      setUser(user);
      setIsLoggedIn(true);
      try {
        let userResp = await getUser('my');
        if (userResp) {
          localStorage.setItem('user', JSON.stringify(userResp));
        }
      } catch (error) {
        if (error.message === 'Error: Invalid Token' || error.message === 'Error: Invalid Session') {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          localStorage.removeItem('session');
          setIsLoggedIn(false);
          setUser(null);
        }
      }
    }
    if (!isFirstLoadDone) {
      setFirstLoadDone(true);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('session');
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    const updateUserInfo = setInterval(() => {
      _retriveData();
    }, 10000);
    setTimeout(() => {
      _retriveData();
    });
    return () => clearInterval(updateUserInfo);
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider theme={LPtheme}>
          <ScrollToTop />
          <AppAppBar isLoggedIn={isLoggedIn} user={user} mode={mode} toggleColorMode={toggleColorMode} logout={logout} />
          <Box
            sx={{
              bgcolor: 'background.default',
              minHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Routes>
              <Route
                path='/'
                element={
                  <Dashboard
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/about'
                element={
                  <AboutUs
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/services'
                element={
                  <OurServices
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/pricing'
                element={
                  <Pricing
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/blogs'
                element={
                  <Blogs
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/blogs/washing-clothes-in-cold-water'
                element={
                  <BlogWashingClothesInColdWater
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    setUser={setUser}
                    user={user}
                  />
                }
              />
              <Route
                path='/blogs/real-difference-between-laundry-and-dry-cleaning'
                element={
                  <BlogRealDifferenceBetweenLaundryAndDryCleaning
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    setUser={setUser}
                    user={user}
                  />
                }
              />
              <Route
                path='/blogs/top-5-benefits-of-professionally-ironed-clothes'
                element={
                  <BlogTop5BenefitsOfProfessionallyIronedClothes
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    setUser={setUser}
                    user={user}
                  />
                }
              />
              <Route
                path='/blogs/the-science-behind-a-perfectly-pressed-shirt'
                element={
                  <TheScienceBehindAPerfectlyPressedShirt
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    setUser={setUser}
                    user={user}
                  />
                }
              />
              <Route
                path='/book-order'
                element={
                  <BookOrder
                    setIsLoggedIn={setIsLoggedIn}
                    setUser={setUser}
                    tenant={tenant}
                    isFirstLoadDone={isFirstLoadDone}
                    isLoggedIn={isLoggedIn}
                    services={services}
                    servicesLoaded={servicesLoaded}
                    user={user}
                  />
                }
              />
              <Route
                path='/login'
                element={
                  <SignUp
                    tenant={tenant}
                    setIsLoggedIn={setIsLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    setUser={setUser}
                  />
                }
              />
              <Route
                path='/my-addresses'
                element={
                  <MyAddresses
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    setUser={setUser}
                    user={user}
                    tenant={tenant}
                  />
                }
              />
              <Route
                path='/my-profile'
                element={
                  <Profile
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    setUser={setUser}
                    user={user}
                  />
                }
              />
              <Route
                path='/orders'
                element={
                  <Orders
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    setUser={setUser}
                    user={user}
                  />
                }
              />
              <Route
                path='/orders/:id'
                element={
                  <OrderDetails
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    setUser={setUser}
                    user={user}
                  />
                }
              />
              <Route path='/terms-and-conditions' element={<TNC />} />
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/refund-policy' element={<RefundPolicy />} />

              {/* Services */}
              <Route
                path='/wash-and-fold'
                element={
                  <WashAndFold
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/wash-and-iron'
                element={
                  <WashAndIron
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/dry-cleaning'
                element={
                  <DryCleaning
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/home-care'
                element={
                  <HomeCare
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/shoe-cleaning'
                element={
                  <ShoeCleaning
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/ironing'
                element={
                  <IronOnly
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />

              {/* Pages */}
              <Route
                path='/dry-cleaner-near-me'
                element={
                  <DryCleanerNearMe
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/dry-cleaner-toronto'
                element={
                  <DryCleanerToronto
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/dry-cleaner-richmond-hill'
                element={
                  <DryCleanerRichmondHill
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/dry-cleaner-thornhill'
                element={
                  <DryCleanerThornhill
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/dry-cleaner-north-york'
                element={
                  <DryCleanerNorthYork
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/dry-cleaner-vaughan'
                element={
                  <DryCleanerVaughan
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/toronto-dry-cleaning'
                element={
                  <TorontoDryCleaning
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/dry-cleaning-pick-up-and-drop-off'
                element={
                  <DryCleaningPickUpAndDropOff
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/dry-cleaner-pick-up-service'
                element={
                  <DryCleanerPickUpService
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/laundromat-near-me'
                element={
                  <LaundromatNearMe
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/laundry-pickup-and-delivery-service-near-me'
                element={
                  <LaundryPickupAndDeliveryServiceNearMe
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/laundry-pickup-and-delivery'
                element={
                  <LaundryPickupAndDelivery
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/laundry-pick-up-and-drop-off'
                element={
                  <LaundryPickUpAndDropOff
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/laundry-service-vaughan'
                element={
                  <LaundryServiceVaughan
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/laundry-service-north-york'
                element={
                  <LaundryServiceNorthYork
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/laundry-service-richmond-hill'
                element={
                  <LaundryServiceRichmondHill
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/laundry-service-thornhill'
                element={
                  <LaundryServiceThornhill
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/ironing-service-near-me'
                element={
                  <IroningServiceNearMe
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
              <Route
                path='/pressing-service-near-me'
                element={
                  <PressingServiceNearMe
                    isLoggedIn={isLoggedIn}
                    isFirstLoadDone={isFirstLoadDone}
                    tenant={tenant}
                    services={services}
                    servicesLoaded={servicesLoaded}
                  />
                }
              />
            </Routes>
          </Box>
          <StickyFooter services={services} servicesLoaded={servicesLoaded}></StickyFooter>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
