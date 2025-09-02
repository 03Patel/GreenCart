import express from "express";
import { body, validationResult } from "express-validator";
import { useEffect } from "react";
// import Driver from "../models/Driver.js";
// import Route from "../models/Route.js";
// import Order from "../models/Order.js";
// import SimulationResult from "../models/SimulationResult.js";

const router = express.Router();
const [Order,setOrder] = useState("")
  const [Driver, setDriver] = useState([]);
  const [Route, setRoute] = useState([])

const loadData = async () => {
    let response = await fetch('http://localhost:5000/api/foodData', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setDriver(response[0])
    setOrder(response[1])
      setRoute(response[1])
    console.log(response[0],response[1],response[2])

  }


  useEffect(()=>{
    loadData();
  })

  
// router.post(
//   "/run",
//   [
//     body("numDrivers").isInt({ min: 1 }).withMessage("numDrivers must be a positive integer"),
//     body("maxHoursPerDriver").isInt({ min: 1 }).withMessage("maxHoursPerDriver must be a positive integer"),
//     body("startTime").matches(/^\d{2}:\d{2}$/).withMessage("startTime must be in HH:MM format")
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       const { numDrivers, startTime, maxHoursPerDriver } = req.body;

//       // Load data
//       const [driversAll, routes, orders] = await Promise.all([
//         Driver.find().lean(),
//         Route.find().lean(),
//         Order.find().lean()
//       ]);

//       if (!driversAll.length) {
//         return res.status(400).json({ error: "No drivers found to run simulation" });
//       }

//       const drivers = driversAll.slice(0, Math.min(numDrivers, driversAll.length));

//       // Prepare driver state for the simulation day
//       const driverState = drivers.map((d) => {
//         const yesterdayHours = d.past7DayHours?.[d.past7DayHours.length - 1] || 0;
//         const fatigued = yesterdayHours > 8; // fatigue if worked >8h yesterday
//         return {
//           _id: d._id,
//           name: d.name,
//           workedMinutesToday: 0,
//           fatigued
//         };
//       });

//       // Index routes for quick lookup
//       const routeById = new Map(routes.map((r) => [r.routeId, r]));

//       let totalProfit = 0;
//       let totalFuelCost = 0;
//       let onTime = 0;
//       let late = 0;

//       const LATE_PENALTY_RS = 50;
//       const BONUS_THRESHOLD = 1000;
//       const BONUS_RATE = 0.1;
//       const FUEL_BASE_PER_KM = 5;
//       const FUEL_SURCHARGE_HIGH = 2;

//       let driverIdx = 0;

//       const computeActualMinutes = (r, fatigued) => {
//         let multiplier = 1;
//         if (r.trafficLevel === "High") multiplier *= 1.25;
//         else if (r.trafficLevel === "Medium") multiplier *= 1.1;

//         if (fatigued) multiplier *= 1.3;

//         return Math.round(r.baseTimeMinutes * multiplier);
//       };

//       const canFit = (workedMinutes, newMinutes) =>
//         (workedMinutes + newMinutes) / 60 <= maxHoursPerDriver;

//       for (const order of orders) {
//         const r = routeById.get(order.assignedRouteId);
//         if (!r) continue;

//         let attempts = 0;
//         let assignedDriver = null;
//         let actualMinutesForThisOrder = null;

//         while (attempts < driverState.length) {
//           const d = driverState[driverIdx];
//           const actualMinutes = computeActualMinutes(r, d.fatigued);
//           if (canFit(d.workedMinutesToday, actualMinutes)) {
//             assignedDriver = d;
//             actualMinutesForThisOrder = actualMinutes;
//             break;
//           }
//           driverIdx = (driverIdx + 1) % driverState.length;
//           attempts++;
//         }

//         if (!assignedDriver) {
//           driverIdx = (driverIdx + 1) % driverState.length;
//           continue;
//         }

//         assignedDriver.workedMinutesToday += actualMinutesForThisOrder;
//         driverIdx = (driverIdx + 1) % driverState.length;

//         const fuelPerKm =
//           r.trafficLevel === "High"
//             ? FUEL_BASE_PER_KM + FUEL_SURCHARGE_HIGH
//             : FUEL_BASE_PER_KM;
//         const fuelCost = r.distanceKm * fuelPerKm;

//         const isLate = actualMinutesForThisOrder > r.baseTimeMinutes + 10;
//         if (isLate) late++;
//         else onTime++;

//         const penalty = isLate ? LATE_PENALTY_RS : 0;
//         const bonus =
//           !isLate && order.valueRs > BONUS_THRESHOLD
//             ? order.valueRs * BONUS_RATE
//             : 0;

//         const profitThisOrder =
//           order.valueRs + bonus - penalty - fuelCost;

//         totalFuelCost += fuelCost;
//         totalProfit += profitThisOrder;
//       }

//       const totalDeliveries = onTime + late;
//       const efficiency =
//         totalDeliveries === 0
//           ? 0
//           : Math.round((onTime / totalDeliveries) * 100);

//       const kpis = {
//         profit: Math.round(totalProfit),
//         efficiency,
//         onTime,
//         late,
//         fuelCost: Math.round(totalFuelCost)
//       };

//       const saved = await SimulationResult.create({
//         inputs: { numDrivers, startTime, maxHoursPerDriver },
//         kpis
//       });

//       return res.json(saved);
//     } catch (err) {
//       console.error("Simulation error:", err);
//       return res
//         .status(500)
//         .json({ error: "Simulation failed", details: err.message });
//     }
//   }
// );

// /**
//  * GET /api/simulation/latest
//  */
// router.get("/latest", async (_req, res) => {
//   try {
//     const latest = await SimulationResult.findOne().sort({ createdAt: -1 });
//     if (!latest)
//       return res.status(404).json({ message: "No simulation results yet" });
//     res.json(latest);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports=router
