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
  const cancleParticipation = () => {
    console.log(`참여취소`);
  };

  const data = [
    { id: "1", nickname: "user1" },
    { id: "2", nickname: "user2" },
    { id: "3", nickname: "user3" },
  ];

  // 전체 checked
  const onCheckedAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        const seq: string[] = [];
        data.forEach((v) => seq.push(v.id));
        setCheckedInputs(seq);
      } else {
        setCheckedInputs([]);
      }
    },
    [data]
  );

  // 개별 check
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
            <Title>수제간식 원데이클래스 같이 하실 분!</Title>
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
              <Button width="100px" onClick={() => cancleParticipation()}>
                수락
              </Button>
              <Button width="100px" onClick={() => cancleParticipation()}>
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
            <div>
              <Checkbox
                type="checkbox"
                id="allcheck"
                onChange={(e) => onCheckedAll(e.target.checked)}
              />
              <Allchecked
                htmlFor="allcheck"
                checked={
                  checkedInputs.length === 0
                    ? false
                    : checkedInputs.length === data.length
                    ? true
                    : false
                }
              >
                전체선택
              </Allchecked>
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
                  <Button width="100px" onClick={() => cancleParticipation()}>
                    추방
                  </Button>
                </SpaceBetween>
              </ParticipantsList>
            </div>
          ))}
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
`;

const Title = styled.div`
  position: relative;
`;

const Progress = styled.span`
  color: ${(props: { Isprogress: boolean }) =>
    props.Isprogress ? theme.PrimaryColor : "#C1C1C1"};
  margin-right: 8px;
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
