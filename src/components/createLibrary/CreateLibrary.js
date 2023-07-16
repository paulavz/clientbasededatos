import React from "react";
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Rightbar from "../rightbar/Rightbar";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Paper,
  TextField,
  makeStyles,
} from "@material-ui/core";
import Documents from "../documents/Documents";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { updateLibrariesCall } from "../../apiCalls";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    minHeight: "20px",
  },
}));

export default function CreateLibrary() {
  const history = useHistory();

  const classes = useStyles();
  const [doc, setDoc] = useState([]);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState(null);
  const { user, dispatch } = useContext(AuthContext);

  async function saveLibrary(name, subject, doc) {
    const body = {
      name,
      subject,
      documents: doc,
      userId: user._id,
    };
    const resp = await axios.post("http://localhost:4000/api/library", body);
    if (resp.status === 200) {
      updateLibrariesCall(dispatch);
      history.push("/");
    }
  }

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <div style={{ width: "800px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "800px" }}>
              <Box>
                <Paper
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: "20px",
                    margin: "30px",
                  }}
                >
                  <form
                    className={classes.root}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "700px",
                    }}
                  >
                    <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                      Create Library
                    </div>
                    <FormControl
                      classes={{ root: classes.input }}
                      fullWidth
                      style={{ width: "600px", minHeight: "10px" }}
                    >
                      <TextField
                        id="name"
                        label="Nombre"
                        variant="outlined"
                        name="name"
                        classes={{ root: classes.input }}
                        size="small"
                        onChange={(ev) => setName(ev.target.value)}
                      />
                    </FormControl>
                    <FormControl fullWidth style={{ width: "600px" }}>
                      <TextField
                        id="subject"
                        label="Materia"
                        variant="outlined"
                        size="small"
                        onChange={(ev) => setSubject(ev.target.value)}
                      />
                    </FormControl>
                    <FormControl fullWidth style={{ width: "600px" }}>
                      <FormLabel style={{ marginBottom: "20px" }}>
                        Imagen Cover
                      </FormLabel>
                      <input
                        type="file"
                        id="img"
                        name="img"
                        accept=".jpg, .jpeg, .png"
                        onChange={(ev) => {
                          setPreview(URL.createObjectURL(ev.target.files[0]));
                        }}
                      />
                    </FormControl>
                    {preview && (
                      <img
                        style={{ width: "140px", height: "190px" }}
                        src={preview}
                        alt="preview"
                      />
                    )}
                    <FormControl fullWidth style={{ width: "600px" }}>
                      <FormLabel>Añadir Documento</FormLabel>
                    </FormControl>
                    <Documents doc={doc} setDoc={setDoc} isForm={true} />
                    <Button
                      fullWidth
                      style={{
                        width: "600px",
                        height: "40px",
                        marginBottom: "30px",
                      }}
                      variant="contained"
                      color="primary"
                      onClick={(ev) => {
                        ev.preventDefault();
                        saveLibrary(name, subject, doc);
                      }}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </form>
                </Paper>
              </Box>
            </div>
          </div>
        </div>
        <Rightbar />
      </div>
    </>
  );
}
