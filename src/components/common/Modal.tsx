import React from "react";
import styled from "styled-components";
import Background from "../../assets/images/modal_background.png";

interface IModalType {
	visible: boolean;
	children: any;
	closeVisible: any;
	width?: string;
}
function Modal({ visible, children, width, closeVisible }: IModalType) {
	return (
		<>
			<ModalWrapper visible={visible}>
				<ModalOverlay
					onClick={() => {
						console.log("test");
						closeVisible();
					}}
				/>
				<ModalInner className="modal-inner" width={width}>
					{children}
				</ModalInner>
			</ModalWrapper>
		</>
	);
}

const ModalWrapper = styled.div`
	box-sizing: border-box;
	display: ${(props: { visible: boolean }) =>
		props.visible ? "block" : "none"};
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1000;
	overflow: auto;
	outline: 0;
`;

const ModalOverlay = styled.div`
	box-sizing: border-box;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 999;
`;

const ModalInner = styled.div`
	box-sizing: border-box;
	position: relative;
	box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
	background-color: #fff;
	border-radius: 10px;
	width: ${(props: { width: string | undefined }) =>
		props.width ? props.width + "px" : "640px"};
	height: 80%;
	top: 50%;
	z-index: 1001;
	transform: translateY(-50%);
	margin: 0 auto;
	padding: 40px 20px;

	background-image: url(${Background});
	@media screen and (max-width: ${(props: { width: string | undefined }) =>
			props.width ? Number(props.width) + 80 + "px" : "768px"}) {
		width: 90%;
	}
`;

export default Modal;
