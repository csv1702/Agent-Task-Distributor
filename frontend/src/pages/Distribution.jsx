import { useEffect, useState } from "react";
import api from "../services/api";

const Distribution = () => {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch agents on load
  useEffect(() => {
    const fetchAgents = async () => {
      const res = await api.get("/agents");
      setAgents(res.data.agents);
    };
    fetchAgents();
  }, []);

  // Fetch records when agent changes
  useEffect(() => {
    if (!selectedAgent) return;

    const fetchRecords = async () => {
      setLoading(true);
      const res = await api.get(`/records/${selectedAgent}`);
      setRecords(res.data.records);
      setLoading(false);
    };

    fetchRecords();
  }, [selectedAgent]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Agent-wise Distribution</h2>

      {/* Agent Selector */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Agent</label>
        <select
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
          className="p-2 border rounded w-64"
        >
          <option value="">-- Choose Agent --</option>
          {agents.map((agent) => (
            <option key={agent._id} value={agent._id}>
              {agent.name}
            </option>
          ))}
        </select>
      </div>

      {/* Records Table */}
      {loading ? (
        <p>Loading records...</p>
      ) : selectedAgent && records.length === 0 ? (
        <p>No records assigned to this agent.</p>
      ) : records.length > 0 ? (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">First Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record._id} className="border-t">
                  <td className="p-3">{record.firstName}</td>
                  <td className="p-3">{record.phone}</td>
                  <td className="p-3">{record.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default Distribution;
