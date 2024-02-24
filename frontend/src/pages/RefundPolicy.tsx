import { FaMoneyBill, FaUndoAlt, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function RefundPolicy() {
  return (
    <div className="container mx-auto px-8 py-12">
                <Link to='/' className=" text-gray-500">Back</Link>

      <h1 className="text-5xl font-bold mb-10">Refund & Cancellation</h1>

      {/* Refund Policy */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">
          <FaMoneyBill className="mr-4 text-red-500" />
          Refund Policy
        </h2>
        <p className="text-xl mb-6">
          Only amounts directly paid to us are eligible for direct refunds from
          us as per our refund and cancellation policy. No refunds will be
          provided for any amount paid to Online Travel Agents (like Agoda,
          Booking.com, Makemytrip.com etc).
        </p>
        <p className="text-xl mb-6">
          Refunds shall be processed only in case the cancellations are done as
          per the cancellation and refund policy mentioned.
        </p>
        <p className="text-xl mb-6">
          All eligible refunds shall be processed in 10-12 days after we receive
          the UPI details. We process refunds through GooglePay or any other UPI
          Payment methods only.
        </p>
        <p className="text-xl mb-6">
          For refunds where original payment was made through Credit card or
          debit card or through payment gateway, refunds will be processed after
          deduction of charges of 3% on the total amount paid.
        </p>
      </section>

      {/* Cancellation Policy */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">
          <FaUndoAlt className="mr-4 text-red-500" />
          Cancellation Policy
        </h2>
        <p className="text-xl mb-6">
          Full refund for cancellations up to 30 days before check-in. If booked
          fewer than 30 days before check-in, full refund for cancellations at
          least 15 days before check-in. After that, 50% refund up to 7 days
          before check-in. No refund if cancelled less than 7 days before
          check-in.
        </p>
        <p className="text-xl mb-6">
          If you have booked through the use of a travel agency or an online
          travel agency (such as Booking.com etc), you must cancel or modify
          your booking through the agency that you used to make the booking.
        </p>
        <p className="text-xl mb-6">
          In case of any Offers and Promotions, the payment will be
          NON-REFUNDABLE at any point.
        </p>
        <p className="text-xl mb-6">
          If you have booked directly through our official website, your refund
          will be calculated as per the cancellation policy mentioned above.
        </p>
      </section>

      {/* Contact */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
        <p className="text-xl mb-6">
          For any inquiries or assistance regarding refunds and cancellations,
          please email us at{" "}
          <a href="mailto:yogvanholidays@gmail.com" className="text-blue-500">
            <FaExternalLinkAlt className="mr-2" />
            yogvanholidays@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}

export default RefundPolicy;
