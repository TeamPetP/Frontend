import styled from 'styled-components';
import * as theme from '../../../styles/theme';

interface IInputType {
	color?: string;
	text: string;
}
const Tags = ({ color = theme.TextConentColor, text }: IInputType) => {
	return <Tag color={color}>{text}</Tag>;
};

export default Tags;

const Tag = styled.span`
	padding: 4px 20px;
	background-color: ${(props) => props.color};
	color: #fff;
	border-radius: 5px;
	font-size: 16px;
	margin-right: 8px;
`;
