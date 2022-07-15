import React, { useState, useCallback, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import withMain from "../../hocs/ui/withMain";
import * as theme from "../../styles/theme";
import { UserContext } from "../../contexts/UserContext";
import PageTitle from "../../components/common/PageTitle";
import Tag from "../../components/common/Tag";
import user_profile from "../../assets/images/user_profile.png";
import checkmark_full from "../../assets/images/checkmark_full.png";
import checkmark_outline from "../../assets/images/checkmark_outline.png";
import {
  MyMeetWaitPartiList,
  AcceptJoinMeet,
  RefuseJoinMeet,
} from "../../services/authApi";
import { SearchMeet } from "../../services/MeetingApi";
import { useStores } from "../../hooks/useStores";
import nullIcon from "../../assets/images/null.png";

const ParticipantsManagePage = () => {
  const { userStore } = useStores();
  const { user } = useContext(UserContext);
  const [isSelect, setIsSelect] = useState(false);
  type checkList = { id: string; nickname: string };
  const [checkedInputs, setCheckedInputs] = useState([] as any);
  const { meetingId } = useParams();
  const [meetData, setMeetData] = useState<any>([]);
  const [waitData, setWaitData] = useState([]);
  const [category, setCategory] = useState("");

  const getDateDiff = (d1: string, d2: string) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    const diffDate = date1.getTime() - date2.getTime();

    return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
  };

  let meetingOpenDueDate = getDateDiff(new Date().toString(), meetData.period)
    .toString()
    .split(".");

  async function fetchData() {
    const d: any = await SearchMeet(user, Number(meetingId));
    setMeetData(d.data);
  }
  async function fetchPartiListData() {
    const d: any = await MyMeetWaitPartiList(user, Number(meetingId));
    setWaitData(d.data);
  }

  useEffect(() => {
    fetchData();
    fetchPartiListData();
  }, [user]);

  useEffect(() => {
    switch (meetData.category) {
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
  }, [meetData.category]);

  // 참여 중인 친구 개별 선택
  const changeHandler = useCallback(
    (checked: boolean, id: string) => {
      if (checked) {
        setCheckedInputs([...checkedInputs, id]);
      } else {
        // 체크 해제
        setCheckedInputs(checkedInputs.filter((el: any) => el !== id));
      }
    },
    [checkedInputs]
  );

  // 가입 승인
  const acceptParticipation = (memberId: Number) => {
    async function fetchAccept() {
      const dd: any = await AcceptJoinMeet(
        user,
        Number(meetingId),
        Number(memberId)
      );
    }
    fetchAccept();
  };

  // 가입 거절
  const refuseParticipation = (memberId: Number) => {
    async function fetchRefuse() {
      const dd: any = await RefuseJoinMeet(
        user,
        Number(meetingId),
        Number(memberId)
      );
    }
    fetchRefuse();
  };

  // 추방
  const exileParticipation = (memberId: Number) => {
    console.log(`추방`);
    fetchData();
    fetchPartiListData();
  };

  const exileselectMember = (list: any) => {
    console.log(`선택한 친구의 id : ${list}`);
  };

  return (
    <>
      <PageTitle title="참여자 관리" />
      <Wrapper>
        <Content>
          <Options>
            <Tags>
              <Tag
                color={theme.PrimaryColor}
                text={
                  meetData.meetingType === "REGULAR"
                    ? "상시"
                    : `D-${meetingOpenDueDate[0]}`
                }
              />
              <Tag text={category} />
            </Tags>
          </Options>
          <Top>
            <Progress Isprogress={meetData.isOpened}>
              {meetData.isOpened ? "모집중" : "모집완료"}
            </Progress>
            <Title>{meetData.title}</Title>
          </Top>
        </Content>
        {/* 참여 요청 중인 친구 */}
        <Participate>
          <SubTitle>
            <div>
              참여 요청 중인 친구
              <span className="Primary">{waitData?.length}</span>
            </div>
          </SubTitle>
          {waitData.map((data: any) => (
            <List key={data.memberId}>
              <FlexStart>
                <Profile src={data.memberImgUrl} alt="참여자 프로필" />
                <div>{data.nickname}</div>
              </FlexStart>
              <SpaceBetween width="210px">
                <Button
                  width="100px"
                  onClick={() => acceptParticipation(data.memberId)}
                >
                  수락
                </Button>
                <Button
                  width="100px"
                  onClick={() => refuseParticipation(data.memberId)}
                >
                  거절
                </Button>
              </SpaceBetween>
            </List>
          ))}
        </Participate>
        {/* 참여중인 친구 */}
        <Participate>
          <SubTitle>
            <div>
              참여 중인 친구
              <span>
                방장 포함
                <span className="Primary">{meetData.joinPeople}</span>
                {meetData.maxPeople === 999999
                  ? "명"
                  : `/${meetData.maxPeople}명`}
              </span>
            </div>
          </SubTitle>
          {meetData.joinPeople === 1 ? (
            <NullWrapper>
              <img src={nullIcon} />
              <div>참여중인 친구가 없습니다.</div>
            </NullWrapper>
          ) : (
            <>
              {meetData.joinMembers
                ?.filter((data: any) => data.memberId !== userStore.getMemberId)
                .map((data: any) => (
                  <div key={data.memberId}>
                    <Checkbox
                      type="checkbox"
                      id={data.memberId}
                      name={data.nickname}
                      checked={checkedInputs.includes(data.id) ? true : false}
                      onChange={(e) => {
                        changeHandler(e.currentTarget.checked, data.id);
                      }}
                    />
                    <ParticipantsList
                      htmlFor={data.memberId}
                      checked={
                        checkedInputs.includes(data.memberId) ? true : false
                      }
                    >
                      <FlexStart>
                        <Profile src={data.memberImgUrl} alt="참여자 프로필" />
                        <div>{data.nickname}</div>
                      </FlexStart>
                      <SpaceBetween width="100px">
                        <Button
                          width="100px"
                          onClick={() => exileParticipation(data.memberId)}
                        >
                          추방
                        </Button>
                      </SpaceBetween>
                    </ParticipantsList>
                  </div>
                ))}
            </>
          )}
          <SpaceBetween width="100%">
            <ExileBtn onClick={() => exileselectMember(checkedInputs)}>
              선택 목록 추방
            </ExileBtn>
          </SpaceBetween>
        </Participate>
      </Wrapper>
    </>
  );
};

export default withMain(ParticipantsManagePage, "마이페이지");

const Wrapper = styled.div`
  position: relative;
  background-color: #fff;
`;

const Content = styled.div`
  background-color: #fbfbfb;
  border: 2px solid #ebebeb;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 18px;
  margin: 20px 20px 0 20px;
  line-height: 1.5;
  color: ${theme.TextSubColor};
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Tags = styled.div`
  justify-content: start;
`;

const Top = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 16px;
  font-size: 18px;
  font-weight: 500;
  color: #000000;

  @media screen and (max-width: 600px) {
    display: block;
  }
`;

const Title = styled.div`
  position: relative;

  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

const Progress = styled.span`
  color: ${(props: { Isprogress: boolean }) =>
    props.Isprogress ? theme.PrimaryColor : "#C1C1C1"};
  margin-right: 8px;

  @media screen and (max-width: 600px) {
    font-size: 14px;
    display: block;
  }
`;

const Participate = styled.div`
  font-weight: bold;
  margin-top: 16px;

  & span.Primary {
    color: ${theme.PrimaryColor};
    font-weight: bold;
  }

  & span {
    color: ${theme.TextSubColor};
    margin-left: 4px;
    font-weight: 400;
  }
`;

const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 20px;
`;

const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 28px;
  cursor: pointer;
`;

const ParticipantsList = styled.label<{ checked: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 28px;
  cursor: pointer;
  background-color: ${(props) => (props.checked ? "#F9F9F9" : "#fff")};
`;

const Checkbox = styled.input`
  display: none;
`;

const Allchecked = styled.label`
  cursor: pointer;
  width: 120px;
  padding-left: 28px;
  background: url(${(props: { checked: boolean }) =>
      props.checked ? checkmark_full : checkmark_outline})
    no-repeat left center / 20px;
`;

const Profile = styled.img`
  width: 40px;
  margin-right: 14px;
  border-radius: 50%;

  &:last-child {
    margin-right: 0;
  }
`;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${(props: { width: string }) => props.width};
`;

const FlexStart = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Button = styled.button`
  color: #575757;
  border: 1px solid #c9c9c9;
  border-radius: 3px;
  width: ${(props: { width: string }) => props.width};
  display: block;
  height: 35px;
`;

const ExileBtn = styled.button`
  width: 100%;
  background-color: #000;
  color: #fff;
  height: 50px;
  font-size: 18px;
  font-family: "yg-jalnan";
  border-radius: 5px;
  margin: 20px;
`;

const NullWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: calc(100% - 180px);
  margin: 20px 0px;
  & > div {
    margin-top: 20px;
    margin-bottom: 40px;
    font-family: "yg-jalnan";

    font-size: 28px;
  }
  & > img {
    width: 100%;
  }
`;
