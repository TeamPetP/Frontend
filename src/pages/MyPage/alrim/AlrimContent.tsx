import { useState } from "react";
import styled from "styled-components";
import * as theme from "../../../styles/theme";
import close_btn from "../../../assets/images/back_btn.png";

interface IAlrimType {
	data: any;
	deleteAlrim: any;
}

const AlrimContent = ({data, deleteAlrim} : IAlrimType) => {
// notificationType에 따른 알림타입, 메세지 구분
let notiType = '';
let notiMsg = '';

switch (data.notificationType) {
  case 'comment':
    notiType = '댓글';
    notiMsg = `${data.nickname}님이 댓글을 남겼습니다.`;
    break;

  case 'reply':
    notiType = '대댓글';
    notiMsg = `${data.nickname}님이 대댓글을 남겼습니다.`;
    break;

  case 'closeMeet':
    notiType = '모임';
    notiMsg = `${data.postTitle}의 모집 마감이 하루 남았습니다!`;
    break;

  default:
    notiType = '';
    notiMsg = '';
    break;
}
    
	return (
		<Wrapper>
			<Thumbnail src={data.thumbnail} alt={data.postTitle} />
            <Info>
                <Top>
                    <Type>{notiType}</Type>
                    <Message>{notiMsg}</Message>
                </Top>
                <Bottom>
                    {data.nickname && <Nickname>{data.nickname}</Nickname>}
                    <Date>{data.createDate}</Date>
                </Bottom>
            </Info>
            <DeleteBtn></DeleteBtn>
		</Wrapper>
	);
};

export default AlrimContent;

const Wrapper = styled.div`
	width: 100%;
    padding: 10px;
    border : 2px solid #ddd;
    box-sizing : border-box;
    display: flex;
	justify-content : space-between;
	align-items : top;
    margin-bottom: 10px;
    position: relative;
`;

const Thumbnail = styled.img`
	width : 100px;
	height : 100px;
`;

const Info = styled.div`
    width : calc(100% - 110px);

`;

const Top = styled.div`
    display: flex;
	justify-content : space-between;
    align-items : top;
    margin-top : 10px;
`;

const Type = styled.div`
    width : 90px;
    font-size: 22px;
    font-weigh: bold;
    color : ${theme.PrimaryColor};
`;

const Message = styled.div`
    font-size : 20px;
    line-height: 1.3;
    color: ${theme.TextConentColor};
    width: calc(100% - 100px);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

const Bottom = styled(Top)`
    font-size : 16px;
    color: ${theme.TextSubColor};
    justify-content: start;
`;

const Nickname = styled.div`
&::after {
    content : '|';
    display: inline-block;
    clear: both;
    margin: 0 4px;
}
`;
const Date = styled.div``;

const DeleteBtn = styled.button`
    position : absolute;
    right : 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    background : transparent url(${close_btn}) no-repeat center center;
`;