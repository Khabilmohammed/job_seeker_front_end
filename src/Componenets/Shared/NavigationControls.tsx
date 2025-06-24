import { useNavigate } from "react-router-dom";

const NavigationControls = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-[#075e54] text-white rounded hover:bg-[#128c7e] transition"
      >
        ⬅ Back
      </button>
      <button
        onClick={() => navigate(1)}
        className="px-4 py-2 bg-[#075e54] text-white rounded hover:bg-[#128c7e] transition"
      >
        Forward ➡
      </button>
    </div>
  );
};

export default NavigationControls;
