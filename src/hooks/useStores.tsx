import { useContext } from "react";
import { RootStore } from "../stores/RootStore";
import { StoreContext } from "../contexts";

export const useStores = (): RootStore => useContext(StoreContext);
