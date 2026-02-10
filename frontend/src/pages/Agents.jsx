import { useEffect, useState } from "react";
import api from "../services/api";
import Button from "../components/common/Button";
import AddAgentModal from "../components/AddAgentModal";

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchAgents = async () => {
    setLoading(true);
    const res = await api.get("/agents");
    setAgents(res.data.agents);
    setLoading(false);
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Agents</h2>
        <Button onClick={() => setShowModal(true)}>Add Agent</Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : agents.length === 0 ? (
        <p>No agents found.</p>
      ) : (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Mobile</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent._id} className="border-t">
                  <td className="p-3">{agent.name}</td>
                  <td className="p-3">{agent.email}</td>
                  <td className="p-3">{agent.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <AddAgentModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchAgents}
        />
      )}
    </div>
  );
};

export default Agents;
