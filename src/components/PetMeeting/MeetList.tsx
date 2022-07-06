import { useNavigate } from "react-router";
import styled from "styled-components";
import * as theme from "../../styles/theme";
import Tag from "../../components/common/Tag";
import BookmarkButton from "../../components/common/BookmarkButton";
import MeetCondition from "../../components/common/MeetCondition";
import { timeBefore } from "../../lib/timeBefore";

interface IMeetType {
  data: any;
}
const MeetList = ({ data }: IMeetType) => {
  const navigate = useNavigate();
  const moveDetailPage = (id: number) => {
    navigate(`/meeting/detail?id=${id}`, { state: data });
  };

  const getDateDiff = (d1: string, d2: string) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    const diffDate = date1.getTime() - date2.getTime();

    return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
  };

  let meetingOpenDueDate = getDateDiff(new Date().toString(), data.period)
    .toString()
    .split(".");

  return (
    <Meeting onClick={() => moveDetailPage(data.meetingId)}>
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
          <Tag text={data.category} />
        </Tags>
        <BookmarkButton isBookmark={data.isBookmarked} />
      </Options>
      <MeetCondition
        status={data.isOpened}
        meetTitle={data.title}
        conditions={data.conditions}
        date={data.period}
        personnel={data.joinPeople}
        memberId={data.memberId}
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
    </Meeting>
  );
};

export default MeetList;

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
