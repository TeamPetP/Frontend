import React, { useState, useCallback } from "react";
import styled from "styled-components";
import withMain from "../../hocs/ui/withMain";
import * as theme from "../../styles/theme";
import PageTitle from "../../components/common/PageTitle";
import Tag from "../../components/common/Tag";
import user_profile from "../../assets/images/user_profile.png";
import checkmark_full from "../../assets/images/checkmark_full.png";
import checkmark_outline from "../../assets/images/checkmark_outline.png";

const ParticipantsManagePage = () => {
  const [isSelect, setIsSelect] = useState(false);
  type checkList = { id: string; nickname: string };
  const [checkedInputs, setCheckedInputs] = useState([] as any);

  const data = [
    { id: "1", nickname: "user1" },
    { id: "2", nickname: "user2" },
    { id: "3", nickname: "user3" },
  ];

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

  const acceptParticipation = (id: Number) => {
    console.log(`참여수락`);
  };

  const refuseParticipation = (id: Number) => {
    console.log(`참여거절`);
  };

  const exileParticipation = (id: Number) => {
    console.log(`추방`);
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
              <Tag color={theme.PrimaryColor} text="D-3" />
              <Tag text="공예/만들기" />
            </Tags>
          </Options>
          <Top>
            <Progress Isprogress={true}>모집중</Progress>
            <Title>
              수제간식 원데이클래스 같이 하실 분!제간식 원데이클래스 같이 하실
              분!
            </Title>
          </Top>
        </Content>
        {/* 참여 요청 중인 친구 */}
        <Participate>
          <SubTitle>
            <div>
              참여 요청 중인 친구 <span className="Primary">1</span>
            </div>
          </SubTitle>
          <List>
            <FlexStart>
              <Profile src={user_profile} alt="참여자 프로필" />
              <div>User-1</div>
            </FlexStart>
            <SpaceBetween width="210px">
              <Button width="100px" onClick={() => acceptParticipation(1)}>
                수락
              </Button>
              <Button width="100px" onClick={() => refuseParticipation(1)}>
                거절
              </Button>
            </SpaceBetween>
          </List>
        </Participate>
        {/* 참여중인 친구 */}
        <Participate>
          <SubTitle>
            <div>
              참여 중인 친구
              <span>
                <span className="Primary">1</span>/4
              </span>
            </div>
          </SubTitle>
          {data.map((data) => (
            <div key={data.id}>
              <Checkbox
                type="checkbox"
                id={data.id}
                name={data.nickname}
                checked={checkedInputs.includes(data.id) ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, data.id);
                }}
              />
              <ParticipantsList
                htmlFor={data.id}
                checked={checkedInputs.includes(data.id) ? true : false}
              >
                <FlexStart>
                  <Profile src={user_profile} alt="참여자 프로필" />
                  <div>{data.nickname}</div>
                </FlexStart>
                <SpaceBetween width="100px">
                  <Button width="100px" onClick={() => exileParticipation(1)}>
                    추방
                  </Button>
                </SpaceBetween>
              </ParticipantsList>
            </div>
          ))}
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
