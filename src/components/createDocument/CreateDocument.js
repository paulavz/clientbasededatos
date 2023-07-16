import React from "react";
import Topbar from "../topbar/Topbar";
import Rightbar from "../rightbar/Rightbar";
import Sidebar from "../sidebar/Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormControl, FormLabel } from "@material-ui/core";
import { Box, Paper } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { documentCall } from "../../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

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

export default function CreateDocument() {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState(2023);
  const [edition, setEdition] = useState("");
  const [authors, setAuthors] = useState([]);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  async function saveDocument(
    title,
    publisher,
    year,
    edition,
    authors,
    subject,
    category,
    type,
    gender,
    country
  ) {
    const body = {
      title,
      publisher,
      year,
      edition,
      authors: [authors],
      subject,
      category,
      type,
      gender,
      country,
    };
    const resp = await axios.post(`http://localhost:4000/api/documents`, body);
    if (resp.status === 200) {
      documentCall(dispatch);
      history.push("/");
    }
  }

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
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
                  noValidate
                  autoComplete="off"
                >
                  <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Create Document
                  </div>
                  <FormControl
                    classes={{ root: classes.input }}
                    fullWidth
                    style={{ width: "70%", minHeight: "10px" }}
                  >
                    <TextField
                      id="title"
                      label="Title"
                      variant="outlined"
                      classes={{ root: classes.input }}
                      size="small"
                      onChange={(ev) => setTitle(ev.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth style={{ width: "70%" }}>
                    <TextField
                      id="publisher"
                      label="Publisher"
                      variant="outlined"
                      size="small"
                      onChange={(ev) => setPublisher(ev.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth style={{ width: "70%" }}>
                    <TextField
                      id="year"
                      label="Year"
                      variant="outlined"
                      type="number"
                      size="small"
                      onChange={(ev) => setYear(ev.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth style={{ width: "70%" }}>
                    <TextField
                      id="edition"
                      label="Edition"
                      variant="outlined"
                      size="small"
                      onChange={(ev) => setEdition(ev.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth style={{ width: "70%" }}>
                    <TextField
                      id="authors"
                      label="Authors"
                      variant="outlined"
                      size="small"
                      onChange={(ev) => setAuthors(ev.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth style={{ width: "70%" }}>
                    <FormLabel>Cover</FormLabel>
                    <input
                      type="file"
                      id="img"
                      name="img"
                      accept=".jpg, .jpeg, .png"
                    />
                  </FormControl>
                  <FormControl fullWidth style={{ width: "70%" }}>
                    <FormLabel>Archivo del Documento</FormLabel>
                    <input
                      type="file"
                      id="img"
                      name="img"
                      accept=".jpg, .jpeg, .png"
                    />
                  </FormControl>
                  <FormControl fullWidth style={{ width: "70%" }}>
                    <TextField
                      id="subject"
                      label="Subject"
                      variant="outlined"
                      size="small"
                      onChange={(ev) => setSubject(ev.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth style={{ width: "70%" }}>
                    <TextField
                      id="category"
                      label="Category"
                      variant="outlined"
                      size="small"
                      onChange={(ev) => setCategory(ev.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth style={{ width: "70%" }}>
                    <TextField
                      id="type"
                      label="Type"
                      variant="outlined"
                      size="small"
                      onChange={(ev) => setType(ev.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth style={{ width: "70%" }} size="small">
                    <TextField
                      id="gender"
                      label="Gender"
                      variant="outlined"
                      size="small"
                      onChange={(ev) => setGender(ev.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth style={{ width: "70%" }}>
                    <TextField
                      id="country"
                      label="Country"
                      variant="outlined"
                      size="small"
                      onChange={(ev) => setCountry(ev.target.value)}
                    />
                  </FormControl>
                  <Button
                    fullWidth
                    style={{
                      width: "70%",
                      height: "40px",
                      marginBottom: "30px",
                    }}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={(ev) => {
                      ev.preventDefault();
                      saveDocument(
                        title,
                        publisher,
                        year,
                        edition,
                        authors,
                        subject,
                        category,
                        type,
                        gender,
                        country
                      );
                    }}
                  >
                    Submit
                  </Button>
                </form>
              </Paper>
            </Box>
          </div>
        </div>
        <Rightbar />
      </div>
    </>
  );
}
