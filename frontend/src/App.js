import React from "react";
import "./App.css";
import "./bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state/store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Notes from "./components/Notes";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact={true}>
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/notes">
              <Notes />
            </Route>
            <Route path="/createnote">
              <CreateNote />
            </Route>
            <Route path="/editnote">
              <EditNote />
            </Route>
            <Route path="*">
              <Home />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    </Provider>
  );
};

export default App;
