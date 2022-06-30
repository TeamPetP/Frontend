import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import { MyMeeting } from "../../services/authApi";
import withMain from "../../hocs/ui/withMain";
import { observer } from "mobx-react";
import * as theme from "../../styles/theme";
import PageTitle from "../../components/common/PageTitle";
import MyMeetList from "./myMeet/MyMeetList";
import nullIcon from "../../assets/images/null.png";

const MyMeetPage = observer(() => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState<any>([]);
  const [selectedTabs, setSelectedTabs] = useState("participating");

  useEffect(() => {
    async function fetchData() {
      const d: any = await MyMeeting(user, 0, 20);
      console.log("내 모임 정보", d);
      setData(d.data.content);
    }
    fetchData();
  }, [user]);

  // 클릭한 탭 구별
  function setClickedTabs(e: any) {
    const role = e.target.dataset.role;
    setSelectedTabs(role);
  }

  return (
    <Wrapper>
      <PageTitle title="내모임" />
      <TabsWrap>
        <Tab
          onClick={setClickedTabs}
          data-role="participating"
          page="participating"
          selectedTabs={selectedTabs}
        >
          참여중
        </Tab>
        <Tab
          onClick={setClickedTabs}
          data-role="Applying"
          page="Applying"
          selectedTabs={selectedTabs}
        >
          신청중
        </Tab>
      </TabsWrap>

      {selectedTabs === "participating" && (
        <ContentArea>
          {data != null &&
            data.map((data: any) => {
              return <MyMeetList data={data} key={data.gatheringId} />;
            })}
          {data == null || data.length === 0 ? (
            <NullWrapper>
              <img src={nullIcon} />
              <div>참여중인 모임이 없습니다.</div>
            </NullWrapper>
          ) : (
            <></>
          )}
        </ContentArea>
      )}
      {selectedTabs === "Applying" && (
        <ContentArea>
          {data != null &&
            data.map((data: any) => {
              return <MyMeetList data={data} key={data.gatheringId} />;
            })}
          {data == null || data.length === 0 ? (
            <NullWrapper>
              <img src={nullIcon} />
              <div>신청중인 모임이 없습니다.</div>
            </NullWrapper>
          ) : (
            <></>
          )}
        </ContentArea>
      )}
    </Wrapper>
  );
});

export default withMain(MyMeetPage, "마이페이지");

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentArea = styled.div`
  padding: 10px 40px;

  @media screen and (max-width: 600px) {
    padding: 10px;
  }
`;

const TabsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Tab = styled.div`
  width: 50%;
  padding: 20px;
  font-size: 20px;
  text-align: center;
  line-height: 24px;
  cursor: pointer;
  transition: all 200ms ease;
  border-bottom: ${(props: { selectedTabs: string; page: string }) =>
    props.selectedTabs === props.page
      ? `2px solid ${theme.PrimaryColor}`
      : "2px solid #EBEBEB"};
  color: ${(props: { selectedTabs: string; page: string }) =>
    props.selectedTabs === props.page ? `${theme.PrimaryColor}` : "#000"};
  font-weight: ${(props: { selectedTabs: string; page: string }) =>
    props.selectedTabs === props.page ? 600 : 500};

  &:hover {
    color: ${theme.PrimaryColor};
  }

  @media screen and (max-width: 600px) {
    padding: 14px;
    font-size: 16px;
  }
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
