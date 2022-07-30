import { defaultThemes } from "react-data-table-component-with-filter";
import moment from "moment";
import { Link } from "react-router-dom";

export const customStyles = {
  headRow: {
    style: {
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      borderTopColor: defaultThemes.default.divider.default,
    },
  },
  headCells: {
    style: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#268bdf",
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        padding: 4,
        borderRightColor: defaultThemes.default.divider.default,
      },
    },
  },

  cells: {
    style: {
      textAlign: "center",

      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        padding: 4,
        borderRightColor: defaultThemes.default.divider.default,
      },
    },
  },
  pagination: {
    style: {
      color: defaultThemes.default.text.secondary,
      fontSize: "13px",
      minHeight: "56px",
      backgroundColor: defaultThemes.default.background.default,
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      borderTopColor: defaultThemes.default.divider.default,
    },
    pageButtonsStyle: {
      borderRadius: "50%",
      height: "40px",
      width: "40px",
      padding: "8px",
      margin: "px",
      cursor: "pointer",
      transition: "0.4s",
      color: defaultThemes.default.button.default,
      fill: defaultThemes.default.button.default,
      backgroundColor: "transparent",
      "&:disabled": {
        cursor: "unset",
        color: defaultThemes.default.button.disabled,
        fill: defaultThemes.default.button.disabled,
      },
      "&:hover:not(:disabled)": {
        backgroundColor: defaultThemes.default.button.hover,
      },
      "&:focus": {
        outline: "none",
        backgroundColor: defaultThemes.default.button.focus,
      },
    },
  },
  noData: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: defaultThemes.default.text.primary,
      backgroundColor: defaultThemes.default.background.default,
    },
  },
  progress: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: defaultThemes.default.text.primary,
      backgroundColor: defaultThemes.default.background.default,
    },
  },
};
export const payOutStyles = {
  headRow: {
    style: {
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      borderTopColor: defaultThemes.default.divider.default,
    },
  },
  headCells: {
    style: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#268bdf",
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        padding: 2,
        borderRightColor: defaultThemes.default.divider.default,
      },
    },
  },

  cells: {
    style: {
      textAlign: "center",
      fontSize: "12px",
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        padding: 2,
        borderRightColor: defaultThemes.default.divider.default,
      },
    },
  },
  pagination: {
    style: {
      color: defaultThemes.default.text.secondary,
      fontSize: "13px",
      minHeight: "56px",
      backgroundColor: defaultThemes.default.background.default,
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      borderTopColor: defaultThemes.default.divider.default,
    },
    pageButtonsStyle: {
      borderRadius: "50%",
      height: "40px",
      width: "40px",
      padding: "8px",
      margin: "px",
      cursor: "pointer",
      transition: "0.4s",
      color: defaultThemes.default.button.default,
      fill: defaultThemes.default.button.default,
      backgroundColor: "transparent",
      "&:disabled": {
        cursor: "unset",
        color: defaultThemes.default.button.disabled,
        fill: defaultThemes.default.button.disabled,
      },
      "&:hover:not(:disabled)": {
        backgroundColor: defaultThemes.default.button.hover,
      },
      "&:focus": {
        outline: "none",
        backgroundColor: defaultThemes.default.button.focus,
      },
    },
  },
  noData: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: defaultThemes.default.text.primary,
      backgroundColor: defaultThemes.default.background.default,
    },
  },
  progress: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: defaultThemes.default.text.primary,
      backgroundColor: defaultThemes.default.background.default,
    },
  },
};
export const transactionStyles = {
  headRow: {
    style: {
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      borderTopColor: defaultThemes.default.divider.default,
    },
  },
  headCells: {
    style: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#268bdf",
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        padding: 2,
        borderRightColor: defaultThemes.default.divider.default,
      },
    },
  },

  cells: {
    style: {
      textAlign: "center",
      fontSize: "12px",
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        padding: 2,
        borderRightColor: defaultThemes.default.divider.default,
      },
    },
  },
  pagination: {
    style: {
      color: defaultThemes.default.text.secondary,
      fontSize: "13px",
      minHeight: "56px",
      backgroundColor: defaultThemes.default.background.default,
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      borderTopColor: defaultThemes.default.divider.default,
    },
    pageButtonsStyle: {
      borderRadius: "50%",
      height: "40px",
      width: "40px",
      padding: "8px",
      margin: "px",
      cursor: "pointer",
      transition: "0.4s",
      color: defaultThemes.default.button.default,
      fill: defaultThemes.default.button.default,
      backgroundColor: "transparent",
      "&:disabled": {
        cursor: "unset",
        color: defaultThemes.default.button.disabled,
        fill: defaultThemes.default.button.disabled,
      },
      "&:hover:not(:disabled)": {
        backgroundColor: defaultThemes.default.button.hover,
      },
      "&:focus": {
        outline: "none",
        backgroundColor: defaultThemes.default.button.focus,
      },
    },
  },
  noData: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: defaultThemes.default.text.primary,
      backgroundColor: defaultThemes.default.background.default,
    },
  },
  progress: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: defaultThemes.default.text.primary,
      backgroundColor: defaultThemes.default.background.default,
    },
  },
};
export const userColumns = [
  {
    name: "ID",
    selector: (row, index) => row.user_id,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row, index) => row.first_name + " " + row.last_name,
    sortable: true,
  },
  {
    name: "Email",
    selector: "email_id",
    sortable: true,
  },
  {
    name: "Mobile",
    selector: "phone",
    sortable: true,
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
  },
  {
    name: "Actions",
    center: true,
    selector: (row) => (
      <>
        <a href={`/view_user/${row._id}`} className="p-1 ">
          <i className="fa fa-eye text-navy" />
        </a>

        <a href={`/users/${row._id}`} className="p-1">
          <i className="fa fa-trash text-danger tx-118-f " />
        </a>
      </>
    ),
  },
];
export const restaurantColumns = [
  {
    name: "ID",
    selector: (row, index) => row.restaurant_id,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row, index) => row.restaurant_name,
    sortable: true,
  },
  {
    name: "Email",
    selector: "email",
    sortable: true,
  },
  {
    name: "Mobile",
    selector: "phone",
    sortable: true,
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
  },
  {
    name: "Actions",
    center: true,
    selector: (row) => (
      <>
        <a href={`/view_restaurant/${row._id}`} className="p-1 ">
          <i className="fa fa-eye text-navy" />
        </a>

        <a href={`/edit_restaurant/${row._id}`} className="p-1">
          <i className="fa fa-edit text-primary" />
        </a>

        <a href={`/newrest/${row._id}`} className="p-1">
          <i className="fa fa-trash text-danger tx-118-f " />
        </a>
      </>
    ),
  },
];
export const orderColumns = [
  {
    name: "ID",
    selector: "order_id",
    sortable: true,
    width: "9%",
  },
  {
    name: "User",
    selector: (row, index) => row.user_name,
    sortable: true,
    width: "10%",
  },
  {
    name: "Rest ID",
    selector: (row, index) => row.restaurant_id,
    sortable: true,
    width: "8%",
  },
  {
    name: "Restaurant",
    selector: (row, index) => row.restaurant,
    sortable: true,
  },
  {
    name: "Plan",
    width: "8%",
    selector: (row, index) =>
      row.plan === "twoPlan"
        ? "2 Meals"
        : row.plan === "fifteenPlan"
        ? "15 Meals"
        : row.plan === "thirtyPlan"
        ? "30 Meals"
        : null,
    sortable: true,
  },
  {
    name: "Start",
    selector: "start_date",
    sortable: true,
    width: "10%",
  },
  {
    name: "End",
    selector: "end_date",
    sortable: true,
    width: "10%",
  },
  {
    name: "Promo",
    selector: (row) => (row.promo_id === "PROMOADMIN" ? row.promo_code : ""),
    width: "8%",
  },
  {
    name: "Discount",
    selector: (row) =>
      row.promo_id === "PROMOADMIN"
        ? "$" + parseFloat(row.discount).toFixed(2)
        : "",
    width: "7%",
  },
  {
    name: "Status",
    width: "8%",
    selector: "status",
    sortable: true,
  },
  {
    name: "Actions",
    center: true,
    width: "7%",
    selector: (row) => (
      <>
        <a href={`/view_order/${row._id}`} className="p-1 ">
          <i className="fa fa-eye text-navy" />
        </a>
        <a href={`/orders/${row._id}`} className="p-1">
          <i className="fa fa-trash text-danger tx-118-f " />
        </a>
      </>
    ),
  },
];
export const cuisineColumns = [
  {
    name: "ID",
    selector: "_id",
    sortable: true,
  },
  {
    name: "Cuisine Name",
    selector: "cuisine_name",
    sortable: true,
  },
  {
    name: "Cuisine Image",
    selector: "image",
    sortable: true,
  },
  {
    name: "Actions",
    center: true,
    selector: (row) => (
      <>
        <a href={`/view_restaurant/${row._id}`} className="p-1 ">
          <i className="fa fa-eye text-navy" />
        </a>

        <a href="/" className="p-1">
          <i className="fa fa-edit text-primary" />
        </a>

        <a href="/" className="p-1">
          <i className="fa fa-trash text-danger tx-118-f " />
        </a>
      </>
    ),
  },
];
export const couponColumns = [
  {
    name: "ID",
    selector: "promo_id",
    sortable: true,
  },
  {
    name: "Restaurant ID",
    selector: "restaurant_id",
    sortable: true,
  },
  {
    name: "Plan",
    selector: "plan_name",
    sortable: true,
  },
  {
    name: "Category",
    selector: "category",
    sortable: true,
  },
  {
    name: "Value",
    selector: (row, index) =>
      row.discount_type === "%" ? row.discount + "%" : "$" + row.discount,
    sortable: true,
  },
  {
    name: "Discount ($)",
    selector: (row, index) => row.absolute_value,
    sortable: true,
  },

  {
    name: "Code",
    selector: "promo_code",
    sortable: true,
  },
  {
    name: "Actions",
    center: true,
    selector: (row) => (
      <>
        <a href={`/view_coupons/${row._id}`} className="p-1 ">
          View Details
        </a>
      </>
    ),
  },
];
export const bannerColumns = [
  {
    name: "ID",
    selector: "promo_id",
    sortable: true,
  },
  {
    name: "Rest ID",
    selector: "restaurant_id",
    sortable: true,
  },
  {
    name: "Plan",
    selector: "plan_name",
    sortable: true,
  },
  {
    name: "Rate/click",
    selector: (row, index) => "$" + row.rpc,
    sortable: true,
  },
  {
    name: "Clicks",
    selector: (row, index) => row.clicks,
    sortable: true,
  },
  {
    name: "Due",
    selector: (row, index) => "$" + row.due,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row, index) => "N/A",
    sortable: true,
  },

  {
    name: "Code",
    selector: "promo_code",
    sortable: true,
  },
  {
    name: "Actions",
    center: true,
    selector: (row) => (
      <>
        <a href={`/view_campaign/${row._id}`} className="p-1 ">
          View Details
        </a>
      </>
    ),
  },
];
export const promoColumns = [
  {
    name: "ID",
    selector: "promo_id",
    sortable: true,
  },
  {
    name: "Restaurant ID",
    selector: "restaurant_id",
    sortable: true,
  },
  {
    name: "Used By",
    selector: "counts",
    sortable: true,
  },
  {
    name: "Actions",
    center: true,
    selector: (row) => (
      <>
        <a href={`/view_coupons/${row._id}`} className="p-1 ">
          View Details
        </a>
      </>
    ),
  },
];
export const payColumns = [
  {
    name: "S No.",
    width: "64px",
    selector: (row, index) => index + 1,
  },
  {
    name: " ID",
    selector: (row) => row.restID,
    sortable: true,
    width: "86px",
  },
  {
    name: "Email",
    selector: (row) => row.restEmail,
    width: "178px",
    sortable: true,
  },
  {
    name: "Restaurant",
    selector: (row) => row.restName,
    width: "168px",
    sortable: true,
  },
  {
    name: "Base Revenue",
    selector: (row) =>
      "$" + parseFloat(row.totalMerchAmt + row.totalAddOnAmt).toFixed(2),
    width: "114px",
    sortable: true,
  },
  {
    name: "Commission",
    selector: (row) => "$" + parseFloat(row.totalCommissionAmt).toFixed(2),
    width: "114px",
    sortable: true,
  },
  {
    name: "Gross Income",
    selector: (row) =>
      "$" +
      parseFloat(
        row.totalMerchAmt + row.totalAddOnAmt - row.totalCommissionAmt
      ).toFixed(2),
    width: "114px",
    style: { overflowWrap: "break-word" },
    sortable: true,
  },
  {
    name: "Net Income",
    selector: (row) =>
      "$" +
      parseFloat(
        row.totalMerchAmt +
          row.totalAddOnAmt -
          row.totalCommissionAmt -
          row.totalDiscount -
          row.totalBannerDue
      ).toFixed(2),
    width: "114px",
    sortable: true,
  },

  {
    name: "Paid",
    selector: (row) => "$" + parseFloat(row.paidAmt || 0).toFixed(2),
    sortable: true,
    width: "84px",
  },
  {
    name: "Due",
    selector: (row) =>
      "$" +
      parseFloat(
        row.totalMerchAmt +
          row.totalAddOnAmt -
          row.totalCommissionAmt -
          row.totalDiscount -
          row.totalBannerDue
      ).toFixed(2),
    sortable: true,
    width: "114px",
  },
];
export const transactionColumns = [
  {
    name: "S No.",
    width: "64px",
    selector: (row, index) => index + 1,
  },
  {
    name: "Amount",
    selector: (row) => row.chefBalance,
    width: "178px",
    sortable: true,
  },
  {
    name: "Transaction ID",
    selector: (row) => row.txn_id,
    sortable: true,
    width: "160px",
  },
  {
    name: "Deposited on",
    selector: (row) =>
      moment(row.deposit_date).isValid()
        ? moment(row.deposit_date).format("DD/MM/YYYY HH:mm:ss A")
        : "",
    width: "140px",
    sortable: true,
  },
  {
    name: "Payout Start Date",
    selector: (row) => moment(row.payout_start_date).format("Do MMM"),
    width: "140px",
    sortable: true,
  },
  {
    name: "Payout End Date",
    selector: (row) => moment(row.payout_end_date).format("Do MMM"),
    sortable: true,
    width: "148px",
  },
  {
    name: "Action",
    selector: (row, index) => (
      <div>
        <Link
          className={`btn ${
            row.status === "Paid" ? "btn-secondary" : "btn-primary"
          } mx-2 my-1`}
          to={{ pathname: `/deposit_money/${index}`, query: { ...row } }}
        >
          {row.status === "Paid" ? "Paid" : "Pay"}
        </Link>
        <Link
          className="btn btn-warning mx-2 my-1"
          to={{ pathname: `/commission_tracking/`, query: { ...row } }}
        >
          View
        </Link>
      </div>
    ),
    sortable: true,
    width: "168px",
  },
];
export const reviewColumns = [
  {
    name: "User ID",
    selector: (row, index) => row.user_id,
    width: 100,
    sortable: true,
  },
  {
    name: "Restaurant ID",
    selector: (row, index) => row.restaurant_id,
    width: 140,
    sortable: true,
  },
  {
    name: "Order ID",
    selector: (row, index) => row.order_id,
    width: 120,
    sortable: true,
  },
  {
    name: "Order Time",
    selector: (row, index) => moment(row.order_time).format("DD-MMM-YYYY"),
    width: 120,
    sortable: true,
  },
  {
    name: "Review",
    selector: (row, index) => (
      <div className="text-justify">
        <h6 className="text-warning">
          <span>
            {" "}
            {row.rating} <i className="fa fa-star" />{" "}
          </span>{" "}
        </h6>
        <p className="crop" id="test">
          {row.details}
        </p>
      </div>
    ),
    width: 360,
    sortable: true,
  },
  {
    name: "Actions",
    center: true,
    selector: (row) => (
      <>
        <a href={`/view_review/${row._id}`} className="p-1 ">
          <i className="fa fa-eye text-navy" />
        </a>
        <a href={`/review/${row._id}`} className="p-1">
          <i className="fa fa-trash text-danger tx-118-f " />
        </a>
      </>
    ),
  },
];
