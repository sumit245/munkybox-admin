import React from "react";
import DataTable from "react-data-table-component";
import {customStyles } from "./utility";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

export default function Table({ title, data, columns }) {
  const tableData = {
    columns,
    data,
  };
  return (
    <div className="ibox-content">
      <DataTableExtensions filterPlaceholder="Search..." {...tableData}>
        <DataTable
          title="User"
          columns={columns}
          data={data}
          highlightOnHover
          pagination
          paginationServer
          noHeader
          customStyles={customStyles}
          selectableRows
        />
      </DataTableExtensions>
    </div>
  );
}
