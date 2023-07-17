import { useState } from "react";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Button, FormControl, FormLabel, Paper } from "@material-ui/core";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateUserCall } from "../../apiCalls";

export default function Profile() {
  const { user, dispatch } = useContext(AuthContext);
  const [edition, setEdition] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  async function subirImagendePerfil() {
    const formData2 = new FormData();
    formData2.append("file", file);
    const file2 = await axios.post(
      "http://localhost:4000/api/files/upload/pfp",
      formData2,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (file2.status === 200) {
      const body = {
        img: file2?.data?.path,
      };
      const userUpdate = await axios.put(
        `http://localhost:4000/api/users/${user?._id}/edit`,
        body
      );
      if (userUpdate) {
        updateUserCall(user?._id, dispatch);
        setEdition(false);
      }
    }
  }
  console.log(user?.img);
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <div style={{ width: "800px" }}>
          <Paper
            style={{
              marginTop: "40px",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "25px",
              }}
            >
              <img
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "100%",
                  border: "1px solid black",
                  marginTop: "40px",
                  marginBottom: "5px",
                }}
                src={
                  user?.img
                    ? `http://localhost:4000${user?.img}`
                    : "http://localhost:4000/person/noAvatar.png"
                }
                alt="preview"
              />
              <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                <b>Name</b>:{user.name} {user.lastName}
              </div>
              <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                <b>Email</b>: {user.email}
              </div>
              <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                <b>Telefono</b>: {user.phone}
              </div>
              <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                <b>Tipo</b>: {user.type}
              </div>
              <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                <b>Materia</b>: {user.subject}
              </div>
              <div
                style={{ marginTop: "5px", marginBottom: "5px" }}
                onClick={() => {
                  setEdition(true);
                }}
              >
                <Button>
                  {user?._id ? "Cambiar" : "Añadir"} Foto de Perfil
                </Button>
              </div>
              {edition && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <FormControl
                    fullWidth
                    style={{ marginTop: "5px", marginBottom: "5px" }}
                  >
                    <FormLabel>
                      {user?._id ? "Cambiar" : "Añadir"} Foto de Perfil
                    </FormLabel>
                    <input
                      type="file"
                      id="img"
                      name="img"
                      accept=".jpg, .jpeg, .png"
                      onChange={async (ev) => {
                        setFile(ev.target.files[0]);
                        setPreview(URL.createObjectURL(ev.target.files[0]));
                      }}
                    />
                  </FormControl>
                  {preview && (
                    <img
                      style={{
                        width: "140px",
                        height: "140px",
                        borderRadius: "100%",
                        border: "2px solid #1775ee",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                      src={preview}
                      alt="preview"
                    />
                  )}
                  {file && (
                    <Button
                      style={{ marginTop: "5px", marginBottom: "5px" }}
                      variant="contained"
                      color="primary"
                      onClick={() => subirImagendePerfil()}
                    >
                      {user?._id ? "Cambiar" : "Añadir"} Foto de Perfil
                    </Button>
                  )}
                </div>
              )}
            </div>
          </Paper>
        </div>
        <Rightbar />
      </div>
    </>
  );
}
