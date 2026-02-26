<script setup>
import { onMounted, onBeforeUnmount, watch, ref ,defineExpose} from "vue";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";


import jsPDF from "jspdf";
import "jspdf-autotable";


jsPDF.prototype.autoTable = function (options) {
  return autoTable(this, options);
};
// autoTable(jsPDF);



  const props = defineProps({
    rows: {
      type: Array,
      default: () => []
    }
  });

  const tableRef = ref(null);
  let tableInstance = null;

  function formatBoolean(cell) {
    return cell.getValue() ? "ON" : "OFF";
  }

  function formatDate(cell) {
    const value = cell.getValue();
    if (!value) return "";
    return new Date(value).toLocaleString("id-ID");
  }

  function numberFormatter(cell) {
    const value = Number(cell.getValue());
    if (isNaN(value)) return "";

    // bulat -> tanpa koma
    if (Number.isInteger(value)) {
      return value.toLocaleString(undefined, {
        useGrouping: false,   // hilangkan separator ribuan
      });
    }

    // ada pecahan -> bulatkan jadi 2 digit
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      useGrouping: false,     // hilangkan separator ribuan
    });
  }

  function agregatSUMFormatter(cell) {
    const value = Number(cell.getValue());
    if (isNaN(value)) return "";

    // bulat -> tanpa koma
    if (Number.isInteger(value)) {
      return "Total = " + value.toLocaleString(undefined, {
        useGrouping: false,   // hilangkan separator ribuan
      });
    }

    // ada pecahan -> bulatkan jadi 2 digit
    return "Total = " + value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: false,     // hilangkan separator ribuan
    });
  }

  onMounted(() => {
    tableInstance = new Tabulator(tableRef.value, {

      layout: "fitColumns",
      autoResize: true,
      responsiveLayout: "collapse",
      pagination: true,
      paginationMode: "local",
      paginationSize: 50,
      paginationCounter:"rows",
      data: props.rows,
      paginationSizeSelector: [10, 50, 100, 500, 1000,true], // dropdown pilihan
      selectable: 1, // hanya boleh pilih 1 row
      //rowHeight: 30,   // tinggi minimum setiap row (px)
      // columns: props.columns, // ✅ kolom dikirim dari parent
      theme: "midnight",   // 👈 penting
      columnCalcs: true,

        dependencies: {
          jspdf: jsPDF,
        },


      columns: [
        { title: "Log Time", field: "log_time", width: 180, formatter: formatDate },
        { title: "Station", field: "station_id", width: 90 },

        { title: "Level Danau", field: "level_danau", hozAlign: "right" },

        {
          title: "Pompa 1",
          headerHozAlign: "center",
          columns: [
          { title: "P1", field: "pump1_on", formatter: formatBoolean },
          { title: "SP1", field: "sp_pump1" },
          { title: "I1", field: "current_pump1",hozAlign: "right",
            bottomCalc:"avg",
            bottomCalcFormatter: agregatSUMFormatter },
          ],
        },
        {
          title: "Pompa 2",
          headerHozAlign: "center",
          columns: [
          { title: "P2", field: "pump2_on", formatter: formatBoolean },
          { title: "SP2", field: "sp_pump2" },
          { title: "I2", field: "current_pump2",hozAlign: "right",
            bottomCalc:"avg",
            bottomCalcFormatter: agregatSUMFormatter },
          ],
        },
        {
          title: "Pompa 3",
          headerHozAlign: "center",
          columns: [
          { title: "P3", field: "pump3_on", formatter: formatBoolean },
          { title: "SP3", field: "sp_pump3" },
          { title: "I3", field: "current_pump3",hozAlign: "right",
            bottomCalc:"avg",
            bottomCalcFormatter: agregatSUMFormatter },
          ],
        },
        {
          title: "Pompa 4",
          headerHozAlign: "center",
          columns: [
          { title: "P4", field: "pump4_on", formatter: formatBoolean },
          { title: "SP4", field: "sp_pump4" },
          { title: "I4", field: "current_pump4",hozAlign: "right",
            bottomCalc:"avg",
            bottomCalcFormatter: agregatSUMFormatter },
          ],
        },

        
      ],

      initialSort: [
        { column: "log_time", dir: "desc" }
      ]
    });

  });


  watch(
    () => props.rows,
    (newData) => {
      if (tableInstance && Array.isArray(newData)) {
        tableInstance.setData(newData);
      }
    },
    { immediate: true }
  );

  onBeforeUnmount(() => {
    if (tableInstance) {
      tableInstance.destroy();
    }
  });

  function downloadCSV() {
  tableInstance.download("csv", "pump_report.csv");
}

  function downloadPDF() {
    tableInstance.download("pdf", "pump_report.pdf", {
      orientation: "landscape",
      title: "Pump Report"
    });
  }

  // function downloadPDF() {
  //   tableInstance.download("pdf", "pump_report.pdf", {
  //     orientation: "landscape",
  //     title: "Pump Report",
  //   });
  // }

defineExpose({
  downloadCSV,
  downloadPDF
});

</script>





<template>
  <div class="PikDailyReportTabulator">
      <div ref="tableRef"></div>
  </div>
</template>



<style>

  /* ////////////////////////// header //////////////////// */
  
    .PikDailyReportTabulator {
      width: 100%;
      max-width: 100%;
      min-width: 0;            
      overflow-x: auto; 
    }

    .PikDailyReportTabulator .tabulator {
      width: 100%;
      border: 2px solid #DCDCDC; 
    }

  /* /////////////////////////////////////////////////////// */


    .PikDailyReportTabulator .tabulator .tabulator-header .tabulator-col {
      background-color: #fff !important;  /* warna background */
      color: #333 !important;          /* warna teks */
      font-family: "Segoe UI", Arial, sans-serif; /* font */
      font-size: 12px;
      font-weight: bold;
      border-top: 1px solid #F3F2EC; 
      border-bottom: 1px solid #F3F2EC;       /* garis pemisah */
    }

    .PikDailyReportTabulator .tabulator .tabulator-header .tabulator-col {
      background-color: #fff !important;  /* warna background */
      color: #333 !important;          /* warna teks */
      font-family: "Segoe UI", Arial, sans-serif; /* font */
      font-size: 12px;
      font-weight: bold;
      border-top: 1px solid #F3F2EC; 
      border-bottom: 1px solid #F3F2EC;       /* garis pemisah */
    }

    /* teks header pas hover */
    .PikDailyReportTabulator .tabulator .tabulator-header .tabulator-col:hover {
      background-color: #065084 !important;
      color: #ffffff !important;
    }

    .PikDailyReportTabulator .tabulator .tabulator-tableholder {
      background-color: #DCDCDC !important;
    }

  /* /////////////////////////////////////////////////////// */


  /* ////////////////////////// footer //////////////////// */

    /* footer container */
    .PikDailyReportTabulator .tabulator .tabulator-footer {
      background-color: #fff !important;   /* ganti warna background */
      color: #333 !important;           /* warna teks */
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 13px;
      padding: 6px 10px;
      border-top: 0px solid #00ffcc;       /* garis pemisah */
    }

    /* tombol pagination */
    .PikDailyReportTabulator .tabulator .tabulator-footer .tabulator-page {
      background: #fff !important;
      color: #333 !important;
      border-radius: 4px;
      margin: 0 2px;
      padding: 4px 8px;
      font-size: 12px;
    }
    
    /* tombol aktif */
    .PikDailyReportTabulator .tabulator .tabulator-footer .tabulator-page.active {
      background: #D3DAD9 !important;
      color: #000 !important;
    }

    .PikDailyReportTabulator .tabulator .tabulator-footer .tabulator-footer-contents .tabulator-page-counter {
      /* background: #00ffcc !important; */
      color: #000 !important;
    }

    .PikDailyReportTabulator .tabulator .tabulator-footer {
        padding: 0 !important;
        margin: 0 !important;
    }

  /* /////////////////////////////////////////////////// */

  /* ////////////////////////// row //////////////////// */

    .PikDailyReportTabulator .tabulator .tabulator-col-content,
    .tabulator .tabulator-cell {
        padding: 4px 6px; /* samakan padding header, body, footer */
    }

  /* ////////////////////////// row //////////////////// */



    /* option untuk row tambahan aggregate */
    .PikDailyReportTabulator .tabulator .tabulator-calcs-holder .tabulator-row {
        font-weight: bold;
        background-color: red; 
        /* misalnya biar beda */
        /* background-color: #111; */
        color: yellow;
    }
    /* row dasar */
    .PikDailyReportTabulator .tabulator .tabulator-row {
      background-color: #F3F2EC;    /* warna background */
      color: #000000;               /* warna teks */
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 13px;
      border-bottom: 1px solid #000000; /* garis antar baris */
    }
    /* efek hover */
    .PikDailyReportTabulator .tabulator .tabulator-row:hover {
      /* warna abu tipis */
      background-color: #333 !important;
      /* warna hijau cyan */
      color: #00ffcc !important;
    }


    /* semua cell */
    .PikDailyReportTabulator .tabulator .tabulator-cell {
      /* padding: <top-bottom> <left-right> */
      padding: 0px 20px;
      font-size: 13px;
    }
    .PikDailyReportTabulator .tabulator .tabulator-row:nth-child(even) {
      /* kolom ganjil warna hitam agak abu */
      background-color: #DCDCDC;
    }
    .PikDailyReportTabulator .tabulator .tabulator-row:nth-child(odd) {
      /* kolom genap warna hitam gelap */
      background-color: #F3F2EC;
    }

    .PikDailyReportTabulator .tabulator .tabulator-row.tabulator-selected {
      background-color: #065084 !important;
      color: #fff !important;
    }

  /* ////////////////////////// row //////////////////// */

</style>




<!-- <style>

    .PikDailyReportTabulator {
      width: 100%;
      max-width: 100%;
      min-width: 0;            
      overflow-x: auto; 
    }

    .PikDailyReportTabulator .tabulator {
      /* width: 100%; */
      border: 2px solid #DCDCDC; 
    }

  /* ////////////////////////// header //////////////////// */

    .PikDailyReportTabulator .tabulator .tabulator-header .tabulator-col {
      background-color: #fff !important;  /* warna background */
      color: #333 !important;          /* warna teks */
      font-family: "Segoe UI", Arial, sans-serif; /* font */
      font-size: 12px;
      font-weight: bold;
      border-top: 1px solid #F3F2EC; 
      border-bottom: 1px solid #F3F2EC;       /* garis pemisah */
    }

    /* teks header pas hover */
    .PikDailyReportTabulator .tabulator .tabulator-header .tabulator-col:hover {
      background-color: #065084 !important;
      color: #ffffff !important;
    }

    .PikDailyReportTabulator .tabulator .tabulator-tableholder {
      background-color: #DCDCDC !important;
    }

  /* /////////////////////////////////////////////////////// */


  /* ////////////////////////// footer //////////////////// */

    /* footer container */
    .PikDailyReportTabulator .tabulator .tabulator-footer {
      background-color: #fff !important;   /* ganti warna background */
      color: #333 !important;           /* warna teks */
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 13px;
      padding: 6px 10px;
      border-top: 0px solid #00ffcc;       /* garis pemisah */
    }

    /* tombol pagination */
    .PikDailyReportTabulator .tabulator .tabulator-footer .tabulator-page {
      background: #fff !important;
      color: #333 !important;
      border-radius: 4px;
      margin: 0 2px;
      padding: 4px 8px;
      font-size: 12px;
    }

    /* tombol aktif */
    .PikDailyReportTabulator .tabulator .tabulator-footer .tabulator-page.active {
      background: #D3DAD9 !important;
      color: #000 !important;
    }

    .PikDailyReportTabulator .tabulator .tabulator-footer .tabulator-footer-contents .tabulator-page-counter {
      /* background: #00ffcc !important; */
      color: #000 !important;
    }

    .PikDailyReportTabulator .tabulator .tabulator-footer {
        padding: 0 !important;
        margin: 0 !important;
    }

  /* /////////////////////////////////////////////////// */

  /* ////////////////////////// row //////////////////// */

    .PikDailyReportTabulator .tabulator .tabulator-col-content,
    .tabulator .tabulator-cell {
        padding: 4px 6px; /* samakan padding header, body, footer */

    }

    /* option untuk row tambahan aggregate */
    .PikDailyReportTabulator .tabulator .tabulator-calcs-holder .tabulator-row {
        font-weight: bold;
        background-color: red; 
        
        /* misalnya biar beda */
        /* background-color: #111; */
        color: yellow;
    }
    /* row dasar */
    .PikDailyReportTabulator .tabulator .tabulator-row {
      background-color: #F3F2EC;    /* warna background */
      color: #000000;               /* warna teks */
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 13px;
      border-bottom: 1px solid #000000; /* garis antar baris */
    }
    /* efek hover */
    .PikDailyReportTabulator .tabulator .tabulator-row:hover {
      /* warna abu tipis */
      background-color: #333 !important;
      /* warna hijau cyan */
      color: #FFCC00 !important;
    }
    /* semua cell */
    .PikDailyReportTabulator .tabulator .tabulator-cell {
      /* padding: <top-bottom> <left-right> */
      padding: 0px 20px;
      font-size: 13px;
    }
    .PikDailyReportTabulator .tabulator .tabulator-row:nth-child(even) {
      /* kolom ganjil warna hitam agak abu */
      background-color: #DCDCDC;
    }
    .PikDailyReportTabulator .tabulator .tabulator-row:nth-child(odd) {
      /* kolom genap warna hitam gelap */
      background-color: #F3F2EC;
    }
    .PikDailyReportTabulator .tabulator .tabulator-row.tabulator-selected {
      background-color: #065084 !important;
      color: #fff !important;
    }

</style> -->


