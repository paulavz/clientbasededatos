import "./closeFriend.css";

export default function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li key={user._id} className="sidebarFriend">
      <img
        className="sidebarFriendImg"
        src="http://localhost:4000/person/2.jpeg"
        alt="a friend"
      />
      <span className="sidebarFriendName">{`${user.name} ${user.lastName}`}</span>
    </li>
  );
}
