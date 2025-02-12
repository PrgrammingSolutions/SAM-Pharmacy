import { Pagination, Stack, ThemeProvider, createTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

const PaginationComponent = ({ filteredData, setPaginatedData, itemsPerPage, currentPage, setCurrentPage }) => {
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(filteredData.slice(startIndex, endIndex) || []);
  }, [currentPage, filteredData]);

  const theme = createTheme({
    palette: { primary: { main: "#F3F4F6", contrastText: "#00000" } },
  });

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" justifyContent="center" marginTop={2}>
        <Pagination
          count={Math.ceil(filteredData.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </ThemeProvider>
  );
};

export default PaginationComponent;
