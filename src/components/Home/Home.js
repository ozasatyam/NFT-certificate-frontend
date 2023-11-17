import React, { useContext } from "react";
import { AuthContext } from "../../context/UserContext";
import MetaConnect from "../../web3Provider/MetaConnect";

const Home = () => {
	// const { user } = useContext(AuthContext);

	return (
		<div className="w-[100vw] h-[100vh] flex justify-center items-center">
			<MetaConnect />
			{/* <h2 className='text-2xl mt-9'>This is home for {user?.email}</h2> */}
		</div>
	);
};

export default Home;
