import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import Document from "../document/Document";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

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
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const itemData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

export default function Documents(prop) {
  const classes = useStyles();
  const { documents, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const getLibraries = async () => {
      try {
        if (!documents) {
          const document = await axios.get(
            "http://localhost:4000/api/documents"
          );
          if (document.data) {
            dispatch({ type: "UPDATE_BOOKS", payload: document.data });
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    getLibraries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ width: "700px", display: "flex" }}>
      <ImageList
        classes={{ root: classes.center }}
        className={classes.imageList}
      >
        {documents?.length > 0 &&
          documents.map((info) => (
            <>
              <Document
                doc={prop?.doc}
                setDoc={prop?.setDoc}
                isForm={prop?.isForm}
                data={info}
              />
            </>
          ))}
      </ImageList>
    </div>
  );
}
