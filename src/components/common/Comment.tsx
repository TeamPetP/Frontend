import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import * as theme from "../../styles/theme";
import user_profile from "../../assets/images/user_profile.png";
import showBtnArrow from "../../assets/images/arrow_left.png";
import {
  SearchComment,
  CreateCommentReply,
  CreateComment,
  SearchMeetingBoardComment,
  CreateMeetingBoardCommentReply,
  CreateMeetingBoardComment,
} from "../../services/commentApi";
import { UserContext } from "../../contexts/UserContext";
import { timeBefore } from "../../lib/timeBefore";
import { useStores } from "../../hooks/useStores";

interface ICommentType {
  length?: number;
  postId?: any;
  clickedPage?: string;
  meetingId?: any;
  meetingPostId?: any;
}

function CommentReply({ data }: any) {
  const [isShowReplyList, setIShowReplyList] = useState<boolean>(false);
  const VisibleReply = (e: any) => {
    e.preventDefault();
    setIShowReplyList(!isShowReplyList);
  };
  console.log(data);
  return (
    <>
      {data.childComment.length != 0 ? (
        <ShowReplyBtn onClick={VisibleReply}>
          답글
          {isShowReplyList ? "숨기기" : `${data.childComment.length}개 보기`}
        </ShowReplyBtn>
      ) : (
        <></>
      )}
      {isShowReplyList &&
        data.childComment.map((e: any) => {
          return (
            <ReplyList>
              <Commenter>
                <ReplyByThumbnail src={e.memberImageUrl} />
                <div>
                  <CommenterNickname>{e.nickName}</CommenterNickname>
                  <CreateTime>{timeBefore(e.createdDate)}</CreateTime>
                </div>
                <CommentText>{e.content}</CommentText>
              </Commenter>
            </ReplyList>
          );
        })}
    </>
  );
}

function Comment({
  postId,
  length,
  clickedPage,
  meetingId,
  meetingPostId,
}: ICommentType) {
  const { user } = useContext(UserContext);
  const { modalStore, userStore } = useStores();

  const [isShowCommentList, setIShowCommentList] = useState<boolean>(false);

  const [data, setData] = useState<any>([]);
  const [commentInputText, setCommentInputText] = useState("");

  const [selectedComment, setSelectedComment] = useState<any>(null);
  const [commentLength, setCommentLength] = useState<number | undefined>(0);

  useEffect(() => {
    setCommentLength(length);
  }, []);

  function clickReplyEvent(data: any) {
    console.log(data);
    setSelectedComment(data);
    setCommentInputText(data.nickName + " ");
  }

  const VisibleComment = (e: any) => {
    e.preventDefault();
    setIShowCommentList(!isShowCommentList);
  };

  function UploadComment() {
    if (commentInputText != "") {
      if (user != null && user.userAccessState) {
        if (selectedComment != null) {
          console.log(commentInputText.slice(selectedComment.nickName.length));
          clickedPage === "petpGram"
            ? CreateCommentReply(
                user,
                postId,
                selectedComment.commentId,
                commentInputText.slice(selectedComment.nickName.length + 1)
              ).then((e: any) => {
                setCommentInputText("");
                console.log(e);
                if (e.statusText == "Created") {
                  SearchComment(user, postId).then((e: any) => {
                    console.log(e);
                    setData(e.data.commentRetrieveRespDtoList);
                    setCommentLength(e.data.commentCnt);
                  });
                }
              })
            : CreateMeetingBoardCommentReply(
                user,
                meetingId,
                meetingPostId,
                selectedComment.meetingCommentId,
                commentInputText.slice(selectedComment.nickName.length + 1)
              ).then((e: any) => {
                setCommentInputText("");
                console.log(e);
                if (e.statusText == "Created") {
                  SearchMeetingBoardComment(
                    user,
                    meetingId,
                    meetingPostId
                  ).then((e: any) => {
                    console.log(e);
                    setCommentLength(e.data.commentCnt);
                    setData(e.data.meetingCommentRetrieveRespDtoList);
                  });
                }
              });
        } else {
          clickedPage === "petpGram"
            ? CreateComment(user, postId, commentInputText).then((e: any) => {
                setCommentInputText("");
                console.log(e);
                if (e.statusText == "Created") {
                  SearchComment(user, postId).then((e: any) => {
                    console.log(e);
                    setData(e.data.commentRetrieveRespDtoList);
                    setCommentLength(e.data.commentCnt);
                  });
                }
              })
            : CreateMeetingBoardComment(
                user,
                meetingId,
                meetingPostId,
                commentInputText
              ).then((e: any) => {
                setCommentInputText("");
                console.log(e);
                if (e.statusText == "Created") {
                  SearchMeetingBoardComment(
                    user,
                    meetingId,
                    meetingPostId
                  ).then((e: any) => {
                    console.log(e);
                    setCommentLength(e.data.commentCnt);
                    setData(e.data.meetingCommentRetrieveRespDtoList);
                  });
                }
              });
        }
      }
    }
  }

  useEffect(() => {
    console.log("펫미팅 실행");
    clickedPage === "petpGram"
      ? SearchComment(user, postId).then((e: any) => {
          console.log(e);
          setCommentLength(e.data.commentCnt);
          setData(e.data.commentRetrieveRespDtoList);
        })
      : SearchMeetingBoardComment(user, meetingId, meetingPostId).then(
          (e: any) => {
            console.log("SearchMeetingBoardComment", e);
            setCommentLength(e.data.commentCnt);
            setData(e.data.meetingCommentRetrieveRespDtoList);
          }
        );
  }, [user]);

  return (
    <CommentWrap>
      <ShowCommentListBtn onClick={VisibleComment} visible={isShowCommentList}>
        댓글 {commentLength ? commentLength : "0"}개 모두
        {isShowCommentList ? `접기` : `보기`}
        <img src={showBtnArrow} alt="댓글 목록보기 버튼" />
      </ShowCommentListBtn>

      {isShowCommentList &&
        data.map((e: any) => {
          return (
            <div>
              <CommentList>
                <Commenter>
                  <CommenterThumbnail src={e.memberImageUrl} />
                  <div>
                    <CommenterNickname>{e.nickName}</CommenterNickname>
                    <CreateTime>{timeBefore(e.createdDate)}</CreateTime>
                  </div>
                  <div>
                    <CommentText>{e.content}</CommentText>
                    <ReplyBtn onClick={() => clickReplyEvent(e)}>
                      답글달기
                    </ReplyBtn>
                  </div>
                </Commenter>
                <CommentReply data={e}></CommentReply>
              </CommentList>
            </div>
          );
        })}

      <WriteComment>
        {userStore.info.imgUrl && userStore.info.imgUrl.length > 0 ? (
          <CommenterThumbnail src={userStore.info.imgUrl} />
        ) : (
          <CommenterThumbnail src={user_profile} />
        )}

        <Input
          type="text"
          placeholder="댓글 달기"
          value={commentInputText}
          onChange={(e) => {
            if (selectedComment != null) {
              if (
                selectedComment.nickName !=
                e.target.value.slice(0, selectedComment.nickName.length)
              ) {
                setSelectedComment(null);
              }
            }
            setCommentInputText(e.target.value);
          }}
        />
        <RegisterComment onClick={() => UploadComment()}>게시</RegisterComment>
      </WriteComment>
    </CommentWrap>
  );
}

export default Comment;

const CommentWrap = styled.div`
  margin-top: 20px;
`;

const ShowCommentListBtn = styled.button`
  color: ${theme.TextSubColor};
  font-size: 16px;

  & img {
    transform: rotateZ(
      ${(props: { visible: boolean }) => (props.visible ? `90deg` : `-90deg`)}
    );
    width: 8px;
    margin: 0 8px;
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;

    & img {
      width: 6px;
      margin: 0 8px;
    }
  }
`;

const CommentList = styled.div``;

const Commenter = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  padding: 4px 0;

  @media screen and (max-width: 600px) {
    display: block;
    padding: 8px 0;

    &::after {
      clear: both;
      display: block;
      content: "";
    }
  }
`;

const CommenterThumbnail = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 15px;
  overflow: hidden;

  @media screen and (max-width: 600px) {
    width: 25px;
    height: 25px;
    margin-right: 8px;
    float: left;
  }
`;

const CommenterNickname = styled.div`
  width: 90px;
  font-size: 16px;
  font-weight: 500;
  color: #000;

  @media screen and (max-width: 600px) {
    font-size: 14px;
    float: left;
    width: auto;
  }
`;

const CreateTime = styled.div`
  font-size: 14px;
  color: ${theme.TextSubColor};

  @media screen and (max-width: 600px) {
    font-size: 12px;
    float: left;
    margin-left: 4px;
  }
`;

const CommentText = styled.div`
  font-size: 16px;
  color: #000;

  @media screen and (max-width: 600px) {
    font-size: 14px;
    display: inline-block;
  }
`;

const ReplyBtn = styled.button`
  font-size: 14px;
  color: ${theme.TextSubColor};

  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

const ReplyList = styled.div`
  padding-left: 95px;

  @media screen and (max-width: 600px) {
    padding-left: 20px;
  }
`;

const ReplyByThumbnail = styled(CommenterThumbnail)`
  width: 25px;
  height: 25px;

  @media screen and (max-width: 600px) {
    width: 20px;
    height: 20px;
  }
`;

const ShowReplyBtn = styled.div`
  font-size: 14px;
  color: ${theme.TextSubColor};
  padding-left: 90px;
  margin-top: 10px;
  cursor: pointer;
  &::before {
    display: inline-block;
    content: "";
    clear: both;
    width: 30px;
    height: 1px;
    background-color: ${theme.TextSubColor};
    margin-right: 10px;
    position: relative;
    top: -4px;
  }

  @media screen and (max-width: 600px) {
    font-size: 12px;
    padding-left: 10px;
  }
`;

const WriteComment = styled.form`
  width: 100%;
  display: block;
  background: #ffffff;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 20px;
`;

const Input = styled.input`
  width: calc(100% - 70px);

  &::placeholder {
    font-size: 16px;
    color: ${theme.TextSubColor};
  }

  @media screen and (max-width: 600px) {
    &::placeholder {
      font-size: 14px;
    }
  }
`;

const RegisterComment = styled.div`
  color: ${theme.PrimaryColor};
  font-size: 16px;
  background: none;
  margin-left: 10px;
  cursor: pointer;

  min-width: fit-content;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;
