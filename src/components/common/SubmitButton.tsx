import React from "react";
import styled from "styled-components";
import * as theme from "../../styles/theme";
import backBtn from "../../assets/images/back_btn.png";

interface IButtonType {
  text: string;
  onClick?: any;
}
function SubmitButton({ text, onClick }: IButtonType) {
  return <SubmitBtn onClick={() => onClick()}>{text}</SubmitBtn>;
}

export default SubmitButton;

const SubmitBtn = styled.button`
  background-color: ${theme.PrimaryColor};
  color: #fff;
  border-radius: 5px;
  font-size: 26px;
  font-family: ${theme.jalnan};
  display: block;
  width: 100%;
  padding: 8px;

  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
`;
