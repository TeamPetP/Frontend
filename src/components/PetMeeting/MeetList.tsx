import React, {
  useState
} from 'react';
import styled from "styled-components";
import * as theme from "../../styles/theme";
import condition1 from "../../assets/images/condition1.png";
import condition2 from "../../assets/images/condition2.png";
import condition3 from "../../assets/images/condition3.png";
import bookmark from "../../assets/images/bookmark.png";
import bookmark_active from "../../assets/images/bookmark_active.png";


const MeetList = (() => {
  const [isBookmark, setIsBookmark] = useState(false);
  const [status, setStatus] = useState(false);
  
  return (
    <Meeting>
				<Options>
					<Tags>
          	<Dday>D-3</Dday>
						<Caregory>공예/만들기</Caregory>
					</Tags>
					<Bookmark isBookmark />
				</Options>
				<Top>
					<Title>
						<Progress Isprogress={status}>{status ? "모집중" : "모집완료"}</Progress>
						<div>수제간식 원데이클래스 같이 하실 분!</div>
					</Title>
					<div>
						<Button>수정</Button>
						<Button>삭제</Button>
					</div>
				</Top>
				<div>
					<List><img src={condition1} alt="나이조건" />20~30대만</List>
					<List><img src={condition2} alt="시간 및 장소" />5월 7일 오후 2시</List>
					<List><img src={condition3} alt="현재 참여인원" />2명 참여중</List>
				</div>
				<Content>
					aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<br/>aaaaaaa
				</Content>
				<Bottom>
					<div>
						<Nickname>User</Nickname>
						<Place>서울시 마포구</Place>
					</div>
					<CreateTime>3시간전</CreateTime>
				</Bottom>
			</Meeting>
  )
});

export default MeetList;

const Meeting = styled.div`
  padding: 20px;
  background-color: #fff;
  border: 1px solid ${theme.PrimaryColor};
  box-sizing: border=box;
`;

const Options = styled.div`
display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Tags = styled.div`
justify-content: start;
`;

const Caregory = styled.span`
  padding: 6px 20px;
  background-color: ${theme.TextConentColor};
  color: #fff;
  border-radius: 5px;
  font-size: 16px;
  margin-right: 8px;
`;

const Dday = styled(Caregory)`
  background-color: ${theme.PrimaryColor};
`;

const Bookmark = styled.button`
width: 28px;
height: 22px;
background: url(${(props: {isBookmark:boolean}) =>props.isBookmark ? bookmark_active : bookmark}) no-repeat center center / cover;
`;

const Top = styled.div`
display: flex;
justify-content: space-between;
align-item: center;
margin : 16px 0;
`;

const Title = styled.div`
display: flex;
justify-content: start;
align-items: center;
font-size : 20px;
font-weight: 500;
color : #000000;
`;

const Progress = styled.span`
color : ${(props: {Isprogress:boolean}) =>props.Isprogress ? theme.PrimaryColor : '#C1C1C1'};
margin-right: 8px;
`;

const Button = styled.button`
	color : ${theme.TextSubColor};
	padding : 4px;
	transition: ${theme.Transition};
	
	&:hover {
		color : ${theme.TextHoverColor};
	}
`;

const List = styled.div`
font-size: 16px;
color : #000;
line-height: 2;
display: flex;
align-items : center;

& img {
	margin-right: 8px;
	width: 20px;
}
`;

const Content = styled.div`
background-color : #fff;
border : 2px solid #EBEBEB;
box-sizing: border-box;
padding: 18px;
margin: 16px 0;
line-height: 1.5;
font-weight: noraml;
`;

const Bottom = styled.div`
display: flex;
justify-content: space-between;
align-items: center;

`;

const Nickname = styled.span`
font-size: 20px;
font-weight: bold;
color : #000;
`;

const Place = styled.span`
font-weight: noraml;

&::before {
	content : "|";
	display: inline-block;
	clear: both;
	margin: 0 4px;
}
`;

const CreateTime = styled.span`
font-size:16px;
color : ${theme.TextSubColor};
`;

