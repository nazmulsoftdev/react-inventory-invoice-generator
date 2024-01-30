// Create and Download PDF file
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const InvoicePDF = ({ invoiceInfoHeaderData, invoiceItemsTableData }) => {
  const timeStamp = new Date().toISOString();

  const [userPrice, setUserPrice] = useState(0);

  useEffect(() => {
    let sum = 0;

    invoiceItemsTableData.forEach((item) => {
      sum += item.quantity * item.price;
      return sum;
    });
    if (sum > 0) {
      setUserPrice(sum);
    }
  }, [invoiceItemsTableData]);

  const generatePDF = () => {
    if (
      !invoiceInfoHeaderData.companyName ||
      !invoiceInfoHeaderData.invoiceNumber
    ) {
      toast.error(
        "Company Name and Invoice Number are required to generate the PDF."
      );
      return;
    }
    const doc = new jsPDF();

    // Set font size
    doc.setFontSize(12);

    // Add content to this pdf document

    doc.text("Invoice", 10, 10);
    doc.text(`Company Name: ${invoiceInfoHeaderData.companyName}`, 10, 20);
    doc.text(`Invoice Number: ${invoiceInfoHeaderData.invoiceNumber}`, 10, 30);
    doc.text(`Invoice Date: ${timeStamp}`, 10, 40);
    doc.text(`Customer Name: ${invoiceInfoHeaderData.customerName}`, 10, 50);
    doc.text(`Total Price: ${userPrice}`, 10, 60);

    // Create a Table for Invoice Items

    // Define columns
    const columns = ["Item Name", "Item Brand", "Quantity", "Price", "Total"];

    // Define rows
    const rows = invoiceItemsTableData.map((item) => [
      item.itemName,
      item.itemDescription,
      item.quantity,
      item.price,
      item.quantity * item.price,
    ]);

    // Create the table using jspdf-autotable
    doc.autoTable(columns, rows, {
      startY: 70,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellWidth: "wrap",
        cellPadding: 3,
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 40 },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 30 },
      },
      margin: { left: 10, right: 10 },
    });

    doc.save(`${invoiceInfoHeaderData.invoiceNumber}.pdf`);
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={generatePDF}
        className="p-3 bg-red-500 text-white cursor-pointer rounded-md"
      >
        Generate PDF
      </button>
    </div>
  );
};

export default InvoicePDF;
