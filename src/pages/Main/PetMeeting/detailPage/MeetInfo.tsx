import React, { useEffect, useState, useContext } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router";
import { useStores } from "../../../../hooks/useStores";
import { UserContext } from "../../../../contexts/UserContext";
import withMain from "../../../../hocs/ui/withMain";
import styled from "styled-components";
import { timeBefore } from "../../../../lib/timeBefore";
import * as theme from "../../../../styles/theme";
import user_profile from "../../../../assets/images/user_profile.png";
import DefaultImg from "../../../../components/common/DefaultImg";
import Tag from "../../../../components/common/Tag";
import BookmarkButton from "../../../../components/common/BookmarkButton";
import MeetCondition from "../../../../components/common/MeetCondition";

const MeetInfo = observer(({ data }: any) => {
  const navigate = useNavigate();
  const { userStore } = useStores();
  const { user } = useContext(UserContext);
  const [isBookmark, setIsBookmark] = useState(false);
  const [status, setStatus] = useState(false);
  const [category, setCategory] = useState("");

  const getDateDiff = (d1: string, d2: string) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    const diffDate = date1.getTime() - date2.getTime();

    return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
  };

  let meetingOpenDueDate = getDateDiff(new Date().toString(), data.period)
    .toString()
    .split(".");

  useEffect(() => {
    console.log("MeetInfo data = ", data);
  }, [data]);

  const editMeet = () => {
    navigate(`/meeting/edit`, {
      state: { data },
    });
  };

  useEffect(() => {
    console.log(data.category);

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
    <Meeting>
      <Options>
        <Tags>
          {data.isOpened === true && (
            <Tag
              color={theme.PrimaryColor}
              text={
                data.meetingType === "REGULAR"
                  ? "상시"
                  : `D-${meetingOpenDueDate[0]}`
              }
            />
          )}
          <Tag text={category} />
        </Tags>
        <BookmarkButton isBookmark={data.isBookmarked} />
      </Options>
      <Creator>
        <CreatorThumbnail src={user_profile} />
        <div>
          <Nickname>{userStore.getName}</Nickname>
          <div>
            <Place>
              {data.doName} {data.doName !== "전체" && data.sigungu}
            </Place>
            <CreateTime>{timeBefore(data.createDate)}</CreateTime>
          </div>
        </div>
      </Creator>
      <MeetCondition
        status={data.isOpened}
        meetTitle={data.title}
        conditions={data.conditions}
        date={data.period}
        personnel={data.joinPeople}
        memberId={data.memberId}
      />
      {data.imgUrlList?.length > 0 && (
        <MeetThumbnail src={data.imgUrlList} alt="활동소개사진" />
      )}
      <Content>{data.content}</Content>
      <Line />
      <Member>
        <Members>
          참여중인 친구
          <MemberLength>
            {data.joinMembers?.length}
            {data.maxPeople === 999999 ? "명" : `/${data.maxPeople}`}
          </MemberLength>
        </Members>
        <div>
          <MemberThumbnail src={user_profile} />
          <MemberThumbnail src={user_profile} />
        </div>
      </Member>
      {data.memberId === userStore.getMemberId ? (
        <ButtonWrap>
          <SubmitBtn onClick={() => editMeet()}>모임 수정</SubmitBtn>
        </ButtonWrap>
      ) : (
        <>
          {data.isJoined === false && data.isOpened === true && (
            <ButtonWrap>
              <SubmitBtn>참여 신청</SubmitBtn>
            </ButtonWrap>
          )}
          {data.isJoined === true && (
            <ButtonWrap>
              <SubmitBtn dark>모임탈퇴</SubmitBtn>
            </ButtonWrap>
          )}
          {data.isOpened === false && <div>현재 모집완료된 모임입니다</div>}
        </>
      )}
    </Meeting>
  );
});

export default MeetInfo;

const Meeting = styled.div`
  padding: 20px;
  background-color: #fff;
  box-sizing: border=box;
  margin-bottom: 20px;
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

const Creator = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 20px 0;
  border-bottom: 2px solid ${theme.SecondaryColor};
  box-sizing: border-box;
`;

const MeetThumbnail = styled.img`
  width: 100%;
  height: auto;
  display: block;
  margin: 20px 0;
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
  word-break: break-word;
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

const Member = styled.div`
  & img {
    margin-right: 8px;
  }
`;

const MemberThumbnail = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
  overflow: hidden;
`;

const Line = styled.div`
  background-color: #cfcfcf;
  height: 1px;
  margin: 20px 0;
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

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

interface IBtn {
  dark?: boolean;
}

const SubmitBtn = styled.button<IBtn>`
  background-color: ${({ dark }: any) =>
    dark ? theme.TextSubColor : theme.PrimaryColor};
  color: #fff;
  border-radius: 5px;
  font-size: 26px;
  font-family: ${theme.jalnan};
  display: block;
  width: 100%;
  padding: 8px;

  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
`;
