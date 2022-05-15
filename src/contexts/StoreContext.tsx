import React, { FC, createContext, ReactNode, ReactElement } from "react";
import { RootStoreModel } from "../stores/RootStore";

export const StoreContext = createContext<RootStoreModel>({} as RootStoreModel);

export type StoreComponent = FC<{
	store: RootStoreModel;
	children: ReactNode;
}>;

export const StoreProvider: StoreComponent = ({
	children,
	store,
}): ReactElement => {
	console.log(store);
	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
};
