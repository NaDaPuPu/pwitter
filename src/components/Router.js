import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";
import "./Router.css";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      <div className="routerContainer">
        {isLoggedIn && (
          <header className="item">
            <Navigation userObj={userObj} />
          </header>
        )}
        <Switch>
          <main className="item">
            {isLoggedIn ? (
              <>
                <Route exact path="/">
                  <Home userObj={userObj} />
                </Route>
                <Route exact path="/profile">
                  <Profile userObj={userObj} refreshUser={refreshUser} />
                </Route>
              </>
            ) : (
              <>
                <Route exact path="/">
                  <Auth />
                </Route>
              </>
            )}
          </main>
        </Switch>
        <footer className="item"></footer>
      </div>
    </Router>
  );
};
export default AppRouter;
