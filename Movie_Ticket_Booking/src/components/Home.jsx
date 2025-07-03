import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilm } from "@fortawesome/free-solid-svg-icons";

import Hanuman from "../assets/Hanuman.avif";
import salaar1 from "../assets/salaar1.png";
import skanda1 from "../assets/skanda1.png";
import KGF2 from "../assets/KGF2.png";
import Image from "../assets/movie.png";
// import Mad2 from "../assets/MAd2.png";
import Mad2 from "../assets/Mad2.jpg";
import Gamechanger from "../assets/Gamechanger.png";
import SeethammaVakitloSirimalleChettu from "../assets/Seethamma-Vakitlo-Sirimalle-Chettu.jpg"; 
import HIT2 from "../assets/HIT3.jpeg";
import Rajasaba from "../assets/Rajasaba.jpeg";
import Dilruba from "../assets/Dilruba.jpg";
import SankranthiVasthunam from "../assets/SankranthiVasthunam.avif";
import ENDGAME from "../assets/ENDGAME.jpg";
import InfinityWar from "../assets/InfinityWar.jpg";
import Orange from "../assets/Orange.jpeg";
import JUMANJI from "../assets/JUMANJI.jpeg";


const movies = [
  { id: 1, title: " Jai Hanuman", image: Hanuman },
  { id: 2, title: "salaar1", image: salaar1 },
  { id: 3, title: "skanda1", image: skanda1 },
  { id: 4, title: "KGF 2", image: KGF2 },
  { id: 5, title: "Image", image: Image },
  { id: 6, title: "Mad2", image: Mad2 },
  { id: 7, title: "Gamechanger", image: Gamechanger },
  { id: 8, title: "Seethamma Vakitlo Sirimalle Chettu", image: SeethammaVakitloSirimalleChettu },
  { id: 9, title: "HIT2", image:HIT2},
  { id: 10, title: "Rajasaba", image: Rajasaba },
  { id: 11, title: "Dilruba", image: Dilruba},
  { id: 12, title: "SankranthiVasthunam", image: SankranthiVasthunam},
  { id: 13, title: "ENDGAME", image: ENDGAME  },
  { id: 14, title: "InfinityWar", image: InfinityWar  },
  { id: 15, title: "Orange", image:Orange  },
  { id: 16, title: "JUMANJI", image: JUMANJI },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    // Filter movies based on search term
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchTerm]);

  // First 4 movies for scrolling
  const scrollingMovies = filteredMovies.slice(0, 6);
  // Remaining movies for static display
  const staticMovies = filteredMovies.slice(0,);

  return (
    <>

      {/* Scrolling Movies Section (Only First 4) */}
      <div className="img-container">
        <ul className="scrolling-images">
          {scrollingMovies.map((movie) => (
            <li key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
              <img src={movie.image} alt={movie.title} className="scrolling-element" />
            </li>
          ))}
        </ul>
      </div>

      {/* Static Display Section (Remaining Movies) */}
      <div className="Img-list">
        <ul>
          {staticMovies.map((movie) => (
            <li key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
              <img src={movie.image} alt={movie.title} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
