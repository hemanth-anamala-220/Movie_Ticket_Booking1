const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// **Connect to MongoDB (User Database)**
const mainDB = mongoose.createConnection("mongodb://127.0.0.1:27017/Signup", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// **Connect to MongoDB (Contact Database)**
const contactDB = mongoose.createConnection("mongodb://127.0.0.1:27017/ContactDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// **Connect to MongoDB (Payment Database)**
const paymentDB = mongoose.createConnection("mongodb://127.0.0.1:27017/payments", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// **Check Database Connections**
mainDB.on("connected", () => console.log("MongoDB Connected: Signup Database"));
contactDB.on("connected", () => console.log("MongoDB Connected: Contact Database"));
paymentDB.on("connected", () => console.log("MongoDB Connected: Payment Database"));

mainDB.on("error", (err) => console.error("MongoDB Signup connection error:", err));
contactDB.on("error", (err) => console.error("MongoDB Contact connection error:", err));
paymentDB.on("error", (err) => console.error("MongoDB Payment connection error:", err));

// **User Schema & Model (Signup Database)**
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mainDB.model("User", userSchema);

// **Contact Schema & Model (Contact Database)**
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
const Contact = contactDB.model("Contact", contactSchema);

// **Payment Schema & Model (Payment Database)**
const paymentSchema = new mongoose.Schema({
    movie: String,
    selectedSeats: [String],
    paymentMode: String,
    transactionId: String,
    amount: Number, // Store total amount
    createdAt: { type: Date, default: Date.now },
});
const Payment = paymentDB.model("Payment", paymentSchema);

// **Signup Route**
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// **Login Route**
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

        res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// **Contact Form Route**
app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: "All fields are required" });

    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error("Contact form error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// **Payment Route**
app.post("/api/payment", async (req, res) => {
    try {
        const { movie, selectedSeats, paymentMode, amount } = req.body;
        const transactionId = `TXN${Date.now()}`;

        const newPayment = new Payment({ movie, selectedSeats, paymentMode, transactionId, amount });
        await newPayment.save();

        res.json({ success: true, message: "Payment stored successfully", transactionId });
    } catch (error) {
        console.error("Payment error:", error);
        res.status(500).json({ success: false, message: "Error storing payment", error });
    }
});

// **Get Payments (For Admin)**
app.get("/api/payments", async (req, res) => {
    try {
        const payments = await Payment.find().sort({ createdAt: -1 });
        res.json(payments);
    } catch (error) {
        console.error("Error fetching payments:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// **Start Server**
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
