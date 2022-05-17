import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./index";
import ProtectAnimalsList from "../../components/ProtectAnimalsList/ProtectAnimalsList";
import styled from "styled-components";
import * as theme from "../../styles/theme";
import Background from "../../assets/images/background.jpg";
import Petpgram from "../../assets/images/petpgram.png";

const MainPage = () => {
  return (
    <Wrap>
      <Container>
        <LeftArea>
          <MenuImg src={Petpgram} alt="펫피그램" />
          <ProtectAnimalsList />
        </LeftArea>
        <RightArea>
          <Content>
            <Routes>
              <Route path="/" element={<IndexPage />} />
            </Routes>
          </Content>
        </RightArea>
      </Container>
    </Wrap>
  );
};

export default MainPage;

const Wrap = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  overflow: hidden;
  background: url(${Background}) no-repeat center bottom / cover;
`;

const Container = styled.div`
  width: 1230px;
  height: inherit;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const LeftArea = styled.div`
  width: 540px;
`;

const MenuImg = styled.img`
  width: 100%;
  margin: 80px 0 50px;
`;

const RightArea = styled.div`
  width: 640px;
  height: 100%;
  overflow-y: scroll;
  direction: ltr;
  background-color: #fff;
  border: 2px solid ${theme.SecondaryColor};
  border-top: 0;
  box-sizing: border-box;

  &::-webkit-scrollbar,
  ::-webkit-scrollbar-track {
    display: none;
  }
`;

const Content = styled.div``;
