const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

async function syncFromSheets() {
  try {
    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    // Fetch data from the sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:G', // Adjust range as needed
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      console.log('No data found in the sheet.');
      return;
    }

    // Assume first row is headers
    const headers = rows[0];
    const sandwiches = [];

    // Convert rows to sandwich objects
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];

      // Skip empty rows
      if (!row[0]) continue;

      const sandwich = {
        name: row[0] || '',
        place: row[1] || '',
        link: row[2] || '',
        date: row[3] || '',
        rating: row[4] ? parseInt(row[4]) : 0,
        review: row[5] || '',
      };

      sandwiches.push(sandwich);
    }

    // Create YAML structure
    const data = {
      sandwiches: sandwiches,
    };

    // Write to YAML file
    const yamlPath = path.join(__dirname, '..', 'yearofsandwiches', 'data.yaml');
    const yamlContent = yaml.stringify(data);
    fs.writeFileSync(yamlPath, yamlContent, 'utf8');

    console.log(`Successfully synced ${sandwiches.length} sandwiches from Google Sheets.`);
  } catch (error) {
    console.error('Error syncing from Google Sheets:', error);
    process.exit(1);
  }
}

syncFromSheets();
