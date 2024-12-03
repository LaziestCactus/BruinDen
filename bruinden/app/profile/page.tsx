'use client';
import { useState, useCallback } from 'react';
import Image from 'next/image';

const ProfilePage = () => {
  // This should be the stuff the user initially set when signing up and display them instead of the temps I set it to
  const [firstName, setFirstName] = useState('TEMP');
  const [lastName, setLastName] = useState('TEMP');
  const [universityId, setUniversityId] = useState('1234567890');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [collegeYear, setCollegeYear] = useState('Freshman');
  const [gender, setGender] = useState('Male');
  const [idError, setIdError] = useState('');

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }, []);

  const handleUniversityIdChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setUniversityId(value);
      setIdError('');
    } else {
      setIdError('University ID must be a number');
    }
  }, []);

  const handleSave = useCallback(() => {
    // Should save the updated info to the database
  }, [firstName, lastName, universityId, collegeYear, gender]);

  const handleCancel = useCallback(() => {
    // Handle cancel action
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 style={{ fontSize: "50px", marginTop: "100px", marginBottom: "20px", display: "flex", alignItems: "center", fontWeight: "bold", justifyContent: "center", textAlign: "center", color: "#2F4858"}}>Profile Information</h1>
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
              onClick={handleCancel}
              className="py-2 px-6 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
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
