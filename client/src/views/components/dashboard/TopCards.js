import React,{useEffect} from "react";
import { useSelector, useDispatch} from 'react-redux'
import { getOrders, getUsers } from "../../../actions/actions";
export default function TopCards() {
  const dispatch = useDispatch()
  const orders = useSelector(state => state.orders)
  const users = useSelector(state => state.users)
  useEffect(() => {
    dispatch(getUsers())
    dispatch(getOrders())
  }, [dispatch])
  return (
    <div className="row">
      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-success float-right">Monthly</span>
            <h5>Requests</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">0</h1>
            <div className="stat-percent font-bold text-danger">
              0% <i className="fa fa-bolt" />
            </div>
            <small>Total requests</small>
          </div>
        </div>
      </div>
    
      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-primary float-right">Low value</span>
            <h5>User</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">{users.length}</h1>
            <div className="stat-percent font-bold text-danger">
              0% <i className="fa fa-level-down" />
            </div>
            <small>In first month</small>
          </div>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-info float-right">Annual</span>
            <h5>Orders</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">{ orders.length}</h1>
            <div className="stat-percent font-bold text-danger">
              0% <i className="fa fa-level-up" />
            </div>
            <small>New orders</small>
          </div>
        </div>
      </div>

      <div className="col-lg-3">
        <div className="ibox">
          <div className="ibox-title">
            <span className="label label-primary float-right">Today</span>
            <h5>Restaurants</h5>
          </div>
          <div className="ibox-content">
            <h1 className="no-margins">0</h1>
            <div className="stat-percent font-bold text-navy">
              0% <i className="fa fa-level-up" />
            </div>
            <small>New visits</small>
          </div>
        </div>
      </div>
    </div>
  );
}
