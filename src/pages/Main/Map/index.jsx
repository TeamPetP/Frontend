import React, { useEffect } from "react";
import styled from "styled-components";
import { useStores } from "../../../hooks/useStores";
import { observer } from "mobx-react";
import { AbandonedAnimals } from "../../../services/Api";

const { kakao } = window;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`;
const Map = styled.div`
	width: 100%;
	height: calc(100vh - 100px);
`;
const IndexPage = observer(() => {
	const { modalStore } = useStores();
	useEffect(() => {
		let container = document.getElementById("map");

		let options = {
			center: new window.kakao.maps.LatLng(35.85133, 127.734086),
			level: 13,
		};

		let map = new window.kakao.maps.Map(container, options);

		console.log("loading kakaomap");
	}, []);
	return (
		<Wrapper>
			<Map id="map"></Map>
		</Wrapper>
	);
});

export default IndexPage;
