import { FaBan, FaSmokingBan, FaDog, FaIdCard, FaClock, FaMoneyBill, FaUndoAlt, FaShieldAlt, FaBed, FaParking, FaUserSlash, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function GuestPolicy() {
  return (
    <div className="container mx-auto px-8 py-12">
                <Link to='/' className=" text-gray-500">Back</Link>

      <h1 className="text-5xl font-bold mb-10">Guest Policies (House Rules)</h1>

      {/* No drugs and alcohol */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaBan className="mr-4 text-red-500" />No drugs and alcohol allowed</h2>
        <p className="text-xl mb-6">Please refrain from bringing drugs or alcohol into the apartment or society premises.</p>
      </section>

      {/* No parties or loud music */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaBan className="mr-4 text-red-500" />No parties or loud music</h2>
        <p className="text-xl mb-6">To maintain a peaceful environment, parties and loud music are not permitted.</p>
      </section>

      {/* No cooking non-veg */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaBan className="mr-4 text-red-500" />No cooking non-veg food</h2>
        <p className="text-xl mb-6">Cooking or heating non-veg food is not allowed inside the apartment.</p>
      </section>

      {/* No moving furniture */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaBed className="mr-4 text-red-500" />No moving furniture</h2>
        <p className="text-xl mb-6">Please refrain from moving heavy furniture from its original position.</p>
      </section>

      {/* No smoking */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaSmokingBan className="mr-4 text-red-500" />No smoking indoors</h2>
        <p className="text-xl mb-6">Smoking is strictly prohibited inside the apartment and society premises.</p>
      </section>

      {/* Responsible smoking */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaSmokingBan className="mr-4 text-green-500" />Responsible smoking</h2>
        <p className="text-xl mb-6">Responsible smoking is permitted only in your private balcony.</p>
      </section>

      {/* Leave the house clean */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaShieldAlt className="mr-4 text-green-500" />Leave the house clean</h2>
        <p className="text-xl mb-6">Guests are expected to leave the house clean as it was at the time of check-in.</p>
      </section>

      {/* Turn off gas and electrical items */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaUndoAlt className="mr-4 text-green-500" />Turn off gas and electrical items</h2>
        <p className="text-xl mb-6">Please ensure to turn off gas and electrical items when not in use.</p>
      </section>

      {/* Breakdowns */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaClock className="mr-4 text-red-500" />Breakdowns</h2>
        <p className="text-xl mb-6">Please note that breakdowns of services like lift and electrical equipment may take longer than expected.</p>
      </section>

      {/* Breaking rules */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaBan className="mr-4 text-red-500" />Breaking the rules</h2>
        <p className="text-xl mb-6">Guests breaking house rules or engaging in misconduct may be asked to leave without refund.</p>
      </section>

      {/* Non-Residents/Visitors */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaUserSlash className="mr-4 text-red-500" />Non-Residents/Visitors</h2>
        <p className="text-xl mb-6">Non-Residents/Visitors are strictly prohibited on the apartment premises.</p>
      </section>

      {/* Pets */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaDog className="mr-4 text-red-500" />Pets</h2>
        <p className="text-xl mb-6">Pets are not allowed in any Yogvan Apartments.</p>
      </section>

      {/* Admission Rights */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaIdCard className="mr-4 text-red-500" />Admission Rights</h2>
        <p className="text-xl mb-6">Yogvan reserves the rights of admission.</p>
      </section>

      {/* Belongings */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaIdCard className="mr-4 text-red-500" />Belongings</h2>
        <p className="text-xl mb-6">Guests are responsible for their belongings.</p>
      </section>

      {/* Parking */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaParking className="mr-4 text-red-500" />Parking</h2>
        <p className="text-xl mb-6">Parking facility is at guest’s own risk.</p>
      </section>

      {/* Damage */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaBan className="mr-4 text-red-500" />Damage</h2>
        <p className="text-xl mb-6">Any damage will be charged on the spot.</p>
      </section>

      {/* Identification */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaIdCard className="mr-4 text-red-500" />Identification</h2>
        <p className="text-xl mb-6">Valid identification is required during check-in.</p>
      </section>

      {/* Checkin / Checkout */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaClock className="mr-4 text-red-500" />Checkin / Checkout</h2>
        <p className="text-xl mb-6">Check-in time is strictly between 2PM-10PM on arrival date.</p>
      </section>

      {/* Payment */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaMoneyBill className="mr-4 text-red-500" />Payment</h2>
        <p className="text-xl mb-6">Payment details and policies.</p>
      </section>

      {/* Refund Policy */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaUndoAlt className="mr-4 text-red-500" />Refund Policy</h2>
        <p className="text-xl mb-6">Details about our refund policy.</p>
      </section>

      {/* Caretaker’s Special Right */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaUserSlash className="mr-4 text-red-500" />Caretaker’s Special Right</h2>
        <p className="text-xl mb-6">Details about caretaker's rights.</p>
      </section>

      {/* Cancellation Policy */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaUndoAlt className="mr-4 text-red-500" />Cancellation Policy</h2>
        <p className="text-xl mb-6">Details about our cancellation policy.</p>
      </section>

      {/* Extension Policy */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaUndoAlt className="mr-4 text-red-500" />Extension Policy</h2>
        <p className="text-xl mb-6">Details about our extension policy.</p>
      </section>

      {/* Quiet Hours */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4"><FaBed className="mr-4 text-red-500" />Quiet Hours</h2>
        <p className="text-xl mb-6">Details about our quiet hours schedule.</p>
      </section>

      {/* Contact */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
        <p className="text-xl mb-6">For any inquiries or assistance, please email us at <a href="mailto:yogvanholidays@gmail.com" className="text-blue-500"><FaExternalLinkAlt className="mr-2" />yogvanholidays@gmail.com</a>.</p>
      </section>
    </div>
  );
}

export default GuestPolicy;
