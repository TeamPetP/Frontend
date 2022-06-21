import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import LogoImg from "../logo.png";
import * as theme from "../styles/theme";

import { UserContext } from "../contexts/UserContext";

import { useStores } from "../hooks/useStores";
import { observer } from "mobx-react";

const Navbar = observer(() => {
	const { modalStore, userStore } = useStores();

	const uploadPhoto = React.useRef("");
	const { pathname } = useLocation();
	const { user } = useContext(UserContext);
	console.log(user);
	return (
		<>
			<NavWrap>
				<NavLogo to="/">
					<Logo src={LogoImg} alt="펫피" />
				</NavLogo>
				<Menuwrap>
					<Menu to="/" selected={pathname === "/"}>
						펫피그램
					</Menu>
					<Menu to="/meeting" selected={pathname === "/meeting"}>
						펫미팅
					</Menu>
					<Menu to="/map" selected={pathname === "/map"}>
						지도
					</Menu>
					<UserMenu>
						{user != null && user.userAccessState ? (
							<ProfileButton>
								<UserProfile src={LogoImg}></UserProfile>
							</ProfileButton>
						) : (
							<LoginBtn
								onClick={() => (modalStore.signInState = true)}
							>
								로그인
							</LoginBtn>
						)}
					</UserMenu>
				</Menuwrap>
			</NavWrap>
		</>
	);
});

export default Navbar;

const NavWrap = styled.div`
	width: 100%;
	height: 100px;
	padding: 0 100px;
	overflow: hidden;
	background-color: #ffffff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 3px solid ${theme.SecondaryColor};
	box-sizing: border=box;
`;

const NavLogo = styled(Link)`
	justify-self: flex-start;
	cursor: poiner;
	display: flex;
	align-items: center;
`;

const PetImage = styled.img``;

const ModalWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
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

const Menuwrap = styled.div`
	width: 500px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	* {
		font-family: "yg-jalnan";
	}
`;
// const RadioLabel = styled.label`
// 	cursor: pointer;
// 	width: 120px;
// 	padding: 0 28px;
// 	background: url("${(props: { Ischecked: boolean }) =>
// 			props.Ischecked ? "a" : "a"}")
// 		no-repeat left center / 20px;
// `;
const Menu = styled(Link)`
	color: ${(props) => (props.selected ? theme.PrimaryColor : "#000000")};
	font-size: 30px;
`;

const UserMenu = styled.div`
	width: 80px;
`;

const ProfileButton = styled.button`
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background-color: blue;
`;

const UserProfile = styled.img`
	width: 100%;
	height: 100%;
`;

const LoginBtn = styled.button`
	width: 80px;
	height: 35px;
	background-color: ${theme.PrimaryColor};
	color: #fff;
	font-size: 18px;
	border-radius: 5px;
`;

const ImageInput = styled.input`
	visibility: visible;
`;
const ProfileImage = styled.img`
	width: 138px;
	height: 138px;

	border-radius: 100%;

	margin: 0 auto;
`;
