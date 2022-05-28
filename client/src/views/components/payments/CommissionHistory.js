import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from "react-router-dom"

export default function Deposit() {
    const [orders, setOrder] = useState([])
    const history = useHistory()
    const { id } = useParams()
    const { query } = useLocation()
    const back = (e) => {
        e.stopPropagation()
        history.goBack()
    }
    useEffect(() => {
        setOrder(query.orders)
    }, [])

    return (
        <div style={{
            position: "fixed",
            display: 'flex',
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1000,
            background: "rgba(0, 0, 0, 0.15)",
            overflowY: "hidden"
        }}
            onClick={back}
        >
            <div className="ibox scrollable-pop" style={{
                position: "absolute",
                top: "10%",
                left: "35%",
                width: 400,
            }}>
                <div className="ibox-title">
                    <h4>Commission History</h4>
                    <div className="ibox-tools">
                        <a className="close-link" href="#" onClick={back}>
                            <i className="fa fa-times" />
                        </a>
                    </div>
                </div>
                <div className="ibox-content">
                    {
                        orders.map((order, index) => (
                            <table className='table table-bordered table-sm'>
                                <thead className='py-0'>
                                    <td><span>#{order.order_id}</span></td>
                                    <td>
                                        <span style={{
                                            textTransform: "uppercase",
                                            color: order.status === "accepted" ? "#5ca85c"
                                                : order.status === "started" ? "#ffc300" : "#ff4300",
                                            fontWeight: 'bold',
                                            fontSize: "0.875rem"
                                        }}>
                                            {order.status}
                                        </span>
                                    </td>
                                </thead>
                                <tbody className='py-0'>
                                    <tr className='py-0'>
                                        <td>Plan Name</td>
                                        <td>{
                                            order.plan === "twoPlan" ? "2 Days" : order.plan === "fifteenPlan" ? "15 Days" : "30 Days"
                                        }</td>
                                    </tr>
                                    <tr className='py-0'>
                                        <td>Base Price</td>
                                        <td>
                                            ${parseFloat(order.base_price).toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr className='py-0'>
                                        <td>Discount</td>
                                        <td>
                                            ${order.promo_id !== "PROMOADMIN" ? parseFloat(order.discount).toFixed(2) : 0.00}
                                        </td>
                                    </tr>
                                    <tr className='py-0'>
                                        <td>Commission (10%)</td>
                                        <td>
                                            ${parseFloat(order.base_price * 0.1).toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <a href={`view_order/${order._id}`}>
                                                <span className='text-center'>View</span>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        ))
                    }


                </div>
            </div>
        </div>
    )
}
