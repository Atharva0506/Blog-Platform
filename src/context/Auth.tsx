"use client"
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/config";
import { setCookie, removeCookie } from "@/utils/cookie"; // Import cookie utility functions
import jwt from "jsonwebtoken";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    const user = result.user;

    const token = jwt.sign({ email: user.email }, "your-secret-key");
    setCookie("authToken", token, { expires: 7 }); // Set cookie to expire in 7 
    console.log("Google sign-in successful!");
  } catch (error) {
    console.error("Error logging in with Google:", error.message);
  }
};

  const logOut = () => {
    signOut(auth);
    removeCookie("authToken"); // Remove the auth token from cookies on logout
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loginWithEmail, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
