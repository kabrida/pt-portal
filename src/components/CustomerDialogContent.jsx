import { Box, DialogContent, TextField, Typography } from "@mui/material"

export default function CustomerDialogContent( {customer, handleChange} ) {
    return (
        <DialogContent>
            <Typography variant="h6">Customer Information</Typography>
            <Box mb={2} sx={{width: 500}}>
              <TextField
                autoFocus
                required
                id="firstname"
                name="firstname"
                label="First Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                value={customer.firstname}
              />
              </Box>
              <Box mb={2}>
              <TextField
                autoFocus
                required
                id="lastname"
                name="lastname"
                label="Last Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                value={customer.lastname}
              />
              </Box>
              
              <Typography variant="h6">Address</Typography>
              <Box mb={2}>
              <TextField
                autoFocus
                required
                id="streetaddress"
                name="streetaddress"
                label="Street Address"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                value={customer.streetaddress}
              />
              </Box>
              <Box mb={2}>
              <TextField
                autoFocus
                required
                id="postcode"
                name="postcode"
                label="Post Code"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                value={customer.postcode}
              />
              </Box>
              <Box mb={2}>
              <TextField
                autoFocus
                required
                id="city"
                name="city"
                label="City"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                value={customer.city}
              />
              </Box>

              <Typography variant="h6">Contact Information</Typography>
              <Box mb={2}>
              <TextField
                autoFocus
                required
                id="email"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                onChange={handleChange}
                value={customer.email}
                />
                </Box>
                <Box mb={2}>
                <TextField
                autoFocus
                required
                id="phone"
                name="phone"
                label="Phone Number"
                type="tel"
                fullWidth
                variant="standard"
                onChange={handleChange}
                value={customer.phone}
                />
                </Box>
            </DialogContent>
    )
}