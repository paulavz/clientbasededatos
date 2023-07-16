import {
  Box,
  Button,
  FormControl,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import { updateLibrariesCall, updateMyLibraryCall } from "../../apiCalls";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
    position: "relative",
  },
  position: {
    position: "absolute",
    top: "-130px",
    right: 0,
  },
  radius: { borderRadius: "10px" },
  color: { backgroundColor: "blue" },
}));

export default function Document(prop) {
  const { data } = prop;
  const { user, dispatch, loading, libraries: libr } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    border: "2px solid white",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "24px",
  };

  const classes = useStyles();
  const authors = data?.authors
    ?.map((aut, i) => aut)
    ?.slice(0, 2)
    ?.join();

  const libraries = libr?.filter((l) => {
    return user?._id === l?.userId?._id;
  });

  const filterLibrary = libraries?.filter((lib) => {
    if (lib?.documents?.map((it) => it?._id).includes(data?._id)) {
      return false;
    }
    return true;
  });

  async function addDocumentToLibrary(libraryId, documentId) {
    dispatch({ type: "LOADING" });

    const resp = await axios.put(
      `http://localhost:4000/api/library/${libraryId}`,
      {
        documents: [documentId],
      }
    );
    if (resp) {
      updateLibrariesCall(dispatch);
      updateMyLibraryCall(user?._id, dispatch);
    }
    if (!loading) {
      setOpen(false);
    }
  }

  function icon() {
    if (prop?.isForm) {
      return (
        prop?.doc?.includes(data?._id) && (
          <IconButton aria-label={`info about`} className={classes.icon}>
            <CheckCircleIcon
              color="success"
              onClick={() => {
                setOpen(true);
              }}
            />
          </IconButton>
        )
      );
    } else if (filterLibrary?.length !== 0) {
      return (
        <IconButton aria-label={`info about`} className={classes.icon}>
          <Add
            onClick={() => {
              setOpen(true);
            }}
          />
        </IconButton>
      );
    }
  }

  return (
    <>
      <ImageListItem
        style={{
          width: "140px",
          height: "190px",
          listStyle: "none",
          marginRight: "10px",
          marginBottom: "20px",
        }}
        className={classes.radius}
        classes={{
          root: classes.radius,
          item: classes.radius,
        }}
        key={1}
        onClick={() => {
          if (prop?.isForm) {
            if (prop?.doc?.includes(data?._id)) {
              prop?.setDoc((doc) => doc?.filter((d) => d !== data?._id));
            } else {
              prop?.setDoc((doc) => doc.concat(data?._id));
            }
          }
        }}
      >
        <img
          style={{ borderRadius: "5px" }}
          src="http://localhost:4000/person/8.jpeg"
          alt="example"
        />
        <ImageListItemBar
          title={data?.title}
          subtitle={<span>Por: {authors}</span>}
          classes={{
            actionIcon: classes.position,
          }}
          actionIcon={icon()}
          actionPosition="right"
        />
      </ImageListItem>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Añade a una libreria
          </Typography>
          <Box sx={{ minWidth: 250, marginTop: "25px" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Librerias</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Age"
                onChange={handleChange}
              >
                {filterLibrary.map((l) => {
                  return (
                    <MenuItem value={l._id} key={l._id}>
                      {l.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" justifyContent="flex-end" marginTop="25px">
            <Button
              color="primary"
              variant="contained"
              minWidth={100}
              onClick={() => {
                addDocumentToLibrary(value, data._id);
              }}
            >
              Aceptar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
