import axios from "axios";
import React, { useState, useEffect } from "react";
import Loading from "../../../utilities/Loading";

export default function ServiceCharges() {
  const [charges, setCharges] = useState({
    _id: "",
    delivery_fee: "",
    service_fee: "",
    commission: "",
    charges: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let componentMounted = true;
    const fetchdata = async () => {
      const response = await axios.get(
        "/api/checkout/6088240787ea8208fcb85863"
      );
      if (componentMounted) {
        setCharges(response.data);
      }
    };
    fetchdata();
    return () => {
      componentMounted = false;
    };
  }, []);
  const onChangeText = ({ target }) => {
    const { name, value } = target;
    setCharges((prevState) => ({ ...prevState, [name]: value }));
  };
  const done = async () => {
    setLoading(true);
    const response = await axios.put(
      "/api/checkout/6088240787ea8208fcb85863",
      charges
    );
    if (response.status === 200) {
      setLoading(false);
      alert("Charges updated");
    }
  };
  return !loading ? (
    <div className="ibox-content">
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group">
            <label>
              Commission <strong className="text-danger">*</strong>
            </label>
            <div className="input-group m-b">
              <div className="input-group-prepend">
                <span className="input-group-addon">%</span>
              </div>
              <input
                type="text"
                className="form-control"
                defaultValue={charges.commission}
                name="commission"
                onChange={(e) => onChangeText(e)}
              />
              <div className="input-group-append">
                <span className="input-group-addon">.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="form-group">
            <label>
              Delivery Charges <strong className="text-danger">*</strong>
            </label>
            <div className="input-group m-b">
              <div className="input-group-prepend">
                <span className="input-group-addon">$</span>
              </div>
              <input
                type="text"
                className="form-control"
                name="delivery_fee"
                onChange={(e) => onChangeText(e)}
                defaultValue={charges.delivery_fee}
              />
              <div className="input-group-append">
                <span className="input-group-addon">.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="form-group">
            <label>
              Service Charges <strong className="text-danger">*</strong>
            </label>
            <div className="input-group m-b">
              <div className="input-group-prepend">
                <span className="input-group-addon">%</span>
              </div>
              <input
                type="text"
                className="form-control"
                defaultValue={charges.service_fee}
                name="service_fee"
                onChange={(e) => onChangeText(e)}
              />
              <div className="input-group-append">
                <span className="input-group-addon">.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="form-group">
            <label>
              Taxes <strong className="text-danger">*</strong>
            </label>
            <div className="input-group m-b">
              <div className="input-group-prepend">
                <span className="input-group-addon">%</span>
              </div>
              <input
                type="text"
                className="form-control"
                defaultValue={charges.taxes}
                name="taxes"
                onChange={(e) => onChangeText(e)}
              />
              <div className="input-group-append">
                <span className="input-group-addon">.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 justify-content-end">
          <button
            type="button"
            className="btn btn-primary float-right mr-2"
            onClick={done}
          >
            Update
          </button>
          <button type="button" className="btn btn-default float-right mr-2 ">
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
