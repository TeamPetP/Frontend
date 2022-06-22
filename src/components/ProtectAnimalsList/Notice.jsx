import React, { useEffect, useState } from "react";
import { Container, CampLink, Thumb, Info } from "./Notice.style";

const Notice = ({ pet }) => {
	return (
		<Container>
			<CampLink to={`/`}>
				<Thumb src={pet.filename}></Thumb>
				<Info>
					<div>상태 : {pet.processState}</div>
					<div>성별 : {pet.sexCd}</div>
					<div>보호소 : {pet.careNm}</div>
				</Info>
			</CampLink>
		</Container>
	);
};

export default Notice;
