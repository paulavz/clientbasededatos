import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilled,
  Group,
  Bookmark,
  HelpOutline,
  Work,
  Event,
  School,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Sidebar() {
  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const friendList = await axios.get("http://localhost:4000/api/users");
        setTeacher(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTeachers();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        {/*<ul className="sidebarList">
					{listItems.map((val) => (
						<li key={val.id} className="sidebarListItem">
							<val.icon className="sidebarIcon" />
							<span className="sidebarListItemText">
								{val.name}
							</span>
						</li>
					))}
				</ul>
					<button className="sidebarButton">Mostrar más</button>        <hr className="sidebarHr" />
*/}
        <h4 className="rightbarTitle">Profesores</h4>

        <ul className="sidebarFriendList">
          {teacher.map((u) => {
            return <CloseFriend key={u._id} user={u} />;
          })}
        </ul>
        <h4 className="rightbarTitle">Publicidad</h4>
        <img
          className="ad"
          src="http://localhost:4000/ad.png"
          alt="ad"
        />
      </div>
    </div>
  );
}
