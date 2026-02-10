import { useState } from "react";
import api from "../services/api";
import Button from "./common/Button";
import Input from "./common/Input";

const AddAgentModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/agents", form);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add agent");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg w-full max-w-md"
      >
        <h3 className="text-lg font-semibold mb-4">Add Agent</h3>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          label="Mobile"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />

        <div className="flex justify-end gap-3 mt-4">
          <Button
            type="button"
            className="bg-gray-300 text-black hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit">{loading ? "Saving..." : "Add Agent"}</Button>
        </div>
      </form>
    </div>
  );
};

export default AddAgentModal;
