import React from 'react'
import { COMMISSION_HISTORY } from '../../utilities/fakepayout'
import Table from '../components/payments/Table'
import { payColumns } from '../../utilities/utility'
import PayoutCards from '../components/payments/PayoutCards'


export default function Payouts() {
    return (
        <div className="wrapper wrapper-content">
            <PayoutCards />
            <Table title="Payouts" data={COMMISSION_HISTORY} columns={payColumns} flag={true} />
        </div>
    )
}
