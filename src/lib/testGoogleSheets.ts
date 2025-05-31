// Test utility for Google Sheets API setup
// Run this in browser console to test your API configuration

export const testGoogleSheetsSetup = () => {
    console.log('🧪 Testing Google Sheets API Setup...');
    
    // Check if Google API is loaded
    if (!window.gapi) {
        console.error('❌ Google API not loaded. Make sure the script is included in layout.tsx');
        return;
    }
    console.log('✅ Google API loaded successfully');
    
    // Check environment variables
    const config = {
        CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '186261145760-u7lbm1fnrjmrbfnuojc0n37qe9dhmu4n.apps.googleusercontent.com',
        API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || 'AIzaSyBNWJeAKwkUKtbUo454KBcJ4Ylrs55PpHA',
        SHEET_ID: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || '15uPafQE6hhzBz_mjcaeSx2i-Ne3qoSc-XaSkwUTqOIU'
    };
    
    console.log('📋 Configuration:');
    console.log('Client ID:', config.CLIENT_ID);
    console.log('API Key:', config.API_KEY === 'YOUR_API_KEY' ? '❌ Not set' : '✅ Set');
    console.log('Sheet ID:', config.SHEET_ID);
    
    if (config.API_KEY === 'AIzaSyBNWJeAKwkUKtbUo454KBcJ4Ylrs55PpHA') {
        console.warn('⚠️ API Key not configured. Please update it in src/lib/googleSheets.ts or set NEXT_PUBLIC_GOOGLE_API_KEY environment variable');
    }
    
    console.log('\n📝 Next steps:');
    console.log('1. Get API key from Google Cloud Console');
    console.log('2. Replace YOUR_API_KEY in src/lib/googleSheets.ts');
    console.log('3. Test form submission');
    console.log('\n🔗 Google Cloud Console: https://console.cloud.google.com/');
    console.log('🔗 Your Sheet: https://docs.google.com/spreadsheets/d/' + config.SHEET_ID + '/edit');
};

// Auto-run test in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    setTimeout(testGoogleSheetsSetup, 2000);
} 