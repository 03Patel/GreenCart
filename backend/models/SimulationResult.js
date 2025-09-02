import mongoose from "mongoose";

const SimulationResultSchema = new mongoose.Schema(
  {
    inputs: {
      numDrivers: Number,
      startTime: String,           // HH:MM
      maxHoursPerDriver: Number,
    },
    kpis: {
      profit: Number,
      efficiency: Number,
      onTime: Number,
      late: Number,
      fuelCost: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SimulationResult", SimulationResultSchema);
