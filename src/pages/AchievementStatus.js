import React, { useState } from 'react';
import { Button, Card, CardContent, Input, Textarea } from '@/components/ui';
import { Plus } from 'lucide-react';

const AchievementsStatus = () => {
    const [achievements, setAchievements] = useState([]);

    const [status, setStatus] = useState('');
    const [newAchievement, setNewAchievement] = useState('');

    const addAchievement = () => {
        if (newAchievement.trim()) {
            setAchievements([...achievements, newAchievement.trim()]);
            setNewAchievement('');
        }
    };

    const handleStatusChange = (e) => setStatus(e.target.value);

    return (
        <div className="min-h-screen bg-pink-300 flex flex-col items-center p-6">
            <Card className="w-full max-w-4xl bg-pink-400 text-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center mb-6">
                    <img 
                        src="/profile-placeholder.png" 
                        alt="Profile" 
                        className="w-16 h-16 rounded-full border-4 border-white mr-4"
                    />
                    <div>
                        <h1 className="text-2xl font-bold">John Doe</h1>
                        <p className="text-sm">Alumni Member</p>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-center mb-6">Achievements & Status</h1>

                {/* Achievements Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-3">Achievements</h2>
                    <ul className="list-disc pl-5 mb-4">
                        {achievements.map((achievement, index) => (
                            <li key={index} className="text-lg">{achievement}</li>
                        ))}
                    </ul>
                    <div className="flex gap-2">
                        <Input
                            type="text"
                            value={newAchievement}
                            onChange={(e) => setNewAchievement(e.target.value)}
                            placeholder="Add achievement..."
                            className="w-full p-2 rounded-lg"
                        />
                        <Button onClick={addAchievement} className="bg-pink-500 hover:bg-pink-600">
                            <Plus className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Status Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-3">Current Status</h2>
                    <Textarea
                        value={status}
                        onChange={handleStatusChange}
                        placeholder="Enter your current status..."
                        className="w-full p-2 rounded-lg text-black"
                    />
                </div>

                <div className="text-center">
                    <Button className="bg-pink-500 hover:bg-pink-600">Save Changes</Button>
                </div>
            </Card>
        </div>
    );
};

export default AchievementsStatus;