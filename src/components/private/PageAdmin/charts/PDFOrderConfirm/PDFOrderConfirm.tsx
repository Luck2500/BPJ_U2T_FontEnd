import ReactPDF, {
  StyleSheet,

} from "@react-pdf/renderer";

import { Report, Sale } from "../../../../../app/models/Report";



interface Prop {
  report: Report;
  year: any|null;
}

// Create Document Component
function PDFOrderConfirm({ report }: Prop) {
  const createTableHeader = () => {
    return (
      <>
        <ReactPDF.View style={styles.tableRow} fixed>
          <ReactPDF.View style={styles.tableColHeaderB}>
            <ReactPDF.Text>ตำบล </ReactPDF.Text>
          </ReactPDF.View>
          <ReactPDF.View style={styles.tableColHeader}>
            <ReactPDF.Text>รายได้โดยรวม %</ReactPDF.Text>
          </ReactPDF.View>
          <ReactPDF.View style={styles.tableColHeaderA}>
            <ReactPDF.Text>รายได้รวม</ReactPDF.Text>
          </ReactPDF.View>
        </ReactPDF.View>

        <>
          {report ? report.sales?.map((ez: Sale) => {
            return (
              <>
                <ReactPDF.View style={styles.tableRow}>
                  <ReactPDF.View style={styles.tableColB}>
                    <ReactPDF.Text>{ez.districtName}</ReactPDF.Text>
                  </ReactPDF.View>
                  <ReactPDF.View style={styles.tableCol}>
                     <ReactPDF.Text>{ez.percent.toFixed(2)} %</ReactPDF.Text>
                  </ReactPDF.View>
                  <ReactPDF.View style={styles.tableColA}>
                   <ReactPDF.Text>{`${new Intl.NumberFormat().format(ez.price as any)}`} บาท </ReactPDF.Text>
                  </ReactPDF.View>
                </ReactPDF.View>
              </>
            );
          }) : ""}
          <ReactPDF.View style={styles.tableRow}>
            <ReactPDF.View style={styles.tableColC}>
              <ReactPDF.Text>ยอดรวม </ReactPDF.Text>
            </ReactPDF.View>
            <ReactPDF.View style={styles.tableColA}>
              <ReactPDF.Text>{`${new Intl.NumberFormat().format(report ? report.totalPrice : 0 )}` } บาท</ReactPDF.Text>
            </ReactPDF.View>
          </ReactPDF.View>
        </>
      </>
    );
  };

  const styles = StyleSheet.create({
    pageStyle: {
      fontFamily: "MyFont",
      paddingTop: 16,
      paddingHorizontal: 40,
      paddingBottom: 56,
      
    },

    tableRow: {
      fontFamily: "MyFont",
      flexDirection: "row",
    },

    tableColHeader: {
      width: "25%",
      textAlign: "center",
      fontSize: "12px",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      backgroundColor: "#e063e7",
      padding: 5,
    },
    tableColHeaderA: {
      width: "50%",
      textAlign: "center",
      fontSize: "12px",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      backgroundColor: "#e063e7",
      padding: 5,
    },
    tableColHeaderB: {
      width: "33.3%",
      textAlign: "center",
      fontSize: "12px",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      backgroundColor: "#e063e7",
      padding: 5,
    },
    tableCol: {
      width: "25%",
      fontSize: "12px",
      textAlign: "center",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      padding: 3,
    },
    tableColA: {
      width: "50%",
      fontSize: "12px",
      textAlign: "center",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      padding: 5,
    },
    tableColB: {
      width: "33.25%",
      fontSize: "12px",
      textAlign: "center",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      padding: 5,
    },
    tableColC: {
      width: "58.33%",
      fontSize: "12px",
      borderStyle: "solid",
      textAlign: "center",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
    },
    table: {
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#bfbfbf",
      borderBottomWidth: 0,
      borderRightWidth: 0,
    },
  });

  return (
    <>
      <ReactPDF.Document>
        <ReactPDF.Page style={styles.pageStyle} size="A4" orientation="portrait">
          <ReactPDF.Text >ยอดรายได้ตำบลทั้งหมด </ReactPDF.Text>
          <ReactPDF.View style={styles.table}>{createTableHeader()}</ReactPDF.View>
        </ReactPDF.Page>
      </ReactPDF.Document>
    </>
  );
}

export default PDFOrderConfirm;
