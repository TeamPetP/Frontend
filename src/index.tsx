import React from "react";
import ReactDOM from "react-dom/client";
import { StoreProvider } from "./contexts/StoreContext";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RootStore } from "./stores/RootStore";
const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const rootstore = new RootStore();

root.render(
	<React.StrictMode>
		<StoreProvider store={rootstore}>
			<App />
		</StoreProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
