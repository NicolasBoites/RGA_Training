function Alert({ type = "info", children }) {
  // Define las clases según el tipo
  const base = "flex items-center p-4 mb-4 border rounded-lg";
  const variants = {
    info: "text-blue-800 border-blue-300 bg-blue-50",
    success: "text-green-800 border-green-300 bg-green-50",
    warning: "text-yellow-800 border-yellow-300 bg-yellow-50",
    error: "text-red-800 border-red-300 bg-red-50",
  };
  return (
    <div className={`${base} ${variants[type]}`} role="alert">
      {children}
    </div>
  );
}

export default Alert;
