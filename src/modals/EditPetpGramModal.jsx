import { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import LogoImg from "../logo.png";
import { SearchDetailPost } from "../services/postApi";
import Back from "../assets/images/back.png";
import PhotoAddIcon from "../assets/images/photoadd.png";
import { AwsS3 } from "../services/Aws";

import Modal from "../components/common/Modal";
import { UserContext } from "../contexts/UserContext";
import { useStores } from "../hooks/useStores";
import { EditPost } from "../services/postApi";

const ModalWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;

	position: absolute;
	top: 0px;
	bottom: 0px;
	left: 0px;
	right: 0px;

	padding: 4em 90px;

	@media screen and (max-width: 768px) {
		padding: 4em 30px;
	}
`;
const Button = styled.div`
	max-width: 470px;
	width: 90%;
	min-height: 60px;

	background-color: #f3593a;

	border-radius: 10px;

	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 26px;
	color: white;
	font-family: "yg-jalnan";

	cursor: pointer;

	margin: 1em 0 0.4em 0;
`;

const Title = styled.h1`
	font-size: 36px;
	font-family: "yg-jalnan";

	word-break: keep-all;
	text-align: center;

	@media screen and (max-width: 768px) {
		font-size: 30px;
	}
`;

const BackIcon = styled.img`
	position: absolute;
	top: 72px;
	right: 90px;

	cursor: pointer;
	@media screen and (max-width: 768px) {
		right: 30px;
	}
`;
const Enter = styled.div`
	display: none;
	@media screen and (max-width: 768px) {
		display: block;
	}
`;
const TextArea = styled.textarea`
	width: 100%;
	height: 400px;
	border-radius: 10px;
	border: 1.2px solid #f3593a;
	padding: 20px 20px;
	font-size: 16px;

	margin-top: 24px;
`;

const PhotoWrapper = styled.div`
	width: 100%;

	display: flex;

	overflow-x: auto;
	overflow-y: hidden;

	& > * {
		margin-right: 20px;
	}
`;
const TextLength = styled.div`
	width: 100%;
	text-align: right;
	margin-top: 2px;
	margin-bottom: 2px;
`;

const PhotoAdd = styled.img`
	cursor: pointer;
`;

const PhotoImg = styled.img`
	width: 100px;
	height: 100px;
	object-fit: contain;
`;

const Input = styled.input`
	display: none;
`;
function EditPetpGramModal(props) {
	const [text, setText] = useState("");
	const [image, setImage] = useState([]);
	const [imageFile, setImageFile] = useState([]);

	const uploadPhoto = useRef("");
	const { user } = useContext(UserContext);
	const { modal } = useContext(UserContext);

	const { modalStore } = useStores();

	async function PhotoUpdate() {
		if (uploadPhoto.current.files.length !== 0) {
			const reader = new FileReader();
			// reader가 이미지 읽도록 하기
			setImageFile([...imageFile, uploadPhoto.current.files[0]]);
			const data = await AwsS3([uploadPhoto.current.files[0]]);
			setImage([...image, ...data]);

			reader.readAsDataURL(uploadPhoto.current.files[0]);
		}
	}

	async function Update() {
		if (text != "") {
			let cText = text;

			let tag = [];
			while (cText.indexOf("#") != -1) {
				let index = cText.indexOf("#") + 1;
				let tagText = "";
				while (index < cText.length && cText[index] != " ") {
					tagText += cText[index];
					index++;
				}
				tag = [...tag, tagText];

				cText = cText.replace(
					cText.slice(cText.indexOf("#"), index + 1),
					""
				);
			}

			const editPostData = await EditPost(
				user,
				modalStore.getPetPGramPostIdState,
				{
					content: cText,
					tagList: tag,
					imgUrlList: image,
				}
			);
			if (editPostData.status == 200) {
				window.location.href = "/";
			}
		}
	}

	useEffect(() => {
		SearchDetailPost(user, modalStore.getPetPGramPostIdState).then((e) => {
			let regexText = "";
			for (let i = 0; i < e.data.tagList.length; i++) {
				regexText += "#" + e.data.tagList[i] + " ";
			}
			setText(e.data.content + regexText);
			setImage(e.data.imgUrlList);
		});
	}, [props.visibility]);

	return (
		<Modal
			visible={props.visibility}
			closeVisible={() => props.EditPetpGramModalState()}
			width="1200"
		>
			<ModalWrapper>
				<Title>게시글 수정</Title>
				<TextArea
					value={text}
					onChange={(event) => {
						if (text.length <= 50) {
							setText(event.target.value.substr(0, 50));
						}
					}}
					placeholder="50자 이내로 작성해주세요."
				></TextArea>
				<TextLength>{text.length} / 50자</TextLength>
				<PhotoWrapper>
					<label>
						<Input
							type="file"
							accept="image/png, image/jpeg, image/jpg"
							onChange={() => {
								PhotoUpdate();
							}}
							ref={uploadPhoto}
						/>
						<PhotoAdd src={PhotoAddIcon} />
					</label>
					{image.map((value, index) => {
						return (
							<>
								<PhotoImg
									src={value}
									onClick={() => {
										image.splice(index, 1);
										setImage([...image]);
									}}
								/>
							</>
						);
					})}
				</PhotoWrapper>
				<Button onClick={Update}>게시글 수정</Button>
			</ModalWrapper>

			<BackIcon
				src={Back}
				alt="back icon"
				onClick={() => {
					setText("");
					setImage([]);
					props.EditPetpGramModalState();
				}}
			/>
		</Modal>
	);
}

export default EditPetpGramModal;
