import axios from 'axios'
import React, { useState, useEffect } from 'react'

export default function AdminCoupon({ showModal }) {
  const [coupon, setCoupon] = useState([])
  const [numOrders, setNumOrders] = useState("")
  const [sales, setSales] = useState("")
  const [twoMeals, setTwoMeals] = useState("")
  const [fifteenMeal, setFifteenMeal] = useState("")
  const [thirtyMeal, setThirtyMeal] = useState("")
  const fetchCoupon = async () => {
    const response = await axios.get('/api/admin-coupon')
    const { data } = response
    const { coupons, numOrders, sales, twoPlans, fifteenPlan, thirtyPlan } = data
    setCoupon(coupons)
    setNumOrders(numOrders)
    setSales(sales)
    setTwoMeals(twoPlans)
    setFifteenMeal(fifteenPlan)
    setThirtyMeal(thirtyPlan)
  }
  useEffect(() => {
    fetchCoupon()
  }, [coupon])

  const deleteCoupon = async (id) => {
    const response = await axios.delete('/api/admin-coupon/' + id)
    const { status } = response.data
    if (status === 200) {
      alert("Deleted")
    }
  }

  return (
    <div className="ibox">
      <div className='ibox-title'>
        <h3>Admin Coupon</h3>
        <div className='ibox-tools'>
          <button className='btn btn-primary' type='button' onClick={() => showModal(true)}>
            <i className='fa fa-plus'></i>
          </button>
        </div>
      </div>
      <div className='ibox-content'>

        <table className='table table-bordered table-sm'>
          <thead>
            <tr>
              <td>Code</td>
              <td>Discount(%)</td>
              <td>Total Sales</td>
              <td>Total Orders</td>
              <td>Meal Plan</td>
            </tr>
          </thead>
          <tbody>
            {
              coupon.map((data, key) => (
                <tr key={key}>
                  <td>{data.promo_code}</td>
                  <td>{data.discount}</td>
                  <td>${sales}</td>
                  <td>{numOrders}</td>
                  <td>
                    <span>2 Meals: {twoMeals}</span>
                    <br />
                    <span>15 Meals: {fifteenMeal}</span>
                    <br />
                    <span>30 Meals: {thirtyMeal}</span>
                  </td>
                  <td>
                    <button className='btn btn-danger mx-2' onClick={() => deleteCoupon(data._id)}>Delete</button>
                  </td>
                </tr>
              ))
            }

          </tbody>


        </table>

      </div>

    </div>
  )
}
