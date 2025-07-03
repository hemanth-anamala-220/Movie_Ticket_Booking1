import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Home1.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

// Importing movie images
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

const Home1 = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies([]); // No search term = No images
    }
  }, [searchTerm]);

  const handleSearch = () => {
    setSearchTerm(inputValue.trim());
  };

  return (
    <>
      {/* Search Input */}
      <div className="main-container1">
        <input
          type="text"
          placeholder="Enter a Movie Name..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSearch}>🔎</button>

        {/* Navigation Links */}
        <ul>
          <li>
            <NavLink to="/release-movies" className={({ isActive }) => (isActive ? "active" : "inActive")}>
              <FontAwesomeIcon icon={faFilm} /> Release Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/latest-movies" className={({ isActive }) => (isActive ? "active" : "inActive")}>
              <FontAwesomeIcon icon={faFilm} /> Latest Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/old-movies" className={({ isActive }) => (isActive ? "active" : "inActive")}>
              <FontAwesomeIcon icon={faFilm} /> Old Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/dubbed-movies" className={({ isActive }) => (isActive ? "active" : "inActive")}>
              <FontAwesomeIcon icon={faFilm} /> Dubbed Movies
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Movie Display Section (Show only when searched) */}
      {filteredMovies.length > 0 && (
        <div className="movie-container1">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-item1" onClick={() => navigate(`/movie/${movie.id}`)}>
              <img src={movie.image} alt={movie.title} className="movie-image" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home1;
