import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Divider, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"

const InvoicePurchaseModal = ({ open, onClose, purchase }) => {
  if (!purchase) return null;

  return (
    <div className="flex justify-center items-center content-center ml-10">
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" className="ml-40">
      <DialogContent>
        {/* Header */}
        <Box display="grid" gridTemplateColumns="1fr auto" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight="bold" textAlign="center" gridColumn="1 / -1">
            Purchase Invoice
          </Typography>
          
          <IconButton 
            onClick={onClose} 
            sx={{ justifySelf: 'end', alignSelf: 'start', marginTop: '-35px' }} // Ensure button is centered vertically
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        {/* Invoice Details */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Box>
            <Typography variant="h5" fontWeight="bold" color="primary">Pharma Company Name</Typography>
            <Typography variant="subtitle1"><strong>From:</strong> Saldo Apps</Typography>
            <Typography>John Doe</Typography>
            <Typography>wiz@saldoapps.com</Typography>
            <Typography>8026979597</Typography>
            <Typography>First str, 28-32, Chicago, USA</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1"><strong>Bill to:</strong> {purchase.supplier_name}</Typography>
            <Typography>{purchase.supplier_email}</Typography>
            <Typography>{purchase.supplier_contact}</Typography>
            <Typography>{purchase.supplier_address}</Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography><strong>Invoice No:</strong> {purchase.invoice_no}</Typography>
          <Typography><strong>Invoice Date:</strong> 12/02/2025</Typography>
          
        </Box>
        <Divider />

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Rate</strong></TableCell>
                <TableCell><strong>Quantity</strong></TableCell>
                <TableCell><strong>Amount</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(purchase.items) ? purchase.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.rate}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">No items available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
        
        {/* Payment Instructions */}
        <Box mt={2}>
          <Typography variant="subtitle1" fontWeight="bold">Payment Instruction</Typography>
          <Typography>Paypal Email: wiz@saldoapps.com</Typography>
          <Typography>Make Checks Payable to: John Doe</Typography>
          <Typography>Bank Transfer Account: 061120084</Typography>
        </Box>
        
        {/* Summary */}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">Notes</Typography>
            <Typography>Supplier from out of City</Typography>
          </Box>
          <Box textAlign="right">
            <Typography><strong>Subtotal:</strong> ${purchase.subtotal}</Typography>
            <Typography variant="h6"><strong>Total:</strong> ${purchase.total}</Typography>
            <Typography><strong>Amount Paid:</strong> ${purchase.amount_paid}</Typography>
            <Typography variant="h6" fontWeight="bold" color="error">Balance Due: ${purchase.balance_due}</Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
    </div>
  );
};

export default InvoicePurchaseModal;


