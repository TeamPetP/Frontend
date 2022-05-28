import React from 'react';
import styled from 'styled-components';
import default_img from '../../assets/images/default_img.png';

function DefaultImg() {
	return (
		<ImgArea>
			<Icon src={default_img} />
		</ImgArea>
	);
}

const ImgArea = styled.div`
	width: 100%;
	height: 180px;
	position: relative;
	background-color: #e9eef1;
	margin: 20px 0;
`;

const Icon = styled.img`
	width: 30px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export default DefaultImg;
