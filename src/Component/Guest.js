import { Sidebark } from "./Sidebar";
import "./RoomInvertroy.css";
import axios from "axios";
import { useEffect, useState } from "react";
export function Guest({ user }) {
  const [guest, setguest] = useState([]);
  useEffect(() => {
    async function fetch() {
      let guest = await axios.get(
        `https://hotelwebsitevishal.onrender.com/guests`
      );
      setguest(guest.data);
    }
    fetch();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebark user={user} />
      <div className="rooms inv" style={{ position: "relative", left: "20%" }}>
        <h1>Rooms Inventory</h1>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>DOB</th>
              <th>ID</th>
              <th>Nationality</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(guest).map((item, idx) => {
              return (
                <tr>
                  <td>{idx}</td>
                  <td>{item.name}</td>
                  <td>{item.dob}</td>
                  <td>{item.wp_pass}</td>
                  <td>{item.nationality}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
