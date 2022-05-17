import React from 'react'
import { useHistory, useParams } from "react-router-dom"

export default function Deposit() {
  const history = useHistory()
  const { id } = useParams()
  const back = (e) => {
    e.stopPropagation()
    history.goBack()
  }
  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      background: "rgba(0, 0, 0, 0.15)"
    }}
      onClick={back}
    >
      <div className="ibox" style={{
        position: "absolute",
        top: "10%",
        left: "25%",
        width: 400
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
                <li className='list-group-item fist-item'>
                  <span className='float-right'>123456</span>
                  <span>Account No. </span>
                </li>
                <li className='list-group-item'>
                  <span className='float-right'>ICICI Bank</span>
                  <span>Bank Name</span>
                </li>
                <li className='list-group-item'>
                  <span className='float-right'>123456</span>
                  <span>Branch #</span>
                </li>
                <li className='list-group-item'>
                  <span className='float-right'>123456</span>
                  <span>Instituion #</span>
                </li>
              </ul>
            </div>
          </div>
          <div className='row mx-2 my-2'>
            <div class="input-group">
              <input type="text" class="form-control" placeholder='Enter Transaction ID' />
              <span class="input-group-append">
                <button type="button" class="btn btn-warning">Submit
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
