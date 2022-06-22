import React, { useEffect, useState } from "react";
import styled from "styled-components";
import arrow_left from "../../assets/images/arrow_left.png";
import arrow_right from "../../assets/images/arrow_right.png";
import Slider from "react-slick";
import Notice from "./Notice";
import { AbandonedAnimals } from "../../services/Api";

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
				onClick={onClick}
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
				onClick={onClick}
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

	const [abandonedAnimalsData, setAbandonedAnimalsData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await await AbandonedAnimals();
			setAbandonedAnimalsData(response);
		}
		fetchData();
	}, []);

	return (
		<Wrap>
			<NoticeTitle>제 가족이 되어주세요!</NoticeTitle>
			<SliderWrap sliderLength={1}>
				<Slider {...settings}>
					{abandonedAnimalsData.map((pet) => (
						<Notice pet={pet} key={pet.id} />
					))}
				</Slider>
			</SliderWrap>
		</Wrap>
	);
};

export default ProtectAnimalsList;

const Wrap = styled.div`
	width: 100%;
	background-color: #fff;
	border-radius: 5px;
	border: 2px solid #c1c1c1;
	box-sizing: border-box;
	overflow: hidden;
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

	.slick-arrow {
		position: absolute;
		top: 16px;
		width: 30px;
		height: 30px;
		&:hover {
			cursor: pointer;
		}
	}
	.slick-list {
		overflow: hidden;
	}

	.slick-track {
		display: flex;
		justify-content: start;
	}
`;
