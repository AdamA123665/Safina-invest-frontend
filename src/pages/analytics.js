// src/utils/analytics.js

export const logAnalyticsEvent = async (eventType, buttonId, additionalInfo = "") => {
    try {
        const response = await fetch('https://safinabackend.azurewebsites.net/api/analytics', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                // If using API Key authentication, include the key here securely
                // 'x-api-key': process.env.REACT_APP_ANALYTICS_API_KEY,
            },
            body: JSON.stringify({
                event_type: eventType,
                button_id: buttonId,
                additional_info: additionalInfo, // Expecting a string
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Failed to log analytics event');
        }

        console.log('Analytics event logged successfully');
    } catch (error) {
        console.error('Error logging analytics:', error);
        // Depending on your needs, you might want to rethrow or handle the error differently
    }
};

export const logPageView = async (pageId, additionalInfo = "") => {
    await logAnalyticsEvent('page_view', pageId, additionalInfo);
};
