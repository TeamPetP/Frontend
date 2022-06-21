import React, { useState,
	useEffect,
	useContext,
	useRef } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import LogoImg from "../logo.png";
import backBtn from "../assets/images/back_btn.png";
import menubar from "../assets/images/menubar.png";
import * as theme from "../styles/theme";


import { UserContext } from "../contexts/UserContext";

import { useStores } from "../hooks/useStores";
import { observer } from "mobx-react";

const Navbar = observer(() => {
	const { modalStore } = useStores();
	const [menuclick, setMenuClick] = useState(false); // 모바일 메뉴 모달 노출
	const [IsIconClicked, setIsIconClicked] = useState(false);
	const [isDesktop, setIsDesktop] = useState(true); // 디바이스 사이즈 체크

	const menuRef = useRef();
	const { pathname } = useLocation();
	const { user } = useContext(UserContext);

	useEffect(() => {
		deviceSizeCheck();
	  }, []);
	
	  useEffect(() => {
		window.addEventListener('click', handleClickOutside);
		return () => {
		  window.removeEventListener('click', handleClickOutside);
		};
	  }, []);
	
	  const handleClickOutside = (e) => {
		if (!menuRef.current?.contains(e.target)) setIsIconClicked(false);
	  };

	// 모바일 메뉴 클릭
	const handleMenuClick = () => setMenuClick(!menuclick);

	// 디바이스 사이즈 체크
	const deviceSizeCheck = () => {
	  if (window.innerWidth <= 960) {
		setIsDesktop(false);
	  } else {
		setIsDesktop(true);
	  }
	};
  
	window.addEventListener('resize', deviceSizeCheck);

	return (
		<>
			<NavWrap>
				<NavLogo to="/">
					<Logo src={LogoImg} alt="펫피" />
				</NavLogo>
				<MobileIcon onClick={handleMenuClick}>
					{!isDesktop && <img src={menubar} alt="모바일 메뉴바" />}
				</MobileIcon>
				{isDesktop && <Menuwrap menuclick={menuclick} ref={menuRef}>
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
							<ProfileButton to="/mypage">
								<UserProfile src={LogoImg}/>
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
				}
				{menuclick &&
				<MobileMenuwrap menuclick={menuclick} ref={menuRef}>
					<TitleArea>
						<BackBtn onClick={handleMenuClick}/>
					</TitleArea>
					<MobileMenuList>
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
								<>
								<MobileBtn PrimaryColor>마이페이지</MobileBtn>
								<MobileBtn>로그아웃</MobileBtn>
								</>
							) : (
								<MobileBtn PrimaryColor onClick={() => (modalStore.signInState = true)}>
									로그인
								</MobileBtn>
							)}
						</UserMenu>
					</MobileMenuList>
				</MobileMenuwrap>
}
			</NavWrap>
		</>
	);
});

export default Navbar;

const NavWrap = styled.div`
	width: 100%;
	height: 100px;
	padding: 0 100px;
	position: relative;
	overflow: hidden;
	background-color: #ffffff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 3px solid ${theme.SecondaryColor};
	box-sizing: border-box;

	@media screen and (max-width: 960px) {
		display:block;
		height: 80px;
		padding: 0 20px;
		overflow: visible;
	}
`;

const NavLogo = styled(Link)`
	justify-self: flex-start;
	cursor: poiner;
	display: flex;
	align-items: center;
	height: 100%;
`;

const MobileIcon = styled.div`
 	display: block;
    position: absolute;
    top: 19px;
    right: 20px;
    font-size: 1.8rem;
    cursor: pointer;
    color: #73d13d;
`;

const TitleArea = styled.div`
  border-bottom: 2px solid ${theme.SecondaryColor};
  box-sizing: border-box;
  height: 60px;
  background-color: #fff;
  position: relative;
  display: flex;
  align-items: center;
`;

const BackBtn = styled.button`
  width: 20px;
  height: 18px;
  background: transparent url(${backBtn}) no-repeat center center / 100%;
  position: absolute;
  top: 20xp;
  left: 40px;
  transition: ${theme.Transition};

  &:hover {
    opacity: 0.7;
  }

  @media screen and (max-width: 960px) {
    left: 20px;
  }
`;

const Logo = styled.img`
	width: 230px;

	@media screen and (max-width: 960px) {
		width: 100px;
	}
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

const MobileMenuwrap = styled.div`
	width: 100%;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 999;
	background-color: #fff;
	* {
		font-family: "yg-jalnan";
	}
`;

const MobileMenuList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Menu = styled(Link)`
	color: ${(props) => (props.selected ? theme.PrimaryColor : "#000000")};
	font-size: 30px;

	@media screen and (max-width: 960px) {
		font-size: 38px;
		margin-top: 50px;
	}
`;

const UserMenu = styled.div`
	width: 80px;

	@media screen and (max-width: 960px) {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 100px;
	}
`;

const ProfileButton = styled(Link)`
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background-color: blue;
	display: block;
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

const MobileBtn = styled.button`
	width: 370px;
	height: 60px;
	background-color: ${(props) => props.PrimaryColor ? `${theme.PrimaryColor}` : `#000000`};
	color: #fff;
	font-size: 26px;
	border-radius: 5px;
	margin-bottom: 25px;
`;
