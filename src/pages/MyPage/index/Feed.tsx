import styled from "styled-components";
import { useStores } from "../../../hooks/useStores";
import { observer } from "mobx-react";
import SampleImg from '../../../assets/images/bg1.png';


const Feed = observer(() => {
	const { userStore } = useStores();
	
	return (
		<Wrapper>
			<Img src={SampleImg} alt="활동사진" />
            <Img src={SampleImg} alt="활동사진" />
            <Img src={SampleImg} alt="활동사진" />
            <Img src={SampleImg} alt="활동사진" />
            <Img src={SampleImg} alt="활동사진" />
            <Img src={SampleImg} alt="활동사진" />
            <Img src={SampleImg} alt="활동사진" />
		</Wrapper>
	);
});

export default Feed;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	padding: 0 20px;
`;

const Img = styled.img`
width: calc(33.3% - 7px);
border: 1px solid black;
box-sizing: border-box;
margin: 10px 10px 0 0;
cursor: pointer;

&:nth-child(3n){
    margin-right: 0;
}
`;