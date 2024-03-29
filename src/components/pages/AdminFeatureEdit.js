import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import AdminHeader from "./../layouts/AdminHeader";
import AdminSider from "./../layouts/AdminSider";
import { useToast } from "@chakra-ui/react";
import convertToBase64 from "../../helper/convert";

const AdminFeatureEdit = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const toast = useToast();

  const [name, setName] = useState("");
  const [icon, setIcon] = useState();
  const [url, setUrl] = useState();
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/admin/feature/${params.id}`)
      .then((res) => {
        setName(res.data.result.name);
        setUrl(res.data.result.icon);
      });
  }, [params.id]);

  const onCancel = () => {
    navigate("/admin/features");
  };
  const postData = () => {
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
    if (!icon) {
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
    const formData = new FormData();

    formData.append("name", name);
    formData.append("icon", icon);
    setFlag(true);
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/admin/feature/${params.id}/update`,
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
        // navigate("/admin/features");
      })
      .catch((err) => {
        setFlag(false);
        setError(true);
        setErrorMsg(err);
      });
  };

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setUrl(base64);
    setIcon(e.target.files[0]);
  };

  return (
    <div>
      <Helmet>
        <title>Acres - Real Estate React Template | Admin Feature Edit</title>
        <meta name="description" content="#" />
      </Helmet>
      <AdminHeader />
      <AdminSider url={props.url} />
      <div className="text-center" style={{ margin: "20px" }}>
        <h2>Feature Edit</h2>
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
          <div className="form-group row">
            <label htmlFor="icon" className="cursor-pointer">
              Select Icon
            </label>
            <input
              onChange={onUpload}
              type="file"
              id="icon"
              name="icon"
              style={{ display: "none" }}
            />
            {url && url.slice(0, 7) === "uploads" ? (
              <img
                src={`${process.env.REACT_APP_SERVER_URL}/${url}`}
                alt="Icon"
                style={{ width: "100px" }}
              />
            ) : (
              <img src={url} alt="Icon" style={{ width: "100px" }} />
            )}
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

export default AdminFeatureEdit;
