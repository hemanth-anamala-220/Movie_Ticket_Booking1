import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import QRCode from "react-qr-code";
import axios from "axios";
import "./Payment.css";

const ticketPrice = 150;

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedSeats, movie } = location.state || { selectedSeats: [], movie: null };

    const [paymentMode, setPaymentMode] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const [transactionId, setTransactionId] = useState("");

    const [cardDetails, setCardDetails] = useState({
        name: "",
        cardNumber: "",
        expiry: "",
    });

    const totalAmount = selectedSeats.length * ticketPrice;

    const handleMethodClick = (method) => {
        setPaymentMode(method);
        setCardDetails({ name: "", cardNumber: "", expiry: "" }); // Reset on change
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails((prev) => ({ ...prev, [name]: value }));
    };

    const renderDynamicContent = () => {
        const upiId = "8247535358@axl";
        if (paymentMode === "qr" || paymentMode === "gpay" || paymentMode === "phonepe") {
            return (
                <div className="qr-code">
                    <p>Scan to Pay ₹{totalAmount}</p>
                    <QRCode value={`upi://pay?pa=${upiId}&pn=MovieBooking&am=${totalAmount}&cu=INR`} />
                    <p>UPI ID: <strong>{upiId}</strong></p>
                </div>
            );
        } else if (paymentMode === "card") {
            return (
                <div className="card-form">
                    <input
                        type="text"
                        name="name"
                        placeholder="Cardholder Name"
                        value={cardDetails.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number (Last 4 digits)"
                        value={cardDetails.cardNumber}
                        onChange={handleInputChange}
                        maxLength="4"
                    />
                    <input
                        type="text"
                        name="expiry"
                        placeholder="Expiry Date (MM/YY)"
                        value={cardDetails.expiry}
                        onChange={handleInputChange}
                    />
                </div>
            );
        } else {
            return <p>Please select a payment method.</p>;
        }
    };

    const handlePayment = async () => {
        if (!paymentMode) {
            alert("Please select a payment mode.");
            return;
        }

        if (paymentMode === "card" && (!cardDetails.name || !cardDetails.cardNumber || !cardDetails.expiry)) {
            alert("Please fill in all card details.");
            return;
        }

        setIsProcessing(true);

        try {
            const response = await axios.post("http://localhost:5000/api/payment", {
                movie: movie?.title || "Unknown Movie",
                selectedSeats,
                paymentMode,
                amount: totalAmount,
                cardDetails: paymentMode === "card" ? cardDetails : null,
            });

            if (response.data.success) {
                setTransactionId(response.data.transactionId);
                setPaymentConfirmed(true);

                setTimeout(() => {
                    navigate("/", {
                        state: {
                            transactionId: response.data.transactionId,
                            amount: totalAmount,
                        },
                    });
                }, 3000);
            } else {
                alert("Payment failed. Try again.");
            }
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Error processing payment. Try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Secure Payment</h1>

            {movie ? (
                <>
                    <p><strong>Movie:</strong> {movie.title}</p>
                    <p><strong>Selected Seats:</strong> {selectedSeats.join(", ") || "None"}</p>
                    <p><strong>Ticket Price:</strong> ₹{ticketPrice}</p>
                    <p><strong>Total Amount:</strong> ₹{totalAmount}</p>

                    <div className="payment-container">
                        <h2>Select Payment Method</h2>

                        <div className="methods">
                            <div className="method" onClick={() => handleMethodClick("gpay")}>
                                <img src="https://img.icons8.com/color/48/000000/google-pay-india.png" alt="Google Pay" />
                                <span>Google Pay</span>
                            </div>
                            <div className="method" onClick={() => handleMethodClick("phonepe")}>
                                <img src="https://cdn.siasat.com/wp-content/uploads/2021/03/PhonePe.jpg" alt="PhonePe" />
                                <span>PhonePe</span>
                            </div>
                            <div className="method" onClick={() => handleMethodClick("card")}>
                                <img src="https://png.pngtree.com/png-vector/20200222/ourmid/pngtree-credit-card-isolated-on-white-background-png-image_2151943.jpg" alt="Card" />
                                <span>Credit/Debit Card</span>
                            </div>
                            <div className="method" onClick={() => handleMethodClick("qr")}>
                                <img src="https://img.icons8.com/ios-filled/50/000000/qr-code.png" alt="QR" />
                                <span>QR Code</span>
                            </div>
                        </div>

                        <div className="qr-section">
                            {renderDynamicContent()}
                        </div>

                        <button
                            className="pay-button"
                            onClick={handlePayment}
                            disabled={isProcessing || !paymentMode}
                        >
                            {isProcessing ? "Processing..." : "Complete Payment"}
                        </button>

                        {paymentConfirmed && (
                            <div className="confirm-msg">
                                ✅ Payment Successful! Transaction ID: <strong>{transactionId}</strong>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <p>No movie selected.</p>
            )}
        </div>
    );
};

export default Payment;
