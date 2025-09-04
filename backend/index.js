const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const db = require('./db');
// const simulationRouter = require("./Routes/simulation");

db();


app.use(express.json());
app.use(cors({
  origin: "https://ganesh-uwti.onrender.com", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.get('/', (req, res) => {
    res.send('Ganesh JI Patel');
});

app.use('/api',require('./Routes/CreateUser'))
// app.use("/api/simulation", simulationRouter);
// app.use('/api', require('./Routes/simulation'));
// app.use('/api', require('./Routes/OrderData'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
