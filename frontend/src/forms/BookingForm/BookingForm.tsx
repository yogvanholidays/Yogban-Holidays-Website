import React, { useState } from "react";
import { UserType } from "../../../../backend/src/shared/types";
import { useForm } from "react-hook-form";
import { createPaymentIntent, validatePayment } from "../../api-client"; // Import the createPaymentIntent function
import useRazorpay from "react-razorpay";

type Props = {
  currentUser: UserType;
  hotelId: string; // Add hotelId to Props type
  amount: number; // Add amount to Props type
};

const BookingForm = ({ currentUser, hotelId, amount }: Props) => {
  const [Razorpay] = useRazorpay();

  const { handleSubmit, register } = useForm({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      // Call the createPaymentIntent function to initiate payment
      const intent = await createPaymentIntent(hotelId, amount);
      console.log("Payment Intent:", intent);
      const options = {
        key: "rzp_test_SVXNvcCQpqlAcY", // Enter the Key ID generated from the Dashboard
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: intent.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
        handler: async function (response) {
          console.log(response);
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
          const isSuccessJSON = await validatePayment(
            response.razorpay_payment_id,
            response.razorpay_order_id,
            response.razorpay_signature
          );
          console.log(isSuccessJSON)
        },
        prefill: {
          name: "Piyush Garg",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      console.log(options);
      const rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp1.open();
    } catch (error) {
      console.error("Error creating payment intent:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>

        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: {amount} INR {/* Use the passed amount here */}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold"> Payment Details</h3>
      </div>

      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500"
        >
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;