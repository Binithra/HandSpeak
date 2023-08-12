import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../assets/img/index";
import { useStateValue } from "../context/StateProvider";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { motion } from "framer-motion";

const Header = () => {
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setisMenu] = useState(false);

  const navigate = useNavigate();

  const isNotActiveStyles = `p-2 px-6 text-gray-500 text-lg rounded-full hover:text-headingColor duration-100 transition-all hover:bg-teal-400 `;
  const isActiveStyles = `p-2 px-6 text-gray-500 text-headingColor rounded-full bg-slate-300 text-lg font-bold`;

  const logOut=()=>{ 
    const firebaseAuth=getAuth(app);
    firebaseAuth.signOut().then(()=>{
      window.localStorage.setItem("auth","false");

    }).catch((e) => console.log(e));
    navigate("/login",{replace:true})
  }

  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6 bg-white">
      <NavLink to={"/"}>
        <img src={Logo} alt="Logo" className="w-16" />
      </NavLink>

      <ul className="flex items-center justify-center ml-7">
        <li className="mx-5 text-lg">
          <NavLink
            to={"/home"}
            className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }
          >
            Home
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/SignPractice"}
            className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }
          >
            Sign Practice
          </NavLink>
        </li>

        <li className="mx-5 text-lg">
          <NavLink
            to={"/Videos"}
            className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }
          >
            Videos
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/Quiz"}
            className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }
          >
            Quiz
          </NavLink>
        </li>

        <li className="mx-5 text-lg">
          <NavLink
            to={"/Progress"}
            className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles }
          >
            My Progress
          </NavLink>
        </li>
      </ul>

      <div
        onMouseEnter={() => setisMenu(true)}
        onMouseLeave={() => setisMenu(false)}
        className="flex items-center ml-auto cursor-pointer gap-2 relative"
      >
      <img src={user?.user?.imageURL} className="w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg" alt="" referrerPolicy="no-refferer"/>
        <div className="flex flex-col">
          <p className="text-textColor text-lg hover:text-headingColor font-semibold">{user?.user?.name}</p>        
          <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">{user?.user.role}
          </p>
        </div>

        {isMenu && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 flex flex-col p-3 top-12 right-0 w-275 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm "
          >
            <NavLink to={"/userProfile"}>
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
                Profile
              </p>
            </NavLink>
            <NavLink to={"/support"}>
            <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
              Support
            </p>
            </NavLink>

            <hr />
            {user?.user?.role === "Admin" && (
              <>
                <NavLink to={"/dashboard/home"}>
                  <p className="text-base text-textColor py-2 hover:font-semibold duration-150 transition-all ease-in-out">
                    Dashboard
                  </p>
                  <hr />
                </NavLink>
              </>
              
            )}

            
            <p
              className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out"
              onClick={logOut}
            >
              Sign Out
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
