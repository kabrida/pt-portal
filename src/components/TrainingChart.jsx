import { duration } from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";


// Taulukon luomiseen käytetty: https://recharts.org/en-US/guide/customize & https://lodash.com/docs/4.17.15
export default function TrainingChart() {
  const [data, setData] = useState([]);

  const fetchTrainings = async () => {
    try {
    const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings");
    const result = await response.json();

    const groupedData = _(result._embedded.trainings)
        .groupBy("activity")
        .map((trainings, activity) => ({
            name: activity,
            duration: _.sumBy(trainings, "duration"),
        }))
        .orderBy(["duration"], ["desc"])
        .value();

        console.log("Processed chart data:", groupedData);
        setData(groupedData);

    } catch (error) {
        console.error("Failed to fetch trainings:", error);
    }
    };

    useEffect(() => {fetchTrainings()}, []);

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>Training Activities</h2>
            <BarChart
                width={1100}
                height={500}
                data={data}
                margin={{ top: 50, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" stroke="#1c54b2" />
            <YAxis />
            <Tooltip wrapperStyle={ { backgroundColor: "#ccc" } } />
            <Legend
                wrapperStyle={{
                    top: 40,
                    right: 20,
                    backgroundColor: "#f5f5f5",
                    border: "1px solid #d5d5d5",
                    borderRadius: 3,
                    lineHeight: "40px",
                }}
                />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="duration" fill="#1c54b2" barSize={50} />
            </BarChart>
        </div>
    )

}