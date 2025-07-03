import { useNavigate, useLocation } from "react-router-dom";
import "./BookPage.css";

const BookPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const movie = location.state?.movie; // Get movie details

    // Function to handle button click
    const handleBooking = (time) => {
        navigate(`/${time}`, { state: { movie } });
    };

    return (
        <>
            <h1>Book Tickets for {movie?.title || "Movie"}</h1>
            <div className="BookPage-Container">
                <div className="Book-Container">
                    <img src={movie?.image} alt={movie?.title} width="200" />
                    <p><strong>Description:</strong> {movie?.description}</p>
                    <p><strong>Rating:</strong> ⭐ {movie?.rating} / 5</p>
                    <h2>Select Time</h2>
                    <ol className="Book-Direction">
                        <li>
                            <button onClick={() => handleBooking("TENAM")}>10:00AM</button>
                        </li>
                        <li>
                            <button onClick={() => handleBooking("SIXPM")}>6:30PM</button>
                        </li>
                        <li>
                            <button onClick={() => handleBooking("NINEPM")}>9:00PM</button>
                        </li>
                    </ol>
                </div>
            </div>
        </>
    );
};

export default BookPage;
