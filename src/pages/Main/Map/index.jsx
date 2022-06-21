import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStores } from "../../../hooks/useStores";
import { observer } from "mobx-react";
import { AbandonedAnimals } from "../../../services/Api";

const { kakao } = window;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
`;
const Map = styled.div`
	width: ${(props) => (props.open ? "50%" : "100%")};
	height: calc(100vh - 100px);
	@media screen and (max-width: 768px) {
		width: 100%;
	}
`;

const NavWrapper = styled.div`
	width: ${(props) => (props.open ? "50%" : "0%")};
	height: calc(100vh - 100px);
	z-index: 111;

	@media screen and (max-width: 768px) {
		position: absolute;
		width: ${(props) => (props.open ? "90%" : "0%")};
	}

	background-color: white;
`;

const IndexPage = observer(() => {
	const { modalStore } = useStores();
	const [openState, setOpenState] = useState(true);
	useEffect(() => {
		let container = document.getElementById("map");

		let options = {
			center: new window.kakao.maps.LatLng(37.49133, 127.034086),
			level: 2,
		};

		let map = new window.kakao.maps.Map(container, options);

		console.log("loading kakaomap");
	}, []);
	return (
		<Wrapper>
			<NavWrapper open={openState}></NavWrapper>
			<Map id="map" open={openState}></Map>
		</Wrapper>
	);
});

export default IndexPage;
