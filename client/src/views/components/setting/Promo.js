import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Promo() {
  const [packs, setPacks] = useState([]);
  const [pack, setPack] = useState({
    pack_name: "",
    rpc: "",
    duration: "",
  });
  const fetchPack = async () => {
    const response = await axios.get("/api/banner");
    const { data } = await response.data;
    setPacks(data);
  };
  useEffect(() => {
    fetchPack();
  }, []);

  const save = async () => {
    const response = await axios.post("/api/banner/", pack);
    const bnr = response.data;
    alert(bnr.msg);
  };
  const onChangeText = (e) => {
    const { name, value } = e.target;
    setPack({ ...pack, [name]: value });
  };

  return (
    <div className="ibox-content">
      <div className="row">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Advert ID</th>
              <th>Pack Name</th>
              <th>RPC ($)</th>
              <th>Status</th>
              <th>Duration (Days)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packs.map((data, key) => (
              <tr key={key}>
                <td>{data._id}</td>
                <td>{data.pack_name}</td>
                <td>{data.rpc}</td>
                <td>{data.status}</td>
                <td>{data.duration}</td>
                <td>
                <a href={`/banner/${data._id}`}>
                  <i className="fa fa-trash text-danger tx-118-f" />
                </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group">
            <label>
              Pack Name <strong className="text-danger">*</strong>
            </label>
            <div className="input-group m-b">
              <input
                type="text"
                className="form-control"
                name="pack_name"
                onChange={(e) => onChangeText(e)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="form-group">
            <label>
              Duration <strong className="text-danger">*</strong>
            </label>
            <div className="input-group m-b">
              <input
                type="text"
                className="form-control"
                name="duration"
                onChange={(e) => onChangeText(e)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="form-group">
            <label>
              Rate/Click <strong className="text-danger">*</strong>
            </label>
            <div className="input-group m-b">
              <div className="input-group-prepend">
                <span className="input-group-addon">$</span>
              </div>
              <input
                type="text"
                className="form-control"
                name="rpc"
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
            onClick={save}
          >
            Save
          </button>
          <button type="button" className="btn btn-default float-right mr-2 ">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
