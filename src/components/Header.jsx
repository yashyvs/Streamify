import React, { useState } from "react";
import ytLogo from "../assets/images/yt-logo.png";
import ytLogoMobile from "../assets/images/yt-logo-mobile.png";

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleMoblieMenu } from "../utils/mobileMenuSlice";
import { useEffect } from "react";
import { SEARCH_SUGGESTIONS_API } from "../utils/api";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const mobileMenu = useSelector((store) => store.mobileMenu.mobileMenu);
  const navigate = useNavigate();
  const searchQueryHandler = (event) => {
    if (event?.key === "Enter" && searchQuery?.length > 0) {
      navigate(`/searchReasult/${searchQuery}`);
      setShowSuggestions(false);
    }
  };

  const suggestionViewHandler = (event) => {
    if (event?.key === "Enter") {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => getSuggestions(searchQuery), 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSuggestions = async (searchQuery) => {
    const data = await fetch(SEARCH_SUGGESTIONS_API + searchQuery);
    const json = await data.json();
    setSearchSuggestions(json[1]);
  };

  const { pathname } = useLocation();
  const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

  const handleToggle = () => {
    dispatch(toggleMoblieMenu());
  };

  return (
    <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-black dark:bg-black">
      <div className="flex h-5 items-center">
        {pageName !== "video" && (
          <div
            className="flex md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
            onClick={handleToggle}
          >
            {mobileMenu ? (
              <CgClose className="text-white text-xl " />
            ) : (
              <SlMenu className="text-white text-xl" />
            )}
          </div>
        )}

        <Link to="/" className="flex h-5 items-center">
          <img className="h-full dark:md:block " src={ytLogo} alt="streamify" />
        </Link>
      </div>
      <div onFocus={() => setShowSuggestions(true)}>
        <div className="group flex items-center">
          <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
            <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
              <IoIosSearch className="text-white text-xl" />
            </div>
            <input
              type="text"
              className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px] "
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              value={searchQuery}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setShowSuggestions(false)}
            />
          </div>
          <button
            className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border
            border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]  "
            onClick={() => {
              searchQueryHandler("searchButton");
            }}
          >
            <IoIosSearch className="text-white text-xl" />
          </button>
        </div>

        {showSuggestions && (
          <div
            id="suggestionElement"
            className=" mt-1 pl-5 w-[216px] md:ml-10 md:w-[336px] lg:w-[580px]    bg-black/[0.9] text-white rounded-xl fixed"
          >
            {!searchSuggestions
              ? null
              : searchSuggestions.map((suggestion) => {
                  return (
                    <p
                      className="hover:bg-gray-900 cursor-pointer"
                      id={suggestion}
                      onMouseDown={(event) => {
                        searchSuggestionHandler(event);
                        setSearchQuery(suggestion);
                        setSearchSuggestions("");
                        setShowSuggestions(false);
                      }}
                    >
                      {suggestion}
                    </p>
                  );
                })}
          </div>
        )}
      </div>
      <div className="flex  items-center">
        <div className="flex">
          <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQavCDvlRFf6Y1gcbHAoYvLDWSjR6GFpI1sYErd3F8&s" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
