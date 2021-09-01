import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "../src/pages/Home";
import Favorites from "../src/pages/Favorites";
import Personal from "../src/pages/Personal";
import { useStyles } from "./styles/styles";
import Layout from "./components/Layout";
import { Container, Paper } from "@material-ui/core";
import "./App.css";
import Navigation2 from "./components/Navigation2";
import About from "./pages/About";

const App = () => {
  const classes = useStyles();

  const [categories, setCategories] = useState([]);
  const handleNewCategories = (newCategories) => {
    console.log(newCategories);
    setCategories(newCategories);
    localStorage.setItem("Categories", JSON.stringify(newCategories));
  };

  const [preference, setPreference] = useState([]);
  const handleNewPreference = (newPreference) => {
    console.log(newPreference);
    setPreference(newPreference);
    localStorage.setItem("Preference", JSON.stringify(newPreference));
  };

  const [favorites, setfavorites] = useState([]);
  
  useEffect(() => {
    let retrievedObject = localStorage.getItem("Categories");
    setCategories(JSON.parse(retrievedObject));
    retrievedObject = localStorage.getItem("Preference");
    setPreference(JSON.parse(retrievedObject));
  }, []);

  
  return (
    <div className="App">
      
      <div className={classes.background}>
        <Router>

          <Navigation2 />

          <div style={{ marginTop: "0%", width: "70%", marginRight: "15%" }}>
            <Switch>

              <Route exact key="0" path="/">
                {" "}
                <Home categories={categories} preference={preference} />{" "}
              </Route>
              <Route exact key="1" path="/personal">
                {" "}
                <Personal
                  handleNewCategories={handleNewCategories}
                  categories={categories}
                  handleNewPreference={handleNewPreference}
                  preference={preference}
                />{" "}
              </Route>
              <Route exact key="2" path="/favorites">
                {" "}
                <Favorites favorites={favorites}/>{" "}
              </Route>
              <Route exact key="3" path="/about">
                {" "}
                <About />{" "}
              </Route>

            </Switch>
          </div>

        </Router>
      </div>

    </div>
  );
};

export default App;
