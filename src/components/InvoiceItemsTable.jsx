import React, { useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import InvoicePDF from "./InvoicePDF";
import { FaDeleteLeft as DeleteIcon } from "react-icons/fa6";
import { IoIosAddCircleOutline as AddIcon } from "react-icons/io";

const DeleteRowButtonRenderer = (props) => {
  const onCellDeleteClick = () => {
    if (props.onDeleteClick) {
      props.onDeleteClick(props.node);
    }
  };

  return (
    <DeleteIcon
      size={35}
      className="cursor-pointer"
      onClick={onCellDeleteClick}
    />
  );
};

const InvoiceItemsTable = ({
  onRowDataChange,
  invoiceInfoHeaderData,
  invoiceItemsTableData,
}) => {
  const gridRef = useRef();

  const [rowData, setRowData] = useState([{}]);
  const [totalPrice, setTotalPrice] = useState(0);

  // column headers and their definitions
  const columnDefs = [
    {
      headerName: "Sr No.",
      valueGetter: "node.rowIndex + 1",
      width: 80,
    },
    {
      headerName: "Item Name",
      field: "itemName",
      editable: true,
      width: 150,
    },
    {
      headerName: "Item Brand",
      field: "itemDescription",
      editable: true,
      width: 250,
      wrapText: true,
    },
    {
      headerName: "Quantity",
      field: "quantity",
      editable: true,
      width: 150,
    },
    {
      headerName: "Price",
      field: "price",
      editable: true,
      width: 150,
    },
    {
      headerName: "Total",
      field: "total",
      valueGetter: "data.quantity * data.price",
      width: 150,
    },
    {
      headerName: "Delete",
      cellRenderer: DeleteRowButtonRenderer,
      cellRendererParams: {
        onDeleteClick: (node) => {
          handleDeleteRow(node);
        },
      },
      width: 250,
    },
  ];

  // default column functionalities applied to all columns in the grid
  const defaultColDef = {
    resizable: true,
    wrapText: true,
    autoHeight: true,
    sortable: true,
  };

  // Calculate the total price whenever rowData changes
  useEffect(() => {
    const calculatedTotal = rowData.reduce((total, row) => {
      const rowTotal = row.quantity * row.price || 0;
      return total + rowTotal;
    }, 0);
    setTotalPrice(calculatedTotal);
  }, [rowData]);

  // add empty row to the grid
  const addEmptyRow = () => {
    const newRow = {};
    setRowData([...rowData, newRow]);
  };

  // handle row deletion
  const handleDeleteRow = (params) => {
    // return everything except for the deleted row
    const updatedRowData = rowData.filter((row) => row !== params.data);
    setRowData(updatedRowData);
  };

  return (
    <div className="w-full ">
      {/* Invoice title and Add Row Button -- Start */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Invoice Items Table</h1>

        <button
          onClick={addEmptyRow}
          className="bg-green-500 text-white cursor-pointer p-3 rounded-md text-md"
        >
          <AddIcon size={25} className="cursor-pointer" color="white" />
        </button>
      </div>
      {/* Invoice title and Add Row Button -- End */}

      {/* AgGrid Table Start */}
      <div
        className="ag-theme-alpine-dark"
        style={{ height: 500, width: "90vw", border: "2px solid green" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          onCellValueChanged={(params) => {
            onRowDataChange(rowData);
          }}
        />
      </div>
      {/* AgGrid Table End */}

      {/* Display the total price */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <strong>Total Price:</strong> {totalPrice.toFixed(2)}{" "}
          {/* You can format this as needed */}
        </div>
        {/* Pdf button */}
        <InvoicePDF
          invoiceInfoHeaderData={invoiceInfoHeaderData}
          invoiceItemsTableData={invoiceItemsTableData}
        />
      </div>
    </div>
  );
};

export default InvoiceItemsTable;
