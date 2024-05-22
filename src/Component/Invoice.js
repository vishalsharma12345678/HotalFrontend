import { useEffect, useState, useRef } from "react";
import { EyeOutlined } from "@ant-design/icons";
// import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { Modal, Button, Table } from "antd";
import cellEditFactory from "react-bootstrap-table2-editor";
import "./invoice.css";
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
import { Sidebark } from "./Sidebar";

export function Invoice({ user }) {
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
      filter: textFilter(),
      text: "Invoice Number",
    },
    {
      dataField: "updatedAt",
      text: "Created Date",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "bookingid.full_name",
      text: "Customer",
      filter: textFilter(),
      formatter: (cellContent, row) => {
        return <p>{row.bookingid.full_name}</p>;
      },
    },
    {
      dataField: "12%",
      text: "Total tax",
      formatter: (cellContent, row) => {
        return <div>12%</div>;
      },
    },
    { dataField: "totalAmount", text: "Total Amount" },
    {
      dataField: "#",
      text: "Currency",
      filter: textFilter(),
      formatter: (cellContent, row) => {
        return <div>USD</div>;
      },
    },
    {
      dataField: "#",
      text: "Payment Method",
      filter: textFilter(),
      formatter: (cellContent, row) => {
        return <p>{row.bookingid.payment_type}</p>;
      },
    },
    {
      dataField: "#",
      text: "Booking Status",
      filter: textFilter(),
      formatter: (cellContent, row) => {
        return <p>{row.bookingid.status}</p>;
      },
    },
    {
      dataField: "created by",
      text: "created by",
      filter: textFilter(),
      formatter: (cellContent, row) => {
        return <p>{row.bookingid.verifiedby}</p>;
      },
    },
    {
      dataField: "bookingid.full_name",
      text: "Actions",
      filter: textFilter(),
      formatter: (cellContent, row) => {
        return (
          <div>
            <EyeOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelectedBill(row);
                setSelectedguest(row.bookingid.moreperson);
                setPopupModal(true);
              }}
            />
            <EyeOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelectedBill(row);
                setSelectedguest(row.bookingid.moreperson);
                setPopupModal(true);
              }}
            />
          </div>
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
  const componentRef = useRef();
  const [popupModal, setPopupModal] = useState(false);
  const [billdata, setbilldata] = useState([]);
  const [selectguest, setSelectedguest] = useState([]);

  const [selectedBill, setSelectedBill] = useState(null);

  const getAllBills = async () => {
    const data = await axios.get(
      "https://walrus-app-4kyov.ondigitalocean.app/book/invoices"
    );
    console.log(data.data.result);
    setbilldata(data.data.result);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  //useEffect
  useEffect(() => {
    getAllBills();
    //eslint-disable-next-line
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebark user={user} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          left: "20%",
          width: "80%",
        }}
      >
        <div
          className="rooms book"
          style={{ position: "relative", width: "100%" }}
        >
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
                  cellEdit={cellEditFactory({ mode: "click" })}
                />
              </>
            )}
          </ToolkitProvider>
          {popupModal && (
            <Modal
              width="100%"
              pagination={true}
              title="Invoice Details"
              visible={true}
              onCancel={() => {
                setPopupModal(false);
              }}
              footer={false}
            >
              {/* ============ invoice modal start ==============  */}
              <div id="invoice-POS" ref={componentRef}>
                <div style={{ border: "3px solid black" }}>
                  <div>
                    <center id="top">
                      <div className="info">
                        <h2>INVOICE</h2>
                      </div>
                      {/*End Info*/}
                    </center>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div id="top">
                        <div className="logo">
                          <img
                            src="./Image20231227194112.png"
                            alt=""
                            srcset=""
                          />
                        </div>
                      </div>
                      <div style={{ textAlign: "end", fontWeight: "bold" }}>
                        <h1
                          style={{
                            fontFamily: "Dancing Script, cursive",
                            fontWeight: "900",
                            fontStyle: "normal",
                            fontSize: "2.5rem",
                          }}
                        >
                          off days maldives Pvt. Ltd
                        </h1>
                        <p style={{ color: "black" }}>
                          H.Hiriyaadhoo, Filigushigun, Male’, Republic of
                          Maldives
                        </p>
                        <p style={{ color: "black" }}>
                          Tele: 3304838, Mobile: 7738484, Fax: 3004839, E-mail:
                          sales@offdaymaldives.com
                        </p>
                        <p style={{ color: "black" }}>
                          www.offdaymaldives.com, Reg: c/0006/2010
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      borderTop: "3px solid black",
                      borderBottom: "3px solid black",
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        width: "30%",
                        fontWeight: "600",
                        color: "black",
                        margin: 0,
                        fontSize: "12px",
                      }}
                    >
                      GST Tin: 1017741GST002
                    </p>
                    <p
                      style={{
                        width: "70%",
                        fontWeight: "800",
                        color: "black",
                        borderLeft: "1px solid black",
                        margin: 0,
                        fontSize: "14px",
                      }}
                    >
                      TAX INVOICE
                    </p>
                  </div>
                  {/*End InvoiceTop*/}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                      padding: "10px 20px",
                    }}
                  >
                    <div style={{ width: "40%", textAlign: "end" }}>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        Date:{" "}
                        <span>
                          {new Date(selectedBill.createdAt).toDateString()}
                        </span>
                      </p>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        Place: <span>Emerald Maldives Resort & Spa</span>
                      </p>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        TIN:: <span>[MIRA GST-tin number: 1068108GST001]</span>
                      </p>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        ADDRESS:{" "}
                        <span>
                          Fasmendhoo Island, Fasmendhoo Male', Rep of Maldives
                        </span>
                      </p>
                    </div>
                    <div style={{ width: "40%" }}>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "10px",
                        }}
                      >
                        INVOICE No: <span> {selectedBill.invoiceNumber}</span>
                      </p>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "10px",
                        }}
                      >
                        Folio No:: <span> 466</span>
                      </p>

                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        Voucher No: <span>{selectedBill._id} </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <table
                        className="invoicetable"
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          border: "1px solid black",
                        }}
                      >
                        <tr>
                          <th>From</th>
                          <th>to</th>
                          <th>DESCRIPTION</th>
                          <th>Basic</th>
                          <th>plan</th>
                          <th>days</th>
                          <th>Rooms</th>
                          <th>Rate USD</th>
                          <th>Total USD</th>
                        </tr>
                        <tr>
                          <td>
                            {new Date(
                              selectedBill.bookingid.check_in
                            ).toDateString()}
                          </td>
                          <td>
                            {new Date(
                              selectedBill.bookingid.check_out
                            ).toDateString()}
                          </td>
                          <td style={{ padding: "0" }}>
                            {/* <p>MR. {selectedBill.bookingid.full_name}</p>
                          <p>PPNO: p3789119</p>
                          <p>WPNO:{selectedBill.bookingid.ww_no}</p> */}

                            <table>
                              {selectguest.map((guest) => {
                                return (
                                  <>
                                    <tr
                                      style={{
                                        border: "none",
                                      }}
                                    >
                                      <td
                                        style={{
                                          border: "none",
                                          borderBottom: "2px solid black",
                                          padding: "0",
                                        }}
                                      >
                                        <p>Name: {guest.name}</p>
                                        <p>ID : {guest.wp_pass}</p>
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                            </table>
                          </td>
                          <td>SGL</td>
                          <td>{selectedBill.bookingid.meal_plan}</td>
                          <td>
                            {days(
                              new Date(selectedBill.bookingid.check_in),
                              new Date(selectedBill.bookingid.check_out)
                            )}
                          </td>
                          <td>{selectedBill.bookingid.room_number.length}</td>

                          <td>
                            {selectedBill.bookingid.price *
                              days(
                                new Date(selectedBill.bookingid.check_in),
                                new Date(selectedBill.bookingid.check_out)
                              )}
                            .00
                          </td>
                          <td>
                            {selectedBill.totalAmount}
                            .00
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{ textAlign: "center", padding: "0" }}
                            colSpan={8}
                          >
                            BILLING TOTAL (USD)
                          </td>
                          <td style={{ textAlign: "center", padding: "0" }}>
                            {"$" + selectedBill.totalAmount}
                            .00
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={8}></td>
                        </tr>
                        <tr>
                          <td
                            colSpan={7}
                            style={{ textAlign: "center", padding: "0" }}
                          >
                            12.0% T.G.S.Tax (Tin: 1017741GST002)
                          </td>
                          <td style={{ textAlign: "center", padding: "0" }}>
                            $5.68
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "0" }} colSpan={7}>
                            TOTAL BILLING:(USD)
                          </td>
                          <td style={{ textAlign: "center", padding: "0" }}>
                            {"$" +
                              selectedBill.bookingid.price *
                                days(
                                  new Date(selectedBill.bookingid.check_in),
                                  new Date(selectedBill.bookingid.check_out)
                                ) *
                                selectedBill.bookingid.adultNo}
                            .00
                          </td>
                        </tr>
                      </table>
                      <p style={{ border: "1px solid black", padding: "5px" }}>
                        <span>
                          Any complain/issue regarding this bill should be
                          informed/settled within 3 days.
                        </span>
                        <br />
                        <span>
                          Total amount should be paid on or before 30 days on
                          receiving of this invoice.
                        </span>
                        <br />
                        <span>
                          3% interest will be addeded to the total amount for
                          each delayed day.
                        </span>
                        <br />
                        <span>
                          Cheque should be drawn in Favour of Off Day Maldives
                          Pvt Ltd.
                        </span>
                        <br />
                      </p>
                      <p style={{ border: "1px solid black", padding: "10px" }}>
                        <p>Payment Tranfer Account Details</p>
                        <table style={{ border: "1px solid black" }}>
                          <tr>
                            <td style={{ border: "1px solid black" }}>
                              Account Name:
                            </td>
                            <td style={{ border: "1px solid black" }}>
                              Off Day Maldives Pvt. Ltd
                            </td>
                          </tr>
                          <tr>
                            <td style={{ border: "1px solid black" }}>
                              Account NUmber:
                            </td>
                            <td style={{ border: "1px solid black" }}>
                              7730000020264
                            </td>
                          </tr>
                          <tr>
                            <td style={{ border: "1px solid black" }}>
                              Bank Name:
                            </td>
                            <td style={{ border: "1px solid black" }}>
                              Bank Of Maldives
                            </td>
                          </tr>
                          <tr>
                            <td style={{ border: "1px solid black" }}>
                              Currency
                            </td>
                            <td style={{ border: "1px solid black" }}>
                              US Dollar (USD)
                            </td>
                          </tr>
                        </table>
                      </p>
                    </div>
                    <div>
                      <table className="footer" width="100%">
                        <tr>
                          <th>Azumsth</th>
                          <th>Mariyam</th>
                          <th>{selectedBill.bookingid.verifiedby}</th>
                        </tr>
                        <tr>
                          <td>Created by:</td>
                          <td>Checked by:</td>
                          <td>Approved by:</td>
                        </tr>
                      </table>
                    </div>
                    {/*End Table*/}
                    <div>
                      <p style={{ textAlign: "center" }}>
                        <strong>Thank you for Chooshing off days inn!</strong>
                      </p>
                    </div>
                  </div>
                  {/*End InvoiceBot*/}
                </div>
              </div>
              {/*End Invoice*/}
              <div className="d-flex justify-content-end mt-3">
                <Button type="primary" onClick={handlePrint}>
                  Print
                </Button>
              </div>
              {/* ============ invoice modal ends ==============  */}
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}
function days(i, j) {
  let Difference_In_Time = i.getTime() - j.getTime();
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
  return Math.abs(Difference_In_Days) + 1;
}

export function ata({ get }) {
  console.log(get);
  return <div>bj,b,</div>;
}
