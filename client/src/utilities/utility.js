import { defaultThemes } from "react-data-table-component-with-filter";
import moment from "moment";

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
        padding: 2,
        borderRightColor: defaultThemes.default.divider.default,
      },
      width: "fit-content"
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
  },
  {
    name: "User",
    selector: (row, index) => row.user_name,
    sortable: true,
  },
  {
    name: "Restaurant ID",
    selector: (row, index) => row.restaurant_id,
    sortable: true,
  },
  {
    name: "Restaurant Name",
    selector: (row, index) => row.restaurant,
    sortable: true,
  },
  {
    name: "Plan",
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
  },
  {
    name: "End",
    selector: "end_date",
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
    selector: "sid",
  },
  {
    name: " ID",
    selector: "restaurant_id",
    sortable: true,
  },
  {
    name: "Restaurant Email",
    selector: "email",
    sortable: true,
  },
  {
    name: "Restaurant Name",
    selector: "restaurant_name",
    sortable: true,
  },
  {
    name: "Total Chef Amount",
    selector: "amount",
    sortable: true,
  },
  {
    name: "Total Commission Amount",
    selector: "commission",
    sortable: true,
  },
  {
    name: "Total Cancel Amount",
    selector: "cancel",
    sortable: true,
  },
  {
    name: "Amount paid to chef ",
    selector: "commission",
    sortable: true,
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
        <h6 className="text-warning"><span> {row.rating} <i className="fa fa-star" /> </span> </h6>
        <p className="crop" id="test" >
          {row.details}
        </p>
      </div >),
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