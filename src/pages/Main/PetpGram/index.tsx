import styled from "styled-components";
import { useStores } from "../../../hooks/useStores";
import { observer } from "mobx-react";
import withMain from "../../../hocs/ui/withMain";

import searchIcon from "../../../assets/images/search.png";
import { useState } from "react";

import pencil from "../../../assets/images/pencil.png";

import Board from "../../../components/Main/PetpGram/Board";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;

	padding: 18px 16px;
	overflow-y: auto;
	&::-webkit-scrollbar {
		background: white;
		width: 7px;
	}
	&::-webkit-scrollbar-thumb {
		background: #f3593a;
		border-radius: 20px;
	}

	position: relative;
`;
const Test = styled.div`
	width: 49%;
	height: 200px;
	background-color: red;
`;
const Test2 = styled.div`
	width: 49%;
	height: 200px;
	background-color: blue;
`;

const SearchBar = styled.div`
	width: 100%;
	height: 60px;

	border: 2px solid #fec9be;
	border-radius: 10px;

	display: flex;
`;
const SearchInput = styled.input`
	width: 100%;
	height: 100%;
	font-size: 16px;
	border-radius: 10px;
	padding: 0px 8px;
`;
const SearchButton = styled.div`
	min-width: 60px;
	height: 100%;

	background-color: #f3593a;
	border-radius: 0px 10px 10px 0px;

	display: flex;
	justify-content: center;
	align-items: center;

	cursor: pointer;
`;

const CreateButton = styled.div`
	position: -webkit-sticky;
	position: sticky;
	bottom: 0px;
	right: -10px;

	width: 60px;
	height: 60px;

	border-radius: 100%;

	background-color: #f3593a;

	display: flex;
	justify-content: center;
	align-items: center;

	margin-left: auto;

	cursor: pointer;
`;

const CreateButtonImage = styled.img`
	width: 24px;
	height: 24px;
`;

const BoardList = styled.div`
	width: 100%;
	height: calc(100% - 120px);
`;
const IndexPage = observer(() => {
	const { modalStore } = useStores();

	function createBoard() {
		modalStore.createPetpGramState = true;
	}
	return (
		<Wrapper>
			<SearchBar>
				<SearchInput />
				<SearchButton>
					<img src={searchIcon} alt="serach" />
				</SearchButton>
			</SearchBar>
			<Board
				info={{
					username: "test",
					imgUrlList: [
						"https://cdn.discordapp.com/attachments/596354148082122752/982093203845025792/2022-06-03_10.27.43.png",
						"https://ewhagift.ewha.ac.kr/ezstock/035434400_1534729386.jpg",
					],
				}}
			/>
			<Board
				info={{
					username: "test",
					imgUrlList: [
						"https://cdn.mkhealth.co.kr/news/photo/202102/52163_52859_5928.jpg",
						"https://ewhagift.ewha.ac.kr/ezstock/035434400_1534729386.jpg",
					],
				}}
			/>
			<CreateButton
				onClick={() => {
					createBoard();
				}}
			>
				<CreateButtonImage src={pencil} alt="create button" />
			</CreateButton>
		</Wrapper>
	);
});

export default withMain(IndexPage, "팻피그램");
