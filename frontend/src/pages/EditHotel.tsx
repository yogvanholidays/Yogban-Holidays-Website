import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h1 className="text-3xl font-bold mb-3">Edit Hotel</h1>
        <Link
          to="/my-hotels"
          className="bg-red-900 text-white p-2 font-bold hover:bg-red-700 text-xl disabled:bg-gray-500"
        >
          Back
        </Link>
      </div>
      <ManageHotelForm
        hotel={hotel}
        onSave={handleSave}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EditHotel;
