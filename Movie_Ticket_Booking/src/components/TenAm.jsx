import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const TenAm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const movie = location.state?.movie;

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState({});

    const totalRows = 20;
    const seatsPerRow = 15;
    const rowLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const movieId = movie?.id || movie?.title || "default";

    const toggleSeatSelection = (seatNumber) => {
        const alreadyBooked = bookedSeats[movieId]?.includes(seatNumber);
        if (alreadyBooked) return;
        setSelectedSeats((prev) =>
            prev.includes(seatNumber)
                ? prev.filter((s) => s !== seatNumber)
                : [...prev, seatNumber]
        );
    };

    const handlePayment = () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat.");
            return;
        }
        setBookedSeats((prev) => ({
            ...prev,
            [movieId]: [...(prev[movieId] || []), ...selectedSeats],
        }));
        navigate("/Payment", { state: { selectedSeats, movie } });
    };

    const isBooked = (seatLabel) => bookedSeats[movieId]?.includes(seatLabel);

    return (
        <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f9e7e7" }}>
            <h1>Welcome to 10:00 AM Show</h1>
            {movie ? (
                <>
                    <h2 style={{ color: "orange" }}>{movie.title}</h2>
                    <img src={movie.image} alt={movie.title} width="250" />
                    <p style={{ width: "80%", margin: "0 auto" }}>
                        <strong>Description:</strong> {movie.description}
                    </p>
                    <p><strong>Rating:</strong> ⭐ {movie.rating} / 5</p>

                    <h3 style={{ marginTop: "40px", marginBottom: "10px" }}>🎬 SCREEN THIS WAY</h3>
                    <div style={{
                        margin: "0 auto",
                        width: "fit-content",
                        padding: "10px 0",
                        borderTop: "5px solid #000",
                        borderRadius: "5px",
                        width: "80%"
                    }}></div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", marginTop: "20px" }}>
                        {[...Array(totalRows)].map((_, rowIndex) => (
                            <div key={rowIndex} style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "8px",
                                marginBottom: "4px"
                            }}>
                                {[...Array(seatsPerRow)].map((_, colIndex) => {
                                    const seatLabel = `${rowLabels[rowIndex]}${colIndex + 1}`;
                                    const booked = isBooked(seatLabel);

                                    // Add aisle spacing after 5th and 10th seats
                                    const marginRight = (colIndex + 1) % 5 === 0 && colIndex !== seatsPerRow - 1 ? "20px" : "5px";

                                    return (
                                        <button
                                            key={seatLabel}
                                            onClick={() => toggleSeatSelection(seatLabel)}
                                            disabled={booked}
                                            style={{
                                                padding: "8px",
                                                width: "40px",
                                                backgroundColor: booked
                                                    ? "red"
                                                    : selectedSeats.includes(seatLabel)
                                                        ? "green"
                                                        : "gray",
                                                color: "white",
                                                border: "none",
                                                cursor: booked ? "not-allowed" : "pointer",
                                                borderRadius: "5px",
                                                marginRight: marginRight
                                            }}
                                        >
                                            {seatLabel}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    <p style={{ marginTop: "20px" }}>Selected Seats: {selectedSeats.join(", ") || "None"}</p>
                    <button
                        onClick={handlePayment}
                        disabled={selectedSeats.length === 0}
                        style={{
                            marginTop: "10px",
                            padding: "10px 20px",
                            backgroundColor: "blue",
                            color: "white",
                            border: "none",
                            cursor: selectedSeats.length === 0 ? "not-allowed" : "pointer",
                            borderRadius: "5px"
                        }}
                    >
                        Pay Now
                    </button>
                </>
            ) : (
                <p>No movie selected.</p>
            )}
        </div>
    );
};

export default TenAm;
