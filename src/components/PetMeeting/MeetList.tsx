import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import * as theme from "../../styles/theme";
import Tag from "../../components/common/Tag";
import BookmarkButton from "../../components/common/BookmarkButton";
import MeetCondition from "../../components/common/MeetCondition";
import { timeBefore } from "../../lib/timeBefore";
import { UserContext } from "../../contexts/UserContext";
import { AddBookmark, CancleBookmark } from "../../services/MeetingApi";

interface IMeetType {
  data: any;
  fetchData: any;
}
const MeetList = ({ data, fetchData }: IMeetType) => {
  const navigate = useNavigate();
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

  // 상세페이지 이동
  const moveDetailPage = (id: number) => {
    navigate(`/meeting/detail?id=${id}`, { state: data });
  };

  // 북마크
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
      <div onClick={() => moveDetailPage(data.meetingId)}>
        <MeetCondition
          status={data.isOpened}
          meetTitle={data.title}
          conditions={data.conditions}
          date={data.period}
          personnel={data.joinPeople}
          memberId={data.memberId}
          sex={data.sex}
        />
        <Content>{data.content}</Content>
        <Bottom>
          <div>
            <Nickname>{data.nickname}</Nickname>
            <Place>
              {data.doName} {data.doName !== "전체" && data.sigungu}
            </Place>
          </div>
          <CreateTime>{timeBefore(data.createDate)}</CreateTime>
        </Bottom>
      </div>
    </Meeting>
  );
};

export default MeetList;

const Meeting = styled.div`
  padding: 20px;
  background-color: #fff;
  border: 1px solid ${theme.PrimaryColor};
  box-sizing: border=box;
  cursor: pointer;
  transition: ${theme.Transition};
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
