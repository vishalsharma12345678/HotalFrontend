import { Sidebark } from "./Sidebar";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./upcoming.css";
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
import { DatePicker, Space } from "antd";
export function OnHold({ user }) {
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
  async function handlePaymenttype(id) {
    const curUser = await axios.post(
      "https://walrus-app-4kyov.ondigitalocean.app/book/updateBookingEntryCredit",
      { id }
    );
    fetch();
  }
  const [billdata, setbilldata] = useState([]);
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
    {
      dataField: "check_in",
      text: "Checked In",
      formatter: (cellContent, row) => {
        return <div>{new Date(row.check_in).toDateString()}</div>;
      },
    },
    {
      dataField: "check_out",
      text: "CheckOut On",
      formatter: (cellContent, row) => {
        return <div>{new Date(row.check_out).toDateString()}</div>;
      },
    },
    { dataField: "verifiedby", text: "Verfied By", filter: textFilter() },
    { dataField: "price", text: "Total Amount", filter: textFilter() },
    {
      dataField: "databasePkey",
      text: "Entry Status",
      formatter: (cellContent, row) => {
        return (
          <select
            name="payment_type"
            onChange={(e) => handlePaymenttype(row._id)}
          >
            <option value="onhold" selected={row.payment_type === "onhold"}>
              Onhold
            </option>
            <option value="credit" selected={row.payment_type === "credit"}>
              Credit
            </option>
          </select>
        );
      },
    },

    {
      dataField: "createdAt",
      text: "Created At",
      formatter: (cellContent, row) => {
        return <div>{new Date(row.createdAt).toDateString()}</div>;
      },
    },
    {
      dataField: "#",
      text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <>
            <NavLink to={`/EditRoom/${row._id}`}>
              <button
                disabled={row.status !== "booked" ? true : false}
                style={{ cursor: `${row.status !== "booked"}` }}
              >
                Edit
              </button>
            </NavLink>
            {user.isAdmin === "Admin" ? <button>Delete</button> : ""}
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
  async function fetch() {
    let billdataresult = await axios.get(
      `https://walrus-app-4kyov.ondigitalocean.app/holdbills/`
    );
    console.log(billdata);
    setbilldata(billdataresult.data);
  }
  useEffect(() => {
    fetch();
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
        </div>
        <ToolkitProvider
          bootstrap4
          keyField="_id"
          columns={column}
          data={billdata}
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
