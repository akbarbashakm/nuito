// Google Sheets API utility
export interface FormData {
    name: string;
    email: string;
    mobile: string;
    size: string;
}

// Google API configuration - use environment variables in production
const GOOGLE_CONFIG = {
    CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '186261145760-u7lbm1fnrjmrbfnuojc0n37qe9dhmu4n.apps.googleusercontent.com',
    API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || 'AIzaSyBNWJeAKwkUKtbUo454KBcJ4Ylrs55PpHA',
    SHEET_ID: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || '15uPafQE6hhzBz_mjcaeSx2i-Ne3qoSc-XaSkwUTqOIU',
    DISCOVERY_DOC: 'https://sheets.googleapis.com/$discovery/rest?version=v4',
    SCOPES: 'https://www.googleapis.com/auth/spreadsheets'
};

// Declare gapi type
declare global {
    interface Window {
        gapi: {
            load: (apis: string, callback: () => void) => void;
            client: {
                init: (config: {
                    apiKey: string;
                    clientId: string;
                    discoveryDocs: string[];
                    scope: string;
                }) => Promise<void>;
                sheets: {
                    spreadsheets: {
                        values: {
                            append: (params: {
                                spreadsheetId: string;
                                range: string;
                                valueInputOption: string;
                                resource: { values: string[][] };
                            }) => Promise<unknown>;
                        };
                    };
                };
            };
            auth2: {
                getAuthInstance: () => {
                    isSignedIn: {
                        get: () => boolean;
                    };
                    signIn: () => Promise<void>;
                };
            };
        };
    }
}

export const initializeGoogleAPI = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!window.gapi) {
            reject(new Error('Google API not loaded'));
            return;
        }

        window.gapi.load('client:auth2', async () => {
            try {
                await window.gapi.client.init({
                    apiKey: GOOGLE_CONFIG.API_KEY,
                    clientId: GOOGLE_CONFIG.CLIENT_ID,
                    discoveryDocs: [GOOGLE_CONFIG.DISCOVERY_DOC],
                    scope: GOOGLE_CONFIG.SCOPES
                });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });
};

export const authenticateUser = async (): Promise<void> => {
    const authInstance = window.gapi.auth2.getAuthInstance();
    
    if (!authInstance.isSignedIn.get()) {
        await authInstance.signIn();
    }
};

export const writeToGoogleSheets = async (formData: FormData): Promise<void> => {
    try {
        // Initialize API if not already done
        await initializeGoogleAPI();
        
        // Authenticate user
        await authenticateUser();

        // Prepare data for sheets
        const timestamp = new Date().toISOString();
        const values = [
            [formData.name, formData.email, formData.mobile, formData.size, timestamp]
        ];

        // Write to Google Sheets
        const response = await window.gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: GOOGLE_CONFIG.SHEET_ID,
            range: 'Sheet1!A:E',
            valueInputOption: 'RAW',
            resource: { values: values }
        });

        console.log('Data written to sheet:', response);
    } catch (error) {
        console.error('Error writing to Google Sheets:', error);
        throw error;
    }
};

export const isGoogleAPILoaded = (): boolean => {
    return typeof window !== 'undefined' && !!window.gapi;
}; 