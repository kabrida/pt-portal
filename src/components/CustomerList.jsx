import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Box, Button } from "@mui/material";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { CSVLink } from "react-csv";

// CSV kirjaston lähde: https://www.npmjs.com/package/react-csv

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);

    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'Name', 
            valueGetter: p => `${p.data.lastname} ${p.data.firstname}`,
            sort: 'asc'
        },
        { headerName: 'Address', field: 'streetaddress'},
        { headerName: 'Postcode', field: 'postcode'},
        { headerName: 'Email', field: 'email'},
        { headerName: 'Phone', field: 'phone'},
        { headerName: '',
            field: '_links.self.href',
            sortable: false,
            filter: false,
            cellRenderer: params => <Button variant="contained" color="error" onClick={() => deleteCustomer(params.data)}>Delete</Button>
        },
        { headerName: '', 
            field: '_links.self.href',
            sortable: false,
            filter: false,
            cellRenderer: params => <EditCustomer editCustomer={editCustomer} currentCustomer={params.data} />
        }
    ]);

    const defaultColDef = {
        sortable: true,
        filter: true,
    };

    const autoSizeStrategy = {
        type: 'fitCellContents'
    }

    // Asiakastietojen haku
    const fetchCustomers = async () => {
        try {
        const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers");
        const data = await response.json();
        setCustomers(data._embedded.customers);
        } catch (error) {
            console.error("Failed to fetch customers:", error);
        }
    };

    const deleteCustomer = async (customer) => {
        const url = customer._links.self.href;
        const options = {
            method: 'DELETE'
        }

        try {
            if (confirm(`Are you sure you want to delete customer ${customer.firstname} ${customer.lastname}?`)) {
            const response = await fetch(url, options);
            fetchCustomers();
            }
        } catch (err) {
            console.error(err);
        }

    };

    const addCustomer = async (customer) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer)
        }

        try {
        const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', options);
        const data = await response.json();
        fetchCustomers();
        } catch (error) {
            console.error("Failed to add customer:", error);
        }

    };

    const editCustomer = async (customer, url) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer)
        }

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            fetchCustomers();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => fetchCustomers, []);

    const customerDataForCSV = customers.map(customer => ({
        Name: `${customer.lastname} ${customer.firstname}`,
        Address: customer.streetaddress,
        Postcode: customer.postcode,
        Email: customer.email,
        Phone: customer.phone
    }));

    return (
        <div className="CustomerList">
            <Box mb={2}>
            <AddCustomer addCustomer={addCustomer} />
            </Box>
            <Box mb={2}>
            <CSVLink
            filename="customers.csv"
            data={customerDataForCSV}>
                <Button variant="contained" color="secondary">Export to CSV</Button>
            </CSVLink>
            </Box>
            <div className="ag-theme-material" style={{ width: '100%', height: 600}}>
                <AgGridReact
                    defaultColDef={defaultColDef}
                    autoSizeStrategy={autoSizeStrategy}
                    columnDefs={columnDefs}
                    rowData={customers}
                    accentedSort = {true}>
                </AgGridReact>
            </div>
        </div>
    );
}