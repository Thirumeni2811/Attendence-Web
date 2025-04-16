import { useState } from "react";
import axios from "axios";
import { getConfig, UPDATE_EMPLOYEE } from "../../services";

const UserSwitch = ({ data }) => {
  if (data.active === undefined) return null; 
  const [isOn, setIsOn] = useState(data.active); 

  const handleStatus = async () => {
    const newStatus = !isOn;
    setIsOn(newStatus); 

    try {
      const response = await axios.patch(UPDATE_EMPLOYEE(data.id), { active: newStatus }, getConfig());
      console.log(response);
    } catch (error) {
      console.error("Error updating status:", error);
      setIsOn(!newStatus); 
    }
  };

  return (
    <div className="flex justify-center">
      <div
        className={`w-8 h-4 flex items-center rounded-full p-0.5 cursor-pointer transition-all ${
          isOn ? "bg-primary" : "bg-bgColorTer"
        }`}
        onClick={handleStatus}
      >
        <div
          className={`w-3.5 h-3.5 bg-white rounded-full shadow-md transform transition-transform ${
            isOn ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
};

export default UserSwitch;
