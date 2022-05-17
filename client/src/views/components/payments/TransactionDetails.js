import React from 'react'
import TransactionTable from "./TransactionTable"
import { COMMISSION_HISTORY, TRANSACTION_HISTORY } from '../../../utilities/fakepayout'
import { transactionColumns } from '../../../utilities/utility'

export default function TransactionDetails() {
    return (

        <TransactionTable title="Transactions" data={TRANSACTION_HISTORY} columns={transactionColumns} flag={true} />

    )
}
