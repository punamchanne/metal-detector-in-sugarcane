const STORAGE_KEY = 'caneshield_notification_preferences';

const DEFAULT_NOTIFICATION_PREFERENCES = {
    emailCritical: true,
    smsOffline: true,
    weeklyReports: true,
    metalSound: true,
};

export const getNotificationPreferences = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            return DEFAULT_NOTIFICATION_PREFERENCES;
        }

        const parsed = JSON.parse(stored);
        return {
            ...DEFAULT_NOTIFICATION_PREFERENCES,
            ...parsed,
        };
    } catch (error) {
        console.error('Failed to read notification preferences:', error);
        return DEFAULT_NOTIFICATION_PREFERENCES;
    }
};

export const saveNotificationPreferences = (preferences) => {
    const normalized = {
        ...DEFAULT_NOTIFICATION_PREFERENCES,
        ...preferences,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
};

export const getDefaultNotificationPreferences = () => ({
    ...DEFAULT_NOTIFICATION_PREFERENCES,
});
