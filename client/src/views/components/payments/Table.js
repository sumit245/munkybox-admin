import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { payOutStyles } from "../../../utilities/utility";
import PayoutCollapsible from "./PayoutCollapsible";
import "./styles.css";
export default function Table({ title, data, columns, flag }) {


  const tableData = {
    columns,
    data,
  };
  const ExpandedComponent = ({ data }) => <PayoutCollapsible data={data} />;
  return (
    <div className="ibox-content">
      <DataTableExtensions filterPlaceholder="Search..." {...tableData}>
        <DataTable
          title={title}
          columns={columns}
          data={data}
          responsive
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          highlightOnHover
          pagination
          paginationServer
          noHeader={flag}
          dense={flag}
          style={{ overflowWrap: "break-word" }}
          customStyles={payOutStyles}
        />
      </DataTableExtensions>
    </div>
  );
}
