import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { Product } from "../../../../app/models/Product";

interface Prop {
  product: Product[];
}

// Create Document Component
function PDFComponent({ product }: Prop) {
  const createTableHeader = (): JSX.Element => {
    return (
      <>
        <View style={styles.tableRow} fixed>
          <View style={styles.tableColHeader}>
            <Text>รหัส</Text>
          </View>
          <View style={styles.tableColHeaderA}>
            <Text>ชื่อสินค้า</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text>ราคา</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text>จำนวน.</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text>ตำบล.</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text>ประเภท</Text>
          </View>
        </View>
        {product?.map((ez: Product) => {
          return (
            <>
              <View style={styles.tableRow} key={ez.id}>
                <View style={styles.tableCol}>
                  <Text>{ez.id}</Text>
                </View>
                <View style={styles.tableColA}>
                  <Text>{ez.name}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{ez.price}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{ez.stock}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{ez.districtName}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{ez.categoryName}</Text>
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
      fontFamily: "MyFont",
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
      width: "80%",
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
      width: "80%",
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
          <Text>สินค้าทั้งหมด</Text>
          <View style={styles.table}>{createTableHeader()}</View>
        </Page>
      </Document>
    </>
  );
}

export default PDFComponent;
