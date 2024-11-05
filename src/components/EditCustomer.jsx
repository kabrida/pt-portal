import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useState } from "react";
import CustomerDialogContent from "./CustomerDialogContent";

export default function EditCustomer( { editCustomer, currentCustomer } ) {
    const [customer, setCustomer] = useState(currentCustomer);
    const [open, setOpen] = useState(false);

    const url = currentCustomer._links.self.href;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event => {
        setCustomer({...customer, [event.target.name]: event.target.value });
    };

    const handleSave = () => {
        console.log(customer);
        editCustomer(customer, url);
        handleClose();
    }

    return (
        <>
        <Button onClick={handleClickOpen}>Edit</Button>
        <Dialog
        open={open}
        onClose={handleClose}>
            <DialogTitle>Customer</DialogTitle>
            <CustomerDialogContent customer={customer} handleChange={handleChange} />
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}