import { useState } from "react";
import styled from "styled-components";
import * as theme from "../../../styles/theme";
import close_btn from "../../../assets/images/close-btn.png";

interface IAlrimType {
  data: any;
  deleteAlrim: any;
  ReadAlrim: any;
}

const AlrimContent = ({ data, deleteAlrim, ReadAlrim }: IAlrimType) => {
  // notificationType에 따른 알림타입, 메세지 구분
  let notiType = "";
  let notiMsg = "";

  switch (data.notificationType) {
    case "comment":
      notiType = "댓글";
      notiMsg = `${data.nickname}님이 댓글을 남겼습니다.`;
      break;

    case "reply":
      notiType = "대댓글";
      notiMsg = `${data.nickname}님이 대댓글을 남겼습니다.`;
      break;

    case "closeMeet":
      notiType = "모임";
      notiMsg = `${data.postTitle}의 모집 마감이 하루 남았습니다!`;
      break;

    default:
      notiType = "";
      notiMsg = "";
      break;
  }

  return (
    <Wrapper isChecked={data.isChecked}>
      <Thumbnail src={data.thumbnail} alt={data.postTitle} />
      <Info onClick={() => ReadAlrim(data.notificationId)}>
        <Top>
          <Type>{notiType}</Type>
          <Message>{notiMsg}</Message>
        </Top>
        <Bottom>
          {data.nickname && <Nickname>{data.nickname}</Nickname>}
          <Date>{data.createDate}</Date>
        </Bottom>
      </Info>
      <DeleteBtn onClick={() => deleteAlrim(data.notificationId)}></DeleteBtn>
    </Wrapper>
  );
};

export default AlrimContent;

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: top;
  margin-bottom: 10px;
  position: relative;
  background-color: ${(props: { isChecked: boolean }) =>
    props.isChecked ? "#f0f0f0" : "#ffffff"};
`;

const Thumbnail = styled.img`
  width: 100px;
  height: 100px;

  @media screen and (max-width: 600px) {
    width: 50px;
    height: 50px;
  }
`;

const Info = styled.div`
  width: calc(100% - 110px);

  @media screen and (max-width: 600px) {
    width: calc(100% - 60px);
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: top;
  margin-top: 10px;
`;

const Type = styled.div`
  width: 90px;
  font-size: 22px;
  font-weigh: bold;
  color: ${theme.PrimaryColor};

  @media screen and (max-width: 600px) {
    width: 50px;
    font-size: 16px;
  }
`;

const Message = styled.div`
  font-size: 20px;
  line-height: 1.3;
  color: ${theme.TextConentColor};
  width: calc(100% - 100px);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media screen and (max-width: 600px) {
    font-size: 16px;
    width: calc(100% - 50px);
  }
`;

const Bottom = styled(Top)`
  font-size: 16px;
  color: ${theme.TextSubColor};
  justify-content: start;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

const Nickname = styled.div`
  &::after {
    content: "|";
    display: inline-block;
    clear: both;
    margin: 0 4px;
  }
`;
const Date = styled.div``;

const DeleteBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
  background: transparent url(${close_btn}) no-repeat center center;

  @media screen and (max-width: 600px) {
    width: 10px;
    height: 10px;
  }
`;
