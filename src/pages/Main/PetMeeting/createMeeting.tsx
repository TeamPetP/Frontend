import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import * as theme from '../../../styles/theme';
import { useStores } from '../../../hooks/useStores';
import { observer } from 'mobx-react';
import withMain from '../../../hocs/ui/withMain';
import PageTitle from '../../../components/common/PageTitle';
import ContentName from '../../../components/common/ContentName';
import ImageUpload from '../../../components/common/ImageUpload';
import TextInput, { TextArea } from '../../../components/common/TextInput';
import SubmitButton from '../../../components/common/SubmitButton';
import checkmark_full from '../../../assets/images/checkmark_full.png';
import checkmark_outline from '../../../assets/images/checkmark_outline.png';

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
`;

const CreateMeeting = observer(() => {
	const { userStore } = useStores();
	const [checkedPeriod, setCheckedPeriod] = useState('period1');
	const [checkedPersonnel, setCheckedPersonnel] = useState('personnel1');
	const [checkedGender, setCheckedGender] = useState('gender0');
	const [checkedAge, setCheckedAge] = useState('age0');
	const [postOption, setPostOption] = useState({
		postTitle: '',
		postContent: '',
		postImage: [],
		categoryType: '카테고리',
	});

	const radioPeriodHandler = (e: any) => {
		setCheckedPeriod(e.target.defaultValue);
	};

	const radioPersonnelHandler = (e: any) => {
		setCheckedPersonnel(e.target.defaultValue);
	};
	const radioGenderHandler = (e: any) => {
		setCheckedGender(e.target.defaultValue);
	};
	const radioAgeHandler = (e: any) => {
		setCheckedAge(e.target.defaultValue);
	};

	const period = [
		{ id: 'period1', value: '정기모임' },
		{ id: 'period2', value: '1회 모임' },
	];
	const personnel = [
		{ id: 'personnel1', value: '제한없음' },
		{ id: 'personnel2', value: '직접입력' },
	];
	const gender = [
		{ id: 'gender0', value: '누구나' },
		{ id: 'gender1', value: '남성만' },
		{ id: 'gender2', value: '여성만' },
	];
	const age = [
		{ id: 'age0', value: '누구나' },
		{ id: 'age1', value: '직접입력' },
	];

	const setImageUpload = useCallback(
		(/* image */) => {
			/* setPostOption((postOption) => {
      return { ...postOption, postImage: [...postOption.postImage, image] };
    }); */
		},
		[]
	);

	return (
		<Wrapper>
			<PageTitle title="모임 만들기" />
			<CreateContent>
				<Distance top={0} bottom={20}>
					<ContentName inputTitle="제목" />
					<TextInput
						placeholder="어떤 모임을 같이 하고 싶나요?"
						maxLength={30}
					/>
				</Distance>
				<Distance top={0} bottom={20}>
					<ContentName inputTitle="활동소개" />
					<ImageUpload setImageUpload={setImageUpload} />
					<TextArea placeholder="펫피들에게 하고싶은 활동에 대해 설명해주세요." />
				</Distance>
				<Distance top={0} bottom={20}>
					<ContentName inputTitle="장소" />
					<TextInput placeholder="모임 장소를 입력해 주세요." maxLength={30} />
				</Distance>
				<Distance top={0} bottom={0}>
					<ContentName inputTitle="날짜 및 시간" />
					<RadioWrap>
						{period.map((value) => (
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
									Ischecked={checkedPeriod === value.id}
								>
									{value.value}
								</RadioLabel>
							</>
						))}
					</RadioWrap>
					{checkedPeriod === 'period1' && (
						<TextInput placeholder="정기모임을 할 약속시간을 입력해주세요." />
					)}
					{checkedPeriod === 'period2' && (
						<TextInput placeholder="모임을 할 약속시간과 날짜를 입력해주세요." />
					)}{' '}
					{/* 캘린더로 바꾸기 */}
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
						{checkedPersonnel === 'personnel2' && (
							<TextInput
								width="120px"
								marginTop="0"
								marginBottom="0"
								placeholder="숫자만"
							/>
						)}{' '}
						{/* 캘린더로 바꾸기 */}
					</RadioWrap>
				</Distance>
				<Line />
				<Distance top={0} bottom={0}>
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
									Ischecked={checkedGender === value.id}
								>
									{value.value}
								</RadioLabel>
							</>
						))}
					</RadioWrap>
				</Distance>
				<Line />
				<Distance top={0} bottom={40}>
					<ContentName inputTitle="나이" />
					<RadioWrap>
						{age.map((value) => (
							<>
								<Radio
									type="radio"
									name="age"
									id={value.id}
									defaultValue={value.id}
									onClick={radioAgeHandler}
								/>
								<RadioLabel
									htmlFor={value.id}
									Ischecked={checkedAge === value.id}
								>
									{value.value}
								</RadioLabel>
							</>
						))}
					</RadioWrap>
					{checkedAge === 'age1' && (
						<>
							<TextInput width="48%" /> ~ <TextInput width="48%" />
						</>
					)}
				</Distance>
				<SubmitButton text="모임 만들기" />
			</CreateContent>
		</Wrapper>
	);
});

export default withMain(CreateMeeting, '펫미팅');

const CreateContent = styled.div`
	padding: 40px;
	background-color: #fff;
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
