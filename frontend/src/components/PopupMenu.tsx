import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import SignOutButton from "./SignOutButton";

interface Props {
  isAdmin: boolean;
}

const PopupMenu = ({ isAdmin }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block portrait:mx-6">
      <button
        onClick={togglePopup}
        className="flex items-centerrounded-full text-3xl"
      >
        <FaUserCircle />
      </button>
      {isOpen && (
        <div className="absolute right-0 z-[999] mt-2 bg-white border border-gray-300 rounded-lg shadow-lg min-w-max">
          <ul className="divide-y divide-gray-200">
            {isAdmin && (
              <li>
                <Link to="/admin" className="block py-2 px-4 hover:bg-gray-100">
                  Admin
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/my-bookings"
                className="block py-2 px-4 hover:bg-gray-100"
              >
                My Bookings
              </Link>
            </li>
            <li>
              <SignOutButton />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PopupMenu;
