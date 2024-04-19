import { FaEnvelope, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-yogvan pt-2 flex flex-col items-center">
      {/* <div className="text-4xl text-white font-bold tracking-tight text-center mb-6">
        <Link to="/">YogvanHolidays.com</Link>
      </div> */}
      <div className="container mx-auto flex flex-col lg:items-center lg:flex-row lg:justify-between">
        {/* Contact information */}
        <div className="text-white font-bold tracking-tight mt-2  lg:text-left">
          <div className="flex flex-col  lg:items-start">
            <div className="flex  gap-2 mt-2">
              {/* <FaMapMarkerAlt />
              <p className="text-sm lg:text-base">
                Tapovan Rishikesh, Uttarakhand 249137 India.
              </p> */}
              <Link to="/blogs" className="mb-2 lg:mb-0">
                Blogs
              </Link>
            </div>
            <div className="flex gap-2 ">
              <Link to="/careers" className="mb-2 lg:mb-0">
                Careers
              </Link>
              {/* <FaPhone />
              <p className="text-sm lg:text-base">Phone No: +91 98115 11253</p> */}
            </div>
            <div className="flex gap-2 ">
              <Link to="/faq" className="mb-2 lg:mb-0">
                FAQs
              </Link>
              {/* <FaEnvelope />
              <p className="text-sm lg:text-base">
                mail: yogvanholidays@gmail.com
              </p> */}
            </div>
            <div className="flex gap-2 landscape:mb-2">
              <span className="flex text-center items-center gap-3 landscape:mb-2">
                <span>Our Socials </span>
                <span className="flex gap-2">
                  <a
                    href="https://www.youtube.com/channel/UCQ6pzqkZU1N_I4yxZKhQXnQ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube />
                  </a>
                  <a
                    href="https://www.instagram.com/yogvanholidayhome/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="mailto:yogvanholidays@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaEnvelope />
                  </a>
                </span>
              </span>
              {/* 
              <p className="text-sm lg:text-base">
                mail: yogvanholidays@gmail.com
              </p> */}
            </div>
          </div>
        </div>
        {/* Additional info */}
        <div className="text-white font-bold tracking-tight mt-2  lg:text-right lg:mt-0">
          <div className="flex flex-col  lg:items-end justify-center">
            <Link to="/terms-and-contions" className="mb-2 lg:mb-0">
              Terms of Use
            </Link>
            <Link to="/privacy-policy" className="mb-2 lg:mb-0">
              Privacy Policy
            </Link>
            <Link to="/guest-policy" className="mb-2 lg:mb-0">
              Guest Policies (House Rules)
            </Link>
            <Link to="/refund-policy" className="mb-2 lg:mb-0">
              Refund and Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
      {/* Bottom */}
      {/* <div className="bg-black w-full text-white text-center py-2 mt-3">
        <p className="text-xs lg:text-sm">
          © Yogvanholidays 2021. All Rights Reserved. Designed by BatLoop
        </p>
      </div> */}
    </div>
  );
};

export default Footer;
