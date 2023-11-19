import { useSDK } from "@metamask/sdk-react";
import { ethers, JsonRpcProvider } from "ethers";
import React, { useEffect, useState } from "react";
import Certificate from "../abis/Certificate.json";
import Input from "../components/Input";

const MetaConnect = () => {
	const { sdk, connected, connecting, provider, chainId } = useSDK();
	const [account, setAccount] = useState();
	const [contract, setContract] = useState();

	const [studentDetails, setStudentDetails] = useState([]);

	const getStudentDetails = async () => {
		try {
			const result = await contract.studentInfo("satya@gmail.com");
			if (result) {
				console.log(result);
				setStudentDetails(result);
			} else {
				setStudentDetails([]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const callContract = () => {
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
		setContract(c);
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
	useEffect(() => {
		if (connected) {
			connect();
		}
	}, []);

	const mint = async () => {
		try {
			console.log("mint function called");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="App">
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
							<Input contract={contract} account={account} />
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
				<div
					onClick={connect}
					className="flex justify-center items-center bg-blue-600 px-8 py-4 rounded-md btn border-none"
					// onClick={}
				>
					<span className="text-white">Connect Wallet</span>
				</div>
			)}
		</div>
	);
};

export default MetaConnect;
