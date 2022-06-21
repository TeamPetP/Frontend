import React, { useState } from "react";
import styled from "styled-components";
import * as theme from "../../styles/theme";
import user_profile from "../../assets/images/user_profile.png";
import showBtnArrow from "../../assets/images/arrow_left.png";

interface ICommentType {
  data: any;
}
function Comment(/* { data }: ICommentType */) {
  const [isShowCommentList, setIShowCommentList] = useState<boolean>(false);
  const [isShowReplyList, setIShowReplyList] = useState<boolean>(false);

  const VisibleComment = (e: any) => {
    e.preventDefault();
    setIShowCommentList(!isShowCommentList);
  };

  const VisibleReply = (e: any) => {
    e.preventDefault();
    setIShowReplyList(!isShowReplyList);
  };

  return (
    <CommentWrap>
      <ShowCommentListBtn onClick={VisibleComment} visible={isShowCommentList}>
        댓글 10개 모두 {isShowCommentList ? `접기` : `보기`}
        <img src={showBtnArrow} alt="댓글 목록보기 버튼" />
      </ShowCommentListBtn>
      {isShowCommentList && (
        <div>
          <CommentList>
            <Commenter>
              <CommenterThumbnail src={user_profile} />
              <div>
                <CommenterNickname>user1</CommenterNickname>
                <CreateTime>3시간전</CreateTime>
              </div>
              <div>
                <CommentText>
                  수제간식 만든 곳 위치 알고 싶은데 혹시 어디인가요?
                </CommentText>
                <ReplyBtn>답글달기</ReplyBtn>
              </div>
            </Commenter>
          </CommentList>
          {isShowReplyList && (
            <ReplyList>
              <Commenter>
                <ReplyByThumbnail src={user_profile} />
                <div>
                  <CommenterNickname>user1</CommenterNickname>
                  <CreateTime>3시간전</CreateTime>
                </div>
                <CommentText>
                  수제간식 만든 곳 위치 알고 싶은데 혹시 어디인가요?
                </CommentText>
              </Commenter>
            </ReplyList>
          )}
          <ShowReplyBtn onClick={VisibleReply}>
            답글 {isShowReplyList ? "숨기기" : `1개 보기`}
          </ShowReplyBtn>
        </div>
      )}
      <WriteComment>
        <CommenterThumbnail src={user_profile} />
        <Input type="text" placeholder="댓글 달기" />
        <RegisterComment type="submit" value="게시" />
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

const RegisterComment = styled.input`
  color: ${theme.PrimaryColor};
  font-size: 16px;
  background: none;
  margin-left: 10px;
  cursor: pointer;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;
