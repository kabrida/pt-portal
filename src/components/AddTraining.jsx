import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { useState } from "react";
import TrainingDialogContent from "./TrainingDialogContent";

export default function addTraining( { addTraining } ) {
    const [training, setTraining] = useState({
        date: '',
        activity: '',
        duration: '',
        customer: ''
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen =  () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event => {
        setTraining({
            ...training,
            [event.target.name]: event.target.value
        });
    };

    const handleSave = () => {
        const customerUrl = training.customer;
    
    const trainingData = {
        date: training.date,
        activity: training.activity,
        duration: training.duration,
        customer: customerUrl  // Lähetetään asiakaslinkki
    };

        console.log(trainingData);
        addTraining(trainingData);  // Lähetetään backendille
        handleClose();
    };

    return (
        <>
        <Button onClick={handleClickOpen}>Add Training for Customer</Button>
        <Dialog
        open={open}
        onClose={handleClose}>
            <DialogTitle>New Training</DialogTitle>
            <TrainingDialogContent training={training} handleChange={handleChange} />
            <DialogActions>
                <Button onClick={handleClose} color="error">Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
        </>
    )

}