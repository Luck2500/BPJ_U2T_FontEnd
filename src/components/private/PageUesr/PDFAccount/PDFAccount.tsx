import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import myCustomFont from "./NotoSerifThai-VariableFont_wdth,wght.ttf";
import { Account } from "../../../../app/models/Account";

Font.register({ family: "My Custom Font", src: myCustomFont });

interface Prop {
  account: Account[];
}

// Create Document Component
function PDFAccount({ account }: Prop) {
  const createTableHeader = (): JSX.Element => {
    return (
      <>
        <View style={styles.tableRow} fixed>
          <View style={styles.tableColHeaderB}>
            <Text>ชื่อผู้ใช้งาน</Text>
          </View>
          <View style={styles.tableColHeaderA}>
            <Text>อีเมล</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text>เบอร์โทร</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text>บทบาท</Text>
          </View>
        </View>
        {account?.map((ez: Account) => {
          return (
            <>
              <View style={styles.tableRow} key={ez.id}>
                <View style={styles.tableColB}>
                  <Text>{ez.name}</Text>
                </View>
                <View style={styles.tableColA}>
                  <Text>{ez.email}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{ez.phoneNumber}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{ez.roleName}</Text>
                </View>
              </View>
            </>
          );
        })}
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
      width: "30%",
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
      width: "40%",
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
      width: "30%",
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
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      padding: 5,
    },
    tableColB: {
      width: "40%",
      fontSize: "12px",
      borderStyle: "solid",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      padding: 5,
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
          <Text>ผู้ใช้งานทั้งหมด</Text>
          <View style={styles.table}>{createTableHeader()}</View>
        </Page>
      </Document>
    </>
  );
}

export default PDFAccount;
