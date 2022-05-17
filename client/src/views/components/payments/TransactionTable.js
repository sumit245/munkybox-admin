import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { transactionStyles } from "../../../utilities/utility";

export default function TransactionTable({ title, columns, data, flag }) {
    const tableData = {
        columns,
        data,
    };
    return (
        <div className="ibox-content">
            <DataTableExtensions filterPlaceholder="Search..." {...tableData} >
                <DataTable
                    title={title}
                    columns={columns}
                    // data={data}
                    responsive
                    highlightOnHover
                    pagination
                    paginationServer
                    noHeader={flag}
                    dense={flag}
                    expandableRows={false}
                    customStyles={transactionStyles}
                />
            </DataTableExtensions>
        </div>
    );
}
