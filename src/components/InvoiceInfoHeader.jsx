import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for styling
import { FiArrowUpCircle as UpArrowIcon } from "react-icons/fi";
import { FiArrowDownCircle as DownArrowIcon } from "react-icons/fi";

const InvoiceInfoHeader = ({ invoiceInfoData, onInvoiceInfoChange }) => {
  const [toggle, setToggle] = useState(true);

  const handleDateChange = (date) => {
    onInvoiceInfoChange("invoiceDate", date); // Update the state with the selected date
  };

  // Ensure invoiceInfoHeadersArray is always an array
  const invoiceInfoHeadersArray = [
    {
      label: "Company Name",
      value: invoiceInfoData.companyName,
      onChange: (value) => onInvoiceInfoChange("companyName", value),
    },
    {
      label: "Company Address",
      value: invoiceInfoData.companyAddress,
      onChange: (value) => onInvoiceInfoChange("companyAddress", value),
    },
    {
      label: "Customer Name",
      value: invoiceInfoData.customerName,
      onChange: (value) => onInvoiceInfoChange("customerName", value),
    },
    {
      label: "Customer Address",
      value: invoiceInfoData.customerAddress,
      onChange: (value) => onInvoiceInfoChange("customerAddress", value),
    },
    {
      label: "Invoice Number",
      value: invoiceInfoData.invoiceNumber,
      onChange: (value) => onInvoiceInfoChange("invoiceNumber", value),
    },
    {
      label: "Invoice Date",
      value: invoiceInfoData.invoiceDate,
      onChange: (value) => onInvoiceInfoChange("invoiceDate", value),
    },
  ];

  return (
    <div>
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold">Invoice Info Header</h1>
        <div onClick={() => setToggle(!toggle)} className="cursor-pointer">
          {toggle ? (
            <UpArrowIcon color="white" size={25} />
          ) : (
            <DownArrowIcon color="white" size={25} />
          )}
        </div>
      </div>
      {toggle && (
        <div className=" grid grid-cols-1 gap-5 lg:grid lg:grid-cols-2 lg:gap-5">
          {invoiceInfoHeadersArray.map((item) => (
            <div key={item.label} className="w-full ">
              <label className="block text-sm text-neutral-content pb-1">
                {item.label}
              </label>
              <div className="relative">
                {" "}
                {/* Use a wrapper div for consistent styling */}
                {item.label === "Invoice Date" ? (
                  <DatePicker
                    selected={item.value}
                    onChange={handleDateChange}
                    dateFormat="dd-MM-yyyy"
                    className="input input-bordered w-full" // Apply the same CSS class
                  />
                ) : (
                  <input
                    className="w-full input input-bordered "
                    type="text"
                    value={item.value}
                    onChange={(e) => item.onChange(e.target.value)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoiceInfoHeader;
