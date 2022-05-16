import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  padding: 30px;
`;

export const CampLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: start;
`;

export const Thumb = styled.img`
  width: 180px;
  height: 125px;
`;

export const Info = styled.div`
  padding: 10px 10px 10px 30px;
  font-size: 16px;
  color: #000;
  line-height: 2;
  text-align: left;
`;
