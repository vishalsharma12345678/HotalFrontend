import { useEffect, useState } from "react";
import { Sidebark } from "./Sidebar";
import axios from "axios";
import "./some.css";
import React, { Component } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

export function Home({ user }) {
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const [alldata, setAlldata] = useState({});
  async function fetchdata() {
    let data = await axios.get(
      `https://hotelwebsitevishal.onrender.com/room/roomsDetails`
    );
    let newdata = {
      emptyData: data.data.EmptyRooms,
      OccupiedRoom: data.data.OccupiedRoom,
      Upcomingbooking: data.data.Upcomingbooking,
      Lastbooking: data.data.Lastbooking,
    };
    console.log(newdata);
    setAlldata(newdata);
  }

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebark user={user} />

      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <div className="d-flex" style={{ padding: "2rem" }}>
        <Block>
          <h1>{alldata.emptyData}</h1>
          <p>Empty Rooms</p>
        </Block>
        <Block>
          <h1>{alldata.OccupiedRoom}</h1>
          <p>Occupied Rooms</p>
        </Block>
        <Block>
          <h1>{alldata.Upcomingbooking}</h1>
          <p>Upcoming Booking</p>
        </Block>
        <Block>
          <h1>{alldata.Lastbooking}</h1>
          <p>Completed Booking</p>
        </Block>
        <Block>
          <h1>0</h1>
          <p>Total Bussiness</p>
        </Block>
      </div>
      <div>
        <CanvasJSChart options = {
          {
            animationEnabled: true,
            // exportEnabled: true,
            theme: "light2", // "light1", "dark1", "dark2"
            title: {
              text: "Trip Expenses",
            },
            data: [
              {
                type: "pie",
                indexLabel: "{label}: {y}%",
                startAngle: -90,
                dataPoints: [
                  { y: alldata.OccupiedRoom, label: "Occupied Rooms" },
                  {y: alldata.emptyData, label: "Empty Room"},
                  { y: alldata.Upcomingbooking, label: "Upcoming Booking" },
                  { y: alldata.Lastbooking, label: "Last Booking" },
                ],
              },
            ],
          }
        } 
          /* onRef={ref => this.chart = ref} */
        />
		</div>
      </div>
    </div>
  );
}
function Block({ children }) {
  return (
    <div className="block" style={{ display: "flex" }}>
      {children}
    </div>
  );
}
