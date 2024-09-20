import ExcelJs from "exceljs";
import { formatCurrency, getInrType } from "../currencyConverter";

const commisionReportExcelDownload = (
  data: any,
  year: number,
  month: number
) => {
  const date = new Date();
  date.setMonth(month - 1); // Set the month (0-based index)
  const monthName = date.toLocaleString("default", { month: "long" }); // Get the full month name

  // Get the current time
  const hours = date.getHours().toString().padStart(2, "0"); // Get hours in 24-hour format, pad with zero if needed
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Get minutes, pad with zero if needed
  const seconds = date.getSeconds().toString().padStart(2, "0"); // Get seconds, pad with zero if needed

  // Construct the filename with current time
  const fileName = `commision-report-${year}-${monthName}-${hours}-${minutes}-${seconds}`;

  const desiredOrder = [
    "Sl_No",
    "date",
    "first_name",
    "last_name",
    "email",
    "phone",
    "company_name",
    "company_mail",
    "company_phone",
    "university_name",
    "account_number",
    "swift_code",
    "bank_address",
    "branch_name",
    "purpose",
    "source",
    "remitter",
    "status",
    "ebixorderno",
    "custorderno",
    "currency",
    "declaration_amount",
    "exchange_rate",
    "commission_added_rate",
    "gst_charge",
    "tcs_charge",
    "service_charge",
    "nostro_charge",
    "company_markup_amount",
    "sub_total",
    "amount_payable",
    "consultant_charge",
    "admin_charge",
    "consultant_commision",
  ];

  let count = 1;

  const filteredData = data.map((item: any) => {
    // Create the filteredItem by iterating over the desiredOrder array
    const filteredItem = desiredOrder.reduce((acc: any, key: any) => {
      if (key === "Sl_No") {
        acc[key] = count; // Assign the Sl_No value
      } else {
        acc[key] = item[key] || "Not provided"; // Assign the value or a fallback
      }
      return acc;
    }, {});

    count++;
    return filteredItem;
  });

  const columns: any = Object.keys(filteredData[0]).map((key: any) => ({
    header: key
      .split("_")
      .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    key: key,
    width: 15,
    style: {
      alignment: { horizontal: "center", wrapText: true },
    },
  }));

  const workbook = new ExcelJs.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");
  worksheet.columns = columns;

  filteredData.forEach((row: any) => {
    row["sub_total"] = getInrType(row["sub_total"]);
    row["amount_payable"] = getInrType(row["amount_payable"]);
    row["consultant_commision"] = getInrType(row["consultant_commision"]);
    row["declaration_amount"] = formatCurrency(
      row["declaration_amount"],
      row["currency"]
    );

    const values = Object.values(row);
    worksheet.addRow(values);
  });

  worksheet.eachRow(function (row: any, rowNumber: any) {
    row.eachCell(function (cell: any, colNumber: any) {
      const cellValue = cell.value ? cell.value.toString() : "";
      const cellLength = cellValue.length;
      const column = worksheet.getColumn(colNumber);
      const currentWidth = column.width || 0;
      const newWidth = Math.max(currentWidth, cellLength + 10);
      column.width = newWidth;

      if (rowNumber === 1) {
        cell.style.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "CCCCCC" }, // Disabled color (light gray)
        };
        cell.style.font = { bold: true }; // Bold font
      }
    });
  });

  workbook.xlsx.writeBuffer().then((buffer: any) => {
    saveAsExcelFile(buffer, fileName);
  });
};

const saveAsExcelFile = (buffer: any, fileName: any) => {
  const data = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = window.URL.createObjectURL(data);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export default commisionReportExcelDownload;
