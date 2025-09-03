const express = require('express');
const app = express();

const mongoose = require('mongoose');

const MongoURL = 'mongodb+srv://bit21cs51_db_user:ch6gzzDo6vnVxPL5@cluster0.urr8lrr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

//ch6gzzDo6vnVxPL5
const db = async () => {
  try {
    await mongoose.connect(MongoURL, {
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


