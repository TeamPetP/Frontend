import { useState, useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import { useStores } from "../../../hooks/useStores";
import { observer } from "mobx-react";
import { useLocation, useNavigate } from "react-router";
import withMain from "../../../hocs/ui/withMain";
import { AwsS3 } from "../../../services/Aws";
import { UserContext } from "../../../contexts/UserContext";
import { EditMeet } from "../../../services/MeetingApi";
import { sido, sigungu } from "../../../components/common/AddressData";
import PageTitle from "../../../components/common/PageTitle";
import ContentName from "../../../components/common/ContentName";
import TextInput, { TextArea } from "../../../components/common/TextInput";
import SubmitButton from "../../../components/common/SubmitButton";
import checkmark_full from "../../../assets/images/checkmark_full.png";
import checkmark_outline from "../../../assets/images/checkmark_outline.png";
import imgIcon from "../../../assets/images/img-icon.png";
import deleteBtn from "../../../assets/images/delete_btn.png";

const EditMeeting = observer(() => {
	const { userStore } = useStores();
	const { user } = useContext(UserContext);
	const { state } = useLocation();
	const navigate = useNavigate();
	const originState: any = { state }.state;
	const [data, setData] = useState(originState.data);

	const uploadPhoto = useRef<any>("");
	const [meetingId, setMeetingId] = useState<number>(data.meetingId);
	const [title, setTitle] = useState<string>(data.title);
	const [category, setCategory] = useState<string>(data.category);
	const [intro, setIntro] = useState<string>(data.content);
	const [address, setAddress] = useState({
		doNm: data.doName,
		sigunguNm: data.sigungu,
	});
	const [place, setPlace] = useState<string>(data.location);
	const [condition, setCondition] = useState<string>(data.conditions);
	const [period, setPeriod] = useState<string>(data.period);
	const [maxpeople, setMaxpeople] = useState<number>(data.maxPeople);
	const [checkedMeetingType, setCheckedMeetingType] = useState<string>(
		data.meetingType
	);
	const [checkedPersonnel, setCheckedPersonnel] = useState<string>(
		data.maxPeople === 999999 ? "personnel1" : "personnel2"
	);
	const [sex, setSex] = useState<string>(data.sex);
	const [image, setImage] = useState<any[]>(data.imgUrlList);
	const [imageFile, setImageFile] = useState<any[]>(data.imgUrlList);
	const [isOpened, setIsOpened] = useState<boolean>(data.isOpened);

	const meetCategory = [
		{ name: "사진 공유", value: "PICTURE" },
		{ name: "산책", value: "WALK" },
		{ name: "봉사", value: "VOLUNTEER" },
		{ name: "클래스/수업", value: "CLASS" },
		{ name: "교육/훈련", value: "TRAINING" },
		{ name: "친목/모임", value: "AMITY" },
		{ name: "기타", value: "ETC" },
	];

	// 활동소개 이미지 업로드
	function PhotoUpdate() {
		if (uploadPhoto.current.files.length !== 0) {
			const reader = new FileReader();
			// 이미지가 로드가 된 경우
			reader.onload = (e: any) => {
				setImage([e.target.result]);
			};
			// reader가 이미지 읽도록 하기
			setImageFile([uploadPhoto.current.files[0]]);
			reader.readAsDataURL(uploadPhoto.current.files[0]);
		}
	}

	// 활동소개 이미지 제거
	const DeleteImg = () => {
		setImage([]);
		setImageFile([]);
	};

	// 모임상태 변경
	const changeState = (value: boolean) => {
		setIsOpened(value);
	};

	// 카테고리 변경
	const changeCategory = (value: string) => {
		setCategory(value);
	};

	// 지역 도 변경
	const changedoNm = (value: string) => {
		setAddress((address: any) => {
			return { ...address, doNm: value };
		});

		setAddress((address: any) => {
			return { ...address, sigunguNm: null };
		});
	};

	// 지역 시군구 변경
	const changesigunguNm = (value: string) => {
		setAddress((address: any) => {
			return { ...address, sigunguNm: value };
		});
	};

	// 날짜 및 시간 변경
	const radioPeriodHandler = (e: any) => {
		setPeriod("");
		setCheckedMeetingType(e.target.defaultValue);
	};

	const ChangeMeetingTime = (value: string) => {
		setPeriod(value);
	};

	// 참여인원 변경
	const radioPersonnelHandler = (e: any) => {
		if (e.target.value === "personnel1") {
			setMaxpeople(999999);
		} else {
			setMaxpeople(1);
		}
		setCheckedPersonnel(e.target.value);
	};

	const setMaxpeopleInput = (e: any) => {
		const value = e.target.value.replace(/[^0-9]/g, "");
		setMaxpeople(value);
	};

	// 성별 변경
	const radioGenderHandler = (e: any) => {
		setSex(e.target.defaultValue);
	};

	const meetingState = [
		{ state: true, value: "모집 중" },
		{ state: false, value: "모집 종료" },
	];

	const meetingType = [
		{ id: "REGULAR", value: "정기모임" },
		{ id: "ONCE", value: "1회 모임" },
	];
	const personnel = [
		{ id: "personnel1", value: "제한없음" },
		{ id: "personnel2", value: "직접입력" },
	];
	const gender = [
		{ id: "ALL", value: "누구나" },
		{ id: "MALE", value: "남성만" },
		{ id: "FEMALE", value: "여성만" },
	];

	async function Edit() {
		if (title === "") alert("제목을 입력해주세요");
		if (maxpeople === null) alert("모임인원을 입력해주세요");
		if (period === "") alert("모임날짜 및 시간을 입력해주세요");

		const validation = title != "" && maxpeople != null && period != "";

		if (validation === true) {
			const data = await AwsS3(imageFile);
			const editMeetData: any = await EditMeet(user, meetingId, {
				category: category,
				conditions: condition,
				content: intro,
				doName: address.doNm,
				imgUrlList: data,
				location: place,
				maxPeople: maxpeople,
				meetingType: checkedMeetingType,
				period: period,
				sex: sex,
				sigungu: address.sigunguNm,
				title: title,
				isOpened: isOpened,
			});

			if (editMeetData.status == 200) {
				navigate(-1);
			}
		}
	}
	return (
		<Wrapper>
			<PageTitle title="모임정보 수정" />
			<CreateContent>
				<Distance top={0} bottom={30}>
					<ContentName inputTitle="참여자 모집" />
					<RadioWrap>
						{meetingState.map((value) => (
							<>
								<Radio
									type="radio"
									name="meetState"
									id={value.value}
									defaultValue={value.value}
									onClick={() => changeState(value.state)}
								/>
								<RadioLabel
									htmlFor={value.value}
									Ischecked={isOpened === value.state}
								>
									{value.state ? "모집중" : "모집완료"}
								</RadioLabel>
							</>
						))}
					</RadioWrap>
				</Distance>
				<Distance top={0} bottom={20}>
					<ContentName inputTitle="제목" />
					<TextInput
						placeholder="어떤 모임을 같이 하고 싶나요?"
						maxLength={30}
						setData={setTitle}
						data={title}
					/>
				</Distance>
				<Distance top={0} bottom={20}>
					<ContentName inputTitle="카테고리" />
					<SelectBox>
						<Select
							placeholder="카테고리"
							width="100%"
							onChange={(e) => changeCategory(e.target.value)}
							value={category}
						>
							{meetCategory.map((c) => (
								<option key={c.value} value={c.value}>
									{c.name}
								</option>
							))}
						</Select>
					</SelectBox>
				</Distance>
				<Distance top={0} bottom={20}>
					<ContentName inputTitle="활동소개" />
					<ContentImg>
						<Label htmlFor="ex_file">
							<Preview>
								{image.length > 0 ? (
									<img src={image[0]} alt="미리보기 이미지" />
								) : (
									<PreviewImg
										src={imgIcon}
										alt="활동을 소개할 이미지를 등록하세요."
									/>
								)}
							</Preview>
						</Label>
						{image.length > 0 && (
							<DeleteImgBtn onClick={DeleteImg}>
								<img src={deleteBtn} alt="이미지 삭제" />
							</DeleteImgBtn>
						)}
					</ContentImg>
					<File
						type="file"
						id="ex_file"
						accept="image/png, image/jpeg, image/jpg"
						onChange={() => {
							PhotoUpdate();
						}}
						ref={uploadPhoto}
					/>
					<TextArea
						placeholder="펫피들에게 하고싶은 활동에 대해 설명해주세요."
						setData={setIntro}
						data={intro}
					/>
				</Distance>
				<Distance top={0} bottom={20}>
					<ContentName inputTitle="장소" />
					<SelectBox>
						<Select
							placeholder="시/도"
							width="calc(50% - 5px)"
							onChange={(e) => changedoNm(e.target.value)}
							value={address.doNm}
						>
							{sido.map((s) => (
								<option key={s.value} value={s.value}>
									{s.name}
								</option>
							))}
						</Select>
						<Select
							placeholder="시/군/구"
							width="calc(50% - 5px)"
							onChange={(e) => changesigunguNm(e.target.value)}
							value={address.sigunguNm}
						>
							{address.doNm ? (
								sigungu[address.doNm].map(
									(sigunguNm: string, index: any) => (
										<option key={index} value={sigunguNm}>
											{sigunguNm}
										</option>
									)
								)
							) : (
								<></>
							)}
						</Select>
					</SelectBox>
					<TextInput
						placeholder="모임 장소를 입력해 주세요."
						maxLength={30}
						setData={setPlace}
						data={place}
					/>
				</Distance>
				<Distance top={0} bottom={20}>
					<ContentName inputTitle="모임 참여 조건" />
					<TextInput
						placeholder="어떤 참가자들과 함께 하고 싶으신가요?"
						maxLength={30}
						setData={setCondition}
						data={condition}
					/>
				</Distance>
				<Distance top={0} bottom={0}>
					<ContentName inputTitle="날짜 및 시간" />
					<RadioWrap>
						{meetingType.map((value) => (
							<>
								<Radio
									type="radio"
									name="period"
									id={value.id}
									defaultValue={value.id}
									onClick={radioPeriodHandler}
								/>
								<RadioLabel
									htmlFor={value.id}
									Ischecked={checkedMeetingType === value.id}
								>
									{value.value}
								</RadioLabel>
							</>
						))}
					</RadioWrap>
					{checkedMeetingType === "REGULAR" && (
						<TextInput
							placeholder="정기모임을 할 약속시간을 입력해주세요."
							setData={setPeriod}
							data={period}
						/>
					)}
					{checkedMeetingType === "ONCE" && (
						<DateTime
							type="datetime-local"
							id="meeting-time"
							name="meeting-time"
							value={period}
							onChange={(e: any) =>
								ChangeMeetingTime(e.target.value)
							}
							//
						/>
					)}
				</Distance>
				<Line />
				<Distance top={0} bottom={0}>
					<ContentName inputTitle="인원" />
					<RadioWrap>
						{personnel.map((value) => (
							<>
								<Radio
									type="radio"
									name="personnel"
									id={value.id}
									defaultValue={value.id}
									onClick={radioPersonnelHandler}
								/>
								<RadioLabel
									htmlFor={value.id}
									Ischecked={checkedPersonnel === value.id}
								>
									{value.value}
								</RadioLabel>
							</>
						))}
						{checkedPersonnel === "personnel2" && (
							<TextInputShort
								width="120px"
								placeholder="숫자만"
								onChange={setMaxpeopleInput}
								value={maxpeople}
							/>
						)}
					</RadioWrap>
				</Distance>
				<Line />
				<Distance top={0} bottom={40}>
					<ContentName inputTitle="성별" />
					<RadioWrap>
						{gender.map((value) => (
							<>
								<Radio
									type="radio"
									name="gender"
									id={value.id}
									defaultValue={value.id}
									onClick={radioGenderHandler}
								/>
								<RadioLabel
									htmlFor={value.id}
									Ischecked={sex === value.id}
								>
									{value.value}
								</RadioLabel>
							</>
						))}
					</RadioWrap>
				</Distance>
				<SubmitButton text="수정 완료" onClick={() => Edit()} />
			</CreateContent>
		</Wrapper>
	);
});

export default withMain(EditMeeting, "펫미팅");

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
`;

const CreateContent = styled.div`
	padding: 40px;
	background-color: #fff;

	@media screen and (max-width: 600px) {
		padding: 20px;
	}
`;

const Distance = styled.div<{ top: number; bottom: number }>`
	margin-top: ${(props) => props.top}px;
	margin-bottom: ${(props) => props.bottom}px;
`;

const RadioWrap = styled.div`
	margin: 10px 0;
`;

const Radio = styled.input`
	display: none;
`;

const RadioLabel = styled.label`
	cursor: pointer;
	width: 120px;
	padding: 0 28px;
	background: url(${(props: { Ischecked: boolean }) =>
			props.Ischecked ? checkmark_full : checkmark_outline})
		no-repeat left center / 20px;
`;

const Line = styled.div`
	background-color: #cfcfcf;
	height: 1px;
	margin: 20px 0;
`;

const SelectBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Select = styled.select`
	width: ${(props: { width: string }) => props.width};
	border: 1px solid #c1c1c1;
	box-sizing: border-box;
	border-radius: 5px;
	font-size: 15px;
	padding: 10px;
`;

const DateTime = styled.input`
	width: 100%;
	border: 1px solid #c1c1c1;
	box-sizing: border-box;
	border-radius: 5px;
	font-size: 15px;
	padding: 10px;
`;

const TextInputShort = styled.input`
	width: ${(props: { width: string }) => props.width};
	border: 1px solid #cfcfcf;
	box-sizing: border-box;
	border-radius: 5px;
	background-color: #fff;
	padding: 12px 10px;

	&::placeholder {
		color: #d0d0d0;
		font-size: 16px;
		position: relative;
		top: 2px;
	}

	@media screen and (max-width: 600px) {
		&::placeholder {
			font-size: 14px;
		}
	}
`;

const ContentImg = styled.div`
	width: 100%;
	height: 110px;
	overflow: hidden;
	position: relative;
`;

const Label = styled.label`
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	height: 110px;
	line-height: normal;
	text-align: center;
	color: #979797;
	font-size: 16px;
	vertical-align: middle;
	cursor: pointer;
	background-color: #f7f7f7;
	border: 1px solid #cfcfcf;
	border-radius: 4px;
	box-sizing: border-box;

	& img {
		width: 20px;
		height: fit-content;
	}
`;

const File = styled.input`
	position: absolute;
	width: 0;
	height: 0;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	border: 0;
`;

const Preview = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	& img {
		width: 100%;
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

const PreviewImg = styled.img`
	width: 25px !important;
	height: fit-content;
	margin-right: 8px;
`;

const DeleteImgBtn = styled.button`
	width: 26px;
	height: 26px;
	background-color: transparent;
	position: absolute;
	right: 10px;
	top: 10px;

	& img {
		width: 26px;
	}
`;
