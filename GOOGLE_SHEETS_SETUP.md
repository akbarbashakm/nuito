# Google Sheets API Setup Guide

## Step 1: Get Google API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project "nuito-461511"
3. Enable Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

4. Create API Key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key and replace `YOUR_API_KEY` in the Form.tsx file

## Step 2: Configure OAuth 2.0

Your OAuth client is already configured:
- Client ID: `186261145760-u7lbm1fnrjmrbfnuojc0n37qe9dhmu4n.apps.googleusercontent.com`

Make sure to add your domain to authorized origins:
1. Go to "APIs & Services" > "Credentials"
2. Click on your OAuth 2.0 client
3. Add these to "Authorized JavaScript origins":
   - `http://localhost:3000` (for development)
   - Your production domain

## Step 3: Prepare Google Sheet

Your sheet: https://docs.google.com/spreadsheets/d/15uPafQE6hhzBz_mjcaeSx2i-Ne3qoSc-XaSkwUTqOIU/edit

1. Make sure the sheet is accessible (either public or shared with your Google account)
2. Add headers in the first row:
   - A1: Name
   - B1: Email  
   - C1: Mobile
   - D1: Size
   - E1: Timestamp

## Step 4: Update Form.tsx

Replace `YOUR_API_KEY` in `src/component/Form.tsx` with your actual API key from Step 1.

## How it works

1. When user submits form, Google OAuth popup will appear
2. User grants permission to write to sheets
3. Form data gets appended to your Google Sheet
4. User is redirected to thank you page

## Security Note

The API key will be visible in client-side code. Make sure to:
1. Restrict the API key to only Google Sheets API
2. Restrict to your domain only
3. Consider using environment variables for production 