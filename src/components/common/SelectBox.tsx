import styled from "styled-components";
import * as theme from "../../styles/theme";

interface ISelectType {
  width?: string;
  height?: string;
  options: any;
  onChange?: any;
}
function SelectBox({
  width = "100%",
  height = "40px",
  options,
  onChange,
}: ISelectType) {
  return (
    <Select
      width={width}
      height={height}
      options={options}
      onChange={() => onChange()}
    >
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </Select>
  );
}

const Select = styled.select<ISelectType>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 2px solid #dddddd;
  border-radius: 4px;
  padding: 8px;
`;

export default SelectBox;
