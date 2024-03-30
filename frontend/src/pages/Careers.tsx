import { BiBriefcase } from "react-icons/bi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Careers() {
  return (
    <div className="container mx-auto px-8 py-12">
      <Link to="/" className=" text-gray-500">
        Back
      </Link>

      <h1 className="text-5xl font-bold mb-10">Careers</h1>
      <p className="text-md mb-6 text-center">
        <h2 className=" text-2xl font-bold mb-3">Join the Dream</h2>
        At Yogvan Holidays, our passion is creating unforgettable experiences.
        From our inception, we've redefined hospitality, offering exceptional
        stays across stunning destinations. With a growing portfolio of
        properties, we craft unique experiences that exceed expectations. Our
        team is at the heart of it all, fostering a culture of teamwork,
        creativity, and excellence. Together, we deliver unparalleled service,
        creating lasting memories for our guests.
      </p>

      <div className="grid portrait:grid-cols-1 grid-cols-2 my-24">
        <div className=" flex flex-col justify-end">
          <span className="text-9xl">
            <BiBriefcase />
          </span>
          <h2 className="text-2xl font-bold">Why Join Us</h2>
          <span>Others might have ‘perks’. We offer a Yogvan experience.</span>
        </div>
        <ul className="list-disc list-inside">
          <li>
            <span className="font-bold">Life Beyond the Screen</span>
            <br />
            <span>
              Experience on-ground learning, employee discounts on villa stays,
              and referral bonuses.
            </span>
          </li>
          <li>
            <span className="font-bold">Benefits and Beyond</span>
            <br />
            <span>
              Have the opportunity to multitask, collaborate, and contribute
              across projects and teams.
            </span>
          </li>
          <li>
            <span className="font-bold">A Place to Connect</span>
            <br />
            <span>
              Experience on-ground learning, employee discounts on villa stays,
              and referral bonuses.
            </span>
          </li>
          <li>
            <span className="font-bold">Career Acceleration</span>
            <br />
            <span>
              We’ll work with you on driving your development and helping you
              hit your next milestone.
            </span>
          </li>
        </ul>
      </div>

      <p className="my-5 text-md">
        Please note that we currently do not have any career vacancies
        available. However, we're always on the lookout for exceptional talent.
        Mail us your details, and we'll be in touch when something opens up.          <a href="mailto:yogvanholidays@gmail.com" className="text-blue-500 flex items-center my-2">
            <FaExternalLinkAlt className="mr-2" />
            yogvanholidays@gmail.com
          </a>
      </p>

    </div>
  );
}

export default Careers;
