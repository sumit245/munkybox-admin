import React, { useEffect, useState } from "react";
import Table from "../../utilities/Table";
import axios from "axios";
import { bannerColumns } from "../../utilities/utility";
import PromotionCard from "../components/promotions/PromotionCard";

export default function Promos() {
  const [coupons, setCoupon] = useState([]);
  const [promos, setPromos] = useState([]);
  const getcoupons = async () => {
    const response = await axios.get("/api/promo/");
    const { data } = await response.data;
    setCoupon(data);
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
  }, [coupons]);
  return (
    <div className="wrapper wrapper-content">
      <PromotionCard total={coupons && coupons.length} />
      <div className="row-lg m-b-sm ">
        <Table
          title="Campaigns"
          data={coupons}
          columns={bannerColumns}
          className="table-responsive table-sm"
        />
      </div>
    </div>
  );
}
