import ExcelJs from "exceljs";

const commisionReportExcelDownload = (
  data: any,
  year: number,
  month: number
) => {
  const date = new Date();
  date.setMonth(month - 1); // Set the month (0-based index)
  const monthName = date.toLocaleString("default", { month: "long" }); // Get the full month name
  const fileName = `commision-report-${year}-${monthName}`;

  const headers = Object.keys(data[0]);

  let count = 1;
  const filteredData = data.map((item: any) => {
    const filteredItem: any = {};

    headers.forEach((header: string) => {
      if (item.hasOwnProperty(header)) {
        filteredItem.Sl_No = count;
        const value = item[header] ? item[header] : "Not provided";
        filteredItem[header] = value;
      }
    });

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
