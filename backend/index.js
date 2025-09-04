const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const db = require('./db');
// const simulationRouter = require("./Routes/simulation");

db();


app.use(express.json());
app.use(cors({
    origin: "https://ganehsk.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('Ganesh JI Patel');
});

app.use('/api', require('./Routes/CreateUser', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }
        const user = { id: Date.now(), name, email };

        return res
            .status(201)
            .json({ success: true, message: "User registered successfully", user });
    } catch (err) {
        console.error("❌ Signup error:", err.message);
        return res
            .status(500)
            .json({ success: false, message: "Server error", error: err.message });
    }
}))
// app.use("/api/simulation", simulationRouter);
// app.use('/api', require('./Routes/simulation'));
// app.use('/api', require('./Routes/OrderData'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
