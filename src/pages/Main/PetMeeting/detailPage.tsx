import { useEffect, useState, useContext } from "react";
import { observer } from "mobx-react";
import { useLocation } from "react-router";
import { UserContext } from "../../../contexts/UserContext";
import { SearchMeet, GetBoardList } from "../../../services/MeetingApi";
import withMain from "../../../hocs/ui/withMain";
import styled from "styled-components";
import * as theme from "../../../styles/theme";
import MeetInfo from "./detailPage/MeetInfo";
import Board from "./detailPage/Board";
import Gallery from "./detailPage/Gallery";

const DetailPage = observer(() => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const meetingId = Number(params.get("id"));
  const [meetData, setMeetData] = useState<any>([]);
  const [boardData, setBoardData] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const { user } = useContext(UserContext);

  async function fetchData() {
    const d: any = await SearchMeet(user, meetingId);
    console.log("ddata", d);

    setMeetData(d.data);
  }

  useEffect(() => {
    async function fetchData() {
      const dd: any = await GetBoardList(user, meetingId, pageNumber, 20);

      setBoardData(dd.data.content);
    }
    fetchData();
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [user]);

  const [selectedTabs, setSelectedTabs] = useState("info");
  // 클릭한 탭 구별
  function setClickedTabs(e: any) {
    const role = e.target.dataset.role;
    setSelectedTabs(role);
  }
  return (
    <>
      {meetData.isJoined ? (
        <>
          <TabsWrap>
            <Tab
              onClick={setClickedTabs}
              data-role="info"
              page="info"
              selectedTabs={selectedTabs}
            >
              모임정보
            </Tab>
            <Tab
              onClick={setClickedTabs}
              data-role="board"
              page="board"
              selectedTabs={selectedTabs}
            >
              게시판
            </Tab>
            <Tab
              onClick={setClickedTabs}
              data-role="gallery"
              page="gallery"
              selectedTabs={selectedTabs}
            >
              사진첩
            </Tab>
          </TabsWrap>
          <div>
            {selectedTabs === "info" && (
              <MeetInfo data={meetData} fetchData={fetchData} />
            )}
            {selectedTabs === "board" && (
              <Board meetingId={meetingId} boardData={boardData} />
            )}
            {selectedTabs === "gallery" && <Gallery meetingId={meetingId} />}
          </div>
        </>
      ) : (
        <MeetInfo data={meetData} fetchData={fetchData} />
      )}
    </>
  );
});

export default withMain(DetailPage, "펫미팅");

const TabsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Tab = styled.div`
  width: 33.3%;
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

const MeetCategory = styled.div`
  position: relative;
`;
