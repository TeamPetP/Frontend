import React, { useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import LogoImg from "../logo.png";
import * as theme from "../styles/theme";

const Navbar = () => {
	const [user, setUser] = useState(false);
	const { pathname } = useLocation();
	return (
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
					{user ? (
						<ProfileButton>
							<UserProfile src={LogoImg}></UserProfile>
						</ProfileButton>
					) : (
						<LoginBtn>로그인</LoginBtn>
					)}
				</UserMenu>
			</Menuwrap>
		</NavWrap>
	);
};

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
