import React, { useEffect, useState } from "react";
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
import BannerDetails from "./components/promotions/BannerDetails";
import { ViewOrders } from "./components/orders/ViewOrders";
import ViewUser from "./components/users/viewuser/ViewUser";
import Contacts from "./components/contacts/Contacts";
import Banners from "./screens/Banners";
import Login from "./screens/Login";
import Review from "./components/review/Review";
import TransactionDetails from "./components/payments/TransactionDetails";
import CommissionTracking from "./components/payments/CommissionTracking";
import ModalSwitch from "./ModalSwitch";

export default function App() {
  const [isUser, setisUser] = useState(false)
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('logged_in_token'))
    try {
      let isLoggedIn = storedData.logged_in
      isLoggedIn ? setisUser(isLoggedIn) : setisUser(false)
    } catch (err) {
      setisUser(false)
    }
  }, [])

  return (
    <React.Fragment>
      <Router history={history} >
        {
          isUser ? (
            <React.Fragment>
              <div id="wrapper">
                <SideNav />
                <div id="page-wrapper" className="gray-bg">
                  <div className="row border-bottom">
                    <TopNavigation setLoggedIn={setisUser} />
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
                    <Route
                      exact
                      path="/view_campaign/:id"
                      component={BannerDetails}
                    />
                    <Route exact path="/campaign" component={Banners} />
                    <Route exact path="/payments" component={Payouts} />
                    <Route exact path="/setting" component={Settings} />
                    <Route exact path="/contacts" component={Contacts} />
                    <Route exact path="/review/" component={Review} />
                    <Route path="/newrequest/:id" component={Requests} />
                    <Route path="/view_restaurant/:id" component={ViewRestaurant} />
                    <Route path="/newrest/:id" component={DeleteAlert} />
                    <Route path="/cuisine/:id" component={DeleteAlert} />
                    <Route path="/banner/:id" component={DeleteAlert} />
                    <Route path="/policies/:id" component={DeleteAlert} />
                    <Route path="/view_transaction/:id" component={TransactionDetails} />
                    <Route path="/commission_tracking/" component={CommissionTracking} />
                  </Switch>
                  <ModalSwitch />
                </div>
              </div>
            </React.Fragment>
          ) : (
            <Login setLoggedin={setisUser} />
          )
        }
      </Router>
    </React.Fragment>
  );
}
