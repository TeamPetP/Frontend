import MeetList from "../../../components/PetMeeting/MeetList";
import styled from "styled-components";
import { observer } from "mobx-react";
import withMain from "../../../hocs/ui/withMain";
import * as theme from "../../../styles/theme";
import pencil from "../../../assets/images/pencil.png";
import { useNavigate } from "react-router";

const IndexPage = observer(() => {
	const navigate = useNavigate();

	const moveDetailPage = () => {
		navigate(`/meeting/detail`);
	};

	const moveCreatePage = () => {
		navigate(`/meeting/create`);
	};
	return (
		<Wrapper>
			<MeetList moveDetailPage={moveDetailPage} />
			<CreateButton onClick={moveCreatePage}>
				<CreateButtonImage src={pencil} alt="create button" />
			</CreateButton>
		</Wrapper>
	);
});

export default withMain(IndexPage, "펫미팅");

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	padding: 10px;
`;

const CreateButton = styled.div`
	position: sticky;
	bottom: 0px;
	right: -10px;

	width: 60px;
	height: 60px;

	border-radius: 100%;

	background-color: #f3593a;

	display: flex;
	justify-content: center;
	align-items: center;

	margin-left: auto;

	cursor: pointer;
`;

const CreateButtonImage = styled.img`
	width: 24px;
	height: 24px;
`;
