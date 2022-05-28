import React, { useContext, useState } from "react";
import styled from "styled-components";
import LogoImg from "../logo.png";
import { signInGoogle, auth } from "../services/firebaseAuth";
import PetSignInImage from "../assets/images/signin_pet_image.svg";
import Modal from "../components/common/Modal";
import { UserContext } from "../contexts/UserContext";
import ProfileDefaultImage from "../assets/images/profile_default_image.png";
import { SignUp } from "../services/authApi";

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

function SignUpModal(props) {
	const { user } = useContext(UserContext);
	const uploadPhoto = React.useRef("");
	const [photo, setPhoto] = useState(false);
	const [nickname, setNickname] = useState("");
	const [introduce, setIntroduce] = useState("");
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

	return (
		<Modal
			visible={props.visibility}
			closeVisible={() => props.SignInModalState()}
			width="640"
		>
			<ModalWrapper>
				<Logo src={LogoImg} alt="펫피" />

				<label>
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
				</label>
				<Button onClick={() => SignUp(user, nickname, introduce)}>
					회원가입
				</Button>
			</ModalWrapper>
		</Modal>
	);
}

export default SignUpModal;
