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
  const onRowSelected = (row) => {
    let id = row._id;
    console.log(id);
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
        //   paginationRowsPerPageOptions={[1,2,4]}
        //   paginationPerPage={2}
          onRowDoubleClicked={onRowSelected}
        />
      </DataTableExtensions>
    </div>
  );
}
