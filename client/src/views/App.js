import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import SideNav from "./components/SideNav";
import TopNavigation from "./components/TopNavigation";
import Dashboard from "./screens/Dashboard";
import Orders from "./screens/Orders";
import Payouts from "./screens/Payouts";
import Restaurant from "./screens/Restaurant";
import Users from "./screens/Users";
import Requests from "./screens/Requests";
import AddRestaurant from "./components/restaurant/add/AddRestaurant";
import ViewRestaurant from "./components/restaurant/view/ViewRestaurant";
import Settings from "./screens/Settings";
import SidebarComponent from "./components/SidebarComponent";

export default function App() {
  return (
    <React.Fragment>
      <Router history={history}>
        <React.Fragment>
          <div id="wrapper">
            <SideNav />
            <div id="page-wrapper" className="gray-bg">
              <div className="row border-bottom">
                <TopNavigation />
              </div>

              <Switch>
                <Route exact path="/" render={() => <Dashboard />} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/restaurant" render={() => <Restaurant />} />
                <Route exact path="/add_restaurant" component={AddRestaurant} />
                <Route exact path="/orders" component={Orders} />
                <Route exact path="/payments" component={Payouts} />
                <Route exact path="/setting" component={Settings} />
                <Route path="/newrequest/:id" component={Requests} />
                <Route path="/view_restaurant/:id" component={ViewRestaurant} />
              </Switch>
            </div>
          </div>
        </React.Fragment>
      </Router>
    </React.Fragment>
  );
}
