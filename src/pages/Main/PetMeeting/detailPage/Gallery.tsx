import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import SampleImg from '../../../../assets/images/bg1.png';


const Gallery = observer(() => {

	return (
		<GalleryWRap>
            <Img src={SampleImg} alt="활동사진" />
            <Img src={SampleImg} alt="활동사진" />
            <Img src={SampleImg} alt="활동사진" />
            <Img src={SampleImg} alt="활동사진" />
            <Img src={SampleImg} alt="활동사진" />
            <Img src={SampleImg} alt="활동사진" />
            <Img src={SampleImg} alt="활동사진" />
		</GalleryWRap>
	);
});

export default Gallery;

const GalleryWRap =styled.div`
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