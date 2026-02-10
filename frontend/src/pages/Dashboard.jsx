import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    agents: 0,
    records: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const agentsRes = await api.get("/agents");
        const agents = agentsRes.data.agents;

        let totalRecords = 0;
        for (const agent of agents) {
          const res = await api.get(`/records/${agent._id}`);
          totalRecords += res.data.total;
        }

        setStats({
          agents: agents.length,
          records: totalRecords,
        });
      } catch (error) {
        console.error("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow transition transform hover:-translate-y-1 hover:shadow-lg">
          <p className="text-sm text-gray-500">Total Agents</p>
          <p className="text-3xl font-bold mt-2">{stats.agents}</p>
        </div>

        <div className="bg-white p-6 rounded shadow transition transform hover:-translate-y-1 hover:shadow-lg">
          <p className="text-sm text-gray-500">Total Records Distributed</p>
          <p className="text-3xl font-bold mt-2">{stats.records}</p>
        </div>

        <div className="bg-white p-6 rounded shadow transition transform hover:-translate-y-1 hover:shadow-lg">
          <p className="text-sm text-gray-500">System Status</p>
          <p className="text-lg font-medium mt-2 text-green-600">Operational</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white p-6 rounded shadow transition transform hover:-translate-y-1 hover:shadow-lg">
        <h3 className="text-lg font-semibold mb-2">How this system works</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          This application allows an admin to manage agents and upload CSV or
          Excel files containing records. Once uploaded, records are validated
          and distributed equally among five agents. Distributed data can be
          viewed agent-wise from the dashboard.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
