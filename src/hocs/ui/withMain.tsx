import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectAnimalsList from "../../components/ProtectAnimalsList/ProtectAnimalsList";
import styled from "styled-components";
import * as theme from "../../styles/theme";
import Background from "../../assets/images/background.jpg";
import Petpgram from "../../assets/images/petpgram.png";
import PetMeeting from "../../assets/images/petmeeting.png";

const WithMain = (PropsComponent: any, title: string) => {
	const Component = () => {
		return (
			<Wrap>
				<Container>
					<LeftArea>
						{title === "팻피그램" ? (
							<MenuImg src={Petpgram} alt={title} />
						) : (
							<></>
						)}
						{title === "펫미팅" ? (
							<MenuImg src={PetMeeting} alt={title} />
						) : (
							<></>
						)}
						<ProtectAnimalsList />
					</LeftArea>
					<RightArea>
						<Content>
							<PropsComponent />
						</Content>
					</RightArea>
				</Container>
			</Wrap>
		);
	};
	return Component;
};

export default WithMain;

const Wrap = styled.div`
	width: 100%;
	height: calc(100vh - 100px);
	overflow: hidden;
	background: url(${Background}) no-repeat center bottom / cover;

	position: relative;
`;

const Container = styled.div`
	max-width: 1230px;
	height: inherit;
	margin: 0 auto;
	padding: 0px 40px;
	display: flex;
	justify-content: space-between;
	@media screen and (max-width: 916px) {
		padding: 0px 24px;
	}
`;

const LeftArea = styled.div`
	max-width: 540px;
	width: 46%;

	margin-right: 26px;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	@media screen and (max-width: 916px) {
		display: none;
	}
`;

const MenuImg = styled.img`
	width: 100%;
	margin: 0px 0 40px 0px;
`;

const RightArea = styled.div`
	max-width: 640px;
	min-width: 460px;
	width: 52%;
	height: 100%;
	overflow-y: scroll;
	direction: ltr;
	background-color: #fff;
	border: 2px solid ${theme.SecondaryColor};
	border-top: 0;
	box-sizing: border-box;
	padding: 0px;

	/* &::-webkit-scrollbar,
	::-webkit-scrollbar-track {
		display: none;
	} */
	&::-webkit-scrollbar {
		background: white;
		width: 7px;
	}
	&::-webkit-scrollbar-thumb {
		background: #f3593a;
		border-radius: 20px;
	}
	@media screen and (max-width: 916px) {
		width: 100%;
		max-width: 100%;
		min-width: 100%;
	}
`;

const Content = styled.div``;
