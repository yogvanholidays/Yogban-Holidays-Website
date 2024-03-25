import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import SignOutButton from "./SignOutButton";
import { RxHamburgerMenu } from "react-icons/rx";

interface Props {
  isAdmin: boolean;
}

const PopupMenu = ({ isAdmin }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.addEventListener("click", handleDocumentClick); // Add event listener on mount
    return () => {
      document.removeEventListener("click", handleDocumentClick); // Remove event listener on unmount
    };
  }, []);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const handleDocumentClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".popup-profile")) {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block portrait:mx-6 popup-profile">
      <button
        onClick={togglePopup}
        className="flex gap-2 items-center text-3xl border p-2 rounded-full"
      >
        <FaUserCircle />
        <div className="text-2xl">
          <RxHamburgerMenu />
        </div>
      </button>
      {isOpen && (
        <div className="absolute right-0 z-[999] mt-2 bg-white border border-gray-300 rounded-lg shadow-lg min-w-max">
          <ul className="divide-y divide-gray-200">
            {isAdmin && (
              <li
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <Link to="/admin" className="block py-2 px-4 hover:bg-gray-100">
                  Admin
                </Link>
              </li>
            )}
            <li
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <Link
                to="/my-bookings"
                className="block py-2 px-4 hover:bg-gray-100"
              >
                My Bookings
              </Link>
            </li>
            <li
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <SignOutButton />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PopupMenu;
