// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { Logo } from "../assets/img/index";
// import { motion } from "framer-motion";

// const Welcomeheader = () => {
//   return (
//     <header className="flex items-center w-full p-4 md:py-2 md:px-6 bg-white">
//       <NavLink to={"/Login"}>
//         <img src={Logo} alt="Logo" className="w-16" />
//       </NavLink>

//       <div
//         onMouseEnter={() => setisMenu(true)}
//         onMouseLeave={() => setisMenu(false)}
//         className="flex items-center ml-auto cursor-pointer gap-2 relative"
//       >
//         <img
//           src={user?.user?.imageURL}
//           className="w-12 h-12 min-w-[44px] object-cover rounded-full shadow-lg"
//           alt=""
//           referrerPolicy="no-refferer"
//         />
//         <div className="flex flex-col">
//           <p className="text-textColor text-lg hover:text-headingColor font-semibold">
//             {user?.user?.name}
//           </p>
//           <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">
//             {user?.user.role}
//           </p>
//         </div>

//         {isMenu && (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 50 }}
//             className="absolute z-10 flex flex-col p-3 top-12 right-0 w-275 gap-2 bg-card shadow-lg rounded-lg backdrop-blur-sm "
//           >
//             <NavLink to={"/UserProfile"}>
//               <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
//                 Profile
//               </p>
//             </NavLink>
//             <NavLink to={"/support"}>
//               <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out">
//                 Support
//               </p>
//             </NavLink>

//             <hr />
//             {user?.user?.role === "Admin" && (
//               <>
//                 <NavLink to={"/dashboard/home"}>
//                   <p className="text-base text-textColor py-2 hover:font-semibold duration-150 transition-all ease-in-out">
//                     Dashboard
//                   </p>
//                   <hr />
//                 </NavLink>
//               </>
//             )}
//             <NavLink to={"/Welcome"}>
//               <p className="text-base text-textColor py-2 hover:font-semibold duration-150 transition-all ease-in-out">
//                 WelcomeScreen
//               </p>
//               <hr />
//             </NavLink>

//             <p
//               className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out"
//               onClick={logOut}
//             >
//               Sign Out
//             </p>
//           </motion.div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Welcomeheader;
