import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import * as theme from "../../styles/theme";
import backBtn from "../../assets/images/back_btn.png";

interface ITitleType {
  title: string;
}
function PageTitle({ title }: ITitleType) {
  const navigate = useNavigate();
  return (
    <TitleArea>
      <BackBtn
        onClick={() => {
          navigate(-1);
        }}
      />
      <Title>{title}</Title>
    </TitleArea>
  );
}

export default PageTitle;

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

  @media screen and (max-width: 600px) {
    left: 20px;
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  width: 100%;

  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
`;
