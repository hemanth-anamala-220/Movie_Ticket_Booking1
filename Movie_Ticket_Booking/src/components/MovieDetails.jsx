import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MovieDetails.css";

// Importing movie images
import Hanuman from "../assets/Hanuman.avif";
import salaar1 from "../assets/salaar1.png";
import skanda1 from "../assets/skanda1.png";
import KGF2 from "../assets/KGF2.png";
import Image from "../assets/movie.png";
import Mad2 from "../assets/Mad2.jpg";
import GameChanger from "../assets/Gamechanger.png";
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
    { id: 1, title: "Jai Hanuman", image: Hanuman, 
        description: "Hanuman is a 2024 Indian superhero film inspired by the Hindu deity Hanuman. The movie showcases his legendary strength, devotion, and valor as he battles forces of evil to restore balance and faith. A must-watch for mythology and action lovers.", 
        rating: 4.5, trailer: "https://www.youtube.com/embed/BUt-Ncdff50?" 
    },
    { id: 2, title: "Salaar", image: salaar1, 
        description: "An action thriller starring Prabhas, Salaar is a high-octane movie filled with breathtaking fight sequences, intense storytelling, and an emotionally gripping narrative. With a powerful protagonist, the film explores themes of revenge and redemption.", 
        rating: 4.6, 
        trailer: "https://www.youtube.com/embed/4GPvYMKtrtI?"
     },
    { id: 3, title: "Skanda", image: skanda1,
         description: "A high-energy action movie packed with emotions and powerful storytelling. Skanda follows the journey of a fearless hero fighting against all odds to protect his family and society. The film is a blend of action, drama, and intense emotions.", 
         rating: 4.4,
          trailer: "https://www.youtube.com/embed/rFnxNiiw1wI?" },
    { id: 4, title: "KGF 2", image: KGF2, 
        description: "Sequel to the blockbuster hit KGF, this movie delivers even more intense action, raw emotions, and a compelling story of Rocky as he rises to power. KGF 2 portrays a gripping tale of ambition, power struggles, and rebellion against oppression.",
         rating: 4.8, 
         trailer: "https://www.youtube.com/embed/bDTUFufX-1s?" 
        },
    { id: 5,
        title: "Court", 
        image: Image, 
        description: "A thought-provoking legal drama that delves deep into the flaws of the judicial system. The movie showcases a gripping courtroom battle, exploring themes of justice, human rights, and political ideology with a realistic approach.", 
        rating: 4.2, 
        trailer: "https://www.youtube.com/embed/urrUjvUFhxE?"
     },
    { id: 6, 
        title: "Mad2", 
        image: Mad2, 
        description: "A hilarious comedy-drama packed with entertainment and humor. Mad2 follows a group of misfits as they navigate unexpected situations, leading to a rollercoaster of laughter and chaos. Perfect for those who enjoy light-hearted fun.", 
        rating: 4.1, 
        trailer: "https://www.youtube.com/embed/x9jlQ0_K5Zc?"
     },
    { id: 7, 
        title: "Game Changer", 
        image: GameChanger, 
        description: "A political thriller starring Ram Charan and directed by Shankar. The movie explores the intricate web of politics, power, and corruption, with a gripping narrative that keeps audiences on the edge of their seats.", 
        rating: 4.7, 
        trailer: "https://www.youtube.com/embed/EqDlrimnMCE?" 
    },
    { id: 8, title: "Seethamma Vakitlo Sirimalle Chettu", 
        image: SeethammaVakitloSirimalleChettu, 
        description: "A heartwarming Telugu family drama featuring Mahesh Babu and Venkatesh. The movie portrays the importance of family values, relationships, and love, making it a delightful watch for all age groups.", 
        rating: 4.5, 
        trailer: "https://www.youtube.com/embed/_c840-Ahuok?" 
    },
    { id: 9,
        title: "HIT 2", image: HIT2,
         description: "A gripping crime thriller that keeps you on the edge of your seat. HIT 2 follows an intense investigation as the protagonist unravels a complex web of crime, suspense, and unexpected twists.", 
         rating: 4.6, 
         trailer: "https://www.youtube.com/embed/XhW3i2f54BQ?"
         },
    { id: 10, 
        title: "Rajasaba", image: Rajasaba,
         description: "A compelling political drama exploring power, governance, and corruption. The film takes audiences on an insightful journey into the murky world of politics and leadership.", 
         rating: 4.3, 
         trailer: "https://www.youtube.com/embed/YFZMBqyXkqQ?"
        },
    { id: 11, 
        title: "Dilruba", 
        image: Dilruba, 
        description: "A romantic drama that delves deep into love, heartbreak, and destiny. With beautiful storytelling and powerful performances, the film captures the essence of emotions and relationships.", 
        rating: 4.2, 
        trailer: "https://www.youtube.com/embed/STAEe52jgJU?"
     },
    { id: 12, 
        title: "Sankranthi Vasthunam", 
        image: SankranthiVasthunam, 
        description: "A festival-themed movie with cultural significance. It beautifully portrays the traditions and spirit of Sankranthi, blending emotions with festive celebrations.", 
        rating: 4.2, 
        trailer: "https://www.youtube.com/embed/yCkl2Z3PBs0?" 
    },
    { id: 13, 
        title: "Avengers: Endgame", 
        image: ENDGAME, 
        description: "The epic conclusion to the Marvel Cinematic Universe's Infinity Saga. Featuring breathtaking battles and emotional farewells, Endgame delivers an unforgettable cinematic experience.", 
        rating: 4.9,
         trailer: "https://www.youtube.com/embed/TcMBFSGVi1c?" 
        },
    { id: 14, 
        title: "Avengers: Infinity War",
         image: InfinityWar,
          description: "Thanos seeks to collect all six Infinity Stones to wipe out half of humanity. A thrilling Marvel adventure packed with high stakes and emotional moments.", 
          rating: 4.8, 
          trailer: "https://www.youtube.com/embed/6ZfuNTqbHE8?"
         },
    { id: 15, 
        title: "Orange", 
        image: Orange, 
        description: "A Telugu romantic drama starring Ram Charan. Orange explores the complexities of love and relationships, with a unique take on commitment and personal freedom.",
         rating: 4.3, 
         trailer: "https://www.youtube.com/embed/q8GcMjkbCjo?"
         },
    { id: 16, 
        title: "Jumanji: Welcome to the Jungle", 
        image: JUMANJI, 
        description: "A group of teenagers gets sucked into a magical video game and must navigate its dangerous world to escape. A thrilling adventure filled with humor and action.",
         rating: 4.5, 
         trailer: "https://www.youtube.com/embed/2QKg5SZ_35I?"
        }
];
const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const selectedMovie = movies.find((m) => m.id === parseInt(id));
        setMovie(selectedMovie);
    }, [id]);

    if (!movie) {
        return <h2>Movie not found!</h2>;
    }

    const handleBookNow = () => {
        navigate("/BookPage", { state: { movie } });
    };

    return (
        <div className="movie-details">
            <div className="left">
                <img src={movie.image} alt={movie.title} width="200" />
            </div>
            <div className="right">
                <h1>{movie.title}</h1>
                <p>{movie.description}</p>
                <p><strong>Rating:</strong> ⭐ {movie.rating} / 5</p>
                <div className="trailer-container">
                <iframe 
                    width="560" 
                    height="315" 
                    src={movie.trailer}
                    title={`${movie.title} Trailer`}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
            </div>
                <button onClick={handleBookNow} className="btn-movie" >Book Me</button>
            </div>
        </div>
    );
};
export default MovieDetails;