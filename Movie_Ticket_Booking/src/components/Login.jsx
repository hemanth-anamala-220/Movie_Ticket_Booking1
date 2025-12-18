import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Login.css";

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Hook for redirection

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!validateEmail(user.email)) {
            setMessage("Please enter a valid email address.");
            return;
        }

        if (user.password.length < 6) {
            setMessage("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("https://movie-ticket-booking1-backend.onrender.com/login", user);
            setMessage(response.data.message);

            // Redirect to Home Page if login is successful
            if (response.status === 200) {
                setTimeout(() => navigate("/"), 1000); // ✅ Corrected Route
            }

            setUser({ email: "", password: "" });
        } catch (error) {
            console.error("Login error:", error);
            setMessage(error.response?.data?.message || "Login failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label><FontAwesomeIcon icon={faEnvelope} /> Email:</label>
                    <input type="email" name="email" placeholder="Enter your email" value={user.email} onChange={handleChange} required />
                </div>

                <div className="input-group">
                    <label><FontAwesomeIcon icon={faLock} /> Password:</label>
                    <input type="password" name="password" placeholder="Enter your password" value={user.password} onChange={handleChange} required />
                </div>

                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p>Don't have an account? <Link to="/signup">Signup</Link></p> {/* ✅ Corrected navigation */}
        </div>
    );
};

export default Login;
