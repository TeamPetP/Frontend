import React from "react";
import ReactDOM from "react-dom/client";
import { StoreProvider } from "./contexts/StoreContext";
import GlobalStyle from "./styles/globalStyle";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RootStore } from "./stores/RootStore";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const rootstore = new RootStore();

root.render(
	// <React.StrictMode>
	<Router>
		<StoreProvider store={rootstore}>
			<App />
			<GlobalStyle />
		</StoreProvider>
	</Router>
	// </React.StrictMode>
);

reportWebVitals();
