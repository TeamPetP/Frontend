import React from "react";
import styled from "styled-components";
import arrow_left from "../../assets/images/arrow_left.png";
import arrow_right from "../../assets/images/arrow_right.png";
import Slider from "react-slick";
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

const ProtectAnimalsList = () => {
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
      <NoticeTitle>제 가족이 되어주세요!</NoticeTitle>
      <SliderWrap sliderLength={1}>
        <Slider {...settings}>
          {animals.map((pet) => (
            <Notice pet={pet} key={pet.id} />
          ))}
        </Slider>
      </SliderWrap>
    </Wrap>
  );
};

export default ProtectAnimalsList;

const Wrap = styled.div`
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
