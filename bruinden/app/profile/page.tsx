"use client";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import UserId from "@/pages/api/user/[userId]";
//import { getSession } from "next-auth/react";

interface User {
  id: string;
  email: string;
  token?: string;
  name?: string;
  uid?: string;
  collegeYear?: string;
  gender?: string;
}

const ProfilePage = () => {
  // This should be the stuff the user initially set when signing up and display them instead of the temps I set it to

  const [currentUser, setCurrentUser] = useState<User | null>(null); // Assume this gets populated from a token or API
  const [firstName, setFirstName] = useState<string>(""); // Start with empty string
  const [lastName, setLastName] = useState<string>(""); // Start with empty string
  const [universityId, setUniversityId] = useState(currentUser?.uid);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [collegeYear, setCollegeYear] = useState(currentUser?.collegeYear);
  const [gender, setGender] = useState(currentUser?.gender);
  const [idError, setIdError] = useState("");

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

  const email = currentUser?.email;
  const fetchUser = async (email: string) => {
    try {
      const response = await fetch(
        `/api/auth/getUserByEmail?email=${encodeURIComponent(email)}`
      );
      if (!response.ok) {
        throw new Error("Fail to fetch user from email");
      }
      const data = await response.json();
      setCurrentUser(data.user); // Adjust based on your API response structure
    } catch (error) {
      console.error("Can't fetch user:", error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchUser(email);
    }
  }, [email]);

  useEffect(() => {
    if (currentUser?.name) {
      const [first, last] = currentUser.name.split(" ");
      setFirstName(first);
      setLastName(last || "");
    }
  }, [currentUser]);

  // if (currentUser?.name) {
  //   const [first, last] = currentUser.name.split(" ");

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfileImage(e.target?.result as string);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    },
    []
  );

  const handleUniversityIdChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (/^\d*$/.test(value)) {
        setUniversityId(value);
        setIdError("");
      } else {
        setIdError("University ID must be a number");
      }
    },
    []
  );

  const userId = currentUser?.id;
  const name = firstName + " " + lastName;

  const handleSave = useCallback(async () => {
    try {
      const updatedUser = {
        name,
        collegeYear,
        gender,
      };

      const response = await fetch(`/api/auth/updateUser?id=${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const data = await response.json();
      console.log("User updated successfully:", data);
    } catch (error) {
      console.error("Error saving user info:", error);
    }
  }, [firstName, lastName, collegeYear, gender, userId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1
        style={{
          fontSize: "50px",
          marginTop: "100px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
          justifyContent: "center",
          textAlign: "center",
          color: "#2F4858",
        }}
      >
        Profile Information
      </h1>
      <hr style={{ border: "3px solid #2F4858", marginBottom: "20px" }} />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
          <div className="w-48 h-48 mb-4 rounded-full overflow-hidden border-4 border-gray-300 relative">
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Profile"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                No Image
              </div>
            )}
          </div>
          <label className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md text-center cursor-pointer hover:bg-gray-300">
            Upload Profile Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
        <div className="md:w-2/3 space-y-4 bg-white p-6 rounded-lg shadow-md">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full py-2 px-4 border border-gray-300 rounded-md"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full py-2 px-4 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">University ID</label>
            <input
              type="text"
              value={universityId}
              onChange={handleUniversityIdChange}
              className="w-full py-2 px-4 border border-gray-300 rounded-md"
            />
            {idError && <p className="text-red-500 text-sm mt-1">{idError}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-2">College Year</label>
            <select
              value={collegeYear}
              onChange={(e) => setCollegeYear(e.target.value)}
              className="w-full py-2 px-4 border border-gray-300 rounded-md"
            >
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
              <option value="Grad Student">Grad Student</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full py-2 px-4 border border-gray-300 rounded-md"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={handleSave}
              className="py-2 px-6 text-white rounded-md bg-[#86bbd8] hover:bg-[#86bbd8]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
