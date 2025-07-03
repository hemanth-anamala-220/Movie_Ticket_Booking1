import React from "react";
import "./About.css";

const About = () => {
    return (
        <div className="about-container">
            <h1>About Us</h1>
            <p>We are passionate about building a seamless and efficient movie ticket booking experience.</p>

            <div className="about-content">
                <img src="https://s3-alpha.figma.com/hub/file/3683419383/248ae766-cd0b-43f2-ab6e-855ec82607ec-cover.png" alt="About Us" className="about-image"/>

                <div className="about-text">
                    <h2>Who We Are</h2>
                    <p>We are a team of tech enthusiasts dedicated to transforming the way people book movie tickets online.</p>

                    <h2>Our Mission</h2>
                    <p>Our mission is to create a **Movie-Ticket-Booking** platform that is fast, user-friendly, and secure, ensuring a hassle-free experience for movie lovers.</p>

                    <h2>Our Vision</h2>
                    <p>We aim to revolutionize the entertainment industry by providing a smart and efficient ticket booking system accessible to everyone.</p>

                    <h2>Get in Touch</h2>
                    <a href="https://mail.google.com/mail/u/0/#inbox?compose=new"><p> support@movietickets.com</p></a>
                    <p>Follow us on <a href="/">Social Media</a></p>
                </div>
            </div>

            {/* Copyright Section */}
            <footer className="copyright">
                <p>© {new Date().getFullYear()} MovieTickets. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default About;
