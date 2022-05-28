import styled from "styled-components";
import LogoImg from "../logo.png";
import { signInGoogle, auth } from "../services/firebaseAuth";
import PetSignInImage from "../assets/images/signin_pet_image.svg";
import Modal from "../components/common/Modal";

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
	max-width: 370px;
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
`;
const PetImage = styled.img``;

function SignInModal(props: { visibility: boolean; SignInModalState: any }) {
	function GoogleSignIn() {
		signInGoogle();
	}

	return (
		<Modal
			visible={props.visibility}
			closeVisible={() => props.SignInModalState()}
			width="640"
		>
			<ModalWrapper>
				<Logo src={LogoImg} alt="펫피" />
				<Button onClick={() => GoogleSignIn()}>구글로 로그인</Button>
				<PetImage src={PetSignInImage} alt="signin_image" />
			</ModalWrapper>
		</Modal>
	);
}

export default SignInModal;
