import "./topbar.css";
import { Search } from "@material-ui/icons";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Button, Menu, MenuItem, makeStyles } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    top: "40px !important",
    left: "408px !important",
    position: "absolute",
  },
  listw: {
    width: "600px",
  },
}));

export default function Topbar() {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputSearch, setInputSearch] = useState("");
  const [resultSearch, setResultSearch] = useState([]);
  const history = useHistory();
  const open = Boolean(anchorEl);
  async function search(event) {
    const body = {
      title: inputSearch,
    };
    const resp = await axios.post(
      `http://localhost:4000/api/documents/buscar`,
      body
    );
    if (resp) {
      setResultSearch(resp.data);
    }
  }

  const handleClick = (event) => {
    if (inputSearch.length > 3) {
      search(event);
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Libexpo</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <input
            type="search"
            placeholder="Search for friends, post or video"
            className="searchInput"
            style={{ marginLeft: "40px" }}
            onChange={(ev) => setInputSearch(ev.target.value)}
          />
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              style={{ marginLeft: "40px" }}
            >
              <Search className="searchIcon" />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              PaperProps={{ className: classes.paper }}
              classes={{
                list: classes.listw,
              }}
            >
              {resultSearch?.length > 0 &&
                resultSearch.map((res) => (
                  <MenuItem
                    key={res.title}
                    onClick={() => {
                      history.push(`/document/${res?._id}`);
                    }}
                  >
                    {res.title}
                  </MenuItem>
                ))}
            </Menu>
          </div>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span
            className="topbarLink"
            onClick={() => {
              history.push("/crear/library");
            }}
          >
            Crear Biblioteca
          </span>
          <span
            className="topbarLink"
            onClick={() => {
              history.push("/crear/document");
            }}
          >
            Subir Documento
          </span>
        </div>
        {/*<div className="topbarIcons">
					<div className="topbarIconItem">
						<Person />
						<span className="topbarIconBadge">1</span>
					</div>
					<div className="topbarIconItem">
						<Chat />
						<span className="topbarIconBadge">2</span>
					</div>
					<div className="topbarIconItem">
						<Notifications />
						<span className="topbarIconBadge">1</span>
					</div>
	</div>*/}
        <Link to={`/profile/${user?._id}`}>
          <img
            src={
              user?.img
                ? `http://localhost:4000${user?.img}`
                : "http://localhost:4000/person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
