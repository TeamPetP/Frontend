import { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import withMain from "../../hocs/ui/withMain";
import { observer } from "mobx-react";
import * as theme from "../../styles/theme";
import { useStores } from "../../hooks/useStores";
import PageTitle from "../../components/common/PageTitle";
import { UserContext } from "../../contexts/UserContext";
import { useLocation, useNavigate } from "react-router";
import { SearchDetailPost, LikePost, DeletePost } from "../../services/postApi";
import nullIcon from "../../assets/images/null.png";
import heart from "../../assets/images/heart.png";
import heart__fill from "../../assets/images/heart__fill.png";
import { timeBefore } from "../../lib/timeBefore";
import Comment from "../../components/common/Comment";
import Slider from "react-slick";
import speech_bubble from "../../assets/images/speech_bubble.png";

const ViewFeed = observer(() => {
  const [alrimdata, setAlrimData] = useState([]);
  const { user } = useContext(UserContext);
  const { modalStore } = useStores();
  const { state } = useLocation();
  const navigate = useNavigate();
  const postId = state.postId;
  const [data, setData] = useState([]);
  const slider = useRef();
  const [sliderDot, setSliderDot] = useState([]);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    async function fetchInfoData() {
      const dd = await SearchDetailPost(user, postId);
      console.log("피드 단건 조회", dd);
      setData(dd.data);
    }
    fetchInfoData();
  }, [user]);

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
    (arr = []).length = slider.current.props.children
      ? slider.current.props.children.length
      : 0;
    arr.fill(false);
    arr[data] = true;
    setSliderDot(arr);
  }

  useEffect(() => {
    console.log(data.isLiked);
    if (data.isLiked == null) {
      setLike(false);
    } else {
      setLike(data.isLiked);
    }
    setLikeCount(data.likeCnt);
  }, [data, user]);

  function DotClickEvent(data) {
    slider.current.slickGoTo(data);
  }
  function EditPost() {
    modalStore.petpGramPostId = postId;
    modalStore.editPetpGramState = true;
  }
  async function DeletePostt() {
    const dd = await DeletePost(user, postId);
    if (dd.status === 204) navigate(-1);
  }
  function CommentLengthEvent() {}
  async function Like(postId, state) {
    if (user != null && user.userAccessState === true) {
      await LikePost(user, postId).then((e) => {
        setLike(state);
        console.log(e);
        setLikeCount(e);
      });
    }
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

  return (
    <>
      <PageTitle title="상세보기" />
      <BoardWrapper>
        <BoardHeader>
          <BoardUserInfo>
            <BoardUserProfileImage src={data.imgUrl} alt="profile_image" />
            <BoardUserName>{data.nickname}</BoardUserName>
          </BoardUserInfo>
          {data.owner ? (
            <BoardOnwerSetting>
              <span onClick={() => EditPost()}>수정</span>
              <span onClick={() => DeletePostt()}>삭제</span>
            </BoardOnwerSetting>
          ) : (
            ""
          )}
        </BoardHeader>
        <SliderWrap>
          <Slider {...settings} ref={slider}>
            {data.imgUrlList != null &&
              data.imgUrlList.map((image) => (
                <BoardListImage src={image} alt="image" />
              ))}
          </Slider>
        </SliderWrap>
        <BoardNav>
          <IconWrapper>
            {like ? (
              <HeartIconImage
                src={heart__fill}
                onClick={() => Like(data.postId, false)}
              />
            ) : (
              <HeartIconImage
                src={heart}
                onClick={() => Like(data.postId, true)}
              />
            )}
            <IconImage src={speech_bubble} />
          </IconWrapper>
          <SwiperToggle>
            {data.imgUrlList != null && data.imgUrlList.length != 0
              ? sliderDot.map((value, index) => (
                  <SwiperToggleDot
                    key={index}
                    state={value}
                    onClick={() => DotClickEvent(index)}
                  />
                ))
              : ""}
          </SwiperToggle>
          <IconWrapper></IconWrapper>
        </BoardNav>
        <BoardSubNav>
          <BoardLike>좋아요 {likeCount}개</BoardLike>
          <BoardTime>{timeBefore(data.lastModifiedDate)}</BoardTime>
        </BoardSubNav>
        <BoardText>{data.content}</BoardText>
        <Comment
          length={data.commentCnt}
          postId={data.postId}
          clickedPage="petpGram"
        />
      </BoardWrapper>
    </>
  );
});

export default withMain(ViewFeed, "마이페이지");

const BoardWrapper = styled.div`
  width: 100%;
  /* max-height: 865px; */
  padding: 16px 20px;

  margin: 12px 0px;
`;

const BoardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 10px;
`;

const BoardUserInfo = styled.div`
  display: flex;
`;
const BoardUserProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;
`;

const BoardUserName = styled.div`
  font-size: 20px;
  font-weight: bold;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-left: 10px;
`;

const BoardOnwerSetting = styled.div`
  display: flex;

  & > span {
    color: #555555;
    font-size: 18px;

    margin-left: 14px;

    cursor: pointer;
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
const SliderWrap = styled.div`
  width: 100%;
  height: fit-content;
  .slick-prev {
    right: 60px;
  }

  .slick-next {
    right: 30px;
  }

  .slick-cloned {
    display: ${({ length }) => length < 2 && "none"};
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
const BoardNav = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 10px;
`;
const IconWrapper = styled.div`
  width: 70px;
  display: flex;
`;

const HeartIconImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const IconImage = styled.img`
  margin-right: 10px;
`;

const SwiperToggle = styled.div`
  width: 70px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const SwiperToggleDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.state == true ? "#FFC9BE" : "#EBEBEB")};

  border-radius: 100%;

  margin: 0px 3px;

  cursor: pointer;
`;
const BoardSubNav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;
const BoardLike = styled.div`
  font-size: 18px;
`;
const BoardTime = styled.div`
  font-size: 16px;
`;
const BoardText = styled.div`
  margin-top: 12px;
  word-break: break-all;
  width: 100%;
`;
