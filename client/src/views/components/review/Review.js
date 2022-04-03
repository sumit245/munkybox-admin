import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Table from '../../../utilities/Table'
import { reviewColumns } from '../../../utilities/utility'

export default function Review() {
    const [reviews, setReview] = useState([])  
    const fetchReview = async () => {
        const response = await axios.get('/api/review')
        const { data } = response
        setReview(data)
    }
    useEffect(() => {
        let component = true;
        if (component) {
            fetchReview()
        }
        return () => {
            component = false
        }
    }, [])


    return (
        <div className="wrapper wrapper-content">

            <Table title="Orders" data={reviews} flag={true} columns={reviewColumns} />
        </div>
    )
}
