import styled from "styled-components";
import { useStores } from "../../hooks/useStores";
import { observer } from "mobx-react";
import withMain from "../../hocs/ui/withMain";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`;

const PetMeetingPage = observer(() => {
	const { userStore } = useStores();
	return (
		<Wrapper>
			<div>index page {userStore.getName}</div>
			<input
				onChange={(value) => {
					userStore.setName(value.target.value);
				}}
			/>
		</Wrapper>
	);
});

export default withMain(PetMeetingPage, "펫미팅");
