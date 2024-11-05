import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { useState } from "react";
import CustomerDialogContent from "./CustomerDialogContent";

export default function addCustomer( {addCustomer}) {
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        email: '',
        phone: ''
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen =  () => {
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
        addCustomer(customer);
        handleClose();
    };

    return (
        <>
        <Button onClick={handleClickOpen}>Add Customer</Button>
        <Dialog
        open={open}
        onClose={handleClose}>
            <DialogTitle>New Customer</DialogTitle>
            <CustomerDialogContent customer={customer} handleChange={handleChange} />
            <DialogActions>
                <Button onClick={handleClose} color="error">Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
        </>
    )

}