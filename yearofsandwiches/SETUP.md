# Google Sheets Sync Setup Guide

This guide will help you set up the daily sync from Google Sheets to your website.

## Overview

The system works as follows:
1. You fill out a Google Form (from any device)
2. Responses are automatically saved to a Google Sheet
3. A GitHub Action runs daily (midnight UTC) to fetch the latest data
4. The data.yaml file is updated automatically
5. Your site updates with the new sandwich entries

## Step 1: Create a Google Form

1. Go to [Google Forms](https://forms.google.com)
2. Create a new form with these fields:
   - **Sandwich Name** (Short answer, required)
   - **Place** (Short answer, required)
   - **Google Maps Link** (Short answer)
   - **Date** (Date, required)
   - **Rating** (Linear scale: 1-5, required)
   - **Review** (Paragraph)

3. In the form settings (⚙️), click on "Responses"
4. Click "Create Spreadsheet" to link it to a new Google Sheet
5. Note the Spreadsheet ID from the URL: `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`

## Step 2: Set Up Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create a service account:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Give it a name (e.g., "sandwich-sync")
   - Click "Create and Continue"
   - Skip optional steps, click "Done"
5. Create a key for the service account:
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose "JSON" format
   - Download the key file
6. Share your Google Sheet with the service account:
   - Open your Google Sheet
   - Click "Share" button
   - Paste the service account email (looks like `sandwich-sync@project-id.iam.gserviceaccount.com`)
   - Give it "Viewer" access
   - Uncheck "Notify people"
   - Click "Share"

## Step 3: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Add these three secrets:

### GOOGLE_SHEETS_ID
- The spreadsheet ID from your Google Sheet URL
- Example: `1abc123DEFghiJKLmnoPQRstuVWXyz456789`

### GOOGLE_SERVICE_ACCOUNT_EMAIL
- Open the JSON key file you downloaded
- Copy the value of `client_email`
- Example: `sandwich-sync@project-id.iam.gserviceaccount.com`

### GOOGLE_PRIVATE_KEY
- Open the JSON key file you downloaded
- Copy the entire value of `private_key` (including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines)
- Paste it exactly as-is, with all the `\n` characters

## Step 4: Format Your Google Sheet

Make sure your Google Sheet has these columns in order (Row 1 should be headers):

| Name | Place | Link | Date | Rating | Review |
|------|-------|------|------|--------|--------|
| Sandwich name | Restaurant name | Google Maps URL | YYYY-MM-DD | 1-5 | Your review |

The Google Form will automatically populate these columns when you submit responses.

## Step 5: Test the Setup

1. Add a test entry through your Google Form
2. Go to your GitHub repository
3. Navigate to Actions tab
4. Click on "Sync from Google Sheets" workflow
5. Click "Run workflow" to manually trigger it
6. Wait for it to complete
7. Check if yearofsandwiches/data.yaml was updated

## Troubleshooting

### "Error: Unable to read or parse credentials"
- Make sure the private key is copied exactly from the JSON file
- Ensure all three secrets are set correctly in GitHub

### "Error: The caller does not have permission"
- Make sure you shared the Google Sheet with the service account email
- Check that the service account has "Viewer" access

### "No data found in the sheet"
- Make sure your sheet has data starting from row 2 (row 1 is headers)
- Check that the sheet name is "Sheet1" (or update the range in scripts/sync-sheets.js)

### Workflow doesn't run automatically
- The cron schedule runs at midnight UTC
- You can always trigger it manually from the Actions tab
- Check that GitHub Actions is enabled for your repository

## Optional: Customize the Schedule

To change how often the sync runs, edit `.github/workflows/sync-sheets.yml`:

```yaml
schedule:
  - cron: '0 0 * * *'  # Daily at midnight UTC
  # - cron: '0 */6 * * *'  # Every 6 hours
  # - cron: '0 12 * * *'  # Daily at noon UTC
```

## Sheet Column Customization

If you want to add or change columns, edit `scripts/sync-sheets.js` and update the mapping:

```javascript
const sandwich = {
  name: row[0] || '',
  place: row[1] || '',
  link: row[2] || '',
  date: row[3] || '',
  rating: row[4] ? parseInt(row[4]) : 0,
  review: row[5] || '',
  // Add new fields here if needed
};
```

Remember to also update the range in the API call if you add more columns (e.g., change `A:G` to `A:H`).
