import React, { useEffect } from "react";

const Input = ({
	contract,
	account,
	user,
	handleModelClose,

	setStaticAddress,
	setAddress,
	address,
}) => {
	const getStudentAddress = async () => {
		const result = await contract.studentInfo(user?.email);
		console.log(!/^0x0+$/.test(address));
		console.log("address");
		console.log(result);
		if (result[4] && !/^0x0+$/.test(result[4])) {
			console.log("insde");
			setStaticAddress(result[4]);
			setAddress && setAddress(result[4]);
			handleModelClose(true);
		}
	};
	useEffect(() => {
		if (!account && contract) {
			getStudentAddress();
		}
	}, [contract]);

	return (
		<div className="card  flex-shrink-0 w-full max-w-sm bg-[#22333B]">
			<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
				<div className="form-control">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="address">
						<span className="label-text">Address</span>
					</label>
					<input
						type="text"
						name="address"
						placeholder="Address"
						className="input input-bordered z-0 bg-[#22333B] text-white"
						required
						value={account ? account : address ? address : ""}
						onChange={(e) => setAddress(e.target.value)}
					/>
				</div>
			</form>
		</div>
	);
};

export default Input;
