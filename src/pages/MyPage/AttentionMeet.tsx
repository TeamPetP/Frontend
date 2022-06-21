import styled from "styled-components";
import withMain from "../../hocs/ui/withMain";
import { useStores } from "../../hooks/useStores";
import { observer } from "mobx-react";
const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`;

const AttentionMeetPage = observer(() => {
	const { userStore } = useStores();
	return (
		<Wrapper>
			<div>mypage AttentionMeetPage {userStore.getName}</div>
			<input
				onChange={(value) => {
					userStore.setName(value.target.value);
				}}
			/>
		</Wrapper>
	);
});

export default withMain(AttentionMeetPage, "마이페이지");
