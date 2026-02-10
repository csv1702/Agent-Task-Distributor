const Input = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <input
        {...props}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
};

export default Input;
