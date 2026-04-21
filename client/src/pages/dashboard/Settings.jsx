import React, { useEffect, useState } from 'react';
import { User, Bell } from 'lucide-react';
import toast from 'react-hot-toast';
import {
    getDefaultNotificationPreferences,
    getNotificationPreferences,
    saveNotificationPreferences,
} from '../../utils/notificationPreferences';

const Settings = () => {
    const [preferences, setPreferences] = useState(getDefaultNotificationPreferences());

    useEffect(() => {
        setPreferences(getNotificationPreferences());
    }, []);

    const updatePreference = (key, value) => {
        setPreferences((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSaveNotifications = () => {
        saveNotificationPreferences(preferences);
        toast.success('Notification preferences saved.');
    };

    const handleResetNotifications = () => {
        const defaults = getDefaultNotificationPreferences();
        setPreferences(defaults);
        saveNotificationPreferences(defaults);
        toast.success('Notification preferences reset.');
    };

    const notificationItems = [
        {
            key: 'emailCritical',
            label: 'Email alerts for critical detections',
        },
        {
            key: 'smsOffline',
            label: 'SMS notifications for system offline',
        },
        {
            key: 'weeklyReports',
            label: 'Weekly report summaries',
        },
        {
            key: 'metalSound',
            label: 'Play sound when metal is detected',
        },
    ];

    return (
        <div className="max-w-4xl space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <User className="h-5 w-5 text-gray-500" />
                        Profile Settings
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Update your personal information</p>
                </div>
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" defaultValue="Admin User" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" defaultValue="admin@example.com" disabled />
                        </div>
                    </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 text-right">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Save Changes</button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Bell className="h-5 w-5 text-gray-500" />
                        Notification Preferences
                    </h2>
                </div>
                <div className="p-6 space-y-4">
                    {notificationItems.map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                            <span className="text-gray-700">{item.label}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={Boolean(preferences[item.key])}
                                    onChange={(e) => updatePreference(item.key, e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                        </div>
                    ))}
                </div>
                <div className="px-6 py-4 bg-gray-50 text-right space-x-2">
                    <button
                        onClick={handleResetNotifications}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleSaveNotifications}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
