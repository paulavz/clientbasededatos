import "./post.css";
import axios from "axios";
import { format, register } from "timeago.js";
import { MoreVert } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
	const [like, setLike] = useState(post.likes.length);
	const [isLiked, setIsLiked] = useState(false);
	const [user, setUser] = useState({});
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user: currentUser } = useContext(AuthContext);
	const likeHandler = () => {
		try {
			axios.put("/posts/" + post._id + "/like", {
				userId: currentUser._id,
			});
		} catch (err) {}
		setLike(isLiked ? like - 1 : like + 1);
		setIsLiked(!isLiked);
	};

	register(
		"es_ES",
		(number, index, total_sec) =>
			[
				["justo ahora", "ahora mismo"],
				["hace %s segundos", "en %s segundos"],
				["hace 1 minuto", "en 1 minuto"],
				["hace %s minutos", "en %s minutos"],
				["hace 1 hora", "en 1 hora"],
				["hace %s horas", "in %s horas"],
				["hace 1 dia", "en 1 dia"],
				["hace %s dias", "en %s dias"],
				["hace 1 semana", "en 1 semana"],
				["hace %s semanas", "en %s semanas"],
				["1 mes", "en 1 mes"],
				["hace %s meses", "en %s meses"],
				["hace 1 año", "en 1 año"],
				["hace %s años", "en %s años"],
			][index]
	);

	useEffect(() => {
		setIsLiked(post.likes.includes(currentUser._id));
	}, [currentUser._id, post.likes]);

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users?userId=${post.userId}`);
			setUser(res.data);
		};
		fetchUser();
	}, [post.userId]);

	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<Link to={`/profile/${user.username}`}>
							<img
								className="postProfileImage"
								src={
									user.profilePicture
										? PF + user.profilePicture
										: PF + "person/noAvatar.png"
								}
								alt="Perfil"
							/>
						</Link>
						<span className="postUsername">{user.username}</span>
						<span className="postDate">
							{format(post.createdAt, "es_ES")}
						</span>
					</div>
					<div className="postTopRight">
						<MoreVert />
					</div>
				</div>
				<div className="postCenter">
					<span className="postText">{post?.desc}</span>
					<img
						src={PF + post.img}
						className="	postImg"
						alt="Imagen del post"
					/>
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						<img
							className="likeIcon"
							src={`${PF}like.png`}
							alt="Like"
							onClick={likeHandler}
						/>
						<img
							className="likeIcon"
							onClick={likeHandler}
							src={`${PF}heart.png`}
							alt="Love"
						/>
						<span className="postLikeCounter">
							A {like} personas le gusta esto
						</span>
					</div>
					<div className="postBottomRight">
						<span className="postCommentText">
							{post.comment} comentarios
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
