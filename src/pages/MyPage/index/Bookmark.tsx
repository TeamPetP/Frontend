import styled from "styled-components";
import { useStores } from "../../../hooks/useStores";
import { observer } from "mobx-react";
import SampleImg from "../../../assets/images/bg1.png";
import nullIcon from "../../../assets/images/null.png";

const Bookmark = observer(({ data }: any) => {
  const { userStore } = useStores();
  return (
    <Wrapper>
      {data.content != null &&
        data.content.map((data: any) => {
          return <Img key={data.id} src={SampleImg} alt="활동사진" />;
        })}
      {data.content == null || data.content.length === 0 ? (
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

export default Bookmark;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 20px;
`;

const Img = styled.img`
  width: calc(33.3% - 7px);
  border: 1px solid black;
  box-sizing: border-box;
  margin: 10px 10px 0 0;
  cursor: pointer;

  &:nth-child(3n) {
    margin-right: 0;
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
