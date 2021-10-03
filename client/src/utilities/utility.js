import { defaultThemes } from "react-data-table-component-with-filter";

export function convertArrayOfObjectsToCSV(array) {
  return null;
}

export function downloadCSV(array) {
  return null;
}

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
export const userColumns = [
  {
    name: "ID",
    selector: "_id",
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
        <a href="/users" className="p-1 ">
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
export const restaurantColumns = [
  {
    name: "ID",
    selector: "_id",
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
    selector: "_id",
    sortable: true,
  },
  {
    name: "User",
    selector: (row, index) => row.user_name,
    sortable: true,
  },
  {
    name: "Restaurant",
    selector: (row, index) => row.restaurant,
    sortable: true,
  },
  {
    name: "Plan",
    selector: "plan",
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
        <a href="/users" className="p-1 ">
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
export const ORDER = [
  {
    _id: "ORD001",
    user_name: "Sumit",
    restaurant: "Ananda Foods Limited",
    plan: "15 Days",
    start_date: "02 Oct 2021",
    end_date: "17 Oct 2021",
    status: "Pending",
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
