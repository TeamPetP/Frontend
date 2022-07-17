import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { observer } from "mobx-react";
import Slider from "react-slick";
import { useStores } from "../../../../hooks/useStores";
import { useNavigate } from "react-router";
import { UserContext } from "../../../../contexts/UserContext";
import Comment from "../../../../components/common/Comment";
import styled from "styled-components";
import * as theme from "../../../../styles/theme";
import nullIcon from "../../../../assets/images/null.png";
import pencil from "../../../../assets/images/pencil.png";
import { GetBoardList } from "../../../../services/MeetingApi";
import { timeBefore } from "../../../../lib/timeBefore";
import { useInView } from "react-intersection-observer";

const Board = observer(({ meetingId }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { modalStore, userStore } = useStores();
  const [boardData, setBoardData] = useState([]);
  const slider = useRef();
  const [sliderDot, setSliderDot] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false);

  const getItems = useCallback(
    async (state, userToken) => {
      setLoading(true);

      if (pageNumber === 0 && state == true) {
        console.log("aaa", userToken);
        await GetBoardList(user, meetingId, pageNumber, 20).then((res) => {
          if (Math.floor(boardData.length / 10) < pageNumber + 1) {
            setBoardData([...res.data.content]);
            setLoading(false);
          }
          if (res.data.content.length === 0) {
            setLoading(true);
          }
          console.log("klkkk", boardData);
        });
      } else {
        await GetBoardList(user, meetingId, pageNumber, 20).then((res) => {
          console.log(
            "mmm",
            res.data,
            Math.floor(boardData.length / 10) < pageNumber,
            Math.floor(boardData.length / 10),
            pageNumber
          );
          if (Math.floor(boardData.length / 10) < pageNumber + 1) {
            setBoardData((prevState) => [...prevState, ...res.data.content]);
            setLoading(false);
          }
          if (res.data.content.length === 0) {
            setLoading(true);
          }
          console.log("klkkk", boardData);
        });
      }
    },
    [pageNumber]
  );

  useEffect(() => {
    console.log("test");
    getItems(false);
  }, [getItems]);

  useEffect(() => {
    console.log("test", user);
    getItems(true, user);
  }, [user]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPageNumber((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  /* useEffect(() => {
    console.log(user);
    console.log(`meetingId = ${meetingId}`);
    async function fetchData() {
      const d: any = await GetBoardList(user, meetingId, pageNumber, 20);
      console.log("모임게시글 전체 조회 data=", d);
      console.log("슬라이더", slider);

      setBoardData(d.data.content);
    }
    fetchData();
  }, [user]); */

  useEffect(() => {
    let arr;

    (arr = []).length = slider.current.props.children
      ? slider.current.props.children.length
      : 0;
    arr.fill(false);
    arr[0] = true;

    setSliderDot(arr);
  }, []);

  function setActiveSlide(data) {
    let arr;
    (arr = []).length = slider.current.props.children.length;
    arr.fill(false);
    arr[data] = true;
    setSliderDot(arr);
  }
  function DotClickEvent(data) {
    slider.current.slickGoTo(data);
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  function createBoard() {
    if (user != null && user.userAccessState) {
      modalStore.createPetMeetingBoardState = true;
      modalStore.petMeetingId = meetingId;
    } else {
      modalStore.signInState = true;
    }
  }

  return (
    <>
      {boardData != null &&
        boardData.map((data) => (
          <Meeting key={data.meetingPostId}>
            <Creator>
              <CreatorThumbnail src={data.memberImgUrl} />
              <div>
                <Nickname>{data.nickname}</Nickname>
                <CreateTime>{timeBefore(data.createdDate)}</CreateTime>
              </div>
            </Creator>
            <BoardContent>
              <BoardTitle>{data.title}</BoardTitle>
              {/* <SliderWrap>
                <Slider {...settings} ref={slider}>
                  {data.imgUrlList != null &&
                    data.imgUrlList.map((image) => (
                      <BoardListImage src={image} alt="image" />
                    ))}
                </Slider>
              </SliderWrap> */}
              <Content>{data.content}</Content>
            </BoardContent>
            <Comment />
          </Meeting>
        ))}
      {boardData == null || boardData.length === 0 ? (
        <NullWrapper>
          <img src={nullIcon} />
          <div>게시물이 존재하지 않습니다.</div>
        </NullWrapper>
      ) : (
        <></>
      )}
      <CreateButton
        onClick={() => {
          createBoard();
        }}
      >
        <CreateButtonImage src={pencil} alt="create button" />
      </CreateButton>
    </>
  );
});

export default Board;

const Meeting = styled.div`
  padding: 10px 20px;
  background-color: #fff;
  box-sizing: border-box;
  transition: ${theme.Transition};
  border-bottom: 1px solid ${theme.SecondaryColor};

  &:last-child {
    margin-bottom: 0;
    border-bottom: 0;
  }
`;

const Creator = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 20px 0;
  box-sizing: border-box;

  @media screen and (max-width: 600px) {
    padding: 10px 0;
  }
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

  @media screen and (max-width: 600px) {
    font-size: 16px;
    word-break: break-word;
  }
`;

const Nickname = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #000;

  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

const CreateTime = styled.span`
  font-size: 16px;
  color: ${theme.TextSubColor};

  &::before {
    content: "|";
    display: inline-block;
    clear: both;
    margin: 0 8px;
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

const BoardTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #000;
  margin-bottom: 16px;

  @media screen and (max-width: 600px) {
    font-size: 16px;
    word-break: break-word;
  }
`;

const BoardContent = styled.div`
  @media screen and (max-width: 600px) {
    font-size: 16px;
  }
`;

const ContentImg = styled.div`
  & img {
    width: 72px;
    margin-right: 8px;
    border: 1px solid black;
    box-sizing: border-box;
  }
  margin-bottom: 16px;
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

const SliderWrap = styled.div`
  width: 100%;
  height: fit-content;
  .slick-prev {
    right: 60px;
  }

  .slick-next {
    right: 30px;
  }

  .slick-track {
    margin: 0;
  }

  .slick-arrow {
    display: none !important;
  }
  .slick-list {
    overflow: hidden;
  }

  .slick-track {
    display: flex;
    justify-content: start;
  }

  @media screen and (max-width: 650px) {
    .slick-slide > div {
      width: 100%;
      position: relative;

      &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
      }
    }
  }
`;

const BoardListImage = styled.img`
  width: 100%;
  max-height: 500px;
  height: 100%;
  object-fit: contain;

  @media screen and (max-width: 650px) {
    width: 100%;
    height: 100%;
    position: absolute;
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