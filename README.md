# Task Board Web App:

### Deployed Link :

#### --Frontend : https://taskboard-delta.vercel.app/

#### --Backend : https://taskboard-backend-2ryj.onrender.com/

### Video Recording & Screenshots Of Website Overview : Googledrive Link : Will Be Updated

##### Technologies Used : Postgres SQL,Express,React.js,Node.js,Bootstrap,Material UI

#### Dev Tools : VS Code,Github,Vercel,Render

### Steps For Website Navigation And Explanation of Different features :

--First Landing Page will be displayed with the options Login/Singnup

--User can create an account using SignUp and Login to his account.User account details will be store in Backend in Postgres SQL database which is hosted on Elephant SQL

--After logging in user will be navigated to taskboard page.In it some default tasks cards are displayed.This taskboard done by using "react-dnd" npm librarry

--We can swap one card from one list to another.After the task has been completed we can mark the Checkbox and it will be deleted from the database as well.

--WE can also delete the List Board by clicking on the BIN symbol on the last List.And also we can add the new card by clicking on the Click to Add item on the respective Lists

--Alll those changes will be reflected in the database as they are saved.Even if you logout and login again your progress will be resumed.

### Steps Required To Run Applications :

#### Frontend -React :

--"npx create-react-app ."
  For creating react app "node-modules".

--"npm install"
   For install all the depencies and packages in the "node-modules" folder.

--"npm start"
   Runs the app in the development mode.
   Open http://localhost:3000 to view it in your browser.

--"npm run build"
   Builds the app for production to the build folder. 
   It correctly bundles React in production mode and optimizes the build for the best performance.

#### Backend :

--"npm install"
     For install all the depencies and packages in the "node-modules" folder.

--"npm install --force"
    If any version conflicts use "--force" flag to  install all the depencies and packages in the "node-modules" folder.

--"node index.js"
   To start and run the server.  
   Open http://localhost:8082 to view it in your browser.

#### Thank You 
