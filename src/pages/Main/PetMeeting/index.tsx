import { useEffect, useState, useContext } from "react";
import MeetList from "../../../components/PetMeeting/MeetList";
import styled from "styled-components";
import { observer } from "mobx-react";
import withMain from "../../../hocs/ui/withMain";
import pencil from "../../../assets/images/pencil.png";
import nullIcon from "../../../assets/images/null.png";
import { useNavigate } from "react-router";
import { UserContext } from "../../../contexts/UserContext";
import { SearchMeetList } from "../../../services/MeetingApi";
import Submit from "../../../components/common/Submit";
import sido from "../../../components/common/AddressData";

const IndexPage = observer(() => {
  const navigate = useNavigate();
  const [meetData, setMeetData] = useState<any>([]);
  const [dosi, setDosi] = useState<string>("전체");
  const [isOpened, setIsOpened] = useState<string>("true");
  const [content, setContent] = useState<string>(""); // 키워드 선택 시 입력값
  const [meetingHost, setMeetingHost] = useState<string>(""); // 모임장명 선택 시 입력값
  const [searchfilter, setSearchFilter] = useState<string>("keyword"); // 선택한 검색 조건
  const { user } = useContext(UserContext);
  const [pageNumber, setPageNumber] = useState<number>(0);

  useEffect(() => {
    console.log(user);
    async function fetchData() {
      let paramsString = `dosi=${dosi}&isOpened=${isOpened}`;
      const d: any = await SearchMeetList(user, pageNumber, 20, paramsString);
      setMeetData(d.data);
    }
    fetchData();
  }, [user]);

  async function PostSearch(e: any) {
    e.preventDefault();

    let paramsString = `dosi=${dosi}&isOpened=${isOpened}&content=${content}&meetingHost=${meetingHost}`;

    // 필요없는 조회조건 제거
    if (content == "" || content === null) {
      paramsString = paramsString.replace(/&content=/g, "").trim();
    }
    if (meetingHost == "" || meetingHost === null) {
      paramsString = paramsString.replace(/&meetingHost=/g, "").trim();
    }
    const d: any = await SearchMeetList(user, pageNumber, 20, paramsString);
    setMeetData(d.data);
  }

  const meetState = [
    { name: "모집중", value: "true" },
    { name: "모집완료", value: "false" },
  ];

  const filter = [
    { name: "키워드", value: "keyword" },
    { name: "모임장명", value: "creator" },
  ];

  const ChangeSido = (value: string) => {
    setDosi(value);
  };

  const ChangeState = (value: string) => {
    setIsOpened(value);
  };

  const ChangeSearchRequirement = (value: string) => {
    // 검색조건이 키워드이면 모임장명 입력값 초기화
    if (value === "keyword") setMeetingHost("");
    setSearchFilter("keyword");
    // 검색조건이 모임장명이면 키워드 입력값 초기화
    if (value === "creator") setContent("");
    setSearchFilter("creator");
  };

  const moveCreatePage = () => {
    if (user != null && user.userAccessState) {
      navigate(`/meeting/create`);
    } else {
      alert("로그인한 회원만 모임을 개설할 수 있습니다!");
    }
  };
  return (
    <Wrapper>
      <form>
        <SpaceBetween>
          <Select
            placeholder="지역"
            width="calc(50% - 5px)"
            onChange={(e) => ChangeSido(e.target.value)}
          >
            {sido.map((c) => (
              <option key={c.value} value={c.value}>
                {c.name}
              </option>
            ))}
          </Select>
          <Select
            placeholder="모집상태"
            width="calc(50% - 5px)"
            onChange={(e) => ChangeState(e.target.value)}
          >
            {meetState.map((c) => (
              <option key={c.value} value={c.value}>
                {c.name}
              </option>
            ))}
          </Select>
        </SpaceBetween>
        <SpaceBetween>
          <Select
            placeholder="검색조건"
            width="calc(30% - 5px)"
            onChange={(e) => ChangeSearchRequirement(e.target.value)}
          >
            {filter.map((c) => (
              <option key={c.value} value={c.value}>
                {c.name}
              </option>
            ))}
          </Select>
          <Submit
            width="calc(70% - 5px)"
            setData={searchfilter === "keyword" ? setContent : setMeetingHost}
            data={searchfilter === "keyword" ? content : meetingHost}
            onClick={PostSearch}
          />
        </SpaceBetween>
      </form>
      {meetData.content != null &&
        meetData.content.map((e: any) => {
          return <MeetList key={e.meetingId} data={e} />;
        })}
      {meetData.content == null || meetData.content.length === 0 ? (
        <NullWrapper>
          <img src={nullIcon} />
          <div>게시물이 존재하지 않습니다.</div>
        </NullWrapper>
      ) : (
        <></>
      )}
      <CreateButton onClick={moveCreatePage}>
        <CreateButtonImage src={pencil} alt="create button" />
      </CreateButton>
    </Wrapper>
  );
});

export default withMain(IndexPage, "펫미팅");

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 10px;
`;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CreateButton = styled.div`
  position: sticky;
  bottom: 0px;
  right: -10px;

  width: 60px;
  height: 60px;

  border-radius: 100%;

  background-color: #f3593a;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: auto;

  cursor: pointer;
`;

const CreateButtonImage = styled.img`
  width: 24px;
  height: 24px;
`;

const Select = styled.select`
  width: ${(props: { width: string }) => props.width};
  border: 1px solid #c1c1c1;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 15px;
  padding: 10px;
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
