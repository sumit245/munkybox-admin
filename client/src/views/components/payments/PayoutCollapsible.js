import React, { useEffect, useState } from 'react'
import "./styles.css"
export default function PayoutCollapsible({ data }) {
    const [order_amt, setOrderAmt] = useState(0);
    const [id, setID] = useState("")
    const [commission, setCommission] = useState(0)
    const [add_on_amt, setAddOnAmt] = useState(0);
    const [add_on_commission, setAddOnCommission] = useState(0);
    const [paid_amt, setPaid] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [balance, setBalance] = useState(0)
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        setID(data.restaurant_id)
        setOrderAmt(data.totalMerchAmt)
        setAddOnAmt(data.totalAddOnAmt)
        setCommission(data.totalCommissionAmt)
        setAddOnCommission(data.totalAddOnCommissionAmt)
        setPaid(data.paidAmt)
        setDiscount(data.discount)
        setBalance(data.payable)
        setLoaded(true)
    }, [data])
    if (loaded) {
        return (

            <div className='collapsible-container'>
                <div className='row'>
                    <div className='col-sm-10'>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <span className='collapsible-details'>Total Order Amount:</span>
                                <span>${order_amt}</span>
                            </div>
                            <div className='col-sm-6'>
                                <span className='collapsible-details'>Commission:</span>
                                <span>${commission}</span>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <span className='collapsible-details'>Total Add on Amount: </span>
                                <span>${add_on_amt}</span>
                            </div>
                            <div className='col-sm-6'>
                                <span className='collapsible-details'>Add on Commission:</span>
                                <span>${add_on_commission}</span>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <span className='collapsible-details'>Discount:</span>
                                <span>${discount}</span>
                            </div>
                            <div className='col-sm-6'>
                                <span className='collapsible-details'>Banner Due:</span>
                                <span>$0.00</span>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <span className='collapsible-details'>Paid:</span>
                                <span>${paid_amt}</span>
                            </div>
                            <div className='col-sm-6'>
                                <span className='collapsible-details'>Balance:</span>
                                <span>${balance}</span>
                            </div>

                        </div>
                    </div>
                    <div className='col-sm-2 justify-content-center'>
                        <a href={`/view_transaction/${id}`} className='btn btn-warning my-2'>View Transaction</a>
                        <a href={`/deposit_money/${id}`} className='btn btn-success my-2'>Pay</a>
                    </div>
                </div>
            </div>

        )
    } else {
        return <div>Loading...</div>
    }
}
