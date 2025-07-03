import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Signup.css";

const Signup = () => {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setError(""); // Clear errors when user types
    };

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const validatePassword = (password) => password.length >= 6;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(user.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!validatePassword(user.password)) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/signup", user);
            alert(response.data.message);
            setUser({ name: "", email: "", password: "" }); // Reset form
        } catch (error) {
            console.error("Error signing up:", error);
            setError(error.response?.data?.message || "Signup failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <h1>Signup</h1>
            {error && <p className="error-message">{error}</p>} {/* Show error message */}

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label><FontAwesomeIcon icon={faUser} /> Name:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label><FontAwesomeIcon icon={faEnvelope} /> Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label><FontAwesomeIcon icon={faLock} /> Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="signup-button" disabled={loading}>
                    {loading ? "Signing Up..." : "Signup"}
                </button>
            </form>

            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Signup;
