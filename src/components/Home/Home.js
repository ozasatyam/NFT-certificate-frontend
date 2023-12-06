import React, { useContext } from "react";
import { AuthContext } from "../../context/UserContext";
import MetaConnect from "../../web3Provider/MetaConnect";

const Home = () => {
	// const { user } = useContext(AuthContext);

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<div
				className="absolute left-0 w-screen h-screen backdrop-blur-sm"
				style={{
					// backgroundImage: `url(/web3.svg)`,
					backgroundImage:
						"url(" +
						"https://images.unsplash.com/photo-1666030433251-f98e43be8241?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" +
						")",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			/>
			<MetaConnect />
			{/* <h2 className='text-2xl mt-9'>This is home for {user?.email}</h2> */}
		</div>
	);
};

export default Home;
