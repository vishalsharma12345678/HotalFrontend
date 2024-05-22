import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { Sidebark } from "../Sidebar";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, {
  CSVExport,
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
export function Test({ user }) {
  const { ExportCSVButton } = CSVExport;
  const { SearchBar } = Search;
  const MyExportCSV = (props) => {
    const handleClick = () => {
      props.onExport();
    };
    return (
      <div>
        <button className="btn btn-success" onClick={handleClick}>
          CSV
        </button>
      </div>
    );
  };

  const column = [
    {
      dataField: "_id",
      text: "_id",
    },
    {
      dataField: "full_name",
      text: "full_name",
      sort: true,
      filter: textFilter(),
    },
    { dataField: "registrationNo", text: "Reg No.", filter: textFilter() },
    { dataField: "check_in", text: "Checked In" },
    { dataField: "check_out", text: "Expected CheckOut" },
    { dataField: "verifiedby", text: "Verfied By", filter: textFilter() },
    { dataField: "remark", text: "Remark", filter: textFilter() },
    {
      dataField: "databasePkey",
      text: "Entry Status",
      formatter: (cellContent, row) => {
        return (
          <select
            name="status"
            disabled={
              row.check_in_check_out === "Checkedout" || row.status !== "booked"
                ? true
                : false
            }
            onChange={(e) => handleEdit1(e, row._id)}
          >
            <option
              value="Checkedin"
              selected={row.check_in_check_out === "Checkedin"}
            >
              CheckedIn
            </option>
            <option
              value="Checkedout"
              selected={row.check_in_check_out === "Checkedout"}
            >
              CheckedOut
            </option>
            <option
              value="waiting to checkin"
              disabled
              selected={row.check_in_check_out === "waiting to checkin"}
            >
              Waiting to checkIn
            </option>
          </select>
        );
      },
    },
    {
      dataField: "statu",
      text: "Booking Status",
      formatter: (cellContent, row) => {
        return (
          <select
            name="ame"
            disabled={
              row.status !== "booked" ||
              row.check_in_check_out === "Checkedin" ||
              row.check_in_check_out === "Checkedout"
                ? true
                : false
            }
            onChange={(e) => handleEdit(e, row._id, row.currentbooking)}
          >
            <option value="" selected={row.status === "booked"}>
              Booked
            </option>
            <option value="" selected={row.status !== "booked"}>
              Canceled
            </option>
          </select>
        );
      },
    },
    {
      dataField: "createdAt",
      text: "Created At",
    },
    {
      dataField: "#",
      text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <>
            <NavLink to={`/EditRoom/${row._id}`}>
              <button
                disabled={
                  row.check_in_check_out === "Checkedout" ||
                  row.status !== "booked"
                    ? true
                    : false
                }
                style={{
                  cursor: `${
                    row.status !== "booked" ||
                    row.check_in_check_out === "Checkedout"
                      ? "not-allowed"
                      : ""
                  }`,
                }}
              >
                Edit
              </button>
            </NavLink>
            {user.isAdmin ? (
              <button onClick={() => DeleteRoom(row._id)}>Delete</button>
            ) : (
              ""
            )}
          </>
        );
      },
    },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });
  const [rooms, setRooms] = useState([]);
  const [isFetching, setFetching] = useState(false);
  async function handleEdit(e, id, currentbookingid) {
    // setFetching(true);
    const ids = {
      bookingid: id,
      roomsid: currentbookingid,
    };
    // console.log(ids)
    let roomsdata = await axios.post(
      `http://localhost:4000/book/updateBooking`,
      ids
    );
    fetchData();

    // setFetching(false);
  }
  async function handleEdit1(e, id) {
    // setFetching(true);
    const ids = {
      bookingid: id,
      value: e.target.value,
    };
    // console.log(ids)
    let roomsdata = await axios.post(
      `http://localhost:4000/book/updateBookingEntry`,
      ids
    );
    fetchData();

    // setFetching(false);
  }
  async function DeleteRoom(id) {
    // setFetching(true);
    await axios.get(`http://localhost:4000/book/deletebooking/${id}`);
    fetchData();
    // setFetching(false);
  }

  async function fetchData() {
    setFetching(true);
    let roomsdata = await fetch("http://localhost:4000/book/allBookings");
    let data = await roomsdata.json();
    console.log(data);
    setRooms((s) => data.booking);
    setFetching(false);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <Sidebark user={user} />
      <div
        className="rooms1 book1"
        style={{ position: "relative", left: "20%" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Room Booking Status</h1>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <label htmlFor="">Starting Date</label>
            <input type="date" style={{ width: "200px" }} />
            <label htmlFor="">Ending Date</label>
            <input type="date" style={{ width: "200px" }} />
          </div>
        </div>
        <ToolkitProvider
          bootstrap4
          keyField="_id"
          columns={column}
          data={rooms}
          exportCSV
        >
          {(props) => (
            <>
              <MyExportCSV {...props.csvProps} />
              <BootstrapTable
                pagination={pagination}
                filter={filterFactory()}
                {...props.baseProps}
              />
            </>
          )}
        </ToolkitProvider>
      </div>
    </div>
  );
}
