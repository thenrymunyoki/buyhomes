import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, Nav } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Locationtab from "./Locationtab";
import { statusList } from "../../../data/common";
import convertToBase64 from "../../../helper/convert";

import { Container, useToast } from "@chakra-ui/react";
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function Content() {
  const toast = useToast();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const [typeList, setTypeList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [featureList, setFeatureList] = useState([]);
  const [nearTypeList, setNearTypeList] = useState([]);
  const [tabKey, setTabKey] = useState("tab1");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/admin/get-categories`)
      .then((res) => {
        setTypeList(res.data.result);
      });
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/admin/get-currencies`)
      .then((res) => {
        setCurrencyList(res.data.result);
      });
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/admin/get-features`)
      .then((res) => {
        setFeatureList(res.data.result);
      });
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/admin/get-nearbytypes`)
      .then((res) => {
        setNearTypeList(res.data.result);
      });
  }, []);

  // Error
  const [error, setError] = useState(undefined);
  const [fieldError, setFieldError] = useState(undefined);
  const [minFileError, setMinFileError] = useState(undefined);
  const [maxFileError, setMaxFileError] = useState(undefined);

  //  Basic Information
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState(statusList[0]);
  const [type, setType] = useState("");
  const [currency, setCurrency] = useState("");
  const [price, setPrice] = useState("");
  const [period, setPeriod] = useState("");
  const [space, setSpace] = useState("");
  const [land, setLand] = useState("");
  const [video, setVideo] = useState("");
  const [buildingSize, setBuildingSize] = useState("");
const [landArea, setLandArea] = useState("");
const [yearBuilt, setYearBuilt] = useState("");
const [buildingFloor, setBuildingFloor] = useState("");
const [bedroom, setBedroom] = useState("");
const [bathRoom, setBathRoom] = useState("");
const [kitchen, setKitchen] = useState("");
const [diningRoom, setDiningRoom] = useState("");
const [familyRoom, setFamilyRoom] = useState("");
const [gameRoom, setGameRoom] = useState("");
const [meetingRoom, setMeetingRoom] = useState("");
const [livingRoom, setLivingRoom] = useState("");
const [entertainmentRoom, setEntertainmentRoom] = useState("");
const [elevator, setElevator] = useState("No");
const [boatDock, setBoatDock] = useState("");
const [sauna, setSauna] = useState("");
const [swimmingPool, setSwimmingPool] = useState("");
const [jacuzzi, setJacuzzi] = useState("");
const [laundryRoom, setLaundryRoom] = useState("");
const [library, setLibrary] = useState("No");
const [garage, setGarage] = useState("");
const [houseKeeperRoom, setHouseKeeperRoom] = useState("No");
const [guestHouse, setGuestHouse] = useState("No");
const [bbqArea, setBbqArea] = useState("No");
const [solar, setSolar] = useState("No");
const [gym, setGyms] = useState("No");
const [clubhouse, setClubhouse] = useState("No");
const [securityguard, setSecurityguard] = useState("No");
const [partyhall, setPartyhall] = useState("No");
const [gymroom, setGymroom] = useState("No");
const [convenientstore, setConvenientstore] = useState("No");
const [coffeecorner, setCoffeecorner] = useState("No");




  //  Gallery
  const [thumbnail, setThumbnail] = useState();
  const [thumbnailUrl, setThumbnailUrl] = useState();

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          alt="ThumbImage"
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  });

  //  Location
  const [location, setLocation] = useState({
    address: "",
    country: "",
    city: "",
    provice: "",
    zipcode: "",
    lat: "13.736717",
    long: "100.523186",
  });
  const locationData = (data) => {
    setLocation(data);
  };

  //  Feature
  const [features, setFeatures] = useState([]);
  const featuresData = (id) => {
    if (features.indexOf(id) !== -1) {
      features.splice(features.indexOf(id), 1);
    } else {
      setFeatures([...features, id]);
    }
  };

  //  Details
  const [id, setId] = useState("");
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [condition, setCondition] = useState("");
  const [built, setBuilt] = useState("");
  const [neighbor, setNeighbor] = useState("");
  const [living, setLiving] = useState(true);
  const [dining, setDining] = useState(true);
  const [story, setStory] = useState(0);
  const [parking, setParking] = useState("");
  const [lotsize, setLotsize] = useState("");
  const [view, setView] = useState("");
  const [nears, setNears] = useState({ rows: [] });
  const [nearId, setNearId] = useState([]);
  const addRow = () => {
    const newRow = {
      neartype: nearTypeList[0]._id,
      name: "",
      distance: "",
      isEdit: false,
      key: "",
    };

    const selectRow = [...nears.rows];

    setNears({
      rows: [...selectRow, newRow],
    });
  };

  const enableEdit = (e, idx) => {
    e.preventDefault();
    const multy = [...nears.rows];
    if (e.target.innerHTML === "Edit") {
      e.target.innerHTML = "Save";
      multy[idx].isEdit = false;
    } else {
      e.target.innerHTML = "Edit";
      multy[idx].isEdit = true;
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/admin/near/create`,
          multy[idx]
        )
        .then((res) => {
          multy[idx].key = res.data.result._id;
          setNearId([...nearId, res.data.result._id]);
        })
        .catch((err) => console.log(err));
    }

    setNears({
      rows: [...multy],
    });
  };

  const removeRow = (e, idx) => {
    e.preventDefault();
    const selectRow = [...nears.rows];

    if (selectRow[idx].isEdit) {
      axios
        .delete(
          `${process.env.REACT_APP_SERVER_URL}/admin/delete/near/${selectRow[idx].key}`
        )
        .then((res) => {
          nearId.splice(nearId.indexOf(res.data.result), 1);
        })
        .catch((err) => console.log(err));
    }
    selectRow.splice(idx, 1);
    setNears({
      rows: [...selectRow],
    });
  };

  //  Validation
  const validate = () => {
    if (!description) {
      toast({
        title: "Error",
        description: "Insert Property Description",
        status: "error",
        duration: 2000,
        variant: "left-accent",
        position: "top-right",
        isClosable: true,
      });
      setTabKey("tab1");
      return false;
    }

    if (!name) {
      toast({
        title: "Error",
        description: "Insert Property Name",
        status: "error",
        duration: 2000,
        variant: "left-accent",
        position: "top-right",
        isClosable: true,
      });
      setTabKey("tab1");
      return false;
    }

    if (!price) {
      toast({
        title: "Error",
        description: "Insert Property Price",
        status: "error",
        duration: 2000,
        variant: "left-accent",
        position: "top-right",
        isClosable: true,
      });
      setTabKey("tab1");
      return false;
    }

    if (!space) {
      toast({
        title: "Error",
        description: "Insert Property Space",
        status: "error",
        duration: 2000,
        variant: "left-accent",
        position: "top-right",
        isClosable: true,
      });
      setTabKey("tab1");
      return false;
    }
    if (!id) {
      toast({
        title: "Error",
        description: "Insert Property ID",
        status: "error",
        duration: 2000,
        variant: "left-accent",
        position: "top-right",
        isClosable: true,
      });
      setTabKey("tab5");
      return false;
    }

    if (!beds) {
      toast({
        title: "Error",
        description: "Insert Property Beds",
        status: "error",
        duration: 2000,
        variant: "left-accent",
        position: "top-right",
        isClosable: true,
      });
      setTabKey("tab5");
      return false;
    }

    if (!baths) {
      toast({
        title: "Error",
        description: "Insert Property Bathrooms",
        status: "error",
        duration: 2000,
        variant: "left-accent",
        position: "top-right",
        isClosable: true,
      });
      setTabKey("tab5");
      return false;
    }

    if (!thumbnail) {
      toast({
        title: "Error",
        description: "Insert Property Thumbnail",
        status: "error",
        duration: 2000,
        variant: "left-accent",
        position: "top-right",
        isClosable: true,
      });
      setTabKey("tab2");
      return false;
    }

    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Insert Property Gallery",
        status: "error",
        duration: 2000,
        variant: "left-accent",
        position: "top-right",
        isClosable: true,
      });
      setTabKey("tab2");
      return false;
    }

    if (files.length > 5) {
      toast({
        title: "Error",
        description: "You can upload only 5 pictures",
        status: "warning",
        duration: 2000,
        variant: "left-accent",
        position: "top-right",
        isClosable: true,
      });
      setTabKey("tab2");
      return false;
    }

    return true;
  };

  //  Submit
  const submitData = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    if (user === null) {
      toast({
        title: "Error",
        description: "You need to login first.",
        status: "error",
        duration: 2000,
        variant: "left-accent",
        position: "top-right",
        isClosable: true,
      });
      return false;
    } else {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("status", status);
      formData.append("type", type ? type : typeList[0].name);
      formData.append("currency", currency ? currency : currencyList[0].symbol);
      formData.append("price", price);
      formData.append("period", period ? period : "Monthly");
      formData.append("space", space);
      formData.append("land", land);
      formData.append("video", video);
      // Append the additional fields
formData.append("buildingSize", buildingSize);
formData.append("landArea", landArea);
formData.append("yearBuilt", yearBuilt);
formData.append("buildingFloor", buildingFloor);
formData.append("bedroom", bedroom);
formData.append("bathRoom", bathRoom);
formData.append("kitchen", kitchen);
formData.append("diningRoom", diningRoom);
formData.append("familyRoom", familyRoom);
formData.append("gameRoom", gameRoom);
formData.append("meetingRoom", meetingRoom);
formData.append("livingRoom", livingRoom);
formData.append("entertainmentRoom", entertainmentRoom);
formData.append("elevator", elevator);
formData.append("boatDock", boatDock);
formData.append("sauna", sauna);
formData.append("swimmingPool", swimmingPool);
formData.append("jacuzzi", jacuzzi);
formData.append("laundryRoom", laundryRoom);
formData.append("library", library);
formData.append("garage", garage);
formData.append("houseKeeperRoom", houseKeeperRoom);
formData.append("guestHouse", guestHouse);
formData.append("bbqArea", bbqArea);
formData.append("solar", solar);
formData.append("gym", gym);
formData.append("clubhouse", clubhouse);
formData.append("securityguard", securityguard);
formData.append("partyhall", partyhall);
formData.append("gymroom", gymroom);
formData.append("convenientstore", convenientstore);
formData.append("coffeecorner", coffeecorner);
      formData.append("thumbnail", thumbnail);
      files.map((file, inx) => formData.append("picture", file));

      formData.append("lat", location.lat);
      formData.append("long", location.long);
      formData.append("address", location.address);
      formData.append("country", location.country);
      formData.append("city", location.city);
      formData.append("provice", location.provice);
      formData.append("zipcode", location.zipcode);

      formData.append("features", features);

      formData.append("id", id);
      formData.append("beds", beds);
      formData.append("bathrooms", baths);
      formData.append("condition", condition);
      formData.append("built", built);
      formData.append("neighbor", neighbor);
      formData.append("living", living);
      formData.append("dining", dining);
      formData.append("story", story);
      formData.append("parking", parking);
      formData.append("lotsize", lotsize);
      formData.append("view", view);
      formData.append("near", nearId);

      formData.append("category", type ? type : typeList[0].name);
      // formData.append("buy");

      formData.append("authorId", user._id);

      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/submitlisting/submit`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          // const Msg = res.data.Msg;
          navigate("/admin/properties");
        })
        .catch((err) => {
          // const Msg = err.response.data.Msg;
          // if (Msg === "Please Fill Out All Feilds") {
          // setError(true);
          // setFieldError(true);
          // setMinFileError(false);
          // } else if (Msg === "Please Fill Thumbnail Picture") {
          // setError(true);
          // setFieldError(false);
          // setMinFileError(true);
          // } else if (Msg === "You can upload only 5 pictures") {
          // setError(true);
          // setFieldError(false);
          // setMinFileError(false);
          // setMaxFileError(true);
          // } else {
          console.log(err.response);
          // }
        });
    }
  };

  return (
    <div className="section">
      <Container maxW="80%">
        <div className="row">
          <Tab.Container defaultActiveKey={tabKey} activeKey={tabKey}>
            {/* Tabs Start */}
            <div className="col-md-4">
              <Nav variant="tabs" className="nav nav-tabs tab-cards">
                <Nav.Item>
                  <Nav.Link eventKey="tab1" onClick={() => setTabKey("tab1")}>
                    <span>01</span> Basic Information
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="tab2" onClick={() => setTabKey("tab2")}>
                    <span>02</span> Gallery
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="tab3" onClick={() => setTabKey("tab3")}>
                    <span>03</span> Location
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="tab4" onClick={() => setTabKey("tab4")}>
                    <span>04</span> Features
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="tab5" onClick={() => setTabKey("tab5")}>
                    <span>05</span> Details
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            {/* Tabs End */}
            {/* Tab Content Start */}
            <div className="col-md-8">
              <form onSubmit={(e) => e.preventDefault()}>
                <Tab.Content className="m-0">
                  <Tab.Pane eventKey="tab1">
                    <div className="row">
                      <div className="col-md-12 form-group">
                        <label>Property Description</label>
                        <textarea
                          name="content"
                          rows={4}
                          className="form-control"
                          placeholder="Property Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>Property Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Property Name"
                          required
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>Property Status</label>
                        <select
                          className="form-control"
                          name="status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          {statusList.map((res, key) => (
                            <option key={key} value={res}>
                              {res}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label>Property Type</label>
                        <select
                          className="form-control"
                          name="type"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                        >
                          {typeList.map((res, key) => (
                            <option key={key} value={res.name}>
                              {res.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6 form-group">
                        <label>Property Price</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <select
                              className="form-control"
                              name="type"
                              value={currency}
                              onChange={(e) => setCurrency(e.target.value)}
                            >
                              {currencyList.map((res, key) => (
                                <option key={key} value={res.symbol}>
                                  {res.symbol}
                                </option>
                              ))}
                            </select>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            name="price"
                            placeholder="Property Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                      </div>
                      {status === "Rental" ? (
                        <div className="col-md-6">
                          <label>Rental Period</label>
                          <select
                            className="form-control"
                            name="period"
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                          >
                            <option value="Monthly">Monthly</option>
                            <option value="Yearly">Yearly</option>
                          </select>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className="col-md-6 form-group">
                        <label>Property Space (SQM)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Property Space (Sqm)"
                          name="space"
                          value={space}
                          onChange={(e) => setSpace(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>Property Land (SQM)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Property Land (Sqm)"
                          name="space"
                          value={land}
                          onChange={(e) => setLand(e.target.value)}
                        />
                      </div>
                      <div className="col-md-12 form-group">
                        <label>Property Video</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Property Video URL"
                          name="video"
                          value={video}
                          onChange={(e) => setVideo(e.target.value)}
                        />
                      </div>
                    

{/* Additional Fields */}
<div className="col-md-6 form-group">
  <label>Building Size (SQM)</label>
  <input
    type="text"
    className="form-control"
    placeholder="Building Size (Sqm)"
    name="buildingSize"
    value={buildingSize}
    onChange={(e) => setBuildingSize(e.target.value)}
  />
</div>
<div className="col-md-6 form-group">
  <label>Land Area (SQM)</label>
  <input
    type="text"
    className="form-control"
    placeholder="Land Area (Sqm)"
    name="landArea"
    value={landArea}
    onChange={(e) => setLandArea(e.target.value)}
  />
</div>
<div className="col-md-6 form-group">
  <label>Year Built</label>
  <input
    type="text"
    className="form-control"
    placeholder="Year Built"
    name="yearBuilt"
    value={yearBuilt}
    onChange={(e) => setYearBuilt(e.target.value)}
  />
</div>
<div className="col-md-6 form-group">
  <label>Building Floor</label>
  <select
    className="form-control"
    name="buildingFloor"
    value={buildingFloor}
    onChange={(e) => setBuildingFloor(e.target.value)}
  >
    <option value="">Select</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="more">More</option>
  </select>
</div>
<div className="col-md-6 form-group">
  <label>Bedroom</label>
  <input
    type="number"
    className="form-control"
    placeholder="Number of Bedrooms"
    name="bedroom"
    value={bedroom}
    onChange={(e) => setBedroom(e.target.value)}
  />
</div>
<div className="col-md-6 form-group">
  <label>Bath Room</label>
  <input
    type="number"
    className="form-control"
    placeholder="Number of Bathrooms"
    name="bathRoom"
    value={bathRoom}
    onChange={(e) => setBathRoom(e.target.value)}
  />
</div>
<div className="col-md-6 form-group">
  <label>Kitchen</label>
  <input
    type="number"
    className="form-control"
    placeholder="Number of Kitchens"
    name="kitchen"
    value={kitchen}
    onChange={(e) => setKitchen(e.target.value)}
  />
</div>
<div className="col-md-6 form-group">
  <label>Dining Room</label>
  <input
    type="number"
    className="form-control"
    placeholder="Number of Dining Rooms"
    name="diningRoom"
    value={diningRoom}
    onChange={(e) => setDiningRoom(e.target.value)}
  />
</div>
<div className="col-md-6 form-group">
  <label>Family Room</label>
  <input
    type="number"
    className="form-control"
    placeholder="Number of Family Rooms"
    name="familyRoom"
    value={familyRoom}
    onChange={(e) => setFamilyRoom(e.target.value)}
  />
</div>
<div className="col-md-6 form-group">
  <label>Game Room</label>
  <input
    type="number"
    className="form-control"
    placeholder="Number of Game Rooms"
    name="gameRoom"
    value={gameRoom}
    onChange={(e) => setGameRoom(e.target.value)}
  />
</div>
<div className="col-md-6 form-group">
  <label>Meeting Room</label>
  <input
    type="number"
    className="form-control"
    placeholder="Number of Meeting Rooms"
    name="meetingRoom"
    value={meetingRoom}
    onChange={(e) => setMeetingRoom(e.target.value)}
  />
</div>
<div className="col-md-6 form-group">
  <label>Living Room</label>
  <select
    className="form-control"
    name="livingRoom"
    value={livingRoom}
    onChange={(e) => setLivingRoom(e.target.value)}
  >
    <option value="">Select</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
  </select>
</div>
<div className="col-md-6 form-group">
  <label>Entertainment Room</label>
  <input
    type="number"
    className="form-control"
    placeholder="Number of Entertainment Rooms"
    name="entertainmentRoom"
    value={entertainmentRoom}
    onChange={(e) => setEntertainmentRoom(e.target.value)}
  />
</div>
<div className="col-md-6 form-group">
  <label>Elevator</label>
  <select
    className="form-control"
    name="elevator"
    value={elevator}
    onChange={(e) => setElevator(e.target.value)}
  >
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
</div>
<div className="col-md-6 form-group">
  <label>Boat Dock</label>
  <input
    type="text"
    className="form-control"
    placeholder="Boat Dock"
    name="boatDock"
    value={boatDock}
    onChange={(e) => setBoatDock(e.target.value)}
  />
</div>
<div className="col-md-6 form-group">
  <label>Sauna</label>
  <input
    type="text"
    className="form-control"
    placeholder="Sauna"
    name="sauna"
    value={sauna}
    onChange={(e) => setSauna(e.target.value)}
  />
</div>
<div className="col-md-6 form-group">
  <label>Swimming Pool</label>
  <input
    type="text"
    className="form-control"
    placeholder="Swimming Pool"
    name="swimmingPool"
    value={swimmingPool}
    onChange={(e) => setSwimmingPool(e.target.value)}
  />
</div>
<div className="col-md-6 form-group">
  <label>Jacuzzi</label>
  <input
    type="text"
    className="form-control"
    placeholder="Jacuzzi"
    name="jacuzzi"
    value={jacuzzi}
    onChange={(e) => setJacuzzi(e.target.value)}
  />
</div>
<div className="col-md-6 form-group">
  <label>Laundry Room</label>
  <input
    type="text"
    className="form-control"
    placeholder="Laundry Room with Skylight"
    name="laundryRoom"
    value={laundryRoom}
    onChange={(e) => setLaundryRoom(e.target.value)}
  />
</div>
<div className="col-md-6 form-group">
  <label>Library</label>
  <select
    className="form-control"
    name="library"
    value={library}
    onChange={(e) => setLibrary(e.target.value)}
  >
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
</div>
<div className="col-md-6 form-group">
  <label>Garage</label>
  <select
    className="form-control"
    name="garage"
    value={garage}
    onChange={(e) => setGarage(e.target.value)}
  >
    <option value="">Select</option>
    <option value="2">2 car park</option>
    <option value="3">3 car park</option>
    <option value="4">4 car park</option>
    <option value="5">5 car park</option>
  </select>
</div>
<div className="col-md-6 form-group">
  <label>House Keeper Room</label>
  <select
    className="form-control"
    name="houseKeeperRoom"
    value={houseKeeperRoom}
    onChange={(e) => setHouseKeeperRoom(e.target.value)}
  >
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
</div>
<div className="col-md-6 form-group">
  <label>Guest House</label>
  <select
    className="form-control"
    name="guestHouse"
    value={guestHouse}
    onChange={(e) => setGuestHouse(e.target.value)}
  >
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
</div>
<div className="col-md-6 form-group">
  <label>BBQ Area</label>
  <select
    className="form-control"
    name="bbqArea"
    value={bbqArea}
    onChange={(e) => setBbqArea(e.target.value)}
  >
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
</div>
<div className="col-md-6 form-group">
  <label>Solar</label>
  <select
    className="form-control"
    name="solar"
    value={solar}
    onChange={(e) => setSolar(e.target.value)}
  >
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
</div>
<div className="col-md-6 form-group">
  <label>Gyms</label>
  <select
    className="form-control"
    name="gym"
    value={gym}
    onChange={(e) => setGyms(e.target.value)}
  >
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
  </div>
  <div className="col-md-6 form-group">
  <label>Club House</label>
  <select
    className="form-control"
    name="clubhouse"
    value={setClubhouse}
    onChange={(e) => setClubhouse(e.target.value)}
  >
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
  </div>
  <div className="col-md-6 form-group">
  <label>Security Guard</label>
  <select
    className="form-control"
    name="securitygaurd"
    value={setSecurityguard}
    onChange={(e) => setSecurityguard(e.target.value)}
  >
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
  </div>
  <div className="col-md-6 form-group">
  <label>Party Hall</label>
  <select
    className="form-control"
    name="partyhall"
    value={setPartyhall}
    onChange={(e) => setPartyhall(e.target.value)}
  >
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
  </div>
  <div className="col-md-6 form-group">
  <label>Gym Room</label>
  <select
    className="form-control"
    name="gymroom"
    value={setGymroom}
    onChange={(e) => setGymroom(e.target.value)}
  >
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
  </div>
  <div className="col-md-6 form-group">
  <label>Convenient Store</label>
  <select
    className="form-control"
    name="convenientstore"
    value={setConvenientstore}
    onChange={(e) => setConvenientstore(e.target.value)}
  >
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
  </div>
  <div className="col-md-6 form-group">
  <label>Coffee Corner</label>
  <select
    className="form-control"
    name="coffeecorner"
    value={setCoffeecorner}
    onChange={(e) => setCoffeecorner(e.target.value)}
  >
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
  </div>

                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="tab2">
                    <div className="form-group row">
                      <label>Property Thumbnail</label>
                      <div className="custom-file col-md-4 col-lg-3">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="propertyThumbnail"
                          onChange={async (e) => {
                            const base64 = await convertToBase64(
                              e.target.files[0]
                            );
                            setThumbnailUrl(base64);
                            setThumbnail(e.target.files[0]);
                          }}
                          style={{ display: "none" }}
                        />
                        <label
                          className="custom-file-label cursor-pointer"
                          htmlFor="propertyThumbnail"
                        >
                          Choose File
                        </label>
                      </div>

                      {thumbnailUrl ? (
                        <img
                          className="col-lg-3 col-md-3"
                          src={thumbnailUrl}
                          alt="ThumbImage"
                          style={{ width: "100px" }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group">
                      <label>Property Gallery</label>
                      <div
                        {...getRootProps({
                          className: "dropzone cursor-pointer",
                        })}
                      >
                        <input {...getInputProps(-5)} multiple />
                        <div className="dropzone-msg dz-message needsclick">
                          <i className="fas fa-cloud-upload-alt" />
                          <h5 className="dropzone-msg-title">
                            Drop files here or click to upload.
                          </h5>
                          <span className="dropzone-msg-desc">
                            This is just a demo dropzone. Selected files are{" "}
                            <strong>not</strong> actually uploaded.
                          </span>
                        </div>
                      </div>
                      <aside className={thumbsContainer}>{thumbs}</aside>
                      <span className="acr-form-notice">
                        *You can upload up to 5 images for your listing
                      </span>
                      <span className="acr-form-notice">
                        *Listing images should be atleast 620x480 in dimensions
                      </span>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="tab3">
                    <Locationtab locationData={locationData} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="tab4">
                    <div className="row">
                      {featureList.map((res, key) => (
                        <div key={key} className="col-lg-4 col-md-6 col-sm-6">
                          <label className="acr-listing-feature">
                            <input
                              type="checkbox"
                              name={"feature" + res._id + ""}
                              onClick={() => featuresData(res._id)}
                            />
                            <i className="acr-feature-check fas fa-check" />
                            <i style={{ textAlign: "-webkit-center" }}>
                              <img
                                className="acr-listing-feature-icon"
                                src={`${process.env.REACT_APP_SERVER_URL}/${res.icon}`}
                                alt="ThumbImage"
                                style={{ marginBottom: "20px" }}
                              />
                            </i>
                            {res.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="tab5">
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label>Property ID</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Property ID"
                          name="id"
                          value={id}
                          onChange={(e) => setId(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>Beds</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Number of Beds"
                          name="beds"
                          value={beds}
                          onChange={(e) => setBeds(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>Bathrooms</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Number of Bathrooms"
                          name="baths"
                          value={baths}
                          onChange={(e) => setBaths(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>Condition</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Property Condition"
                          name="condition"
                          value={condition}
                          onChange={(e) => setCondition(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>Year Built</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Property Year Built"
                          name="built"
                          value={built}
                          onChange={(e) => setBuilt(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>Neighborhood</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Property Neighborhood"
                          name="neighborhood"
                          value={neighbor}
                          onChange={(e) => setNeighbor(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>Living Room</label>
                        <select
                          className="form-control"
                          name="livingRoom"
                          value={living}
                          onChange={(e) => setLiving(e.target.value)}
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                      <div className="col-md-6 form-group">
                        <label>Dining Room</label>
                        <select
                          className="form-control"
                          name="diningRoom"
                          value={dining}
                          onChange={(e) => setDining(e.target.value)}
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                      <div className="col-md-6 form-group">
                        <label>Building Floor</label>
                        <input
                          type="number"
                          className="form-control"
                          name="buildstory"
                          value={story}
                          onChange={(e) => setStory(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>Parking</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Parking"
                          name="Parking"
                          value={parking}
                          onChange={(e) => setParking(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>Lot Size</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Lot Size"
                          name="lotsize"
                          value={lotsize}
                          onChange={(e) => setLotsize(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 form-group">
                        <label>View</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="View"
                          name="view"
                          value={view}
                          onChange={(e) => setView(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <label>Enter the Nearby </label>
                      <table
                        className="table table-bordered text-center"
                        style={{ margin: "0px 20px" }}
                      >
                        <thead>
                          <tr className="roof">
                            <th className="col-3"> Select Type </th>
                            <th className="col-4"> Name</th>
                            <th className="col-2"> Distance (km)</th>
                            <th className="col-3">
                              <button
                                className="btn btn-success"
                                onClick={() => addRow()}
                              >
                                + Add Row
                              </button>{" "}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {nears.rows.map((item, idx) => (
                            <tr key={idx}>
                              <td>
                                <select
                                  className="form-control"
                                  value={item.type}
                                  name="neartype"
                                  disabled={nears.rows[idx].isEdit}
                                  onChange={(e) => {
                                    const multy = [...nears.rows];
                                    multy[idx].neartype = e.target.value;
                                    setNears({
                                      rows: [...multy],
                                    });
                                  }}
                                >
                                  {nearTypeList.map((res, key) => (
                                    <option key={key} value={res._id}>
                                      {res.name}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="name"
                                  value={item.name}
                                  disabled={nears.rows[idx].isEdit}
                                  onChange={(e) => {
                                    const multy = [...nears.rows];
                                    multy[idx].name = e.target.value;
                                    setNears({
                                      rows: [...multy],
                                    });
                                  }}
                                />
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="distance"
                                  value={item.distance}
                                  disabled={nears.rows[idx].isEdit}
                                  onChange={(e) => {
                                    const multy = [...nears.rows];
                                    multy[idx].distance = e.target.value;
                                    setNears({
                                      rows: [...multy],
                                    });
                                  }}
                                />
                              </td>
                              <td
                                className="td-valid"
                                style={{ textAlign: "center" }}
                              >
                                <button
                                  className="btn btn-primary"
                                  onClick={(e) => {
                                    enableEdit(e, idx);
                                  }}
                                  style={{ borderRadius: "5px" }}
                                >
                                  Save
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={(e) => removeRow(e, idx)}
                                  style={{ borderRadius: "5px" }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="form-group" style={{ marginTop: "30px" }}>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="termsAndConditions"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="termsAndConditions"
                        >
                          I Agree to the terms &amp; Conditions of Property
                          Submission
                        </label>
                      </div>
                    </div>
                    <button
                      className="btn-custom"
                      name="submit"
                      onClick={(e) => {
                        submitData(e);
                      }}
                    >
                      Submit Listing
                    </button>
                    {user && user.isAdmin ? (
                      <button
                        type="button"
                        className="btn btn-default"
                        onClick={() => navigate("/admin/properties")}
                      >
                        <span className="fa fa-reply"></span> Cancel
                      </button>
                    ) : (
                      <></>
                    )}
                    <div>
                      {error === undefined || false ? (
                        ""
                      ) : (
                        <div
                          style={{
                            marginTop: "20px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "80%",
                              backgroundColor: "#FF3131",
                              color: "white",
                              padding: "10px 20px 10px 20px",
                              borderRadius: "5px",
                              alignItems: "center",
                            }}
                          >
                            <span>
                              {fieldError ? " Please Fill Out All Fields" : ""}
                            </span>
                            <span>
                              {minFileError
                                ? " Please Select Images for Thumbnail or Gallery"
                                : ""}
                            </span>
                            <span>
                              {maxFileError
                                ? "You can select only 5 pictures"
                                : ""}
                            </span>
                            <button
                              style={{
                                border: "white 2px solid",
                                borderRadius: "25px",
                                width: "35px",
                                backgroundColor: "#FF3131",
                                color: "white",
                                fontSize: "15px",
                                alignItems: "center",
                              }}
                              onClick={() => {
                                setError(undefined);
                                setFieldError(undefined);
                                setMinFileError(undefined);
                                setMaxFileError(undefined);
                              }}
                            >
                              x
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </form>
            </div>
          </Tab.Container>
          {/* Tab Content End */}
        </div>
      </Container>
    </div>
  );
}

export default Content;
