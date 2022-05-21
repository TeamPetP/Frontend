import React, { useEffect, useState } from "react";
import { Container, CampLink, Thumb, Info } from "./Notice.style";

const Notice = ({ pet }) => {
  return (
    <Container>
      <CampLink to={`/`}>
        <Thumb src={pet.filename}></Thumb>
        <Info>
          <div>{pet.processState}</div>
          <div>{pet.sexCd}</div>
          <div>{pet.careNm}</div>
        </Info>
      </CampLink>
    </Container>
  );
};

export default Notice;
