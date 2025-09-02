import React, { useState } from "react";

function SimulationPage({ onSimulationComplete }) {
  const [numDrivers, setNumDrivers] = useState(2);
  const [startTime, setStartTime] = useState("09:00");
  const [maxHoursPerDriver, setMaxHoursPerDriver] = useState(8);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const runSimulation = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

     try {
    //   const res = await fetch("http://localhost:5000/api/simulation/run", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ numDrivers, startTime, maxHoursPerDriver }),
    //   });

    //   if (!res.ok) {
    //     throw new Error(`Server error: ${res.status}`);
    //   }

    //   const data = await res.json();
    //   setResult(data.kpis);
          console.log("helo")
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
    
    
    
      // useEffect(()=>{
      //   loadData();
      // })

    //   // 🔄 Notify dashboard to update
    //   if (onSimulationComplete) {
    //     onSimulationComplete(data.kpis);
    //   }
  } catch (err) {
      setError(err.message || "Failed to run simulation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-green-700 mb-4">Run Simulation</h1>

        <form onSubmit={runSimulation} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Number of Drivers</label>
            <input
              type="number"
              value={numDrivers}
              onChange={(e) => setNumDrivers(Number(e.target.value))}
              className="w-full border text-gray-700 border-gray-300 rounded px-3 py-2"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border  text-gray-700 border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Max Hours per Driver</label>
            <input
              type="number"
              value={maxHoursPerDriver}
              onChange={(e) => setMaxHoursPerDriver(Number(e.target.value))}
              className="w-full border  text-gray-700 border-gray-300 rounded px-3 py-2"
              min="1"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Running..." : "Run Simulation"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {result && (
          <div className="mt-6 bg-gray-50 p-4 rounded border">
            <h2 className="font-bold text-lg mb-2">Simulation Results</h2>
            <p>Profit: ₹{result.profit}</p>
            <p>Efficiency: {result.efficiency}%</p>
            <p>On Time Deliveries: {result.onTime}</p>
            <p>Late Deliveries: {result.late}</p>
            <p>Fuel Cost: ₹{result.fuelCost}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SimulationPage;
