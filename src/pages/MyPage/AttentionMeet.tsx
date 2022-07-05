import React, { useState } from "react";
import styled from "styled-components";
import * as theme from "../../styles/theme";
import withMain from "../../hocs/ui/withMain";
import { useStores } from "../../hooks/useStores";
import { observer } from "mobx-react";
import { useNavigate } from "react-router";
import PageTitle from "../../components/common/PageTitle";
import Tag from "../../components/common/Tag";
import BookmarkButton from "../../components/common/BookmarkButton";
import MeetCondition from "../../components/common/MeetCondition";

const AttentionMeetPage = observer(() => {
  const { userStore } = useStores();
  const navigate = useNavigate();
  const [isBookmark, setIsBookmark] = useState(false);
  const [status, setStatus] = useState(false);

  const moveDetailPage = () => {
    navigate(`/meeting/detail`);
  };

  return (
    <Wrapper>
      <PageTitle title="관심모임" />
      <List>
        <Meeting onClick={() => moveDetailPage()}>
          <Options>
            <Tags>
              <Tag color={theme.PrimaryColor} text="D-3" />
              <Tag text="공예/만들기" />
            </Tags>
            <BookmarkButton isBookmark={isBookmark} />
          </Options>
          <MeetCondition
            status={status}
            meetTitle="수제간식 원데이클래스 같이 하실 분!"
            conditions="20~30대만"
            date="5월 7일 오후 2시"
            personnel={2}
          />
          <Content>
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            <br />
            aaaaaaa
          </Content>
          <Bottom>
            <div>
              <Nickname>User</Nickname>
              <Place>서울시 마포구</Place>
            </div>
            <CreateTime>3시간전</CreateTime>
          </Bottom>
        </Meeting>
      </List>
      <input
        onChange={(value) => {
          userStore.setName(value.target.value);
        }}
      />
    </Wrapper>
  );
});

export default withMain(AttentionMeetPage, "마이페이지");

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const List = styled.div`
  padding: 10px 40px;

  @media screen and (max-width: 600px) {
    padding: 10px;
  }
`;

const Meeting = styled.div`
  padding: 20px;
  background-color: #fff;
  border: 1px solid ${theme.PrimaryColor};
  box-sizing: border=box;
  margin-bottom: 20px;
  cursor: pointer;
  transition: ${theme.Transition};

  &:last-child {
    margin-bottom: 0;
  }
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Tags = styled.div`
  justify-content: start;
`;

const Content = styled.div`
  background-color: #fff;
  border: 2px solid #ebebeb;
  box-sizing: border-box;
  padding: 18px;
  margin: 16px 0;
  line-height: 1.5;
  font-weight: noraml;

  @media screen and (max-width: 600px) {
    word-break: break-all;
    line-height: 1.2;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nickname = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #000;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

const Place = styled.span`
  font-weight: noraml;

  &::before {
    content: "|";
    display: inline-block;
    clear: both;
    margin: 0 4px;
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
