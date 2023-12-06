import React, { useState } from "react";
const Stapper = ({ activeTab, handleTabChange }) => {
	const changeTab = (e, id) => {
		e.preventDefault();
		e.stopPropagation();
		// setActiveTab(id);
		handleTabChange(id);
	};

	return (
		<ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse justify-center">
			<li
				id="1"
				className={`flex items-center ${
					activeTab == 1
						? "text-blue-600 dark:text-blue-500"
						: "text-gray-500 dark:text-gray-400"
				} space-x-2.5 rtl:space-x-reverse cursor-pointer`}
				onClick={(e) => changeTab(e, 1)}>
				<span
					className={`flex items-center justify-center w-8 h-8 border ${
						activeTab == 1 ? "border-blue-600" : "border-gray-500"
					} rounded-full shrink-0 dark:border-blue-500`}>
					1
				</span>
				<span>
					<h3 className="font-medium leading-tight">Install Metamask</h3>
					<p className="text-sm">Step details here</p>
				</span>
			</li>
			<li
				id="2"
				className={`flex items-center ${
					activeTab == 2
						? "text-blue-600 dark:text-blue-500"
						: "text-gray-500 dark:text-gray-400"
				} space-x-2.5 rtl:space-x-reverse cursor-pointer`}
				onClick={(e) => changeTab(e, 2)}>
				<span
					className={`flex items-center justify-center w-8 h-8 border ${
						activeTab == 2 ? "border-blue-600" : "border-gray-500"
					} rounded-full shrink-0 dark:border-blue-500`}>
					2
				</span>
				<span>
					<h3 className="font-medium leading-tight">Creating Wallet</h3>
					<p className="text-sm">Step details here</p>
				</span>
			</li>
			<li
				id="3"
				className={`flex items-center ${
					activeTab == 3
						? "text-blue-600 dark:text-blue-500"
						: "text-gray-500 dark:text-gray-400"
				} space-x-2.5 rtl:space-x-reverse cursor-pointer`}
				onClick={(e) => changeTab(e, 3)}>
				<span
					className={`flex items-center justify-center w-8 h-8 border ${
						activeTab == 3 ? "border-blue-600" : "border-gray-500"
					} rounded-full shrink-0 dark:border-blue-500`}>
					3
				</span>
				<span>
					<h3 className="font-medium leading-tight">Security Measures</h3>
					<p className="text-sm">Step details here</p>
				</span>
			</li>
		</ol>
	);
};

const Modal = ({ handleModelClose }) => {
	const [activeTab, setActiveTab] = useState(1);

	const handleTabChange = (id) => {
		if (activeTab == 3) {
			setActiveTab(1);
		} else {
			setActiveTab(id);
		}
	};

	return (
		<div
			className="fixed top-0 left-0 w-screen h-screen flex  
		items-center justify-center z-50 flex-col">
			<div
				id="default-modal"
				tabindex="-1"
				// aria-hidden="true"
				className="overflow-y-auto overflow-x-hidden flex z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
				data-modal-toggle="default-modal">
				<div className="relative p-4 w-full max-w-2xl max-h-full">
					<div className="relative bg-white rounded-lg shadow text-black dark:text-white dark:bg-gray-700">
						<div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
							<Stapper
								activeTab={activeTab}
								handleTabChange={handleTabChange}
							/>
							{/* <button
								type="button"
								className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-hide="default-modal">
								<svg
									className="w-3 h-3"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14">
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
									/>
								</svg>
								<span className="sr-only">Close modal</span>
							</button> */}
						</div>
						<div className="p-4 md:p-5 space-y-4 text-justify">
							{activeTab == 1 ? (
								<>
									<h2 className="text-2xl font-bold">
										Installing MetaMask Extension
									</h2>
									<p>
										Follow these steps to install the MetaMask extension in your
										browser:
									</p>
									<section className="px-10">
										<ol className="list-decimal">
											<li>Go to the official MetaMask website.</li>
											<li>Select your browser and download the extension.</li>
											<li>
												Follow the instructions to add it to your browser.
											</li>
										</ol>
									</section>
								</>
							) : activeTab == 2 ? (
								<>
									<h2 className="text-2xl font-bold">Creating Your Wallet</h2>
									<p>
										Once the extension is installed, follow these steps to
										create your new wallet:
									</p>
									<section className="px-10">
										<ol className="list-decimal">
											<li>Open the MetaMask extension.</li>
											<li>
												Follow the setup instructions to create a new wallet.
											</li>
											<li>Securely store your seed phrase.</li>
										</ol>
									</section>
								</>
							) : (
								<>
									<h2 className="text-2xl font-bold">Security Measures</h2>
									<p>
										Remember to always keep your wallet secure. Here are some
										tips:
									</p>
									<section className="px-5">
										<ul>
											<li>- Never share your seed phrase with anyone.</li>
											<li>- Use a strong, unique password for your wallet.</li>
											<li>- Be cautious of phishing websites and emails.</li>
										</ul>
									</section>
								</>
							)}
						</div>
						<div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
							<button
								data-modal-hide="default-modal"
								type="button"
								onClick={() => handleTabChange(activeTab + 1)}
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
								{"Next >>"}
							</button>
							<button
								onClick={() => {
									handleModelClose();
								}}
								data-modal-hide="default-modal"
								type="button"
								className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
