import Hero from '../components/Hero/Hero';
import NavBar from '../components/NavBar/NavBar';
import NewAlbum from '../components/NewAlbum/NewAlbum';
import NextEvent from '../components/NextEvent/NextEvent';

export default function Home() {
  return (
    <>
      <NavBar/>
      <Hero/>
      <NewAlbum/>
      <NextEvent/>
    </>
  )
}
