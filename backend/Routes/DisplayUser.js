
const express = require('express')
const rounter = express.Router()

rounter.post('/foodData', (req, res) => {
    try {
        
        res.send([global.DriverItem ,global.OrderItem ,global.RoutesItem])
    

    } catch (error) {
        console.log(error.message);
        res.send('Server error')
    }
})

module.exports = rounter;
