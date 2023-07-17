import "./closeFriend.css";

export default function CloseFriend({ user }) {
  return (
    <li key={user._id} className="sidebarFriend">
      <img
        className="sidebarFriendImg"
        src={
          user?.img
            ? `http://localhost:4000${user?.img}`
            : "http://localhost:4000/person/noAvatar.png"
        }
        alt="a friend"
      />
      <span className="sidebarFriendName">{`${user.name} ${user.lastName}`}</span>
    </li>
  );
}
