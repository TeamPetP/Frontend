import { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { UserContext } from "../../../../contexts/UserContext";
import { GetGallery } from "../../../../services/MeetingApi";
import { useStores } from "../../../../hooks/useStores";
import nullIcon from "../../../../assets/images/null.png";

const Gallery = observer(({ meetingId }: any) => {
	const { user } = useContext(UserContext);
	const { modalStore } = useStores();
	const [data, setData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const d: any = await GetGallery(user, meetingId);
			setData(d.data);
		}
		fetchData();
	}, [user]);

	function ViewImg(imgUrl: any) {
		if (user != null && user.userAccessState) {
			modalStore.viewPetMeetingGalleryState = true;
			modalStore.galleryImg = imgUrl;
		} else {
			modalStore.signInState = true;
		}
	}

	return (
		<GalleryWRap>
			{data != null &&
				data.map((data: any) => {
					return (
						<ImgWrap>
							<Img
								src={data.imgUrl}
								alt="활동사진"
								key={data.meetingImageId}
								onClick={() => {
									ViewImg(data.imgUrl);
								}}
							/>
						</ImgWrap>
					);
				})}
			{data == null || data.length === 0 ? (
				<NullWrapper>
					<img src={nullIcon} />
					<div>등록된 이미지가 존재하지 않습니다.</div>
				</NullWrapper>
			) : (
				<></>
			)}
		</GalleryWRap>
	);
});

export default Gallery;

const GalleryWRap = styled.div`
	padding: 10px 20px;
	background-color: #fff;
	box-sizing: border-box;
`;

const ImgWrap = styled.div`
	width: calc(33.3% - 7px);
	height: 150px;
	box-sizing: border-box;
	margin: 10px 10px 0 0;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	display: inline-block;
	box-shadow: 0 0 2px 1px rgb(0 0 0 / 9%);
	border-radius: 10px;

	&:nth-child(3n) {
		margin-right: 0;
	}
`;

const Img = styled.img`
	min-width: 100%;
	max-width: 130%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
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
