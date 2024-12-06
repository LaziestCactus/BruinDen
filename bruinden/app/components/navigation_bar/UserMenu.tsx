"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState, useEffect, useCallback } from "react";
import MenuItem from "./MenuItem";
import LoginPage from "../../../pages/auth/LoginPage";
import SignUpPage from "../../../pages/auth/SignUpPage";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
//import getCurrentUser from "@/app/action/getCurrUser";
// interface curUser {
//   currentUser?: User | null;
// }

interface User {
  id: string;
  email: string;
  token?: string;
}

const UserMenu = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserFromToken = () => {
      const token = Cookies.get("auth_token");
      console.log("token: ", token);
      if (token) {
        try {
          const decodedToken = jwt.decode(token) as User;
          console.log("decoded token: ", decodedToken);
          setCurrentUser(decodedToken);
        } catch (error) {
          console.log("Failed to decode token", error);
        }
      }
    };

    fetchUserFromToken();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleLoginClick = useCallback(() => {
    setIsOpen(false);
    setShowLogin(true);
  }, []);

  const handleSignUpClick = useCallback(() => {
    setIsOpen(false);
    setShowSignUp(true);
  }, []);

  const handleBackClick = useCallback(() => {
    setShowLogin(false);
    setShowSignUp(false);
  }, []);

  const handleCreateListingClick = useCallback(() => {
    setIsOpen(false);
    router.push("/create_listing");
  }, [router]);

  const handleLogOut = useCallback(() => {
    setCurrentUser(null);
    Cookies.remove("auth_token");
    window.location.reload();
  }, []);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={toggleOpen}
          className="p-4 md:py-3 md:px-2 border-[2px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition relative"
        >
          <AiOutlineMenu size={30} />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="absolute rounded-xl shadow-md w-[40vw] md:w-[200px] overflow-hidden right-0 top-12 text-sm"
          style={{ backgroundColor: "#2F4858" }}
        >
          <div className="flex flex-col cursor-pointer py-2">
            {currentUser ? ( //TODO: Check if user exist instead. Need to debug (code commented above)
              <>
                {/*fetch Render if currentUser is not null */}
                <MenuItem
                  onClick={() => {}}
                  label="Profile"
                  reference="/profile"
                />
                <MenuItem
                  onClick={() => {}}
                  label="Favorites"
                  reference="/favorites"
                />
                <MenuItem
                  onClick={() => {}}
                  label="Create a Listing"
                  reference="/create_listing"
                />
                <MenuItem
                  onClick={handleLogOut}
                  label="Log Out"
                  reference="/"
                />
              </>
            ) : (
              <>
                {/* Render if currentUser is null */}
                <MenuItem
                  onClick={handleLoginClick}
                  label="Log In"
                  reference="#"
                />
                <MenuItem
                  onClick={handleSignUpClick}
                  label="Sign Up"
                  reference="#"
                />
              </>
            )}
          </div>
        </div>
      )}
      {showLogin && <LoginPage onBack={handleBackClick} />}
      {showSignUp && <SignUpPage onBack={handleBackClick} />}
    </div>
  );
};

export default UserMenu;
