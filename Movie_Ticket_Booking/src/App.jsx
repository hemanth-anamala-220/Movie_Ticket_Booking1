import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MovieDetails from "./components/MovieDetails";
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import BookPage from './components/BookPage';
import MovieList from "./components/MovieList";
import Home1 from './components/Home1';
import ReleaseMovies from './components/ReleaseMovies';
import OldMovies from './components/OldMovies';
import DubbedMovies from './components/DubbedMovies';
import LatestMovies from './components/LatestMovies';
import SixPm from './components/SixPm';
import NinePm from './components/NinePm';
import Payment from './components/Payment';
import TenAm from './components/TenAm';

// import Products from './components/Products'
// import Mobiles from './components/products/Mobiles'
// import Fashion from './components/products/Fashion'
// import Grocery from './components/products/Grocery'
// import Timer from './components/products/Timer'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Home1/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Signup' element={<Signup/>}></Route>
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movies" element={<MovieList />} /> 
        <Route path="/BookPage" element={<BookPage />} />
        <Route path="/release-movies" element={<ReleaseMovies />} />
        <Route path="/old-movies" element={<OldMovies />} />
        <Route path="/dubbed-movies" element={<DubbedMovies />} />
        <Route path="/latest-movies" element={<LatestMovies />} /> 
        <Route path="/TenAM" element={<TenAm />} /> 
        <Route path="/SixPm" element={<SixPm />} /> 
        <Route path="/NinePm" element={<NinePm />} /> 
         <Route path="/Payment" element={<Payment />} /> 

        {/* <Route path='/products' element={<Products />}>
          <Route path='mobiles' element={<Mobiles />}></Route>
          <Route path='fashion' element={<Fashion />}></Route>
          <Route path='grocery' element={<Grocery />}></Route>
          <Route path='timer' element={<Timer />}></Route>
        </Route> */}
      </Routes>
    </BrowserRouter>
  )
}
export default App
