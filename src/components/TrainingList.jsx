import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { Button } from "@mui/material";
import AddTraining from "./AddTraining";



// ValueGetter lähde: https://www.ag-grid.com/javascript-data-grid/value-getters/
// ValueFormatter lähde: https://www.ag-grid.com/javascript-data-grid/value-formatters/
// DayJs lähde: https://day.js.org/docs/en/parse/string-format

export default function CustomerList() {
    dayjs.extend(utc);
    const [trainings, setTrainings] = useState([]);

    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'Date and Time', field: 'date',
            valueFormatter: p => dayjs.utc(p.value).format('DD.MM.YYYY HH:mm'),
            sort: 'asc'
        },
        { headerName: 'Duration', field: 'duration',
            valueFormatter: p => p.value +  ' minutes'
        },
        { headerName: 'Activity', field: 'activity'},
        {
            headerName: 'Customer',
            valueGetter: p => {
                const customer = p.data.customer;
                return customer ? `${customer.firstname} ${customer.lastname}` : 'Ei asiakasta';
            }
        },
        { headerName: '',
            field: 'id',
            sortable: false,
            filter: false,
            cellRenderer: params => <Button variant="contained" color="error" onClick={() => deleteTraining(params.data)}>Delete</Button>
        },
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

    const deleteTraining = async (training) => {
        const url = `https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${training.id}`;
        const options = {
            method: 'DELETE',
        };

        try {
            if (confirm('Are you sure you want to delete this training session?')) {
                await fetch(url, options);
                fetchTrainings();
            }
        } catch (e) {
            console.error('Failed to delete training:', e);
        }
    };

    const addTraining = async (training) => {
        const url = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings';
        const options = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(training)
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            fetchTrainings();
        } catch (e) {
            console.error('Failed to add training:', e);
        }
    };


    useEffect(() => fetchTrainings, []);

    return (
        <div className="TrainingList">
            <AddTraining addTraining={addTraining} />
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