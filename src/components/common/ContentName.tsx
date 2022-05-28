import React from "react";
import styled from "styled-components";
import * as theme from "../../styles/theme";

function ContentName({inputTitle}: {inputTitle:string}) {
  return <TitleName>{inputTitle}</TitleName>;
}

const TitleName = styled.div`
  color: ${theme.TextWriteColor};
  font-size: 16px;
`;


export default ContentName;
