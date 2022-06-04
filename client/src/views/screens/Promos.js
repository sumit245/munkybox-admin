import React, { useEffect, useState } from "react";
import Table from "../../utilities/Table";
import axios from "axios";
import { couponColumns } from "../../utilities/utility";
import AdminCoupon from "../components/coupons/AdminCoupon";
import { Modal, Button } from "react-bootstrap";

export default function Promos() {
  const [coupons, setCoupon] = useState([]);
  const [promos, setPromos] = useState([]);
  const [show, setShow] = useState(false);
  const [state, setState] = useState({})

  const handleClose = () => setShow(false);
  const showModal = (state) => setShow(state);
  const getcoupons = async () => {
    const response = await axios.get("/api/coupon/");
    const coupons = await response.data;
    setCoupon(coupons);
  };

  const getPromos = async () => {
    const response = await axios.get("/api/coupon/promo");
    const data = await response.data;
    const promotions = await data.data;
    setPromos(promotions);
  };

  useEffect(() => {
    getcoupons();
    getPromos();
  }, []);

  const onChangeText = ({ target }) => {
    setState((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const saveAdminCoupon = async () => {  
    const response = await axios.post('/api/admin-coupon/', state)
    const { status, msg } = response.data
    if (status === 200) {
      setShow(false)
      alert(msg)
    }
  }

  return (
    <div className="wrapper wrapper-content">
      <AdminCoupon showModal={showModal} />

      <div className="row-lg">
        <Table
          title="Coupons"
          data={coupons}
          columns={couponColumns}
          className="table-responsive table-sm"
        />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div className="form-group">
            <label>
              Promo Text <strong className="text-danger">*</strong>
            </label>
            <textarea
              name="promo_text"
              onChange={(e) => onChangeText(e)}
              type="text"
              className="form-control required"
            />
          </div>
          <div className="form-group">
            <label>
              Promo Code <strong className="text-danger">*</strong>
            </label>
            <input
              name="promo_code"
              onChange={(e) => onChangeText(e)}
              type="text"
              className="form-control required"
            />
          </div>
          <div className="form-group">
            <label>
              Discount(%) <strong className="text-danger">*</strong>
            </label>
            <input
              name="discount"
              onChange={(e) => onChangeText(e)}
              type="text"
              className="form-control required"
            />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveAdminCoupon}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
