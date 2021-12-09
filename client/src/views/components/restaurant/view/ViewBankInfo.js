import React from "react";
import { useSelector } from "react-redux";

export default function BankInfo() {
  const restaurant = useSelector((state) => state.restaurant);
  const {
    account_name,
    account_number,
    bank_name,
    branch_number,
    institution_number,
  } = restaurant;

  return (
    <div className="ibox">
      <div className="ibox-content">
        <table className="table">
          <tbody>
            <tr>
              <th>Account Holder</th>
              <td>{account_name}</td>
            </tr>
            <tr>
              <th>Account Number</th>
              <td>{account_number}</td>
            </tr>
            <tr>
              <th>Branch #</th>
              <td>{branch_number}</td>
              <th>Bank Name</th>
              <td>{bank_name}</td>
            </tr>
            <tr>
              <th>Institution #</th>
              <td>{institution_number}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
