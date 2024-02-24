import { FaRegEnvelope, FaRegHandshake } from "react-icons/fa";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-8 py-12">
                <Link to='/' className=" text-gray-500">Back</Link>

      <h1 className="text-5xl font-bold mb-10">Privacy Policy</h1>

      {/* Use Of Your Information */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Use Of Your Information</h2>
        <p className="text-xl mb-6">
          At Yogvan Holiday Apartments, we collect information to ensure the safety of our guests and staff, as well as to provide tailored services and communication regarding our products. We may collect data for statistical analysis purposes, including nationality, date of birth, and gender. Additionally, we may log your IP address when you visit our website for analytical purposes.
        </p>
        <p className="text-xl mb-6">
          For reservations and inquiries, we may require personal information such as your name, contact details, and credit card information. This information is used solely for reservation purposes and is kept confidential.
        </p>
        <div className="flex items-center text-xl">
          <FaRegHandshake className="mr-4 text-4xl text-blue-500" />
          <span>Rest assured, your privacy is important to us!</span>
        </div>
      </section>

      {/* Reservation Data */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Reservation Data</h2>
        <p className="text-xl mb-6">
          In order to confirm reservations, we may require the following information:
        </p>
        <ul className="list-disc ml-8 text-xl mb-6">
          <li>Your name, date of birth, and nationality</li>
          <li>Contact details such as telephone or mobile number and email address</li>
          <li>Date of arrival and departure</li>
          <li>Identification details like Passport or Driving License number</li>
          <li>Credit card details for booking guarantee</li>
        </ul>
        <p className="text-xl mb-6">
          We also require the same information from fellow travelers to ensure a smooth check-in process.
        </p>
      </section>

      {/* Credit Card Data */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Credit Card Data</h2>
        <p className="text-xl mb-6">
          Your debit/credit card details are securely stored and only used for reservation purposes. We accept VISA, MasterCard, and Maestro cards.
        </p>
      </section>

      {/* Keeping Guests’ Information Updated */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Keeping Guests’ Information Updated</h2>
        <p className="text-xl mb-6">
          Guests are responsible for informing us of any updates to their personal information. We value accuracy and strive to maintain up-to-date records.
        </p>
      </section>

      {/* Website Security */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Website Security</h2>
        <p className="text-xl mb-6">
          While we implement security measures such as firewalls, please note that the internet is not entirely secure.
        </p>
      </section>

      {/* Third Party Websites */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Third Party Websites</h2>
        <p className="text-xl mb-6">
          Yogvan Holiday Apartments is not responsible for the privacy policies of third-party websites. Please refer to their policies for more information.
        </p>
      </section>

      {/* Photo And Video */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Photo And Video</h2>
        <p className="text-xl mb-6">
          Prior permission is required for photography or filming at our apartments.
        </p>
      </section>

      {/* Disclosing Guest’s Personal Information To Third Parties */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Disclosing Guest’s Personal Information To Third Parties</h2>
        <p className="text-xl mb-6">
          We prioritize guest privacy and will not disclose personal information without consent unless legally required to do so.
        </p>
      </section>

      {/* Your Rights */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Your Rights</h2>
        <p className="text-xl mb-6">
          By submitting your information to us, you consent to the use of that information as outlined in this Privacy Policy. You have the right to request access to and modification or deletion of your personal information.
        </p>
      </section>

      {/* Contact Information */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
        <p className="text-xl mb-6">
          For any questions or requests regarding your personal information, please contact us at <a href="mailto:yogvanholidays@gmail.com" className="text-blue-500 hover:underline">yogvanholidays@gmail.com</a>.
        </p>
        <div className="flex items-center text-xl">
          <FaRegEnvelope className="mr-4 text-4xl text-blue-500" />
          <span>We're here to assist you!</span>
        </div>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
