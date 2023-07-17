import React from "react";
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Rightbar from "../rightbar/Rightbar";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Button, Paper } from "@material-ui/core";

export default function DocumentPerfil() {
  const id = useParams()?.id;
  const [document, setDocument] = useState({});

  useEffect(() => {
    async function getDocumentById(id) {
      const resp = await axios.get(`http://localhost:4000/api/documents/${id}`);
      if (resp.status === 200) {
        setDocument(resp.data);
      }
    }
    getDocumentById(id);
  }, [id]);
  console.log("id", id);
  const authors = document?.authors
    ?.map((aut, i) => aut)
    ?.slice(0, 2)
    ?.join();

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
              }}
            >
              <h3 style={{ fontSize: "24px", marginTop: "30px" }}>
                {document.title}
              </h3>
              <img
                src={
                  document.img
                    ? `http://localhost:4000${document.img}`
                    : "http://localhost:4000/person/9.jpeg"
                }
                style={{ height: "300px", width: "200px" }}
                alt="img"
              />
              <a
                href={`http://localhost:4000${document?.file}`}
                download="Example-PDF-document"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: "25px" }}
              >
                <Button color="primary" variant="contained">
                  Descargar Archivo
                </Button>
              </a>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginTop: "15px",
                }}
              >
                Informacion
              </p>
              <div
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p style={{ marginTop: "5px", marginBottom: "5px" }}>
                  <b>Título</b>: {document.title || "-"}
                </p>
                <p style={{ marginTop: "5px", marginBottom: "5px" }}>
                  <b>Editorial</b>: {document.publisher || "-"}
                </p>
                <p style={{ marginTop: "5px", marginBottom: "5px" }}>
                  <b>Año</b>: {document.year || "-"}
                </p>
                <p style={{ marginTop: "5px", marginBottom: "5px" }}>
                  <b>Edición</b>: {document.edition || "-"}
                </p>
                <p style={{ marginTop: "5px", marginBottom: "5px" }}>
                  <b>Autor</b>: {authors || "-"}
                </p>
                <p style={{ marginTop: "5px", marginBottom: "5px" }}>
                  <b>Materia</b>: {document.subject || "-"}
                </p>
                <p style={{ marginTop: "5px", marginBottom: "5px" }}>
                  <b>Tipo de Documento</b>: {document.type || "-"}
                </p>
                <p style={{ marginTop: "5px", marginBottom: "5px" }}>
                  <b>Genero</b>: {document.gender || "-"}
                </p>
                <p style={{ marginTop: "5px", marginBottom: "5px" }}>
                  <b>País</b>: {document.country || "-"}
                </p>
              </div>
            </div>
          </Paper>
        </div>
        <Rightbar />
      </div>
    </>
  );
}
