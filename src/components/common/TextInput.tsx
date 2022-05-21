import React, {useState} from "react";
import styled from "styled-components";
import * as theme from "../../styles/theme";

interface IInputType {
	width?: string;
	height?: string;
	placeholder?: string;
	maxLength?: number;
	marginTop?: string;
	marginBottom?: string;
	marginRight?: string;
	marginLeft?: string;
}
function TextInput({ width = '100%', placeholder, maxLength, marginTop='8px', marginBottom='8px', marginRight='0', marginLeft='0' }: IInputType) {
	const [text, setText] = useState('');

	const inputChangeHandler = (e: any) => {
    console.log(e.target.value);
    setText(e.target.value);
  }; 
  return (
    <>
			<Input type="text" width={width} placeholder={placeholder} value={text} marginTop={marginTop} marginBottom={marginBottom} marginRight={marginRight} marginLeft={marginLeft} onChange={inputChangeHandler} maxLength={maxLength}/>
      {maxLength && (
        <TextLength>
          <span>{text.length}</span>/{maxLength}
        </TextLength>
      )}
    </>
  );
}

export function TextArea({ height = '150px', placeholder, marginTop='8px', marginBottom='8px', marginRight='0', marginLeft='0' }: IInputType) {
	const [text, setText] = useState('');

	const inputChangeHandler = (e: any) => {
    console.log(e.target.value);
    setText(e.target.value);
  }; 
  return <InputArea height={height} placeholder={placeholder} onChange={inputChangeHandler} marginTop={marginTop} marginBottom={marginBottom} marginRight={marginRight} marginLeft={marginLeft}>{text}</InputArea>
}


const Input = styled.input<IInputType>`
  width: ${props =>props.width};
  border: 1px solid #cfcfcf;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #fff;
  padding: 12px 10px;
	margin-top : ${props =>props.marginTop};
	margin-bottom : ${props =>props.marginBottom};
	margin-left : ${props =>props.marginLeft};
	margin-right : ${props =>props.marginRight};

  &::placeholder {
    color: #d0d0d0;
    font-size: 16px;
	  position: relative;
		top: 2px;
  }
`;

const InputArea = styled.textarea<IInputType>`
width: 100%;
height: ${props =>props.height};
border: 1px solid #cfcfcf;
box-sizing: border-box;
border-radius: 5px;
background-color: #fff;
padding: 12px 10px;
margin-top : ${props =>props.marginTop};
margin-bottom : ${props =>props.marginBottom};
margin-left : ${props =>props.marginLeft};
margin-right : ${props =>props.marginRight};

&::placeholder {
	color: #d0d0d0;
	font-size: 16px;
	position: relative;
	top: 2px;
}
`;

const TextLength = styled.div`
  text-align: right;
  font-size: 14px;
  color: #cfcfcf;

  & span {
    color: ${theme.SecondaryColor};
  }
`;

export default TextInput;
