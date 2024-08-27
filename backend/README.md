# google-translate-api
a simple translator app using google translate api

# Setting Up Google Cloud Project
Step 1: Create a Google Cloud Account
Go to Google Cloud Console, https://console.cloud.google.com/
Sign in with your Google account. If you don't have one, create a Google account first.
Step 2: Create a New Project
In the Google Cloud Console, click on the project drop-down menu at the top of the page.
Click on New Project.
Enter a project name and select a billing account if required.
Click Create.
Step 3: Enable APIs
With your new project selected, navigate to the API & Services section from the left sidebar.
Click Library.
Search for the API you want to use (e.g., "Cloud Translation API").
Click on the API and then click Enable.
Step 4: Create Credentials
Go to API & Services > Credentials.
Click on Create Credentials and choose Service Account.
Enter a name and description for the service account.
Click Create.
Assign the required roles. For Translation API, you can assign roles like Viewer or Editor as needed.
Click Continue.
Click Done.
Step 5: Generate a Key File
In the Credentials tab, find the service account you created.
Click the Actions menu (three vertical dots) next to the service account and select Create Key.
Choose JSON as the key type and click Create.
Download the JSON key file. This file contains your credentials.

# Setting Up Google Cloud Project
Install the dependencies by this command 
npm install @google-cloud/translate dotenv

Set Up Environment Variables
Place the downloaded JSON key file (the credentials.json file from google console) in your project directory.

Create a .env file in your project directory and add the following line:
CREDENTIALS='your-credentials-json-content'

the json content should be in a single line
