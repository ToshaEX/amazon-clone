import "./App.css";
import React, { useEffect } from "react";
import Header from "./Header.js";
import Home from "./Home.js";
import Checkout from "./Checkout.js";
import Login from "./Login";
import Payment from "./Payment";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders.js"
const promise = loadStripe(
  "pk_test_51Kcl7vLWLotPmEHDnkzxIj3l3XGzkwHfP6TOhLJGokrQ8NOWFVme7hOzd57Hn6AUDe4n9xPrUYJs7lLw2aajaLEp00VEktl671"
);

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    //will only run once the app component loads.
    auth.onAuthStateChanged((authUser) => {
      console.log("The user is >>>", authUser);
      if (authUser) {
        //the user just logged in / the user was logged in
        dispatch({ type: "SET_USER", user: authUser });
      } else {
        //the user is logged out
        dispatch({ type: "SET_USER", user: null });
      }
    });
  }, []);
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path="/">
            <Header />
            <ToastContainer />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
