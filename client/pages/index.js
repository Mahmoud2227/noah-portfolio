import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import Hero from '../components/Hero/Hero';
import NavBar from '../components/NavBar/NavBar';
import NewAlbum from '../components/NewAlbum/NewAlbum';
import NextEvent from '../components/NextEvent/NextEvent';
import Subscription from '../components/Subscription/Subscription';

export default function Home() {
  return (
    <>
      <NavBar/>
      <Hero/>
      <NewAlbum/>
      <NextEvent/>
      <Subscription/>
      <Contact/>
      <Footer/>
    </>
  )
}
