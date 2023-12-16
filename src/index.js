import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserContext from "./context/UserContext";
import { MetaMaskProvider } from "@metamask/sdk-react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<MetaMaskProvider
			debug={false}
			sdkOptions={{
				checkInstallationImmediately: false,
				dappMetadata: {
					name: "NFT Certificate",
					url: window.location.host,
				},
			}}>
			<UserContext>
				<App />
			</UserContext>
		</MetaMaskProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
