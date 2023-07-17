import "./share.css";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Box, Tab, Tabs } from "@material-ui/core";
import News from "../news/News";
import Documents from "../documents/Documents";
import {
  librosSeguidosCall,
  updateLibrariesCall,
  updateMyLibraryCall,
} from "../../apiCalls";

export default function Share() {
  const { user, followLibraries, dispatch, libraries, myLibrary } =
    useContext(AuthContext);

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (!followLibraries) {
      librosSeguidosCall(user?._id, dispatch);
    }

    if (!libraries) {
      updateLibrariesCall(dispatch);
    }

    if (!myLibrary) {
      updateMyLibraryCall(user?._id, dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className="shareTop">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Nuevo" {...a11yProps(2)} />
            <Tab label="Mis Bibliotecas" {...a11yProps(0)} />
            <Tab label="Bibliotecas Seguidas" {...a11yProps(1)} />
            <Tab label="Documentos" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <div style={{ marginTop: "25px" }}>
          {value === 0 && (
            <News
              data={libraries}
              isEdit={false}
              showFollowButton
              showAddButton={false}
              showUnfollowButton={false}
              setValue={setValue}
            />
          )}
        </div>
        <div style={{ marginTop: "25px" }}>
          {value === 1 && (
            <News
              data={myLibrary}
              isEdit
              showFollowButton={false}
              showAddButton
              showUnfollowButton={false}
              setValue={setValue}
            />
          )}
        </div>
        <div style={{ marginTop: "25px" }}>
          {value === 2 && (
            <News
              data={followLibraries}
              isEdit={false}
              showFollowButton={false}
              showUnfollowButton
              setValue={setValue}
            />
          )}
        </div>
        <div style={{ marginTop: "25px" }}>{value === 3 && <Documents />}</div>
      </Box>
    </div>
  );
}
