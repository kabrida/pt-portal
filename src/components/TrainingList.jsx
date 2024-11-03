import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";

// ValueGetter lähde: https://www.ag-grid.com/javascript-data-grid/value-getters/
// ValueFormatter lähde: https://www.ag-grid.com/javascript-data-grid/value-formatters/
// DayJs lähde: https://day.js.org/docs/en/parse/string-format

export default function CustomerList() {
    const [trainings, setTrainings] = useState([]);

    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'Date and Time', field: 'date',
            valueFormatter: p => dayjs(p.value).format('DD.MM.YYYY HH:mm')
        },
        { headerName: 'Duration', field: 'duration',
            valueFormatter: p => p.value +  ' minutes'
        },
        { headerName: 'Activity', field: 'activity'},
        { 
            headerName: 'Customer',  
            valueGetter: p => `${p.data.customer.firstname} ${p.data.customer.lastname}`
        }
    ]);

    const defaultColDef = {
        sortable: true,
        filter: true,
    };

    const autoSizeStrategy = {
        type: 'fitCellContents'
    }

    // Harjoittelutietojen haku
    const fetchTrainings = async () => {
        try {
        const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings");
        const data = await response.json();
        setTrainings(data);
        } catch (error) {
            console.error("Failed to fetch trainings:", error);
        }
    };


    useEffect(() => fetchTrainings, []);

    return (
        <div className="CustomerList">
            <div className="ag-theme-material" style={{ width: '100%', height: 600 }}>
                <AgGridReact
                    defaultColDef={defaultColDef}
                    autoSizeStrategy={autoSizeStrategy}
                    columnDefs={columnDefs}
                    rowData={trainings}
                    accentedSort = {true}>
                </AgGridReact>
            </div>
        </div>
    );
}