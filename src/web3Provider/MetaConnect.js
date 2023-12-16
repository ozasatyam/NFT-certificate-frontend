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
	const [walletAddress, setWalletAddress] = useState();
	const [staticAddress, setStaticAddress] = useState("");
	const [isAdminLogin, setIsAdminLogin] = useState(false);
	const handleInputchange = (value) => {
		setAddress(value);
	};

	const emptyAddress = staticAddress && !/^0x0+$/.test(staticAddress);

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
		if (showModal !== undefined) {
			setIsModelClosed(showModal);
		} else {
			setIsModelClosed((t) => !t);
		}
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
			// setAccount(accounts?.[0]);
			setWalletAddress(accounts?.[0]);
			// handleModelClose(false);
			callContract();
		} catch (err) {
			console.warn(`failed to connect..`, err);
		}
	};

	const handleAdminCheck = async () => {
		// console.log(account);
		// console.log(user);
		const isAdmin = await contract.adminEmail();
		// console.log(isAdmin);
		setIsAdminLogin(user?.email == isAdmin);
		if (user?.email == isAdmin) {
			handleModelClose(true);
		}
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
			await contract
				.batchMint()
				.then(() => {
					alert("SuccessFull");
				})
				.catch((e) => {
					console.log(e);
					console.log("erroe");

					alert("Not able minted");
				});
		} catch (error) {
			console.log(error);
		}
	};

	const updateStudentAddress = async () => {
		try {
			// console.log(await contract.adminAddress());
			const result = await contract.addStudentAddress(address, user?.email);
			setStaticAddress(address);
			// console.log(result);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="App z-10">
			<>
				{!isModelClosed && <Modal handleModelClose={handleModelClose} />}
				{studentDetails.length <= 0 ? (
					<>
						{!isAdminLogin && (
							<Input
								contract={contract}
								account={account}
								user={user}
								setStaticAddress={setStaticAddress}
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
						{isAdminLogin && (
							<div>
								{walletAddress ? (
									<span class="inline-flex items-center font-bold gap-x-1.5 py-1.5 px-3 rounded-full   border border-gray-800 text-gray-800 dark:text-white  dark:border-white dark:text-gray">
										{walletAddress}
									</span>
								) : (
									// <span class="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
									// 	{}
									// </span>

									<div
										className="flex justify-center items-center bg-blue-600 px-8 py-4 rounded-md btn border-none mt-8 z-50"
										onClick={() => connect()}>
										Connect wallet
									</div>
								)}
							</div>
						)}
						<div
							className="flex justify-center items-center bg-blue-600 px-8 py-4 rounded-md btn border-none mt-8 z-50"
							onClick={
								isAdminLogin
									? mint
									: emptyAddress
									? getStudentDetails
									: updateStudentAddress
							}>
							<span className="text-white">
								{isAdminLogin ? (
									"Mint"
								) : (
									<>{emptyAddress ? "Get Student Detailss" : "Add Address"}</>
								)}
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
		</div>
	);
};

export default MetaConnect;
