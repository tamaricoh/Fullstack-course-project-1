# Fullstack-course-project-1

## Intuitive personal task manager web application

### What

This is a React project, implemented as part of a fullstack course led by Yaniv Arad.

The project is an application for personal or organizational assistance. It brings a dashboard of tasks tracking with actions and views that help with efficient time management.

The main functions are :
1. Users management.
2. Tasks creation and life cycle management until completion.
3. Helpful search function.
4. Intuitive views.

This project uses 'axios' module to get and set data from the network.

### How

1. Create a React App on your VSC.
   Then, add those files to the app.
2. Download to your app a module -

   - axios ``` npm install axios ```

3. Your App.js file should look like the following : 

   ```
   import logo from "./logo.svg";
    import "./App.css";
   import First_project_main from "./first_project_main";
   function App() {
    return (
    <div className="App">
    <First_project_main />
    </div>
        );
   }
   export default App;
   ```

4. Run ``` npm start``` :)
