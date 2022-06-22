import styled from "styled-components";
import { useStores } from "../../../hooks/useStores";
import { observer } from "mobx-react";
import withMain from "../../../hocs/ui/withMain";
import nullIcon from "../../../assets/images/null.png";
import searchIcon from "../../../assets/images/search.png";
import { useEffect, useState, useContext } from "react";

import pencil from "../../../assets/images/pencil.png";

import Board from "../../../components/Main/PetpGram/Board";
import { SearchPost } from "../../../services/postApi";
import { UserContext } from "../../../contexts/UserContext";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;

	padding: 18px 16px;
	overflow-x: hidden;
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

const NullWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	height: calc(100% - 180px);
	margin: 20px 0px;
	& > div {
		margin-top: 20px;
		margin-bottom: 40px;
		font-family: "yg-jalnan";

		font-size: 28px;
	}
	& > img {
		width: 100%;
	}
`;
const IndexPage = observer(() => {
	const { modalStore } = useStores();
	const [postData, setPostData] = useState<any>([]);
	const { user } = useContext(UserContext);

	function createBoard() {
		modalStore.createPetpGramState = true;
	}
	function EditEvent(postId: number) {
		modalStore.petpGramPostId = postId;
		modalStore.editPetpGramState = true;
	}
	useEffect(() => {
		async function fetchData() {
			console.log("test", user);
			const d: any = await SearchPost(user, 0, "");
			console.log("Daata", d);
			setPostData(d.data);
		}
		fetchData();
	}, []);

	return (
		<Wrapper>
			<SearchBar>
				<SearchInput />
				<SearchButton>
					<img src={searchIcon} alt="serach" />
				</SearchButton>
			</SearchBar>
			{postData.content != null &&
				postData.content.map((e: any) => {
					return (
						<Board
							info={e}
							EditEvent={(postId: number) => EditEvent(postId)}
						/>
					);
				})}
			{postData.content != null && postData.content.length === 0 ? (
				<NullWrapper>
					<img src={nullIcon} />
					<div>게시물이 존재하지 않습니다.</div>
				</NullWrapper>
			) : (
				<></>
			)}
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
