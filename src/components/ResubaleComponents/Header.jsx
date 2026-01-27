import React from "react";
import {
  infoIcon,
  avatar,
  notificationIcon,
  downIcon,
  dotsIcon,
  bookmarkIcon,
} from "../../images";
const Header = () => {
  const navIcons = [bookmarkIcon, notificationIcon, infoIcon];
  return (
    <nav className="p-4 bg-[#231f1f] flex justify-between items-center">
      <img src={dotsIcon} alt="dots" className="w-8 h-8 cursor-pointer" />
      <div className="flex gap-4">
        <div className="flex justify-center gap-2 border-r border-[#E2E2E2] pr-4">
          {navIcons.map((icon, index) => (
            <div
              key={index}
              className="p-2 rounded-full border-2 border-[#FFFFFF21] hover:border-[#FFFFFF75]"
            >
              <img src={icon} alt="icon" className="w-4 h-4 cursor-pointer" />
            </div>
          ))}
        </div>
        <div className="flex items-center cursor-pointer">
          <h1 className="text-[#FCFCFD] font-normal">Help</h1>
          <img src={downIcon} alt="down" className="w-4 h-4 ml-1 " />
        </div>
        <img
          src={avatar}
          alt="avatar"
          className="w-8 h-8 rounded-full cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default Header;
