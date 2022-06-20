import styled from "styled-components";

const Wrap = styled.div`
  position: relative;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 110px;
  overflow: hidden;
  line-height: normal;
  text-align: center;
  color: #979797;
  font-size: 16px;
  vertical-align: middle;
  cursor: pointer;
  background-color: #f7f7f7;
  border: 1px solid #cfcfcf;
  border-radius: 4px;
  box-sizing: border-box;

  & img {
    width: 20px;
    height: fit-content;
  }
`;

const File = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const Preview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  & img {
    width: 80px;
    height: fit-content;
    margin-right: 8px;
  }
`;

export const style = {
  Wrap,
  Label,
  File,
  Preview,
};
