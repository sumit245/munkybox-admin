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
import DeleteAlert from "../utilities/DeleteAlert";
import EditRestaurant from "./components/restaurant/edit/EditRestaurant";
import Promos from "./screens/Promos";
import CouponDetails from "./components/promotions/CouponDetails";
import { ViewOrders } from "./components/orders/ViewOrders";
import ViewUser from "./components/users/viewuser/ViewUser";
import Contacts from "./components/contacts/Contacts";

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

                {/* User Routes  */}
                <Route exact path="/users" component={Users} />
                <Route exact path="/view_user/:id" component={ViewUser} />
                <Route exact path="/users/:id" component={DeleteAlert} />

                {/* Restaurant Routes */}
                <Route exact path="/restaurant" render={() => <Restaurant />} />
                <Route exact path="/add_restaurant" component={AddRestaurant} />
                <Route
                  exact
                  path="/edit_restaurant/:id"
                  component={EditRestaurant}
                />

                {/* Orders Routes */}
                <Route exact path="/orders" component={Orders} />
                <Route exact path="/view_order/:id" component={ViewOrders} />
                <Route exact path="/orders/:id" component={DeleteAlert} />

                {/* Promotions Routes */}
                <Route exact path="/coupons" component={Promos} />
                <Route
                  exact
                  path="/view_coupons/:id"
                  component={CouponDetails}
                />
                <Route exact path="/payments" component={Payouts} />
                <Route exact path="/setting" component={Settings} />
                <Route exact path="/contacts" component={Contacts} />
                <Route path="/newrequest/:id" component={Requests} />
                <Route path="/view_restaurant/:id" component={ViewRestaurant} />
                <Route path="/newrest/:id" component={DeleteAlert} />
                <Route path="/cuisine/:id" component={DeleteAlert} />
                <Route path="/banner/:id" component={DeleteAlert} />
                <Route path="/policies/:id" component={DeleteAlert} />
              </Switch>
            </div>
          </div>
        </React.Fragment>
      </Router>
    </React.Fragment>
  );
}
