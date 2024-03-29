import { useMemo } from "react";

export const useStyles = () => {
  return useMemo(() => {
    return {
      card: {
        border: "1px solid #ccc",
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        backgroundColor: "#E0F3F5",
      },
      wrapper: {
        border: "1px solid #ccc",
        padding: 10,
        marginBottom: 20,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#E0F3F5",
        borderRadius: 10,
      },
      input: {
        marginLeft: 8,
        padding: 4,
        border: "1px solid #ccc",
        marginTop: 4,
      },
      space: { marginBottom: 12, display: "flex", flexDirection: "column" },
      addProduct: {
        marginLeft: 8,
        padding: 4,
        backgroundColor: "#0ABAB5",
        border: "none",
        cursor: "pointer",
      },
      image: { maxWidth: 100, margin: 5 },
      contentWrapper: { marginTop: 5 },
      productsWrapper: {
        display: "flex",
        flexDirection: "column",
      },
      addNewProduct: { marginTop: 20 },
    } as const;
  }, []);
};
