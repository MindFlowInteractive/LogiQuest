// import { useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged, User } from "firebase/auth";

// const useAuth = () => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return user;
// };

// export default useAuth;