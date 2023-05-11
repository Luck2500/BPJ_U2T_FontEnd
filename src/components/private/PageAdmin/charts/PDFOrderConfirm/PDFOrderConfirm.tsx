import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import myCustomFont from "./NotoSerifThai-VariableFont_wdth,wght.ttf";
import { Report, Sale } from "../../../../../app/models/Report";

Font.register({ family: "My Custom Font", src: myCustomFont });

interface Prop {
  report: Report;
}

// Create Document Component
function PDFOrderConfirm({ report }: Prop) {
  const createTableHeader = (): JSX.Element => {
    return (
      <>
        <View style={styles.tableRow} fixed>
          <View style={styles.tableColHeaderB}>
            <Text>ตำบล </Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text>รายได้โดยรวม %</Text>
          </View>
          <View style={styles.tableColHeaderA}>
            <Text>รายได้รวม</Text>
          </View>
        </View>

        <>
          {report.sales?.map((ez: Sale) => {
            return (
              <>
                <View style={styles.tableRow}>
                  <View style={styles.tableColB}>
                    <Text>{ez.districtName}</Text>
                  </View>
                  <View style={styles.tableCol}>
                     <Text>{ez.percent.toFixed(2)} %</Text>
                  </View>
                  <View style={styles.tableColA}>
                   <Text>{`${new Intl.NumberFormat().format(ez.price as any)}`} บาท </Text>
                  </View>
                </View>
              </>
            );
          })}
          <View style={styles.tableRow}>
            <View style={styles.tableColC}>
              <Text>ยอดรวม </Text>
            </View>
            <View style={styles.tableColA}>
              <Text>{`${new Intl.NumberFormat().format(report.totalPrice as any)}` } บาท</Text>
            </View>
          </View>
        </>
      </>
    );
  };

  const styles = StyleSheet.create({
    pageStyle: {
      paddingTop: 16,
      paddingHorizontal: 40,
      paddingBottom: 56,
      fontFamily: "My Custom Font",
    },

    tableRow: {
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
      <Document>
        <Page style={styles.pageStyle} size="A4" orientation="portrait">
          <Text>ยอดรายได้ตำบลทั้งหมด </Text>
          <View style={styles.table}>{createTableHeader()}</View>
        </Page>
      </Document>
    </>
  );
}

export default PDFOrderConfirm;
