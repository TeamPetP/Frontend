import styled from "styled-components";
import * as theme from "../../../styles/theme";
import Tag from '../../../components/common/Tag';
import crown from "../../../assets/images/bookmark_active.png";
import user_profile from "../../../assets/images/user_profile.png";

const MyMeetList = ({data} : any) => {

    let memberId = 4321;
    

	const editMeet = () => {
		console.log(`수정하기`);
	}
	
	const management = () => {
		console.log(`참여자관리`);
	}
	
	 const leaveMeet = () => {
		 console.log(`탈퇴하기`);
	 }
	
	 const cancleParticipation = () => {
		 console.log(`참여취소`);
	 }
	return (
		<Wrapper>
			<Options>
				<Tags>
					{data.status === "모집중" && <Tag color={theme.PrimaryColor} text="D-3" />}
					<Tag text={data.category} />
				</Tags>
			</Options>
			<Top>
					<Progress Isprogress={data.status === "모집중"}>
						{data.status === "모집중" ? '모집중' : '모집완료'}
					</Progress>
					<Title crown={memberId === data.memberId}>{data.title}</Title>
			</Top>
			<Content>
				{data.content}
			</Content>
            <Participate>
                <div>참여중인 친구 <span>{data.members.length}/5</span></div>
                <Profile src={user_profile} alt="참여자 프로필"/>
                <Profile src={user_profile} alt="참여자 프로필"/>
                <Profile src={user_profile} alt="참여자 프로필"/>
            </Participate>

            {memberId === data.memberId && 
                (<SpaceBetween>
                    <Button width="calc(50% - 5px)" onClick={() =>editMeet()} >수정하기</Button>
                    <Button width="calc(50% - 5px)" onClick={() =>management()} >참여자 관리</Button>
                </SpaceBetween>)
            }
            {/* <Button width="100%" onClick={() =>leaveMeet()} >탈퇴하기</Button> */}
            {memberId !== data.memberId && <Button width="100%" onClick={() =>cancleParticipation()} >참여 취소</Button>}
            
		</Wrapper>
	);
};

export default MyMeetList;

const Wrapper = styled.div`
	width: 100%;
    padding: 20px;
    border : 2px solid #ddd;
    box-sizing : border-box;
    margin-bottom: 10px;
    position: relative;
    background-color: #fff;

	&:last-child {
		margin-bottom: 0;
	}
`;

const Participate = styled.div`
    font-weight : bold;
    &>div{
        margin-bottom : 8px;
    }

    & span {
        color : ${theme.PrimaryColor};
        margin-left : 4px;
    }
`;

const Profile = styled.img`
    width: 50px;
    margin-right : 4px;

    &:last-child {
        margin-right : 0;
    }
`;

const SpaceBetween = styled.div`
	display: flex;
	justify-content : space-between;
	align-items : center;
	margin-top : 10px;
`;

const Button = styled.button`
	color : #575757;
	border: 1px solid #c9c9c9;
	border-radius: 3px;
	width: ${(props: { width: string }) => props.width};
	display: block;
    height: 35px;
`;




/*  */

const Options = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Tags = styled.div`
	justify-content: start;
`;

const Content = styled.div`
	background-color: #fbfbfb;
	border: 2px solid #ebebeb;
    border-radius: 4px;
	box-sizing: border-box;
	padding: 18px;
	margin: 16px 0;
	line-height: 1.5;
	color : ${theme.TextSubColor};
`;

const Top = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	margin: 16px 0;
    font-size: 18px;
	font-weight: 500;
	color: #000000;
`;

const Title = styled.div`
	position : relative;

    &::after {
        content : '';
        display: ${(props: { crown: boolean }) => props.crown ? "inline-block" : "none"};
        clear: both;
        width: 20px;
        height: 20px;
        background: url(${crown}) no-repeat center center / contain;
    }
`;

const Progress = styled.span`
	color: ${(props: { Isprogress: boolean }) =>
		props.Isprogress ? theme.PrimaryColor : '#C1C1C1'};
	margin-right: 8px;
`;