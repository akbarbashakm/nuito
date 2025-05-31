# Nu ITO - A New Standard

This is a [Next.js](https://nextjs.org) project for Nu ITO, featuring a modern e-commerce interface with Google Sheets integration for form submissions.

## Features

- 🌙 Dark/Light theme support
- 📱 Responsive design with mobile-first approach
- 📊 Google Sheets API integration for form data
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast performance with Next.js 15
- 🔒 Client-side Google OAuth authentication

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Set up Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project "nuito-461511" or create a new one
3. Enable Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API" and enable it

4. Create API Key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Restrict the key to Google Sheets API only

5. Configure OAuth 2.0:
   - Your Client ID is already set: `186261145760-u7lbm1fnrjmrbfnuojc0n37qe9dhmu4n.apps.googleusercontent.com`
   - Add authorized origins:
     - `http://localhost:3000` (development)
     - Your production domain

### 3. Update API Configuration

Replace `YOUR_API_KEY` in `src/lib/googleSheets.ts` with your actual API key, or create a `.env.local` file:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=186261145760-u7lbm1fnrjmrbfnuojc0n37qe9dhmu4n.apps.googleusercontent.com
NEXT_PUBLIC_GOOGLE_API_KEY=your_api_key_here
NEXT_PUBLIC_GOOGLE_SHEET_ID=15uPafQE6hhzBz_mjcaeSx2i-Ne3qoSc-XaSkwUTqOIU
```

### 4. Prepare Google Sheet

Your sheet: [Nu ITO Form Data](https://docs.google.com/spreadsheets/d/15uPafQE6hhzBz_mjcaeSx2i-Ne3qoSc-XaSkwUTqOIU/edit)

Add these headers in the first row:
- A1: Name
- B1: Email  
- C1: Mobile
- D1: Size
- E1: Timestamp

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How Form Submission Works

1. User fills out the interest form
2. Google OAuth popup appears for authentication
3. User grants permission to write to Google Sheets
4. Form data gets appended to your Google Sheet
5. User is redirected to thank you page

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── component/           # React components
├── lib/                 # Utility functions (Google Sheets API)
├── constants/           # App constants and validation
├── context/             # React context providers
└── types/               # TypeScript type definitions
```

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Google Sheets API** - Data storage
- **GSAP** - Animations
- **next-themes** - Theme switching

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Remember to add your environment variables in Vercel's dashboard for production deployment.
