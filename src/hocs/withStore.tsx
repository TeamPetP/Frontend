//클래스 기반으로 구현할 때, mobx를 사용하기 위한 hoc

import React, { ComponentType } from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

import { useStores } from "../hooks/useStores";

export type TWithStoreHOC = <P extends unknown>(
	Component: ComponentType<P>
) => (props: P) => JSX.Element;

export const withStore: TWithStoreHOC = (WrappedComponent) => (props: any) => {
	const ComponentWithStore = () => {
		const store = useStores();
		return <WrappedComponent {...props} store={store} />;
	};

	ComponentWithStore.defaultProps = { ...WrappedComponent.defaultProps };
	ComponentWithStore.displayName = `WithStores(${
		WrappedComponent.name || WrappedComponent.displayName
	})`;

	hoistNonReactStatics(ComponentWithStore, WrappedComponent);

	return <ComponentWithStore />;
};
