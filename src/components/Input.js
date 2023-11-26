import React, { useEffect, useState } from "react";

const Input = ({ contract, account, user }) => {
	const [address, setAddress] = useState();

	const getStudentAddress = async () => {
		const result = await contract.studentInfo(user?.email);
		setAddress(result[4]);
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
					/>
				</div>
			</form>
		</div>
	);
};

export default Input;
