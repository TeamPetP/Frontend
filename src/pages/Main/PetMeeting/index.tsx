import MeetList from '../../../components/PetMeeting/MeetList';
import styled from 'styled-components';
import { useStores } from '../../../hooks/useStores';
import { observer } from 'mobx-react';
import withMain from '../../../hocs/ui/withMain';
import * as theme from '../../../styles/theme';
import pencil from '../../../assets/images/pencil.png';

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	padding: 10px;
`;

const IndexPage = observer(() => {
	const { userStore } = useStores();

	return (
		<Wrapper>
			<MeetList />
			<MeetList />
			<CreateMeetingBtn />
		</Wrapper>
	);
});

export default withMain(IndexPage, '펫미팅');

const CreateMeetingBtn = styled.button`
	position: fixed;
	bottom: 20px;
	right: 20px;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background: ${theme.PrimaryColor} url(${pencil}) no-repeat center center /
		20px;
`;
