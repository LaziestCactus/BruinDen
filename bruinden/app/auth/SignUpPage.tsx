'use client';
import { useState, useCallback } from 'react';
import { FcGoogle } from 'react-icons/fc'; // Google icon

// Define the prop types for the component
interface SignUpPageProps {
  onBack: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onBack }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [universityId, setUniversityId] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [collegeYear, setCollegeYear] = useState('');
  const [gender, setGender] = useState('');
  const [idError, setIdError] = useState('');

  const handleSignUp = useCallback(() => {
  }, [firstName, lastName, universityId, profileImage, collegeYear, gender]);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfileImage(event.target.files[0]);
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90vw] md:w-[600px]" style={{ color: '#2F4858' }}>
        <h3 className="text-2xl font-bold mb-4 text-left">Sign Up with an Email:</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-1/2 py-2 px-4 border border-gray-300 rounded-md text-sm"
            style={{ color: '#2F4858', fontSize: '0.875rem' }}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-1/2 py-2 px-4 border border-gray-300 rounded-md text-sm"
            style={{ color: '#2F4858', fontSize: '0.875rem' }}
          />
        </div>
        <input
          type="text"
          placeholder="University ID#"
          value={universityId}
          onChange={handleUniversityIdChange}
          className="w-full mb-2 py-2 px-4 border border-gray-300 rounded-md text-sm"
          style={{ color: '#2F4858', fontSize: '0.875rem' }}
        />
        {idError && <p className="text-red-500 text-sm mb-2">{idError}</p>}
        <label className="w-full mb-2 py-2 px-4 border text-white border-gray-300 rounded-md text-sm flex items-center justify-center cursor-pointer bg-gray-300 text-black hover:bg-gray-400">
          Add a Profile Picture
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        <select
          value={collegeYear}
          onChange={(e) => setCollegeYear(e.target.value)}
          className="w-full mb-2 py-2 px-4 border border-gray-300 rounded-md text-sm"
          style={{ color: '#2F4858', fontSize: '0.875rem' }}
        >
          <option value="" disabled>Select College Year</option>
          <option value="Freshman">Freshman</option>
          <option value="Sophomore">Sophomore</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
          <option value="Grad Student">Grad Student</option>
          <option value="PhD">PhD</option>
        </select>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full mb-4 py-2 px-4 border border-gray-300 rounded-md text-sm"
          style={{ color: '#2F4858', fontSize: '0.875rem' }}
        >
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Other">Other</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onBack}
            className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-300 hover:bg-gray-400"
          >
            Back
          </button>
          <button
            onClick={handleSignUp}
            className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#86bbd8] hover:bg-[#86bbd8]"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
