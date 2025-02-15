import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Divider,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const InvoicePurchaseModal = ({ open, onClose, purchase }) => {
  if (!purchase) return null;

  return (
    <div className="flex justify-center items-center content-center ml-10">
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        className="ml-40"
      >
        <DialogContent>
          {/* Header */}
          <Box
            display="grid"
            gridTemplateColumns="1fr auto"
            alignItems="center"
            mb={2}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign="center"
              gridColumn="1 / -1"
            >
              Purchase Invoice
            </Typography>

            <IconButton
              onClick={onClose}
              sx={{
                justifySelf: "end",
                alignSelf: "start",
                marginTop: "-35px",
              }} // Ensure button is centered vertically
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box display="flex" justifyContent="space-between" mb={2}>
            <Box>
              <Typography variant="h5" fontWeight="bold" color="primary">
                Pharma Company Name
              </Typography>
              <Typography variant="subtitle1">
                <strong>From:</strong> Pharamceuticals
              </Typography>
              <Typography>John Doe</Typography>
              <Typography>wiz@saldoapps.com</Typography>
              <Typography>8026979597</Typography>
              <Typography>First str, 28-32, Chicago, USA</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1">
                <strong>Bill to:</strong> {purchase.supplier_name}
              </Typography>
              <Typography>{purchase.supplier_email}</Typography>
              <Typography>{purchase.supplier_contact}</Typography>
              <Typography>{purchase.supplier_address}</Typography>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography>
              <strong>Invoice No:</strong>1665-8
            </Typography>
            <Typography>
              <strong>Invoice Date:</strong> 12/02/2025
            </Typography>
          </Box>
          <Divider />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Item Code</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Medicine</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Batch No.</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Qty</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Price</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Amount</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableCell>65656464</TableCell>
                <TableCell>Panadol Syrup</TableCell>
                <TableCell>16656-14656</TableCell>
                <TableCell>150</TableCell>
                <TableCell>10</TableCell>
                <TableCell>1500</TableCell>
              </TableBody>
              <TableBody>
                <TableCell>6561416464</TableCell>
                <TableCell>Caricef Tabs</TableCell>
                <TableCell>516565-66665</TableCell>
                <TableCell>300</TableCell>
                <TableCell>10</TableCell>
                <TableCell>3000</TableCell>
              </TableBody>
            </Table>
          </TableContainer>
          <Divider />
          <Box mt={2} mr={8} display="flex" justifyContent="flex-end">
            <Box>
              <Grid container spacing={1}>
                <Grid item xs={12} textAlign="right">
                  <Typography>
                    <strong>Subtotal:</strong> 4500
                  </Typography>
                  <Typography>
                    <strong>Total:</strong> 4500
                  </Typography>
                  <Typography>
                    <strong>Amount Paid:</strong> 4500
                  </Typography>
                  <Typography>
                    <strong>Balance Due:</strong> Nil
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box mt={2} display="flex" justifyContent="flex-start">
            <Box textAlign="left">
              <Typography variant="subtitle1" fontWeight="bold">
                Notes
              </Typography>
              <Typography>Supplier from out of City</Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                Payment Instruction
              </Typography>
              <Typography>Paypal Email: wiz@saldoapps.com</Typography>
              <Typography>Make Checks Payable to: John Doe</Typography>
              <Typography>Bank Transfer Account: 061120084</Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoicePurchaseModal;
