import { useStores } from "../../hooks/useStores";
import styled from "styled-components";
import * as theme from "../../styles/theme";
import condition1 from "../../assets/images/condition1.png";
import condition2 from "../../assets/images/condition2.png";
import condition3 from "../../assets/images/condition3.png";

interface IConditionType {
  status: boolean;
  meetTitle: string;
  conditions?: string;
  date?: string;
  personnel?: number;
  memberId?: number;
  sex: string;
}
const MeetCondition = ({
  status,
  meetTitle,
  conditions,
  date,
  personnel,
  memberId,
  sex,
}: IConditionType) => {
  const { userStore } = useStores();

  return (
    <>
      <Top>
        <Title>
          <Progress Isprogress={status}>
            {status ? "모집중" : "모집완료"}
          </Progress>
          <div>{meetTitle}</div>
        </Title>
      </Top>
      <div>
        <List>
          <img src={condition1} alt="조건" />
          {conditions}
        </List>
        <List>
          <img src={condition2} alt="시간 및 장소" />
          {date}
        </List>
        <List>
          <img src={condition1} alt="성별" />
          {sex === "FEMALE" && "여성만 참여"}
          {sex === "MALE" && "남성만 참여"}
          {sex === "ALL" && "성별에 관계없이 누구나"}
        </List>
        <List>
          <img src={condition3} alt="현재 참여인원" />
          {personnel}명 참여중
        </List>
      </div>
    </>
  );
};

export default MeetCondition;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;

  @media screen and (max-width: 600px) {
    align-items: baseline;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  color: #000000;

  @media screen and (max-width: 600px) {
    display: block;
    font-size: 16px;
    align-items: flex-start;
  }
`;

const Progress = styled.span`
  color: ${(props: { Isprogress: boolean }) =>
    props.Isprogress ? theme.PrimaryColor : "#C1C1C1"};
  margin-right: 8px;

  @media screen and (max-width: 600px) {
    min-width: 70px;
  }
`;

const Button = styled.button`
  color: ${theme.TextSubColor};
  background-color: transparent;
  padding: 4px;
  transition: ${theme.Transition};

  &:hover {
    color: ${theme.TextHoverColor};
  }
`;

const List = styled.div`
  font-size: 16px;
  color: #000;
  line-height: 2;
  display: flex;
  align-items: center;

  & img {
    margin-right: 8px;
    width: 20px;
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;
