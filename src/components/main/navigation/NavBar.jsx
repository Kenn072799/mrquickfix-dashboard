import React from "react";
import Profile from "../../../assets/profile.png";
import { IoNotificationsOutline, IoNotificationsSharp } from "react-icons/io5";
import useToggle from "../../hooks/function/useToggle";
import useCurrentTime from "../../hooks/function/useCurrentTime";
import { Link } from "react-router-dom";
import { useNotifications } from "../../hooks/useDataHooks";

const NavBar = () => {
  const { notifications, markAsRead, visibleCount, loadMore } = useNotifications();
  const notificationToggle = useToggle();
  const dropdownToggle = useToggle();
  const { timeAgo } = useCurrentTime();

  const toggleNotification = () => {
    if (dropdownToggle.isActive) {
      dropdownToggle.close();
    }
    notificationToggle.toggle();
  };

  const toggleDropdown = () => {
    if (notificationToggle.isActive) {
      notificationToggle.close();
    }
    dropdownToggle.toggle();
  };

  return (
    <section className="h-20 border-b bg-white">
      <nav className="flex h-full w-full items-center justify-end space-x-4 px-4">
        {/* Notification Icon */}
        <div
          className="relative cursor-pointer border-r-2 pr-6"
          onClick={toggleNotification}
        >
          {notifications.some((notification) => notification.isNew) && (
            <span className="absolute -top-2 left-3 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs text-white">
              {
                notifications.filter((notification) => notification.isNew)
                  .length
              }
            </span>
          )}
          {notificationToggle.isActive ? (
            <IoNotificationsSharp size={24} />
          ) : (
            <IoNotificationsOutline size={24} />
          )}
        </div>

        {/* Notification Dropdown */}
        {notificationToggle.isActive && (
          <div className="absolute right-4 top-16 z-10 w-64 rounded-lg border bg-white shadow-lg">
            <ul className="max-h-64 overflow-y-auto p-2">
              {notifications.length > 0 ? (
                notifications.slice(0, visibleCount).map((notification) => (
                  <Link to="/projects">
                    <li
                      key={notification.id}
                      className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                        notification.isNew ? "bg-gray-200" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="text-sm font-medium">
                        {notification.firstName} {notification.lastName}
                      </div>
                      <div className="text-xs text-gray-400">
                        {timeAgo(notification.date)}
                      </div>
                    </li>
                  </Link>
                ))
              ) : (
                <li className="px-4 py-2 text-center text-gray-500">
                  No Notifications
                </li>
              )}
            </ul>

            {/* See More Button */}
            {visibleCount < notifications.length && (
              <div className="flex justify-center">
                <button
                  onClick={loadMore}
                  className="my-2 rounded bg-blue-500 px-4 py-1 text-white hover:bg-blue-600"
                >
                  See More
                </button>
              </div>
            )}
          </div>
        )}

        {/* Admin Image and Name */}
        <div className="relative flex" onClick={toggleDropdown}>
          <img
            src={Profile}
            alt="Admin"
            className="h-12 w-12 cursor-pointer rounded-full"
          />
          <div className="hidden flex-col items-center pl-4 hover:text-primary-500 hover:underline sm:flex">
            <p className="cursor-pointer">Kenneth Altes</p>
            <p className="cursor-pointer">Admin</p>
          </div>

          {/* Admin Dropdown */}
          {dropdownToggle.isActive && (
            <div className="absolute right-0 top-16 z-10 w-48 rounded-lg border bg-white shadow-lg">
              <ul className="p-2">
                <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                  My Profile
                </li>
                <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </section>
  );
};

export default NavBar;
