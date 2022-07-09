import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../../../hooks/useStores";
import { useNavigate } from "react-router";
import { UserContext } from "../../../../contexts/UserContext";
import Comment from "../../../../components/common/Comment";
import styled from "styled-components";
import * as theme from "../../../../styles/theme";
import user_profile from "../../../../assets/images/user_profile.png";
import SampleImg from "../../../../assets/images/bg1.png";
import pencil from "../../../../assets/images/pencil.png";
import { GetBoardList } from "../../../../services/MeetingApi";

const Board = observer(({ meetingId }: any) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { modalStore, userStore } = useStores();
  const [boardData, setBoardData] = useState<any>([]);

  useEffect(() => {
    console.log(user);
    console.log(`meetingId = ${meetingId}`);
    async function fetchData() {
      const d: any = await GetBoardList(user, meetingId);
      setBoardData(d.data);
    }
    fetchData();
  }, [user]);

  function createBoard() {
    if (user != null && user.userAccessState) {
      modalStore.createPetMeetingBoardState = true;
      modalStore.petMeetingId = meetingId;
    } else {
      modalStore.signInState = true;
    }
  }

  return (
    <Meeting>
      <Creator>
        <CreatorThumbnail src={user_profile} />
        <div>
          <Nickname>{userStore.getName}</Nickname>
          <div>
            <Place>서울시 마포구</Place>
            <CreateTime>3시간전</CreateTime>
          </div>
        </div>
      </Creator>
      <BoardContent>
        <BoardTitle>수제간식 원데이클래스 재밌었어요!</BoardTitle>
        <ContentImg>
          <img src={SampleImg} alt="활동사진" />
          <img src={SampleImg} alt="활동사진" />
          <img src={SampleImg} alt="활동사진" />
        </ContentImg>
        <Content>
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          <br />
          aaaaaaa
        </Content>
      </BoardContent>
      <Comment />
      <CreateButton
        onClick={() => {
          createBoard();
        }}
      >
        <CreateButtonImage src={pencil} alt="create button" />
      </CreateButton>
    </Meeting>
  );
});

export default Board;

const Meeting = styled.div`
  padding: 10px 20px;
  background-color: #fff;
  box-sizing: border-box;
  transition: ${theme.Transition};
  border-bottom: 1px solid ${theme.SecondaryColor};

  &:last-child {
    margin-bottom: 0;
    border-bottom: 0;
  }
`;

const Creator = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 20px 0;
  box-sizing: border-box;

  @media screen and (max-width: 600px) {
    padding: 10px 0;
  }
`;

const CreatorThumbnail = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  overflow: hidden;

  @media screen and (max-width: 600px) {
    width: 40px;
    height: 40px;
  }
`;

const Content = styled.div`
  line-height: 1.5;

  @media screen and (max-width: 600px) {
    font-size: 16px;
    word-break: break-word;
  }
`;

const Nickname = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #000;

  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

const Place = styled.span`
  font-weight: noraml;
  font-size: 16px;
  &::after {
    content: "|";
    display: inline-block;
    clear: both;
    margin: 0 8px;
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

const CreateTime = styled.span`
  font-size: 16px;
  color: ${theme.TextSubColor};

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

const BoardTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #000;
  margin-bottom: 16px;

  @media screen and (max-width: 600px) {
    font-size: 16px;
    word-break: break-word;
  }
`;

const BoardContent = styled.div`
  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

const ContentImg = styled.div`
  & img {
    width: 72px;
    margin-right: 8px;
    border: 1px solid black;
    box-sizing: border-box;
  }
  margin-bottom: 16px;
`;

const CreateButton = styled.div`
  position: sticky;
  bottom: 0px;
  right: -10px;

  width: 60px;
  height: 60px;

  border-radius: 100%;

  background-color: #f3593a;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: auto;

  cursor: pointer;
`;

const CreateButtonImage = styled.img`
  width: 24px;
  height: 24px;
`;
