import { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import user_profile from "../../../assets/images/user_profile.png";

import Slider from "react-slick";
import speech_bubble from "../../../assets/images/speech_bubble.png";
import heart from "../../../assets/images/heart.png";
import heart__fill from "../../../assets/images/heart__fill.png";
import { UserContext } from "../../../contexts/UserContext";

import bookmark2 from "../../../assets/images/bookmark2.png";
import bookmark2__fill from "../../../assets/images/bookmark2__fill.png";
import Comment from "../../../components/common/Comment";
import { LikePost } from "../../../services/postApi";
import { timeBefore } from "../../../lib/timeBefore";
const BoardWrapper = styled.div`
	width: 100%;
	max-height: 865px;
	padding: 16px 20px;

	border: 1px solid #c1c1c1;

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

const BookMarkWrapper = styled.div`
	width: 70px;

	display: flex;
	justify-content: flex-end;

	& > img {
		margin: 0px;
	}
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
	background-color: ${(props) =>
		props.state == true ? "#FFC9BE" : "#EBEBEB"};

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
const TagText = styled.div``;
function Board(props) {
	const { user } = useContext(UserContext);

	const slider = useRef();
	const [sliderDot, setSliderDot] = useState([]);
	const [like, setLike] = useState(false);
	const [likeCount, setLikeCount] = useState(0);

	useEffect(() => {
		let arr;

		(arr = []).length = slider.current.props.children
			? slider.current.props.children.length
			: 0;
		arr.fill(false);
		arr[0] = true;

		setSliderDot(arr);
	}, []);

	useEffect(() => {
		console.log(props.info.isLiked);
		if (props.info.isLiked == null) {
			setLike(false);
		} else {
			setLike(props.info.isLiked);
		}
		setLikeCount(props.info.likeCnt);
	}, [props.info, user]);

	function setActiveSlide(data) {
		let arr;
		(arr = []).length = slider.current.props.children
			? slider.current.props.children.length
			: 0;
		arr.fill(false);
		arr[data] = true;
		setSliderDot(arr);
	}
	function DotClickEvent(data) {
		slider.current.slickGoTo(data);
	}
	function EditPost() {
		props.EditEvent(props.info.postId);
	}

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
		<BoardWrapper>
			<BoardHeader>
				<BoardUserInfo>
					<BoardUserProfileImage
						src={props.info.imgUrl}
						alt="profile_image"
					/>
					<BoardUserName>{props.info.nickname}</BoardUserName>
				</BoardUserInfo>
				{props.info.owner ? (
					<BoardOnwerSetting>
						<span onClick={() => EditPost()}>수정</span>
						<span>삭제</span>
					</BoardOnwerSetting>
				) : (
					""
				)}
			</BoardHeader>
			<SliderWrap>
				<Slider {...settings} ref={slider}>
					{props.info.imgUrlList != null &&
						props.info.imgUrlList.map((image) => (
							<BoardListImage src={image} alt="image" />
						))}
				</Slider>
			</SliderWrap>
			<BoardNav>
				<IconWrapper>
					{like ? (
						<HeartIconImage
							src={heart__fill}
							onClick={() => Like(props.info.postId, false)}
						/>
					) : (
						<HeartIconImage
							src={heart}
							onClick={() => Like(props.info.postId, true)}
						/>
					)}
					<IconImage src={speech_bubble} />
				</IconWrapper>
				<SwiperToggle>
					{props.info.imgUrlList != null &&
					props.info.imgUrlList.length != 0
						? sliderDot.map((value, index) => (
								<SwiperToggleDot
									key={index}
									state={value}
									onClick={() => DotClickEvent(index)}
								/>
						  ))
						: ""}
				</SwiperToggle>
				<BookMarkWrapper>
					{/* {false ? (
						<IconImage src={bookmark2__fill} />
					) : (
						<IconImage src={bookmark2} />
					)} */}
				</BookMarkWrapper>
			</BoardNav>
			<BoardSubNav>
				<BoardLike>좋아요 {likeCount}개</BoardLike>
				<BoardTime>{timeBefore(props.info.lastModifiedDate)}</BoardTime>
			</BoardSubNav>
			<BoardText>{props.info.content}</BoardText>
			<TagText>
				{props.info.tagList.map((e) => {
					return <span>#{e} </span>;
				})}
			</TagText>
			<Comment
				length={props.info.commentCnt}
				postId={props.info.postId}
			/>
		</BoardWrapper>
	);
}
// 넘어갈때 호출 이벤트
export default Board;
