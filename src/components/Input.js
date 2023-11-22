import React, { useState } from "react";

const Input = ({ account }) => {
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
						value={account && account}
					/>
				</div>
			</form>
		</div>
	);
};

export default Input;
