import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-yogvan pt-10 flex flex-col items-center">
          <div className="text-4xl text-white font-bold tracking-tight text-left items-start flex container">
            <Link to="/">YogvanHolidays.com</Link>
          </div>
      <div className="container mx-auto flex justify-between items-center flex-col lg:flex-row">
        {/* Left div with contact information */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="text-white font-bold tracking-tight mt-2 flex flex-col items-start text-left">
            <div className="flex items-center gap-2">
              <p className="text-2xl">Contact Info:</p>
            </div>
            <div className="flex items-center gap-2 mt-2 lg:mt-0">
              <FaMapMarkerAlt />
              <p>Tapovan Kunj Complex, Rishikesh, Uttarakhand 249137 India.</p>
            </div>
            <div className="flex items-center gap-2 mt-2 lg:mt-0">
              <FaPhone />
              <p>Phone No: +91 98115 11253</p>
            </div>
            <div className="flex items-center gap-2 mt-2 lg:mt-0">
              <FaEnvelope />
              <p>mail: yogvanholidays@gmail.com</p>
            </div>
          </div>
        </div>
        
        {/* Right div with additional info */}
        <div className="text-white font-bold tracking-tight flex flex-col items-end justify-end  mt-4 lg:mt-0">
          <div className="flex flex-col items-end">
            <p className="cursor-pointer mr-4">Terms of Use</p>
            <p className="cursor-pointer mr-4">Privacy Policy</p>
            <p className="cursor-pointer mr-4">Guest Policies (House Rules)</p>
            <p className="cursor-pointer mr-4">Refund and Cancellation Policy</p>
          </div>
        </div>
      </div>
      <div className="bg-black w-full text-center mt-4">

          <p className="text-white">© Yogvanholidays 2021. All Rights Reserved. Designed by BatLoop</p>
      </div>
    </div>
  );
};

export default Footer;
