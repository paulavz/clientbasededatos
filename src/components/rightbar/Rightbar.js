import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./rightbar.css";
import { Box } from "@material-ui/core";

export default function Rightbar({ user }) {
  const [friends, setFriends] = useState([]);
  const [documents, setDocuments] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [, setFollowed] = useState(
    currentUser?.followings?.includes(user?._id)
  );
  useEffect(() => {
    setFollowed(currentUser?.followings?.includes(user?._id));
  }, [currentUser, user?._id]);
  useEffect(() => {
    const getTeachers = async () => {
      try {
        const friendList = await axios.get(
          "http://localhost:4000/api/library?limit=4"
        );
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getDocuments = async () => {
      try {
        const documents = await axios.get(
          "http://localhost:4000/api/documents?limit=16"
        );
        setDocuments(documents.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTeachers();
    getDocuments();
  }, [user]);

  /*  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };*/

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Últimas bibliotecas</h4>

        <div className="rightbarFollowings">
          {friends?.map((friend) => {
            console.log(friend?.img);
            return (
              <Box>
                <div className="rightbarFollowing">
                  <span
                    style={{ height: "30px" }}
                    className="rightbarFollowingName"
                  >{`${friend.name}`}</span>

                  <img
                    src={
                      friend?.img
                        ? `http://localhost:4000/${friend?.img}`
                        : "http://localhost:4000/person/1.jpeg"
                    }
                    alt="Seguidores"
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingAuthor">{`${friend.subject}`}</span>
                </div>
              </Box>
            );
          })}
        </div>
      </>
    );
  };

  const DocumentsRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Últimos Documentos</h4>
        <div className="rightbarDocContainer">
          {documents.map((doc) => {
            const authors = doc.authors
              .map((aut, i) => aut)
              .slice(0, 2)
              .join();

            return (
              <div className="rightbarDoc">
                <img
                  src={
                    doc?.img
                      ? `http://localhost:4000${doc?.img}`
                      : "http://localhost:4000/person/1.jpeg"
                  }
                  alt="Seguidores"
                  className="rightbarFollowingImg"
                />
                <div className="rightbarDocText">
                  <div className="rightbarDocTitle">{doc.title}</div>
                  <div className="rightbarDocAuthors">
                    <div>{authors}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <ProfileRightbar />
        <DocumentsRightbar />
      </div>
    </div>
  );
}
