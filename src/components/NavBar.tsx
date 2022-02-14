import React, { useEffect, useState } from "react";
import { ReactComponent as CartIcon } from "../assets/svg/cart.svg";
import { ReactComponent as BeerIcon } from "../assets/svg/beer.svg";
import { NavLink, useParams } from "react-router-dom";

type NavbarLinkProps = {
  to: string;
  label: string;
  Icon: React.FC;
};

/**
 * This component is the navbar of the website with different links to the page
 * @constructor
 */
const NavBar: React.FC = () => {
  const location = window.location.pathname;

  const [activeLink, setActiveLink] = useState<number>(
    location.includes("beers") ? 0 : location.includes("cart") ? 1 : 0
  );

  /**
   * This object contains all the links to different pages of the website
   */
  const navbarLinks: NavbarLinkProps[] = [
    {
      to: "/beers",
      label: "Beers",
      Icon: () => <BeerIcon />,
    },
    {
      to: "/cart",
      label: "Cart",
      Icon: () => <CartIcon />,
    },
  ];

  return (
    <div className="mx-auto">
      <div className="xl:w-full xl:mx-0 h-12 shadow rounded flex justify-between items-center px-4 w-full">
        <NavLink to={"/"}>My beer shop</NavLink>
        <ul className="flex align-center border-b">
          {navbarLinks.map((link, index) => {
            const isActive = activeLink === index;
            return (
              <li
                className={`text-sm pt-3 mr-12 hover:text-indigo-700
                                ${
                                  isActive
                                    ? "text-indigo-700"
                                    : "text-gray-600 flex items-center cursor-pointer"
                                }`}
                key={`navlink-${index}`}
                onClick={() => setActiveLink(index)}
              >
                <NavLink to={link.to} className="flex items-center pb-3">
                  <link.Icon />
                  <span
                    className={`${
                      isActive ? "text-indigo-700" : ""
                    } ml-1 font-normal`}
                  >
                    {link.label}
                  </span>
                </NavLink>
                {isActive ? (
                  <div className="w-full h-1 bg-indigo-700 rounded-t-md" />
                ) : (
                  <div className="w-full h-1 bg-indigo-600" />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
