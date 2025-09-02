const express = require('express');
const app = express();

const mongoose = require('mongoose');

const MongoURL = 'mongodb+srv://bit21cs51:kLME8vjociLY8RqU@MagicPin-db.20qkmtg.mongodb.net/MagicPin-db?retryWrites=true&w=majority&appName=MagicPin-db';

const db = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/GreenCart", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB Compass');

    const db = mongoose.connection.db;

    const fetchDriver = await db.collection("drivers")
    const DriverData = await fetchDriver.find().toArray();

    const fetchOrders = await db.collection("orders");
    const OrderData = await fetchOrders.find().toArray();

    const fetchRoutes = await db.collection("routes");
    const RoutesData = await fetchRoutes.find().toArray
    global.DriverItem = DriverData;

    global.OrderItem = OrderData;

    global.RoutesItem=RoutesData;
    

  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

module.exports = db;


