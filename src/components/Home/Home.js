import React, { useContext } from "react";
import { AuthContext } from "../../context/UserContext";
import MetaConnect from "../../web3Provider/MetaConnect";

const Home = () => {
	// const { user } = useContext(AuthContext);

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<div
				className="absolute left-0 w-screen h-screen blur-sm"
				style={{
					backgroundImage: `url(/web3.svg)`,
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
