import ExcelJs from "exceljs";
import { showWarningAlert } from "../constants/alerts";

const excelDownload = (data: any, colom: any) => {
  if (data.length === 0) {
    showWarningAlert("There is no data to download");

    return;
  }

  const headers = colom
    .filter(
      (item: any) => item.accessor !== "" && item.accessor !== "intake_month"
    )
    .map((item: any) => item.accessor);


  let count = 1;
  const filteredData = data.map((item: any) => {
    const filteredItem: any = {};

    headers.forEach((header: string) => {
      if (item.hasOwnProperty(header)) {
        filteredItem.id = count;
        if (header === "first_name") {
          filteredItem.name = `${item.first_name} ${item.last_name}`;
        } else {
          const value = item[header] ? item[header] : "Empty";
          filteredItem[header] = value;
        }
      } else {
        filteredItem[header] = "";
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

  worksheet.eachRow(function (row, rowNumber) {
    row.eachCell(function (cell, colNumber) {
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

  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAsExcelFile(buffer, "data.xlsx");
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

export default excelDownload;
