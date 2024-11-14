import { Box, DialogContent, TextField, InputLabel, Select, MenuItem } from "@mui/material";
import { Unstable_NumberInput as NumberInput, FormControl } from '@mui/base';
import { useState, useEffect } from "react";

export default function TrainingDialogContent( { training, handleChange } ) {
    const [customers, setCustomers] = useState([]);


    useEffect(() => {
        // Hae asiakastiedot API:sta
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.error("Error fetching customers:", error));
    }, []);

    return (
        <DialogContent>
            <Box mb={2} sx={{ width: 500 }}>
                <TextField
                    autoFocus
                    required
                    id="date"
                    name="date"
                    placeholder="Date and time"
                    type="datetime-local"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    value={training.date}
                />
            </Box>
            <Box mb={2}>
              <TextField
                autoFocus
                required
                id="activity"
                name="activity"
                label="Activity"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                value={training.activity}
              />
              </Box>
              <Box mb={2}>
              <TextField
                autoFocus
                required
                id="duration"
                name="duration"
                label="Duration (in minutes)"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                value={training.duration}
              />
              </Box>
              <Box mb={2}>
                <FormControl sx={{ m: 1 }} fullWidth >
                    <InputLabel id="select-customer-label">Customer</InputLabel>
                    <Select
                        labelId="select-customer-label"
                        id="customer"
                        name="customer"
                        value={training.customer}
                        onChange={handleChange}
                        label="Customer"
                        sx={{minWidth: 500}}
                    >
                        {customers.map((customer) => (
                            <MenuItem key={customer._links.self.href} value={customer._links.self.href}>
                                {customer.firstname} {customer.lastname}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </DialogContent>
    )
}