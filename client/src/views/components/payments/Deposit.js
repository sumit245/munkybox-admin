import React, { useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom"

export default function Deposit() {
  const history = useHistory()
  const back = (e) => {
    e.stopPropagation()
    history.goBack()
  }

  return (
    <div style={{
      position: "fixed",
      display: 'flex',
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1000,
      background: "rgba(0, 0, 0, 0.8)",
      overflowY: "hidden"
    }}
      onClick={back}
    >
      <div className="ibox" style={{
        position: "absolute",
        top: "10%",
        left: "35%",
        width: 400,
      }}>
        <div className="ibox-title">
          <h4>Net Banking Details</h4>
          <small>You have to pay <strong className='text-danger'>$135.40</strong></small>
          <div className="ibox-tools">
            <a className="close-link" href="#" onClick={back}>
              <i className="fa fa-times" />
            </a>
          </div>
        </div>
        <div className="ibox-content no-padding">
          <div className="row px-4 py-4">
            <div className='col-md-12'>
              <ul className='list-group clear-list'>
                <li className='list-group-item fist-item' key="1">
                  <span className='float-right'>123456</span>
                  <span>Account No. </span>
                </li>
                <li className='list-group-item' key="2">
                  <span className='float-right'>ICICI Bank</span>
                  <span>Bank Name</span>
                </li>
                <li className='list-group-item'key="3">
                  <span className='float-right'>123456</span>
                  <span>Branch #</span>
                </li>
                <li className='list-group-item' key="4">
                  <span className='float-right'>123456</span>
                  <span>Instituion #</span>
                </li>
              </ul>
            </div>
          </div>
          <div className='row mx-2 my-2'>
            <div className="input-group">
              <input type="text" className="form-control" placeholder='Enter Transaction ID' />
              <span className="input-group-append">
                <button type="button" className="btn btn-warning">Submit
                </button> </span></div>
          </div>
          <div className='row my-2 mx-2 justify-content-end'>
            <button type="button" className='btn btn-danger btn-outline mx-2 my-2' onClick={back}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
