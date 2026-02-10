import { useState } from "react";
import api from "../services/api";
import Button from "../components/common/Button";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setError("");
    setMessage("");
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(`Upload successful. Total records: ${res.data.totalRecords}`);
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <label className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-black transition">
        <input
          type="file"
          accept=".csv,.xls,.xlsx"
          onChange={handleFileChange}
          className="hidden"
        />
        <p className="text-gray-600">
          {file ? (
            <>
              Selected file:
              <br />
              <span className="font-medium text-black">{file.name}</span>
            </>
          ) : (
            <>
              Click to upload <br />
              <span className="text-sm text-gray-400">
                CSV, XLS, XLSX supported
              </span>
            </>
          )}
        </p>
      </label>

      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

      {message && <p className="text-green-600 text-sm mt-3">{message}</p>}

      <div className="mt-4">
        <Button onClick={handleUpload}>
          {loading ? "Uploading..." : "Upload File"}
        </Button>
      </div>
    </div>
  );
};

export default Upload;
