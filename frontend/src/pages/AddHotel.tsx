import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import { Link } from "react-router-dom";

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <div>
      <div style={{display:"flex", flexDirection:"row",justifyContent:"space-between"}}>

      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <Link to="/" className="bg-red-900 text-white p-2 font-bold hover:bg-red-700 text-xl disabled:bg-gray-500">Back</Link>
      </div>

      <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
    </div>
  );
};

export default AddHotel;
