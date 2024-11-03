import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

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

    useEffect(() => fetchCustomers, []);

    return (
        <div className="CustomerList">
            <div className="ag-theme-material" style={{ width: '100%', height: 500}}>
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