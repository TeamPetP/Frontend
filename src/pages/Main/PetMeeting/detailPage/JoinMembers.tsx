import { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { useLocation } from "react-router";
import withMain from "../../../../hocs/ui/withMain";
import PageTitle from "../../../../components/common/PageTitle";

const JoinMembers = observer(() => {
	const { state } = useLocation();
	const originState: any = { state }.state;
	const [data, setData] = useState(originState.data.joinMembers);
	return (
		<Wrapper>
			<PageTitle title="모임 참여자 목록" />
			<ContentWrap>
				<FlexStart>
					{data?.map((d: any) => (
						<Cell key={d.memberId}>
							<Profile
								src={d.memberImgUrl}
								alt={`${d.nickname}의 프로필`}
							/>
							<Nickname>{d.nickname}</Nickname>
						</Cell>
					))}
				</FlexStart>
			</ContentWrap>
		</Wrapper>
	);
});

export default withMain(JoinMembers, "펫미팅");

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
`;

const ContentWrap = styled.div`
	padding: 40px;
	background-color: #fff;
`;

const FlexStart = styled.div`
	width: 100%;
`;

const Cell = styled.div`
	width: 20%;
	text-align: center;
	display: inline-block;
	margin-bottom: 15px;
`;
const Profile = styled.img`
	width: 60px;
	margin: 0;
	border-radius: 50%;
`;

const Nickname = styled.div`
	text-align: center;
`;
