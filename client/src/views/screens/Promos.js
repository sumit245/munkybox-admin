import React, { useEffect, useState } from "react";
import Table from "../../utilities/Table";
import axios from "axios";
import { couponColumns, promoColumns } from "../../utilities/utility";
import PromotionCard from "../components/promotions/PromotionCard";

export default function Promos() {
  const [coupons, setCoupon] = useState([]);
  const [promos, setPromos] = useState([]);
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
  return (
    <div className="wrapper wrapper-content">
      <PromotionCard total={coupons && coupons.length}/>
      <div className="row-lg m-b-sm ">
        <Table
          title="Coupons"
          data={coupons}
          columns={couponColumns}
          className="table-responsive table-sm"
        />
      </div>
      <div className="row-lg">
        <Table title="Statistics" data={promos} columns={promoColumns} />
      </div>
    </div>
  );
}
