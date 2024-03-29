import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import AdminHeader from "./../layouts/AdminHeader";
import AdminSider from "./../layouts/AdminSider";
import { useToast } from "@chakra-ui/react";

const AdminCurrencyEdit = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const toast = useToast();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [symbol, setSymbol] = useState("");
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/admin/currency/${params.id}`)
      .then((res) => {
        setName(res.data.result.name);
        setCode(res.data.result.code);
        setSymbol(res.data.result.symbol);
      });
  }, [params.id]);

  const onCancel = () => {
    navigate("/admin/currencies");
  };
  const postData = async () => {
    if (name === "") {
      toast({
        title: "Error",
        description: "Name field is empty!!!",
        status: "error",
        duration: 2000,
        variant: "left-accent",
        position: "top-right",
        isClosable: true,
      });
      return false;
    }
    if (code === "") {
      toast({
        title: "Error",
        description: "Code field is Empty!",
        status: "error",
        duration: 2000,
        variant: "left-accent",
        position: "top-right",
        isClosable: true,
      });
      return false;
    }
    if (symbol === "") {
      toast({
        title: "Error",
        description: "Symbol field is Empty!",
        status: "error",
        duration: 2000,
        variant: "left-accent",
        position: "top-right",
        isClosable: true,
      });
      return false;
    }
    const formData = {
      name: name,
      code: code,
      symbol: symbol,
    };
    setFlag(true);
    await axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/admin/currency/${params.id}/update`,
        formData
      )
      .then((res) => {
        setFlag(false);
        toast({
          title: "Success",
          description: "It has been updated successfully.",
          status: "success",
          duration: 2000,
          variant: "left-accent",
          position: "top-right",
          isClosable: true,
        });
        return true;
        // navigate("/admin/currencies");
      })
      .catch((err) => {
        setFlag(false);
        setError(true);
        setErrorMsg(err);
      });
  };

  return (
    <div>
      <Helmet>
        <title>Acres - Real Estate React Template | Admin Currency Edit</title>
        <meta name="description" content="#" />
      </Helmet>
      <AdminHeader />
      <AdminSider url={props.url} />
      <div className="text-center" style={{ margin: "20px" }}>
        <h2>Currency Edit</h2>
      </div>
      <div
        className="acr-user-content"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          style={{
            width: "70%",
            padding: "2%",
          }}
        >
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control form-control-light"
              placeholder="Username"
              name="username"
            />
          </div>
          <div className="form-group">
            <label>Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="form-control form-control-light"
              placeholder="code"
              name="code"
            />
          </div>
          <div className="form-group">
            <label>Symbol</label>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="form-control form-control-light"
              placeholder="Symbol"
              name="symbol"
            />
          </div>
          <div className="form-group text-right">
            {flag ? (
              <button type="Submit" disabled className="btn btn-primary">
                <span className="fa fa-save"></span> Saving...
              </button>
            ) : (
              <button
                type="Submit"
                onClick={() => postData()}
                className="btn btn-primary"
              >
                <span className="fa fa-save"></span> Save
              </button>
            )}
            <button
              type="button"
              className="btn btn-default"
              onClick={() => onCancel()}
            >
              <span className="fa fa-reply"></span> Cancel
            </button>
          </div>
        </form>
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

export default AdminCurrencyEdit;
