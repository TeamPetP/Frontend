import styled from "styled-components";
import { useStores } from "../../../hooks/useStores";
import { observer } from "mobx-react";
import withMain from "../../../hocs/ui/withMain";
import { useState } from "react";

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
`;
const Test = styled.div`
	width: 49%;
	height: 200px;
	background-color: red;
`;
const Test2 = styled.div`
	width: 49%;
	height: 200px;
	background-color: blue;
`;
const IndexPage = observer(() => {
	const { userStore } = useStores();
	const [a, setA] = useState<string>("fs");

	const ad = () => {
		console.log("adad");
		setA("dadd");
	};
	return (
		<Wrapper>
			<Test></Test> <Test2 onClick={() => ad()}></Test2>
			{a}
		</Wrapper>
	);
});

export default withMain(IndexPage, "팻피그램");
