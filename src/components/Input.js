import React, { useEffect } from "react";

const Input = ({
	contract,
	account,
	user,
	handleModelClose,
	setAddress,
	address,
}) => {
	const getStudentAddress = async () => {
		const result = await contract.studentInfo(user?.email);
		if (address != "0x0000000000000000000000000000000000000000") {
			console.log("first");
			setAddress && setAddress(result[4]);
			handleModelClose && handleModelClose();
		}
	};
	useEffect(() => {
		if (!account && contract) {
			getStudentAddress();
		}
	}, [contract]);

	return (
		<div className="card  flex-shrink-0 w-full max-w-sm bg-base-100">
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
						className="input input-bordered z-0"
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
