"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import Cookies from 'js-cookie';
import {useRouter} from "next/navigation";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter()

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const token = result.user.getIdToken();
        Cookies.set('Token', token);
        router.push("/")
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
      });
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        Cookies.remove('Token');
        router.push("/sign-up")
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
