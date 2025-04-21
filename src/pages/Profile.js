import React, { useState } from 'react';
import AchievementStatus from './AchievementStatus';

const Profile = () => {
  const [showAchievements, setShowAchievements] = useState(false);

  const handleBack = () => {
    console.log('Back button clicked in Profile'); // Debugging log
    setShowAchievements(false); // Hide the AchievementStatus component
  };

  return (
    <div className="p-4">
      {/* Profile details above */}
      <div className="text-center mt-4">
        <button
          onClick={() => {
            console.log('Achievements button clicked'); // Debugging log
            setShowAchievements(true);
          }}
          className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600"
        >
          Achievements
        </button>
      </div>

      {/* Pass the onBack prop to AchievementStatus */}
      {showAchievements && <AchievementStatus onBack={handleBack} />}
    </div>
  );
};

export default Profile;