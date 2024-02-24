import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-yogvan pt-10 flex flex-col items-center">
      <div className="text-4xl text-white font-bold tracking-tight text-center mb-6">
        <Link to="/">YogvanHolidays.com</Link>
      </div>
      <div className="container mx-auto flex flex-col items-center lg:flex-row lg:justify-between">
        {/* Contact information */}
        <div className="text-white font-bold tracking-tight mt-2 text-center lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-2 mt-4">
              <FaMapMarkerAlt />
              <p className="text-sm lg:text-base">Tapovan Kunj Complex, Rishikesh, Uttarakhand 249137 India.</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <FaPhone />
              <p className="text-sm lg:text-base">Phone No: +91 98115 11253</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <FaEnvelope />
              <p className="text-sm lg:text-base">mail: yogvanholidays@gmail.com</p>
            </div>
          </div>
        </div>
        {/* Additional info */}
        <div className="text-white font-bold tracking-tight mt-4 text-center lg:text-right lg:mt-0">
          <div className="flex flex-col items-center lg:items-end">
            <Link to="/" className="mb-2 lg:mb-0">Terms of Use</Link>
            <Link to="/" className="mb-2 lg:mb-0">Privacy Policy</Link>
            <Link to="/" className="mb-2 lg:mb-0">Guest Policies (House Rules)</Link>
            <Link to="/" className="mb-2 lg:mb-0">Refund and Cancellation Policy</Link>
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className="bg-black w-full text-white text-center py-4">
        <p className="text-xs lg:text-sm">© Yogvanholidays 2021. All Rights Reserved. Designed by BatLoop</p>
      </div>
    </div>
  );
};

export default Footer;
