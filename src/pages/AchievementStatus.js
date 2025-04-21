import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const AchievementStatus = ({ onBack }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('education');
    const [isEditing, setIsEditing] = useState(false);

    if (typeof onBack !== 'function') {
        console.error('onBack prop is not a function'); // Debugging log
    }

    const [educationalData, setEducationalData] = useState([
        {
            level: 'College',
            school: 'UIC, Davao City',
            period: '2019 - 2023',
            degree: 'BS in Computer Science',
        },
        {
            level: 'High School',
            school: 'Davao City National High School',
            period: '2013 - 2019',
            degree: 'High School Diploma',
        }
    ]);

    const [workExperienceData, setWorkExperienceData] = useState([
        {
            employer: 'University of the Immaculate Conception',
            address: 'Fr. Selga Street, Davao City',
            position: 'College Faculty',
            period: '2012 - present',
        }
    ]);
    
    const [userInfo] = useState({
        fullName: 'John Doe',
        schoolID: '123456',
        gender: 'Male',
        religion: 'Christianity',
        dateOfBirth: '1995-05-15',
        placeOfBirth: 'Davao City',
        mailingAddress: '123 Main St, Davao City',
    }); 


    const handleEducationChange = (index, field, value) => {
        const updated = [...educationalData];
        updated[index][field] = value;
        setEducationalData(updated);
    };

    const handleWorkChange = (index, field, value) => {
        const updated = [...workExperienceData];
        updated[index][field] = value;
        setWorkExperienceData(updated);
    };

    const [editableUserInfo, setEditableUserInfo] = useState(userInfo);

const handleUserInfoChange = (field, value) => {
    setEditableUserInfo({ ...editableUserInfo, [field]: value });
};

    const renderTabContent = () => {
        switch (activeTab) {
            case 'education':
                return (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border text-sm text-left">
                            <thead className="bg-pink-500 text-white">
                                <tr>
                                    <th className="px-4 py-2">Educational Level</th>
                                    <th className="px-4 py-2">School Graduated / Address</th>
                                    <th className="px-4 py-2">Period Covered</th>
                                    <th className="px-4 py-2">Degree Obtained</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {educationalData.map((entry, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="px-4 py-2">
                                            {isEditing ? (
                                                <input
                                                    value={entry.level}
                                                    onChange={(e) => handleEducationChange(index, 'level', e.target.value)}
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                            ) : entry.level}
                                        </td>
                                        <td className="px-4 py-2">
                                            {isEditing ? (
                                                <input
                                                    value={entry.school}
                                                    onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                            ) : entry.school}
                                        </td>
                                        <td className="px-4 py-2">
                                            {isEditing ? (
                                                <input
                                                    value={entry.period}
                                                    onChange={(e) => handleEducationChange(index, 'period', e.target.value)}
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                            ) : entry.period}
                                        </td>
                                        <td className="px-4 py-2">
                                            {isEditing ? (
                                                <input
                                                    value={entry.degree}
                                                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                            ) : entry.degree}
                                        </td>
                                        <td className="px-4 py-2 text-red-500 hover:text-red-700 cursor-pointer">
                                            <Trash2 size={18} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
                // ...existing code...
case 'personal':
    return (
        <div className="details-section mt-4">
            <div className="detail-item">
                <label className="font-bold text-gray-700">Full Name</label>
                <input
                    type="text"
                    value={editableUserInfo.fullName}
                    readOnly={!isEditing}
                    onChange={(e) => handleUserInfoChange('fullName', e.target.value)}
                    className={`border rounded px-3 py-2 w-full ${isEditing ? '' : 'bg-gray-100'}`}
                />
            </div>
            <div className="detail-item mt-4">
                <label className="font-bold text-gray-700">School ID</label>
                <input
                    type="text"
                    value={editableUserInfo.schoolID}
                    readOnly={!isEditing}
                    onChange={(e) => handleUserInfoChange('schoolID', e.target.value)}
                    className={`border rounded px-3 py-2 w-full ${isEditing ? '' : 'bg-gray-100'}`}
                />
            </div>
            <div className="detail-item mt-4">
                <label className="font-bold text-gray-700">Gender</label>
                <input
                    type="text"
                    value={editableUserInfo.gender}
                    readOnly={!isEditing}
                    onChange={(e) => handleUserInfoChange('gender', e.target.value)}
                    className={`border rounded px-3 py-2 w-full ${isEditing ? '' : 'bg-gray-100'}`}
                />
            </div>
            <div className="detail-item mt-4">
                <label className="font-bold text-gray-700">Religion</label>
                <input
                    type="text"
                    value={editableUserInfo.religion}
                    readOnly={!isEditing}
                    onChange={(e) => handleUserInfoChange('religion', e.target.value)}
                    className={`border rounded px-3 py-2 w-full ${isEditing ? '' : 'bg-gray-100'}`}
                />
            </div>
            <div className="detail-item mt-4">
                <label className="font-bold text-gray-700">Date of Birth</label>
                <input
                    type="text"
                    value={editableUserInfo.dateOfBirth}
                    readOnly={!isEditing}
                    onChange={(e) => handleUserInfoChange('dateOfBirth', e.target.value)}
                    className={`border rounded px-3 py-2 w-full ${isEditing ? '' : 'bg-gray-100'}`}
                />
            </div>
            <div className="detail-item mt-4">
                <label className="font-bold text-gray-700">Place of Birth</label>
                <input
                    type="text"
                    value={editableUserInfo.placeOfBirth}
                    readOnly={!isEditing}
                    onChange={(e) => handleUserInfoChange('placeOfBirth', e.target.value)}
                    className={`border rounded px-3 py-2 w-full ${isEditing ? '' : 'bg-gray-100'}`}
                />
            </div>
            <div className="detail-item mt-4">
                <label className="font-bold text-gray-700">Mailing Address</label>
                <textarea
                    value={editableUserInfo.mailingAddress}
                    readOnly={!isEditing}
                    onChange={(e) => handleUserInfoChange('mailingAddress', e.target.value)}
                    className={`border rounded px-3 py-2 w-full resize-none ${isEditing ? '' : 'bg-gray-100'}`}
                ></textarea>
            </div>
        </div>
    );
// ...existing code...




            case 'work':
                return (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border text-sm text-left">
                            <thead className="bg-pink-500 text-white">
                                <tr>
                                    <th className="px-4 py-2">Employer Name</th>
                                    <th className="px-4 py-2">Employer Address</th>
                                    <th className="px-4 py-2">Position</th>
                                    <th className="px-4 py-2">Period Covered</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {workExperienceData.map((entry, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="px-4 py-2">
                                            {isEditing ? (
                                                <input
                                                    value={entry.employer}
                                                    onChange={(e) => handleWorkChange(index, 'employer', e.target.value)}
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                            ) : entry.employer}
                                        </td>
                                        <td className="px-4 py-2">
                                            {isEditing ? (
                                                <input
                                                    value={entry.address}
                                                    onChange={(e) => handleWorkChange(index, 'address', e.target.value)}
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                            ) : entry.address}
                                        </td>
                                        <td className="px-4 py-2">
                                            {isEditing ? (
                                                <input
                                                    value={entry.position}
                                                    onChange={(e) => handleWorkChange(index, 'position', e.target.value)}
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                            ) : entry.position}
                                        </td>
                                        <td className="px-4 py-2">
                                            {isEditing ? (
                                                <input
                                                    value={entry.period}
                                                    onChange={(e) => handleWorkChange(index, 'period', e.target.value)}
                                                    className="border rounded px-2 py-1 w-full"
                                                />
                                            ) : entry.period}
                                        </td>
                                        <td className="px-4 py-2 text-red-500 hover:text-red-700 cursor-pointer">
                                            <Trash2 size={18} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'personal':
                return <p className="mt-4 text-gray-600">Personal Information tab content here.</p>;
            default:
                return null;
        }
    };

    return (
        <div className="mt-6 bg-white rounded-xl shadow-md p-6 relative">
            {/* Tabs */}
            <div className="flex space-x-4 border-b mb-4">
                <button
                    onClick={() => setActiveTab('education')}
                    className={`pb-2 px-3 text-sm font-medium ${
                        activeTab === 'education' ? 'border-b-2 border-pink-500 text-pink-600' : 'text-gray-500'
                    }`}
                >
                    Educational Attainment
                </button>
                <button
                    onClick={() => setActiveTab('personal')}
                    className={`pb-2 px-3 text-sm font-medium ${
                        activeTab === 'personal' ? 'border-b-2 border-pink-500 text-pink-600' : 'text-gray-500'
                    }`}
                >
                    Personal Information
                </button>
                <button
                    onClick={() => setActiveTab('work')}
                    className={`pb-2 px-3 text-sm font-medium ${
                        activeTab === 'work' ? 'border-b-2 border-pink-500 text-pink-600' : 'text-gray-500'
                    }`}
                >
                    Work Experience
                </button>
            </div>

            {renderTabContent()}

            {/* Buttons */}
            <div className="flex justify-end items-center mt-6">
                <button
                    className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-full"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? 'Save Changes' : 'Modify'}
                </button>
            </div>
        </div>
    );
};

export default AchievementStatus;