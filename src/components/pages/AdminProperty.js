import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import AdminHeader from "./../layouts/AdminHeader";
import AdminSider from "./../layouts/AdminSider";
import { useToast } from "@chakra-ui/react";

const AdminProperty = (props) => {
  const navigate = useNavigate();
  const toast = useToast();

  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/admin/get-properties`)
      .then((res) => {
        setFlag(true);
        setData(res.data.result);
      });
  }, []);

  const detailProperty = (id) => {
    navigate(`/admin/property/${id}/detail`);
  };
  const editProperty = (id) => {
    navigate(`/admin/property/${id}`);
  };
  const deleteProperty = (id) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/admin/delete/property/${id}`)
      .then((res) => {
        setData(res.data.result);
        toast({
          title: "Success",
          description: "Property deleted successfully.",
          status: "success",
          duration: 2000,
          variant: "left-accent",
          position: "top-right",
          isClosable: true,
        });
      })
      .catch((err) => {
        setError(true);
        setErrorMsg(err);
      });
  };

  const addProperty = () => {
    navigate("/admin/property/create");
  };

  return (
    <div>
      <Helmet>
        <title>Acres - Real Estate React Template | Admin Property</title>
        <meta name="description" content="#" />
      </Helmet>
      <AdminHeader />
      <AdminSider url={props.url} />
      <div className="text-center" style={{ margin: "20px" }}>
        <h2>Property Manage</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          width: "94%",
          margin: "1%",
        }}
      >
        <button
          type="button"
          className="btn btn-success"
          onClick={() => addProperty()}
        >
          <span className="fa fa-plus"></span> Add Property
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table
          className="table-striped table-bordered text-center"
          style={{ width: "90%", margin: "1%" }}
        >
          <thead>
            <tr>
              <th>No</th>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Type</th>
              <th>Status</th>
              <th>Price</th>
              <th>Space(sqm)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && flag ? (
              <tr className="text-center">
                <td colSpan="9">No Data</td>
              </tr>
            ) : data.length === 0 && flag === false ? (
              <tr className="text-center">
                <td colSpan="9">Loading ...</td>
              </tr>
            ) : (
              data.map((res, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{res.Details.id}</td>
                    <td>{res.BasicInformation.name}</td>
                    <td>{res.BasicInformation.description}</td>
                    <td>{res.BasicInformation.type}</td>
                    <td>{res.BasicInformation.status}</td>
                    <td>
                      {res.BasicInformation.status === "Rental"
                        ? `${res.BasicInformation.currency}${res.BasicInformation.price}/${res.BasicInformation.period}`
                        : `${res.BasicInformation.currency}${res.BasicInformation.price}`}
                    </td>
                    <td>{res.BasicInformation.space}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => detailProperty(res._id)}
                        style={{ borderRadius: "5px" }}
                      >
                        <span className="fas fa-info-circle"></span>
                        Detail
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => editProperty(res._id)}
                        style={{ borderRadius: "5px" }}
                      >
                        <span className="fa fa-edit"></span>
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteProperty(res._id)}
                        style={{ borderRadius: "5px" }}
                      >
                        <span className="fa fa-trash"></span>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {error ? (
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
              width: "70%",
              backgroundColor: "#FF3131",
              color: "white",
              padding: "10px 20px 10px 20px",
              borderRadius: "5px",
              alignItems: "center",
            }}
          >
            <span>{error ? `${errorMsg}` : ""}</span>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                border: "white 2px solid",
                borderRadius: "30px",
                width: "40px",
                backgroundColor: "#FF3131",
                height: "40px",
              }}
              onClick={() => {
                setError(false);
              }}
            >
              <p
                style={{
                  color: "white",
                  alignItems: "center",
                  marginTop: "3px",
                }}
              >
                x
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AdminProperty;
