import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/UserContext";
import Modal from "../Modal/Modal";
const Header = () => {
	const { user, logOut } = useContext(AuthContext);
	const [isModelClosed, setIsModelClosed] = useState(true);

	const handleSignOut = () => {
		logOut()
			.then(() => {})
			.catch((error) => console.error(error));
	};
	const handleModelClose = () => {
		setIsModelClosed((t) => !t);
	};
	return (
		<div className="navbar bg-primary text-primary-content w-full justify-between">
			<div className="">
				<Link to="/" className="btn btn-ghost normal-case text-xl">
					Awesome Auth
				</Link>
				<Link className="btn btn-ghost normal-case text-xl" to="/">
					Home
				</Link>
				<Link
					className="btn btn-ghost normal-case text-xl"
					onClick={() => handleModelClose()}>
					Help
				</Link>
			</div>
			{/* <Link className="btn btn-ghost normal-case text-xl" to='login'>Login</Link> */}
			<div className="">
				<Link to="register">
					<button className={`${!user ? "btn btn-sm m-3" : "hidden"}`}>
						Register
					</button>
				</Link>
				{user?.email && <span className="pr-5">Welcome, {user.email}</span>}
				{user?.email ? (
					<button onClick={handleSignOut} className={`btn btn-sm`}>
						Log Out
					</button>
				) : (
					<Link to="/login">
						<button className="btn btn-sm">Login</button>
					</Link>
				)}
			</div>
			{!isModelClosed && <Modal handleModelClose={handleModelClose} />}
		</div>
	);
};

export default Header;
