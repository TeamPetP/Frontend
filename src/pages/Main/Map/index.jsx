import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStores } from "../../../hooks/useStores";
import { observer } from "mobx-react";
import { AbandonedAnimals } from "../../../services/Api";
import searchIcon from "../../../assets/images/search.png";

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

	padding: 3.2em 4.8em;
	@media screen and (max-width: 1100px) {
		padding: 2.2em 2.2em;
	}
	@media screen and (max-width: 768px) {
		position: absolute;
		width: ${(props) => (props.open ? "90%" : "0%")};
		padding: 2.2em 2.2em;
	}

	background-color: white;
`;

const SearchInputWrapper = styled.div`
	display: flex;
	width: 100%;
	height: fit-content;

	border: 2px solid #f3593a;

	border-radius: 10px;
`;

const SearchInput = styled.input`
	width: 100%;
	height: 76px;
	font-family: "yg-jalnan";
	font-size: 22px;

	padding: 0px 28px;

	border-radius: 10px;
`;

const SearchButtonWrapper = styled.div`
	min-width: 76px;
	height: 76px;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: #f3593a;

	border-radius: 0px 8px 8px 0px;

	& > img {
		width: 34px;
		height: 34px;
	}
`;
const SearchDetailWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;

	margin: 20px 0px;
`;

const CheckBoxWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`;
const Select = styled.select`
	width: 220px;
	height: 56px;

	padding: 20px;

	border-radius: 6px;
`;
const Label = styled.label`
	min-width: fit-content;
	margin-top: 6px;
	margin-right: 24px;
	margin-bottom: 6px;

	font-size: 20px;

	display: flex;
	align-items: center;
`;
const CheckBox = styled.input`
	margin-right: 10px;
	width: 22px;

	height: 22px;

	cursor: pointer;

	margin-bottom: 2px;

	accent-color: #f3593a;
`;
const SearchButton = styled.div`
	width: 100%;
	height: 60px;

	background-color: #f3593a;

	border-radius: 10px;

	font-size: 26px;
	font-family: "yg-jalnan";

	display: flex;
	justify-content: center;
	align-items: center;

	cursor: pointer;
	color: white;

	margin-bottom: 54px;
`;
const SearchList = styled.div`
	width: 100%;
	height: 300px;
`;
const SearchTitle = styled.div`
	font-size: 26px;
	font-family: "yg-jalnan";
`;

const SearchTitleLine = styled.div`
	width: 100%;
	height: 1px;
	background-color: #f3593a;

	margin-top: 12px;
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
	}, []);
	return (
		<Wrapper>
			<NavWrapper open={openState}>
				<SearchInputWrapper>
					<SearchInput placeholder="위치를 입력해주세요." />
					<SearchButtonWrapper>
						<img src={searchIcon} />
					</SearchButtonWrapper>
				</SearchInputWrapper>
				<SearchDetailWrapper>
					<CheckBoxWrapper>
						<Label>
							<CheckBox type="checkBox" />
							전체
						</Label>
						<Label>
							<CheckBox type="checkBox" />
							동물병원
						</Label>
						<Label>
							<CheckBox type="checkBox" />
							동물약국
						</Label>
						<Label>
							<CheckBox type="checkBox" />
							장묘업
						</Label>
					</CheckBoxWrapper>
					<Select>
						<option>1km</option>
						<option>5km</option>
					</Select>
				</SearchDetailWrapper>
				<SearchButton>검색</SearchButton>
				<SearchList>
					<SearchTitle>검색결과 리스트</SearchTitle>
					<SearchTitleLine />
				</SearchList>
			</NavWrapper>
			<Map id="map" open={openState}></Map>
		</Wrapper>
	);
});

export default IndexPage;
