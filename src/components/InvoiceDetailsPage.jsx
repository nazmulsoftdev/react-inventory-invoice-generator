// InvoiceDetails which is parent to all Invoice components
import { useState } from "react";
import InvoiceInfoHeader from "./InvoiceInfoHeader";
import InvoiceItemsTable from "./InvoiceItemsTable";

const InvoiceDetailsPage = () => {
  const [invoiceInfoHeader, setInvoiceInfoHeader] = useState({
    companyName: "",
    companyAddress: "",
    customerName: "",
    customerAddress: "",
    invoiceNumber: "",
    invoiceDate: "",
  });

  const handleInvoiceInfoHeaderChange = (name, value) => {
    setInvoiceInfoHeader({ ...invoiceInfoHeader, [name]: value });
  };

  const [rowItemData, setRowItemData] = useState([]);

  const handleRowDataChange = (data) => {
    setRowItemData(data);
  };

  return (
    <>
      {/* InvoiceInfoHeader Start */}
      <div className="card w-full bg-base-300 shadow-xl border-b-2 border-indigo-500 mt-3">
        <div className="card-body">
          <InvoiceInfoHeader
            invoiceInfoData={invoiceInfoHeader}
            onInvoiceInfoChange={(name, value) =>
              handleInvoiceInfoHeaderChange(name, value)
            }
          />
        </div>
      </div>
      {/* InvoiceInfoHeader End */}

      {/* InvoiceItemsTable Start  */}
      <div className="card w-full bg-base-300 shadow-xl my-4 border-b-2 border-indigo-500">
        <div className="flex justify-center items-center m-6">
          <InvoiceItemsTable
            onRowDataChange={handleRowDataChange}
            invoiceInfoHeaderData={invoiceInfoHeader}
            invoiceItemsTableData={rowItemData}
          />
        </div>
      </div>
      {/* InvoiceItemsTable End  */}
    </>
  );
};

export default InvoiceDetailsPage;
