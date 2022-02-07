import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { payOutStyles } from "../../../utilities/utility";
import { AiOutlinePlusSquare } from "react-icons/ai";
import "./styles.css";

export default function Table({ title, data, columns, flag }) {
  const tableData = {
    columns,
    data,
  };
  const expandableIcon = () => <AiOutlinePlusSquare />;

  return (
    <div className="ibox-content">
      <DataTableExtensions filterPlaceholder="Search..." {...tableData}>
        <DataTable
          title={title}
          columns={columns}
          data={data}
          responsive
          expandableRows
          expandableIcon={expandableIcon}
          highlightOnHover
          pagination
          paginationServer
          noHeader={flag}
          dense={flag}
          customStyles={payOutStyles}
        />
      </DataTableExtensions>
    </div>
  );
}
