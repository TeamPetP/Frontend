import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
// 폰트 설정
@font-face {
  font-family: 'yg-jalnan';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');

// default css 설정
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans KR', sans-serif;
}

a {
  text-decoration:none;
}

input {
  border: 0;
  outline: none;
}

button {
  border: 0;
  outline: none;
  background-color: #ffffff;
  cursor: pointer;
}

ul,ol,li {
  list-style: none;
}


`;

export default GlobalStyle;
