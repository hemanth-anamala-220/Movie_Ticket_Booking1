import React, { useState } from "react";
import "./Contact.css";
;

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [responseMessage, setResponseMessage] = useState("");

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("http://localhost:5000/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            setResponseMessage(data.message);

            if (response.ok) {
                setFormData({ name: "", email: "", message: "" }); // Clear form on success
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setResponseMessage("Error sending message. Try again later.");
        }
    };

    return (
            <div className="contact-container">
              <h2>Contact Us</h2>
              {responseMessage && <p className="response-message">{responseMessage}</p>}
              
              <form onSubmit={handleSubmit}>
                  <div className="input-group1">
                      <label>Name:</label>
                      <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                      />
                  </div>

                  <div className="input-group1">
                      <label>Email:</label>
                      <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                      />
                  </div>

                  <div className="input-group1">
                      <label>Message:</label>
                      <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                      ></textarea>
                  </div>
                    <div className="Btn">

                  <button type="submit">Send Message</button>
                    </div>
              </form>
            </div>
    );
};

export default Contact;
