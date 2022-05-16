import React, { Component } from "react";
import arrow_left from "../assets/images/arrow_left.png";
import arrow_right from "../assets/images/arrow_right.png";
import Slider from "react-slick";
import styled from "styled-components";
import * as theme from "../styles/theme";
import Background from "../assets/images/background.jpg";
import Petpgram from "../assets/images/petpgram.png";
import Petmeeting from "../assets/images/petmeeting.png";
import Mypage from "../assets/images/mypage.png";
import Notice from "./Notice";

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "transparent" }}
      onClick={onClick}
    >
      <img
        src={arrow_left}
        alt="유기동물 정보 좌측으로 넘기기"
        onclick={onClick}
      />
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "transparent" }}
      onClick={onClick}
    >
      <img
        src={arrow_right}
        alt="유기동물 정보 우측으로 넘기기"
        onclick={onClick}
      />
    </div>
  );
}

const MainPage = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const animals = [
    {
      id: 1,
      filename:
        "https://cdn.mkhealth.co.kr/news/photo/202102/52163_52859_5928.jpg",
      processState: "protect",
      sexCd: "m",
      careNm: "성남시",
    },
    {
      id: 2,
      filename: "https://ewhagift.ewha.ac.kr/ezstock/035434400_1534729386.jpg",
      processState: "end",
      sexCd: "w",
      careNm: "부산시",
    },
    {
      id: 3,
      filename:
        "https://www.google.com/imgres?imgurl=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F24283C3858F778CA2E&imgrefurl=https%3A%2F%2Fblankspace-dev.tistory.com%2Fm%2F200&tbnid=3bPYTaav1zN1YM&vet=12ahUKEwjkianS7tv3AhXjTPUHHYfQBK8QMygAegUIARDGAQ..i&docid=Od8TKEeMjkriMM&w=800&h=500&q=%EC%9D%B4%EB%AF%B8%EC%A7%80&ved=2ahUKEwjkianS7tv3AhXjTPUHHYfQBK8QMygAegUIARDGAQ",
      processState: "protect",
      sexCd: "m",
      careNm: "경기도",
    },
  ];
  let json = JSON.stringify(true);
  json = JSON.stringify(animals);

  return (
    <Wrap>
      <Container>
        <LeftArea>
          <MenuImg src={Petpgram} alt="펫피그램" />
          <ProtectAnimalsList>
            <NoticeTitle>제 가족이 되어주세요!</NoticeTitle>
            <SliderWrap sliderLength={1}>
              <Slider {...settings}>
                {animals.map((pet) => (
                  <Notice pet={pet} key={pet.id} />
                ))}
              </Slider>
            </SliderWrap>
          </ProtectAnimalsList>
        </LeftArea>
        <RightArea>
          <Content>
            컨텐츠!!
            <br />
            컨텐츠!!e 컨텐츠!!
            <br />a 컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />a 컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />g 컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!g
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />t 컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />r 컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            44 컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!! 컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!6
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            uu 컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!i77
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!iyy
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!i777
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!6767
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />6 컨텐츠!!
            <br />
            67676 컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            컨텐츠!!
            <br />
            44444 컨텐츠!!
            <br />
            컨텐츠!!666
            <br />
            컨텐츠!!
          </Content>
        </RightArea>
      </Container>
    </Wrap>
  );
};

export default MainPage;

const Wrap = styled.div`
  width: 100%;
  max-height: calc(100vh - 100px);
  overflow: hidden;
  background: url(${Background}) no-repeat center bottom / cover;
`;

const Container = styled.div`
  width: 1230px;
  max-height: inherit;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  & > div {
    height: inherit;
  }
`;

const LeftArea = styled.div`
  width: 540px;
`;

const MenuImg = styled.img`
  width: 100%;
  margin: 80px 0 50px;
`;

const ProtectAnimalsList = styled.div`
  background-color: #fff;
  border-radius: 5px;
  border: 2px solid #c1c1c1;
  box-sizing: border-box;
  over-flow: hidden;
  position: relative;
`;

const NoticeTitle = styled.div`
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  color: #333;
  line-height: 60px;
  border-bottom: 2px solid #c1c1c1;
  box-sizing: border-box;
`;

const SliderWrap = styled.div`
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

  .slick-arrow{
    position: absolute;
    top: 16px;
    width: 30px;
    height: 30px;
    &: hover {
      cursor: pointer;
    }
  }
  .slick-list {
    overflow:hidden;
  }

  .slick-track {
    display:flex;
    justify-content: start;
  }
  }
`;

const RightArea = styled.div`
  width: 640px;
  overflow-y: scroll;
  direction: ltr;
  background-color: #fff;
  border: 2px solid ${theme.SecondaryColor};
  border-top: 0;
  box-sizing: border-box;

  &::-webkit-scrollbar,
  ::-webkit-scrollbar-track {
    display: none;
  }
`;

const Content = styled.div``;
