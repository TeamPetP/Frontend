import React, { useContext, useState } from "react";
import styled from "styled-components";
import LogoImg from "../logo.png";
import { signInGoogle, auth } from "../services/firebaseAuth";
import PetSignInImage from "../assets/images/signin_pet_image.svg";
import Modal from "../components/common/Modal";
import { UserContext } from "../contexts/UserContext";
import ProfileDefaultImage from "../assets/images/profile_default_image.png";
import { SignUp } from "../services/authApi";
import { useStores } from "../hooks/useStores";
import { signOut } from "../services/firebaseAuth";

const ModalWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	position: absolute;
	top: 0px;
	bottom: 0px;
	left: 0px;
	right: 0px;
`;
const Button = styled.div`
	max-width: 500px;
	width: 90%;
	height: 60px;

	background-color: #f3593a;

	border-radius: 10px;

	display: flex;
	justify-content: center;
	align-items: center;

	font-size: 26px;
	color: white;
	font-family: "yg-jalnan";

	cursor: pointer;

	margin: 1.6em 0 0.4em 0;
`;
const Logo = styled.img`
	width: 230px;

	margin-bottom: 40px;
`;
const PetImage = styled.img``;

const ImageInput = styled.input`
	display: none;
`;
const ProfileImage = styled.img`
	width: 138px;
	height: 138px;

	border-radius: 100%;

	margin: 0 auto;

	cursor: pointer;
`;

const InputWrapper = styled.div`
	width: 500px;
	margin: 0 auto;
	@media screen and (max-width: 768px) {
		width: 90%;
	}
`;

const InputTitle = styled.div`
	margin-left: 4px;
	margin-bottom: 4px;

	font-size: 18px;
`;
const Input = styled.input`
	width: 100%;
	height: 60px;
	border-radius: 10px;
	border: 1.2px solid #f3593a;

	padding: 10px 10px;

	font-size: 16px;

	margin-bottom: 20px;
`;

const TextArea = styled.textarea`
	width: 100%;
	height: 100px;
	border-radius: 10px;
	border: 1.2px solid #f3593a;
	padding: 10px 10px;
	font-size: 16px;
`;

function SignUpModal(props) {
	const { user, setUser } = useContext(UserContext);
	const uploadPhoto = React.useRef("");
	const [photo, setPhoto] = useState(false);
	const [nickname, setNickname] = useState("");
	const [introduce, setIntroduce] = useState("");

	const { userStore } = useStores();

	function PhotoUpdate() {
		if (uploadPhoto.current.files.length !== 0) {
			setPhoto(uploadPhoto.current.files[0]);
			const reader = new FileReader();
			// 이미지가 로드가 된 경우
			reader.onload = (e) => {
				setPhoto(e.target.result);
			};
			// reader가 이미지 읽도록 하기
			reader.readAsDataURL(uploadPhoto.current.files[0]);
		} else {
			setPhoto("");
		}
	}

	function onChangeNickName(e){
		setNickname(e.target.result)
	}

	function onChangeIntroduce(e){
		setIntroduce(e.target.result)
	}

	return (
		<Modal
			visible={props.visibility}
			closeVisible={() => {
				signOut();
				props.SignInModalState();
			}}
			width="640"
		>
			<ModalWrapper>
				<Logo src={LogoImg} alt="펫피" />

				{/* <label>
					<ImageInput
						type="file"
						onChange={() => {
							PhotoUpdate();
						}}
						ref={uploadPhoto}
					/>
					{photo != "" ? (
						<ProfileImage src={photo} alt="profile_img" />
					) : (
						<ProfileImage
							src={ProfileDefaultImage}
							alt="profile_default_img"
						/>
					)}
				</label> */}
				<InputWrapper>
					<InputTitle>닉네임</InputTitle>
					<Input placeholder="닉네임을 입력해주세요." onChange={e=> onChangeNickName(e)}></Input>
				</InputWrapper>
				<InputWrapper>
					<InputTitle>내 소개</InputTitle>
					<TextArea placeholder="나를 소개해주세요." onChange={e=> onChangeIntroduce(e)}></TextArea>
				</InputWrapper>
				<Button
					onClick={() =>
						SignUp(
							user,
							nickname,
							introduce,
							setUser,
							props.SignInModalState,
							(data) => {
								userStore.info = data;
							}
						)
					}
				>
					회원가입
				</Button>
			</ModalWrapper>
		</Modal>
	);
}

export default SignUpModal;
