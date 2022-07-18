import React, { useEffect, useState, useContext } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router";
import { useStores } from "../../../../hooks/useStores";
import { UserContext } from "../../../../contexts/UserContext";
import {
  JoinMeet,
  ResignMeet,
  CancleJoinMeet,
  AddBookmark,
  CancleBookmark,
} from "../../../../services/MeetingApi";
import styled from "styled-components";
import axios from "axios";
import { timeBefore } from "../../../../lib/timeBefore";
import * as theme from "../../../../styles/theme";
import user_profile from "../../../../assets/images/user_profile.png";
import Tag from "../../../../components/common/Tag";
import BookmarkButton from "../../../../components/common/BookmarkButton";
import MeetCondition from "../../../../components/common/MeetCondition";

const MeetInfo = observer(({ data, fetchData }: any) => {
  const navigate = useNavigate();
  const { modalStore, userStore } = useStores();
  const { user } = useContext(UserContext);
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

  const editMeet = () => {
    navigate(`/meeting/edit`, {
      state: { data },
    });
  };

  // 모임 참여
  const JoinMeeting = () => {
    async function fetchJoin() {
      const dd: any = await JoinMeet(user, data.meetingId);
      console.log("dd", dd);
      if (dd.status === 204) fetchData();
    }
    fetchJoin();
  };

  // 모임 참여 신청 취소
  const CancleJoinMeeting = () => {
    async function fetchCancleJoin() {
      const dd: any = await CancleJoinMeet(user, data.meetingId);
      console.log("dd", dd);
      if (dd.status === 204) fetchData();
    }
    fetchCancleJoin();
  };

  // 모임 탈퇴
  const ResignMeeting = () => {
    async function fetchResign() {
      const dd: any = await ResignMeet(user, data.meetingId);
      console.log("Resign, ", dd);
      if (dd.status === 204) fetchData();
    }
    fetchResign();
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

  const ChangeBookmarkState = () => {
    async function fetchBookmark() {
      const dd: any = await AddBookmark(user, data.meetingId);
      if (dd.status === 204) fetchData();
    }
    async function fetchBookmarkCancle() {
      const dd: any = await CancleBookmark(user, data.meetingId);
      if (dd.status === 204) fetchData();
    }

    if (data.isBookmarked === true) {
      fetchBookmarkCancle();
    } else {
      fetchBookmark();
    }
  };
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
        <BookmarkButton
          isBookmark={data.isBookmarked}
          onClick={ChangeBookmarkState}
        />
      </Options>
      <Creator>
        <CreatorThumbnail src={data.memberImgUrl} />
        <div>
          <Nickname>{data.nickname}</Nickname>
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
        sex={data.sex}
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
            {data.maxPeople === 999999 ? "명" : `/${data.maxPeople}명`}
          </MemberLength>
        </Members>
        <ViewJoinMembers onClick={() => ViewMembers()}>
          목록보기
        </ViewJoinMembers>
      </Member>
      {data.memberId === userStore.getMemberId ? (
        <ButtonWrap>
          <SubmitBtn onClick={() => editMeet()}>모임 수정</SubmitBtn>
        </ButtonWrap>
      ) : (
        <>
          {data.isJoined === false &&
            data.isOpened === true &&
            data.joinStatus !== "승인됨" &&
            data.joinStatus !== "대기중" && (
              <ButtonWrap>
                <SubmitBtn onClick={JoinMeeting}>참여 신청</SubmitBtn>
              </ButtonWrap>
            )}

          {data.isJoined === true && data.joinStatus === "승인됨" && (
            <ButtonWrap>
              <SubmitBtn onClick={ResignMeeting} dark>
                모임탈퇴
              </SubmitBtn>
            </ButtonWrap>
          )}
          {data.isJoined === false && data.joinStatus === "대기중" && (
            <ButtonWrap>
              <SubmitBtn onClick={CancleJoinMeeting}>참여 신청 취소</SubmitBtn>
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
