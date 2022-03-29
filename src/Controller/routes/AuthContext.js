// import React, { useEffect, useState } from "react";
// // db, google
// import { auth } from "../../Model/setup/firebase";

// export const AuthContext = React.createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState("user");
//   const [pending, setPending] = useState(true);

//   // useEffect(() => {
//   //   auth.onAuthStateChanged((user) => {
//   //     setCurrentUser(user);
//   //     setPending(false);
//   //   });
//   // }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         currentUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
