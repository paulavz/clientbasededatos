import { Button, IconButton, Paper } from "@material-ui/core";
import React, { useContext } from "react";
import "./news.css";
import Add from "@mui/icons-material/Add";
import { AuthContext } from "../../context/AuthContext";
import { followLibraryCall, unFollowLibraryCall } from "../../apiCalls";
import { useHistory } from "react-router-dom";

export default function News({
  data,
  isEdit,
  showFollowButton,
  showAddButton,
  showUnfollowButton,
  setValue,
}) {
  const { user, dispatch } = useContext(AuthContext);
  const history = useHistory();

  return (
    <div>
      {data && data?.length === 0 && showAddButton && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: "20px" }}>
            No tienes librerias aún
          </div>
          <Button
            onClick={() => history.push("/crear/library")}
            color="primary"
            variant="contained"
            endIcon={<Add />}
          >
            Crear Libreria
          </Button>
        </div>
      )}
      {data &&
        data?.length > 0 &&
        data.map((lib) => {
          return (
            <Paper style={{ marginBottom: "20px", padding: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "30%",
                  }}
                ></div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "30%",
                  }}
                >
                  <h4
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                    className="rightbarTitle"
                  >
                    {lib.name}
                  </h4>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "30%",
                  }}
                >
                  {showFollowButton &&
                    lib?.userId?._id !== user?._id &&
                    (!user?.followLibraries?.includes(lib._id) ? (
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#1877f2", color: "white" }}
                        onClick={() => {
                          followLibraryCall(user._id, lib._id, dispatch);
                        }}
                      >
                        Seguir
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ color: "white" }}
                        onClick={() => {
                          unFollowLibraryCall(user?._id, lib?._id, dispatch);
                        }}
                      >
                        Dejar de Seguir
                      </Button>
                    ))}
                  {showUnfollowButton && (
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{ color: "white" }}
                      onClick={() => {
                        unFollowLibraryCall(user?._id, lib?._id, dispatch);
                      }}
                    >
                      Dejar de Seguir
                    </Button>
                  )}
                </div>
              </div>
              <div className="dFlex">
                <div className="librarySubtitle">
                  por {lib?.userId?.name} {lib?.userId?.lastName}
                </div>
              </div>
              <div className="libraryCoverContainer">
                <img
                  src={
                    lib.img
                      ? `http://localhost:4000/${lib.img}`
                      : "http://localhost:4000/person/9.jpeg"
                  }
                  alt=""
                  className="libraryCover"
                />
              </div>
              <hr className="rightbarHR" />
              {isEdit && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <h4
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      marginLeft: "10px",
                    }}
                    className="rightbarTitle"
                  >
                    Documentos
                  </h4>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    style={{
                      padding: 0,
                      marginLeft: "10px",
                      marginTop: "-10px",
                    }}
                    onClick={() => {
                      setValue(3);
                    }}
                  >
                    <Add />
                  </IconButton>
                </div>
              )}
              <div className="dFlex" style={{ marginBottom: "20px" }}>
                <div className="grid-container">
                  {lib?.documents?.map((doc) => {
                    const authors = doc.authors
                      .map((aut, i) => aut)
                      .slice(0, 2)
                      .join();
                    return (
                      <div className="libraryWidth">
                        <div className="titleContainer">
                          <div className="rightbarDocTitle">{doc?.title}</div>
                        </div>
                        <img
                          src={
                            doc?.img
                              ? `http://localhost:4000${doc?.img}`
                              : "http://localhost:4000/person/9.jpeg"
                          }
                          alt=""
                          className="libraryCover"
                        />
                        <div className="titleContainer">
                          <div className="rightbarDocAuthors">{authors}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Paper>
          );
        })}
    </div>
  );
}
