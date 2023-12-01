import { useSDK } from "@metamask/sdk-react";
import { ethers, JsonRpcProvider } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import Certificate from "../abis/Certificate.json";
import Input from "../components/Input";
import Modal from "../components/Modal/Modal";
import { AuthContext } from "../context/UserContext";
import UserCard from "../components/UserCard";
import { Link } from "react-router-dom";

const MetaConnect = () => {
	const { user } = useContext(AuthContext);
	const { sdk, connected, connecting, provider, chainId } = useSDK();
	const [account, setAccount] = useState();
	const [contract, setContract] = useState();
	const [isModelClosed, setIsModelClosed] = useState(false);
	const [studentDetails, setStudentDetails] = useState([]);
	const [address, setAddress] = useState();
	const [isAdminLogin, setIsAdminLogin] = useState(false);
	const handleInputchange = (value) => {
		console.log(value);
		setAddress(value);
	};

	const getStudentDetails = async () => {
		try {
			const result = await contract.studentInfo(user?.email);
			if (result) {
				setStudentDetails(result);
			} else {
				setStudentDetails([]);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleModelClose = (showModal) => {
		// if (showModal) {
		// 	setIsModelClosed(!showModal);
		// }
		setIsModelClosed((t) => !t);
	};
	const callContract = async () => {
		const provider = new JsonRpcProvider(process.env.REACT_APP_RPC_URL);
		const signer = new ethers.Wallet(
			process.env.REACT_APP_PRIVATE_KEY,
			provider
		);
		const c = new ethers.Contract(
			process.env.REACT_APP_CONTRACT_ADDRESS,
			Certificate.abi,
			signer
		);

		// console.log(await c.studentIndex(0))
		// const uri = await c.tokenURI("15600")
		// console.log(uri)

		setContract(c);
		// console.log(account);
	};

	const connect = async () => {
		try {
			const accounts = await sdk?.connect();
			setAccount(accounts?.[0]);
			callContract();
		} catch (err) {
			console.warn(`failed to connect..`, err);
		}
	};

	const handleAdminCheck = async () => {
		// console.log(account);
		console.log(user);
		const isAdmin = await contract.adminEmail();
		console.log(isAdmin);
		setIsAdminLogin(user?.email == isAdmin);
	};

	useEffect(() => {
		if (connected) {
			connect();
		}
		callContract();
	}, []);

	useEffect(() => {
		if (contract) {
			handleAdminCheck();
		}
	}, [contract]);

	const mint = async () => {
		try {
			// await	contract.addStudentAddress(account, "2@gmail.com")
			// console.log("mint function called");
			contract.batchMint().catch(() => {
				alert("minted");
			});
		} catch (error) {
			console.log(error);
		}
	};

	const updateStudentAddress = async () => {
		try {
			console.log(await contract.adminAddress());
			const result = await contract.addStudentAddress(address, user?.email);
			console.log(result);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="App z-10">
			{connected ? (
				<div>
					<>
						{/* {chainId && `Connected chain: ${chainId}`}
						<p></p>
						{account && `Connected account: ${account}`} */}
						{studentDetails.length ? (
							studentDetails.map((item, i) => {
								return (
									<div>
										<span>{item}</span>
									</div>
								);
							})
						) : (
							<Input
								contract={contract}
								account={account}
								user={user}
								setAddress={handleInputchange}
								updateStudentAddress={updateStudentAddress}
								handleModelClose={handleModelClose}
								address={address}
							/>
						)}
						<div
							className="flex justify-center items-center bg-blue-600 px-8 py-4 rounded-md btn border-none mt-8"
							onClick={studentDetails.length > 0 ? mint : getStudentDetails}>
							<span className="text-white">
								{studentDetails.length > 0 ? "Mint" : "Get Student Details"}
							</span>
						</div>
					</>
				</div>
			) : (
				<>
					{!isModelClosed && <Modal handleModelClose={handleModelClose} />}
					{studentDetails.length <= 0 ? (
						<>
							{!isAdminLogin && (
								<Input
									contract={contract}
									account={account}
									user={user}
									setAddress={handleInputchange}
									updateStudentAddress={updateStudentAddress}
									handleModelClose={handleModelClose}
									address={address}
								/>
							)}
							{/* {!	address ? (
								<div
									className="flex justify-center items-center bg-blue-600 px-8 py-4 rounded-md btn border-none mt-8 z-50"
									onClick={getStudentDetails}>
									<span className="text-white">Get Student Details</span>
								</div>
							) : (
								<div
									className="flex justify-center items-center bg-blue-600 px-8 py-4 rounded-md btn border-none mt-8 z-50"
									onClick={updateStudentAddress}>
									<span className="text-white">Update Address</span>
								</div>
							)} */}
							<div
								className="flex justify-center items-center bg-blue-600 px-8 py-4 rounded-md btn border-none mt-8 z-50"
								onClick={isAdminLogin ? mint : updateStudentAddress}>
								<span className="text-white">
									{isAdminLogin ? "Mint" : "Add Address"}
								</span>
							</div>
						</>
					) : (
						<div>
							<UserCard studentDetails={studentDetails} />
							<div className="mt-4">
								<small className="text-red-500">
									*If you need to change Detail please contact to Admin
								</small>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default MetaConnect;
