const customStyles = {
  table: {
    style: {
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#ffffff",
      height: "auto",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#FAFAFA",
      color: "#64748b",
      fontSize: "0.875rem",
      fontWeight: "600",
      minHeight: "48px",
      borderBottom: "1px solid #e2e8f0",
    },
  },
  headCells: {
    style: {
      padding: "12px 16px",
      textAlign: "left",
      fontWeight: "600",
      borderRight: "none",
    },
  },
  rows: {
    style: {
      fontSize: "14px",
      fontWeight: "400",
      color: "#334155",
      backgroundColor: "#ffffff",
      minHeight: "48px",
      "&:not(:last-of-type)": {
        borderBottom: "1px solid #e2e8f0",
      },
      "&:hover": {
        backgroundColor: "#f8fafc",
      },
    },
  },
  cells: {
    style: {
      padding: "12px 16px",
      textAlign: "left",
      borderRight: "none",
      wordBreak: "break-word",
    },
  },
  pagination: {
    style: {
      borderTop: "none",
    },
  },
};

export default customStyles;
