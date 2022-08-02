import { useEffect } from "react";
import styled from "styled-components";
import Back from "../assets/images/back.png";
import Modal from "../components/common/Modal";

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

	& img {
		max-width: 100%;
		max-height: 100%;
	}

	@media screen and (max-width: 768px) {
		padding: 4em 30px;
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

function ViewPetMeetingGalleryModal(props) {
	return (
		<Modal
			visible={props.visibility}
			closeVisible={() => props.ViewPetMeetingGalleryModalState()}
			width="1200"
		>
			<ModalWrapper>
				<img src={props.imgUrl} alt="이미지" />
			</ModalWrapper>

			<BackIcon
				src={Back}
				alt="back icon"
				onClick={() => {
					props.ViewPetMeetingGalleryModalState();
				}}
			/>
		</Modal>
	);
}

export default ViewPetMeetingGalleryModal;
