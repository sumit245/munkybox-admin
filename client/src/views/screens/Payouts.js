import React, { useState, useEffect } from 'react'
import Table from '../components/payments/Table'
import { payColumns } from '../../utilities/utility'
import PayoutCards from '../components/payments/PayoutCards'
import axios from 'axios'


export default function Payouts() {
    const [payouts, setPayouts] = useState([])
    const fetchPayOut = async () => {
        const response = await axios.get("api/admintochefpayments/")
        const { payouts } = response.data
        setPayouts(payouts)
    }
    useEffect(() => {
        let component = true
        if (component) {
            fetchPayOut()
        }
        return () => {
            component = false
        }
    }, [])

    return (
        <div className="wrapper wrapper-content">
            <PayoutCards />
            <Table title="Payouts" data={payouts} columns={payColumns} flag={true} />
        </div>
    )
}
