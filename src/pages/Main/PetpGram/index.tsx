import styled from "styled-components";
import { useStores } from "../../../hooks/useStores";
import { observer } from "mobx-react";
import withMain from "../../../hocs/ui/withMain";
import nullIcon from "../../../assets/images/null.png";
import searchIcon from "../../../assets/images/search.png";
import { useRef, useEffect, useState, useContext } from "react";

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
	const [serachInput, setSearchInput] = useState<string>("")
	const searchInputRef = useRef<any>(null)
	const [pageNumber, setPageNumber] = useState<number>(1)

	function createBoard() {
		if (user != null && user.userAccessState) {
			modalStore.createPetpGramState = true;
		} else {
			modalStore.signInState = true;
		}
	}
	function EditEvent(postId: number) {
		modalStore.petpGramPostId = postId;
		modalStore.editPetpGramState = true;
	}
	function SerachInputRegex(e: React.ChangeEvent<HTMLInputElement>){
		let value = e.target.value;
		let tagIndex = value.indexOf("#");
		console.log(value, tagIndex, value.indexOf(" ", tagIndex +1))
		if ( tagIndex != -1) {
			if ( value.indexOf(" ", tagIndex +1) != -1){
				console.log("검색")
				let k = value.slice( 0, value.indexOf(" ", tagIndex +1) + 1)
				setSearchInput(() => {return k})
			}else{
				setSearchInput(() => {return value})
			}
		}else {
			if(e.target.value == ""){
				setSearchInput(() => {return value})
			}
			e.target.placeholder = "태그를 #로 시작해주세요. EX) #강아지";
		}
	}
	useEffect(() => {
		console.log(user)
		async function fetchData() {
			console.log("test", user);

			let k: string = serachInput;
			const d: any = await SearchPost(user,pageNumber, k.replace("#", ""));
			console.log("Daata", d);
			setPostData(d.data);
		}
		fetchData();
	}, [user]);

	return (
		<Wrapper>
			<SearchBar>
				<SearchInput ref={searchInputRef} value={serachInput} placeholder="검색할 태그를 입력해주세요. EX) #강아지" onChange={(e) => SerachInputRegex(e)} />
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
			{postData.content == null || postData.content.length === 0 ? (
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
