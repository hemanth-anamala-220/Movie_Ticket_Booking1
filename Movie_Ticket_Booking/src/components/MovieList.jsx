import { Link } from "react-router-dom";
import Hanuman from "../assets/Hanuman.avif";
import salaar1 from "../assets/salaar1.png";
import skanda1 from "../assets/skanda1.png";
import KGF2 from "../assets/KGF2.png";
import Mad2 from "../assets/Mad2.jpg";
import GameChanger from "../assets/Gamechanger.png";
import SeethammaVakitloSirimalleChettu from "../assets/Seethamma-Vakitlo-Sirimalle-Chettu.jpg";
import HIT2 from "../assets/HIT3.jpeg";
import Rajasaba from "../assets/Rajasaba.jpeg";
import Dilruba from "../assets/Dilruba.jpg";
import SankranthiVasthunam from "../assets/SankranthiVasthunam.avif";

// Movie data
export const movies = [
  {
    id: 1,
    title: "Hanuman",
    image: Hanuman,
    description: "A superhero film based on Indian mythology.",
    date: "2025-04-10",
    day: "Thursday",
    time: "6:30 PM",
    genre: "Superhero",
  },
  {
    id: 2,
    title: "Salaar",
    image: salaar1,
    description: "An action-packed thriller with intense storytelling.",
    date: "2025-04-12",
    day: "Saturday",
    time: "9:00 PM",
    genre: "Action",
  },
  {
    id: 3,
    title: "Skanda",
    image: skanda1,
    description: "A gripping action-drama with an engaging plot.",
    date: "2025-04-14",
    day: "Monday",
    time: "7:15 PM",
    genre: "Drama",
  },
  {
    id: 4,
    title: "KGF Chapter 2",
    image: KGF2,
    description: "A sequel to the blockbuster KGF with intense action.",
    date: "2025-04-16",
    day: "Wednesday",
    time: "8:00 PM",
    genre: "Action",
  },
  {
    id: 5,
    title: "Mad 2",
    image: Mad2,
    description: "A fun and entertaining movie for all age groups.",
    date: "2025-04-18",
    day: "Friday",
    time: "5:45 PM",
    genre: "Comedy",
  },
  {
    id: 6,
    title: "Game Changer",
    image: GameChanger,
    description: "A political thriller with unexpected twists.",
    date: "2025-04-20",
    day: "Sunday",
    time: "6:00 PM",
    genre: "Thriller",
  },
  {
    id: 7,
    title: "Seethamma Vakitlo Sirimalle Chettu",
    image: SeethammaVakitloSirimalleChettu,
    description: "A heartwarming family drama.",
    date: "2025-04-22",
    day: "Tuesday",
    time: "4:30 PM",
    genre: "Family",
  },
  {
    id: 8,
    title: "HIT 2",
    image: HIT2,
    description: "A crime thriller filled with suspense.",
    date: "2025-04-24",
    day: "Thursday",
    time: "9:30 PM",
    genre: "Crime",
  },
  {
    id: 9,
    title: "Rajasaba",
    image: Rajasaba,
    description: "A story about politics and power struggles.",
    date: "2025-04-26",
    day: "Saturday",
    time: "8:15 PM",
    genre: "Political",
  },
  {
    id: 10,
    title: "Dilruba",
    image: Dilruba,
    description: "A romantic drama with a twist.",
    date: "2025-04-28",
    day: "Monday",
    time: "5:00 PM",
    genre: "Romance",
  },
  {
    id: 11,
    title: "Sankranthi Vasthunam",
    image: SankranthiVasthunam,
    description: "A festival-based film celebrating traditions.",
    date: "2025-04-30",
    day: "Wednesday",
    time: "6:45 PM",
    genre: "Festival",
  },
];

const MovieList = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Available Movies</h1>
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap"
      }}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: "1px solid black",
              padding: "10px",
              borderRadius: "8px",
              width: "250px",
              textAlign: "center",
              boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#fff"
            }}
          >
            <img src={movie.image} alt={movie.title} width="200" height="250" style={{ borderRadius: "5px" }} />
            <h3>{movie.title}</h3>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Date:</strong> {movie.date}</p>
            <p><strong>Day:</strong> {movie.day}</p>
            <p><strong>Time:</strong> {movie.time}</p>
            <p>{movie.description}</p>

            {/* Correctly placed Link wrapping the button */}
            <Link to={`/book/${movie.id}`}>
              <button style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "14px"
              }}>
                Book Me
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
