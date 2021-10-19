import React from "react";
import DataTable from "react-data-table-component";
import { customStyles } from "./utility";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

export default function Table({ title, data, columns, flag }) {
  const tableData = {
    columns,
    data,
  };
  return (
    <div className="ibox-content">
      <DataTableExtensions filterPlaceholder="Search..." {...tableData}>
        <DataTable
          title={title}
          columns={columns}
          data={data}
          highlightOnHover
          pagination
          paginationServer
          noHeader={flag}
          dense={flag}
          customStyles={customStyles}
          selectableRows
        />
      </DataTableExtensions>
    </div>
  );
}
