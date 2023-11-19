import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/UserContext";

const Login = () => {
	const { signIn } = useContext(AuthContext);
	const navigate = useNavigate();
	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		if (showAlert) {
			setTimeout(() => {
				setShowAlert(false);
			}, 2000);
		}
	}, [showAlert]);

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;

		signIn(email, password)
			.then((result) => {
				const user = result.user;
				console.log(user);
				form.reset();
				navigate("/");
			})
			.catch((error) => {
				// console.error(error);
				setShowAlert(true);
			});
	};
	return (
		<div className="">
			<div>
				<div className="hero min-h-screen bg-base-200">
					<div className="hero-content flex-col lg:flex-col">
						<div className="text-center lg:text-left">
							<h1 className="text-5xl font-bold">Login now!</h1>
							<p className="py-6">
								Hey! Welcome back. Don't share your email & password with
								anyone.
							</p>
						</div>
						<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
							<form onSubmit={handleSubmit} className="card-body">
								<div className="form-control">
									<label className="label">
										<span className="label-text">Email</span>
									</label>
									<input
										type="email"
										name="email"
										placeholder="Email"
										className="input input-bordered"
										required
									/>
								</div>
								<div className="form-control">
									<label className="label">
										<span className="label-text">Password</span>
									</label>
									<input
										type="password"
										name="password"
										placeholder="Password"
										className="input input-bordered"
										required
									/>
									<label className="label">
										<a
											href
											preventDefault
											className="label-text-alt link link-hover">
											Forgot password?
										</a>
									</label>
								</div>
								<div className="form-control mt-6">
									<button className="btn btn-primary">Login</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			<div className={`fixed top-5 right-5 ${!showAlert && "hidden"}`}>
				<div
					className="bg-orange-100 border-l-4 border-red-500 text-red-700 p-4"
					role="alert">
					<p className="font-bold">Login Failed</p>
					<p>Email or Password is incorrect </p>
				</div>
			</div>
		</div>
	);
};

export default Login;
