import { useEffect, useState, useContext, useCallback, Fragment } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useInView } from "react-intersection-observer";
import { useStores } from "../../../hooks/useStores";
import { UserContext } from "../../../contexts/UserContext";
import SampleImg from "../../../assets/images/bg1.png";
import nullIcon from "../../../assets/images/null.png";
import { MyPost, MyLikePost } from "../../../services/authApi";

const Feed = observer(({ clickedPage }: any) => {
  const navigate = useNavigate();
  const { modalStore } = useStores();
  const { user } = useContext(UserContext);
  const [feedData, setFeedData] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  const getItems = useCallback(
    async (state: boolean, userToken?: any) => {
      console.log("요청 전 유저 확인", userToken);

      setLoading(true);
      if (pageNumber === 0 && state == true && user.userAccessState) {
        console.log("aaa", userToken);
        clickedPage === "feed"
          ? await MyPost(userToken, pageNumber, 20).then((res: any) => {
              console.log(res);

              setFeedData(res.data);
              setLoading(false);
              if (res.data.content.length === 0) {
                setLoading(true);
              }
              console.log("klkkk", feedData);
            })
          : await MyLikePost(userToken, pageNumber, 20).then((res: any) => {
              if (Math.floor(feedData.length / 10) < pageNumber + 1) {
                setFeedData(res.data);
                setLoading(false);
              }
              if (res.data.content.length === 0) {
                setLoading(true);
              }
              console.log("klkkk", feedData);
            });
      } else {
        clickedPage === "feed"
          ? await MyPost(userToken, pageNumber, 20).then((res: any) => {
              if (Math.floor(feedData.length / 10) < pageNumber + 1) {
                setFeedData(res.data);
                setLoading(false);
              }
              if (res.data.content.length === 0) {
                setLoading(true);
              }
              console.log("klkkk", feedData);
            })
          : await MyLikePost(userToken, pageNumber, 20).then((res: any) => {
              if (Math.floor(feedData.length / 10) < pageNumber + 1) {
                setFeedData(res.data);
                setLoading(false);
              }
              if (res.data.content.length === 0) {
                setLoading(true);
              }
              console.log("klkkk", feedData);
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
  }, [user, clickedPage]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPageNumber((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  const moveFeedPage = (postId: any) => {
    navigate(`/mypage/viewFeed`, {
      state: { postId },
    });
  };

  function EditEvent(postId: number) {
    modalStore.petpGramPostId = postId;
    modalStore.editPetpGramState = true;
  }
  return (
    <Wrapper>
      {feedData.content != null &&
        feedData.content.map((e: any) => {
          return (
            <ImgWrapper>
              <Img
                key={e.postId}
                src={e.imgUrlList.length > 0 ? e.imgUrlList[0] : SampleImg}
                alt="활동사진"
                ref={ref}
                onClick={() => moveFeedPage(e.postId)}
              />
            </ImgWrapper>
          );
        })}
      {feedData.content == null || feedData.content.length === 0 ? (
        <NullWrapper>
          <img src={nullIcon} />
          <div>게시물이 존재하지 않습니다.</div>
        </NullWrapper>
      ) : (
        <></>
      )}
    </Wrapper>
  );
});

export default Feed;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 20px;

  display: flex;
  flex-wrap: wrap;
`;

const ImgWrapper = styled.div`
  position: relative;
  width: calc(33% - 7px);

  border: 1px solid black;
  box-sizing: border-box;
  margin: 10px 10px 0 0;
  cursor: pointer;

  &:nth-child(3n) {
    margin-right: 0;
  }
  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }
`;
const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
