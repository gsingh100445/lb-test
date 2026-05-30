import { useEffect, useState } from 'react';
import Highlights from '../shared/Highlights';
import Services from '../shared/Services';
import FAQ from '../shared/FAQ';
import Banners from '../shared/Banners';
import BookNow from '../shared/BookNow';
import BookNowEffort from '../shared/BookNowEffort';
import ContactUs from '../shared/ContactUs';

function Dashboard(props) {
  const [tenant, setTenant] = useState({});
  const [services, setServices] = useState([]);
  const [servicesLoaded, setServicesLoaded] = useState(false);

  useEffect(() => {
    if (props.tenant) {
      setTenant(props.tenant);
    }
    if (props.servicesLoaded) {
      setServicesLoaded(props.servicesLoaded);
      setServices(props.services);
    }
  }, [props.services, props.servicesLoaded, props.tenant]);

  useEffect(() => {
    document.title = 'Laundry and Dry Cleaning Services in North York, Vaughan and Richmond Hill, Free pickup and 24hr doorstep delivery!';
  }, []);

  return (
    <>
      <Banners isLoggedIn={props.isLoggedIn} tenant={tenant}></Banners>
      <Services isLoggedIn={props.isLoggedIn} services={services} servicesLoaded={servicesLoaded} />
      <BookNow isLoggedIn={props.isLoggedIn} />
      <Highlights isLoggedIn={props.isLoggedIn} />
      <BookNowEffort isLoggedIn={props.isLoggedIn} />
      <FAQ />
      <ContactUs />
      {/* <TryApp isLoggedIn={props.isLoggedIn}></TryApp> */}
    </>
  );
}

export default Dashboard;
