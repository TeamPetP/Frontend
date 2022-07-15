import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useStores } from "../../../hooks/useStores";
import { UserContext } from "../../../contexts/UserContext";
import * as theme from "../../../styles/theme";
import Tag from "../../../components/common/Tag";
import crown from "../../../assets/images/crown.png";
import user_profile from "../../../assets/images/user_profile.png";

const MyMeetList = ({ data }: any) => {
  const navigate = useNavigate();
  const { userStore } = useStores();
  const { user } = useContext(UserContext);
  const [category, setCategory] = useState("");

  const editMeet = () => {
    navigate(`/meeting/edit`, {
      state: { data },
    });
  };

  const management = (id: Number) => {
    navigate(`/mypage/participants/meetingId=${id}`);
  };

  const goMeetInfo = (id: Number) => {
    navigate(`/meeting/detail/${id}`);
  };

  const leaveMeet = (id: Number) => {
    console.log(`탈퇴하기`);
  };

  const cancleParticipation = (id: Number) => {
    console.log(`참여취소`);
  };

  // 참여자 목록 보기
  const ViewMembers = () => {
    navigate(`/meeting/joinMembers`, {
      state: { data },
    });
  };

  useEffect(() => {
    switch (data.category) {
      case "PICTURE":
        setCategory("사진 공유");
        return;
      case "WALK":
        setCategory("산책");
        return;
      case "VOLUNTEER":
        setCategory("봉사");
        return;
      case "CLASS":
        setCategory("클래스/수업");
        return;
      case "TRAINING":
        setCategory("교육/훈련");
        return;
      case "AMITY":
        setCategory("친목/모임");
        return;
      case "ETC":
        setCategory("기타");
        return;
      default:
        setCategory("");
    }
  }, [data]);
  return (
    <Wrapper>
      <Options>
        <Tags>
          {data.status === "모집중" && (
            <Tag color={theme.PrimaryColor} text="D-3" />
          )}
          <Tag text={category} />
        </Tags>
      </Options>
      <Top>
        <Progress Isprogress={data.isOpened === true}>
          {data.isOpened === true ? "모집중" : "모집완료"}
        </Progress>
        <Title crown={user.memberId === data.memberId}>{data.title}</Title>
      </Top>
      <Content>{data.content}</Content>
      <Member>
        <Members>
          참여중인 친구
          <MemberLength>
            {data.joinPeople}
            {data.maxPeople === 999999 ? "명" : `/${data.maxPeople}명`}
          </MemberLength>
        </Members>
        <ViewJoinMembers onClick={() => ViewMembers()}>
          목록보기
        </ViewJoinMembers>
      </Member>
      {/* 모임 개설자일 때 */}
      {userStore.getMemberId === data.memberId && (
        <SpaceBetween>
          <Button
            to={`/mypage/participants/meetingId=${data.meetingId}`}
            width="calc(50% - 5px)"
          >
            {" "}
            수정하기
          </Button>
          <Button
            to={`/mypage/participants/${data.meetingId}`}
            width="calc(50% - 5px)"
          >
            {" "}
            참여자 관리
          </Button>
        </SpaceBetween>
      )}
      {/* 일반 모임 참여자일 때 */}
      {/* {userStore.getMemberId !== data.memberId && data.isJoined === true && (
        <SpaceBetween>
          <Button
            width="calc(50% - 5px)"
            onClick={() => goMeetInfo(data.meetingId)}
          >
            모임으로 이동
          </Button>
          <Button
            width="calc(50% - 5px)"
            onClick={() => leaveMeet(data.meetingId)}
          >
            탈퇴하기
          </Button>
        </SpaceBetween>
      )} */}
      {/* 모임 참여신청자일 때 (승인 전) */}
      {/*  {userStore.getMemberId !== data.memberId && data.isJoined === false && (
        <Button width="100%" onClick={() => cancleParticipation(1)}>
          참여 취소
        </Button>
      )} */}
    </Wrapper>
  );
};

export default MyMeetList;

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  border: 2px solid #ddd;
  box-sizing: border-box;
  margin-bottom: 10px;
  position: relative;
  background-color: #fff;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Participate = styled.div`
  font-weight: bold;
  & > div {
    margin-bottom: 8px;
  }

  & span {
    color: ${theme.PrimaryColor};
    margin-left: 4px;
  }
`;

const Profile = styled.img`
  width: 50px;
  margin-right: 4px;

  &:last-child {
    margin-right: 0;
  }

  @media screen and (max-width: 600px) {
    width: 40px;
  }
`;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled(Link)`
  color: #575757;
  border: 1px solid #c9c9c9;
  border-radius: 3px;
  width: ${(props: { width: string }) => props.width};
  display: block;
  height: 35px;
  margin-top: 10px;
  text-align: center;
  line-height: 35px;
`;

/*  */

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Tags = styled.div`
  justify-content: start;
`;

const Content = styled.div`
  background-color: #fbfbfb;
  border: 2px solid #ebebeb;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 18px;
  margin: 16px 0;
  line-height: 1.5;
  color: ${theme.TextSubColor};

  @media screen and (max-width: 600px) {
    line-height: 1.5;
    font-size: 16px;
    padding: 10px;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 16px 0;
  font-size: 18px;
  font-weight: 500;
  color: #000000;

  @media screen and (max-width: 600px) {
    display: block;
  }
`;

const Title = styled.div`
  position: relative;

  &::after {
    content: "";
    display: ${(props: { crown: boolean }) =>
      props.crown ? "inline-block" : "none"};
    clear: both;
    position: relative;
    width: 20px;
    height: 20px;
    background: url(${crown}) no-repeat center center / contain;
    margin-left: 4px;
    top: 3px;
  }

  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

const Progress = styled.span`
  color: ${(props: { Isprogress: boolean }) =>
    props.Isprogress ? theme.PrimaryColor : "#C1C1C1"};
  margin-right: 8px;

  @media screen and (max-width: 600px) {
    display: block;
    font-size: 14px;
  }
`;

const Member = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  & img {
    margin-right: 8px;
  }
`;

const ViewJoinMembers = styled.button`
  width: 80px;
  height: 40px;
  background-color: #fff;
  border: 1px solid gray;
  border-radius: 4px;
  color: gray;
`;

const Members = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;

  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

const MemberLength = styled.span`
  color: ${theme.PrimaryColor};
  padding-left: 12px;
`;
