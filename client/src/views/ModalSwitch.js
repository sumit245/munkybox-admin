import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import Deposit from './components/payments/Deposit'
import CommissionHistory from "./components/payments/CommissionHistory";

export default function ModalSwitch() {
    let location = useLocation()
    let background = location.state && location.state.background
    return (
        <div>
            <Switch location={background || location}>
                <Route path="/deposit_money/:id" children={<Deposit />} />
                <Route path="/commission_history/" children={<CommissionHistory/>} />
            </Switch>
        </div>
    )
}
