import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
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
  const isParticipants = data.members.includes(userStore.getNickname);

  const editMeet = (data: any) => {
    navigate(`/meeting/edit`, {
      state: data,
    });
  };

  const management = (id: Number) => {
    navigate(`/mypage/participants/${id}`);
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
  return (
    <Wrapper>
      <Options>
        <Tags>
          {data.status === "모집중" && (
            <Tag color={theme.PrimaryColor} text="D-3" />
          )}
          <Tag text={data.category} />
        </Tags>
      </Options>
      <Top>
        <Progress Isprogress={data.status === "모집중"}>
          {data.status === "모집중" ? "모집중" : "모집완료"}
        </Progress>
        <Title crown={user.memberId === data.memberId}>{data.title}</Title>
      </Top>
      <Content>{data.content}</Content>
      <Participate>
        <div>
          참여중인 친구 <span>{data.members.length}/5</span>
        </div>
        <Profile src={user_profile} alt="참여자 프로필" />
        <Profile src={user_profile} alt="참여자 프로필" />
        <Profile src={user_profile} alt="참여자 프로필" />
      </Participate>
      {/* 모임 개설자일 때 */}
      {user.memberId === data.memberId && (
        <SpaceBetween>
          <Button width="calc(50% - 5px)" onClick={() => editMeet(data)}>
            수정하기
          </Button>
          <Button width="calc(50% - 5px)" onClick={() => management(1)}>
            참여자 관리
          </Button>
        </SpaceBetween>
      )}
      {/* 일반 모임 참여자일 때 */}
      {user.memberId !== data.memberId && isParticipants && (
        <SpaceBetween>
          <Button width="calc(50% - 5px)" onClick={() => goMeetInfo(1)}>
            모임으로 이동
          </Button>
          <Button width="calc(50% - 5px)" onClick={() => leaveMeet(1)}>
            탈퇴하기
          </Button>
        </SpaceBetween>
      )}
      {/* 모임 참여신청자일 때 (승인 전) */}
      {user.memberId !== data.memberId && !isParticipants && (
        <Button width="100%" onClick={() => cancleParticipation(1)}>
          참여 취소
        </Button>
      )}
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

const Button = styled.button`
  color: #575757;
  border: 1px solid #c9c9c9;
  border-radius: 3px;
  width: ${(props: { width: string }) => props.width};
  display: block;
  height: 35px;
  margin-top: 10px;
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
