import { useEffect } from 'react';
import Navbar       from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import Categories   from './components/Categories';
import RoomBanners  from './components/RoomBanners';
import HotProducts  from './components/HotProducts';
import Footer       from './components/Footer';
import './styles/global.css';

function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel   = 'stylesheet';
    link.href  = 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@700&family=Lato:wght@400;700&display=swap';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  return (
    <div>
      <Navbar />
      <HeroCarousel />
      <Categories />
      <RoomBanners />
      <HotProducts />
      <Footer />
    </div>
  );
}
export default App;