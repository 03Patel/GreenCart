import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext";


import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

function Dashboard() {
    const { authToken } = useContext(AuthContext);

    const [metrics, setMetrics] = useState({
        profit: 0,
        efficiency: 0,
        onTime: 0,
        late: 0,
        fuelCost: 0
    });

    const pieData = [
        { name: "On Time", value: metrics.onTime },
        { name: "Late Deliveries", value: metrics.late }
    ];
    const COLORS = ["#4CAF50", "#F44336"];

    const barData = [
        { name: "Fuel Cost", cost: metrics.fuelCost },
        { name: "Profit", cost: metrics.profit }
    ];



    const dummyMetrics = {
        profit: 12500,
        efficiency: 92,
        onTime: 85,
        late: 15,
        fuelCost: 3000
    };

    useEffect(() => {
        if (authToken) {
            setMetrics({
                profit: 0,
                efficiency: 0,
                onTime: 0,
                late: 0,
                fuelCost: 0

            });
        }else {
              setMetrics(dummyMetrics);  
            }
        
    },[authToken])


// useEffect(() => {
//   if (latestKpis) {
//     setMetrics(latestKpis);
//   } else {
//     fetch("http://localhost:5000/api/simulation/latest")
//       .then(res => res.json())
//       .then(data => setMetrics(data.kpis));
//   }
// }, [latestKpis]);





    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {!localStorage.getItem('authToken')?
            <h1 className="text-3xl text-gray-700 font-bold mb-8">Dummy Dashboard</h1>
            :
            <h1 className="text-3xl text-gray-700 font-bold mb-8">Dashboard</h1>
            }

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-5 rounded-xl shadow text-center">
                    <h2 className="text-lg font-semibold text-gray-700">Total Profit</h2>
                    <p className="text-3xl text-green-600 font-bold">₹{metrics.profit}</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow text-center">
                    <h2 className="text-lg font-semibold text-gray-700">Efficiency</h2>
                    <p className="text-3xl text-blue-600 font-bold">{metrics.efficiency}%</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow text-center">
                    <h2 className="text-lg font-semibold text-gray-700">On Time</h2>
                    <p className="text-3xl text-green-600 font-bold">{metrics.onTime}</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow text-center">
                    <h2 className="text-lg font-semibold text-gray-700">Late</h2>
                    <p className="text-3xl text-red-600 font-bold">{metrics.late}</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pie Chart */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold text-gray-700 mb-6">Delivery Performance</h3>
                    <div className="flex justify-center">
                        <PieChart width={320} height={320}>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                dataKey="value"
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold text-gray-700 mb-6">Cost vs Profit</h3>
                    <div className="flex justify-center">
                        <BarChart width={400} height={300} data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="cost" fill="#8884d8" />
                        </BarChart>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
