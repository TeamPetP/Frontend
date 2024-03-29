import styled from "styled-components";
import { useStores } from "../../../hooks/useStores";
import { observer } from "mobx-react";
import withMain from "../../../hocs/ui/withMain";
import nullIcon from "../../../assets/images/null.png";
import searchIcon from "../../../assets/images/search.png";
import {
	Fragment,
	useRef,
	useEffect,
	useState,
	useContext,
	useCallback,
} from "react";

import pencil from "../../../assets/images/pencil.png";

import Board from "../../../components/Main/PetpGram/Board";
import { SearchPost } from "../../../services/postApi";
import { UserContext } from "../../../contexts/UserContext";
import { useInView } from "react-intersection-observer";

import axios from "axios";

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
	const [serachInput, setSearchInput] = useState<string>("");
	const searchInputRef = useRef<any>(null);

	const [pageNumber, setPageNumber] = useState<number>(0);
	const [ref, inView] = useInView();
	const [loading, setLoading] = useState(false);

	const [serachInputC, setSearchInputC] = useState("");

	const getItems = useCallback(
		async (state: boolean, userToken: any = {}) => {
			setLoading(true);

			let res: any = {};

			if (serachInputC.length > 0) {
				res = await SearchPost(
					userToken,
					pageNumber,
					serachInputC.replace("#", "")
				);
			} else {
				res = await SearchPost(userToken, pageNumber, "");
			}

			if (pageNumber === 0) {
				setPostData([...res.data.content]);
				setLoading(false);
			} else {
				setPostData((prevState: any) => [
					...prevState,
					...res.data.content,
				]);
				setLoading(false);
			}
			if (res.data.content.length === 0) {
				setLoading(true);
			}
		},
		[pageNumber, serachInputC]
	);

	useEffect(() => {
		getItems(false);
	}, [getItems]);

	useEffect(() => {
		getItems(true, user);
	}, [user]);

	useEffect(() => {
		// 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
		if (inView && !loading) {
			setPageNumber((prevState) => prevState + 1);
		}
	}, [inView, loading]);

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
	function SerachInputRegex(e: React.ChangeEvent<HTMLInputElement>) {
		let value = e.target.value;
		let tagIndex = value.indexOf("#");
		if (tagIndex != -1) {
			if (value.indexOf(" ", tagIndex + 1) != -1) {
				let k = value.slice(0, value.indexOf(" ", tagIndex + 1) + 1);
				setSearchInput(() => {
					return k;
				});
			} else {
				setSearchInput(() => {
					return value;
				});
			}
		} else {
			if (e.target.value == "") {
				setSearchInput(() => {
					return value;
				});
			}
			e.target.placeholder = "태그를 #로 시작해주세요. EX) #강아지";
		}
	}
	async function PostSearch() {
		let k: string = serachInput;
		setPageNumber(0);
		setSearchInputC(k.replace("#", ""));
	}

	return (
		<Wrapper>
			<SearchBar>
				<SearchInput
					onKeyDown={(event: any) => {
						if (event.keyCode == 13) {
							PostSearch();
						}
					}}
					ref={searchInputRef}
					value={serachInput}
					placeholder="검색할 태그를 입력해주세요. EX) #강아지"
					onChange={(e) => SerachInputRegex(e)}
				/>
				<SearchButton onClick={() => PostSearch()}>
					<img src={searchIcon} alt="serach" />
				</SearchButton>
			</SearchBar>
			{postData != null &&
				postData.map((e: any, idx: any) => {
					return (
						<Fragment key={idx}>
							{postData.length - 1 == idx ? (
								<div ref={ref}>
									<Board
										key={e.lastModifiedDate}
										info={e}
										EditEvent={(postId: number) =>
											EditEvent(postId)
										}
									/>
								</div>
							) : (
								<div>
									<Board
										key={e.lastModifiedDate}
										info={e}
										EditEvent={(postId: number) =>
											EditEvent(postId)
										}
									/>
								</div>
							)}
						</Fragment>
					);
				})}
			{postData == null || postData.length === 0 ? (
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
