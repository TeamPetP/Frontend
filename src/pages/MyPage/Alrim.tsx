import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import withMain from "../../hocs/ui/withMain";
import { observer } from "mobx-react";
import * as theme from "../../styles/theme";
import PageTitle from "../../components/common/PageTitle";
import AlrimContent from "./alrim/AlrimContent";
import { UserContext } from "../../contexts/UserContext";
import {
	SearchAlrim,
	CheckedAllAlrim,
	DeleteAllAlrim,
	DeleteAlrim,
	CheckedAlrim,
} from "../../services/notificationApi";
import nullIcon from "../../assets/images/null.png";

const AlrimPage = observer(() => {
	const [alrimdata, setAlrimData] = useState<any>([]);
	const { user } = useContext(UserContext);

	useEffect(() => {
		async function fetchData() {
			console.log("test", user);
			const d: any = await SearchAlrim(user);
			console.log("Daata", d);
			setAlrimData(d.data);
		}
		fetchData();
	}, [user]);

	async function alrimAllChecked() {
		console.log(`모든 알림 읽기`);
		const d: any = await CheckedAllAlrim(user);
		console.log("모든 알림 읽기", d);
		setAlrimData(d.data);
	}

	async function alrimAllDelete() {
		console.log(`알림 전체 삭제`);
		const d: any = await DeleteAllAlrim(user);
		console.log("알림 전체 삭제", d.data);
		setAlrimData(d.data);
	}

	async function deleteAlrim(notificationId: number) {
		console.log(`이 알림만 삭제`);
		const d: any = await DeleteAlrim(user, notificationId);
		console.log("이 알림만 삭제", d.data);
		setAlrimData(d.data);
	}

	async function ReadAlrim(notificationId: number) {
		console.log(`이 알림만 읽기`);
		const d: any = await CheckedAlrim(user, notificationId);
		console.log("이 알림만 읽기", d);
		setAlrimData(d.data);
	}

	return (
		<Wrapper>
			<PageTitle title="알림" />
			<ContentArea>
				{alrimdata.content != null &&
					alrimdata.content.map((data: any) => {
						return (
							<AlrimContent
								data={data}
								key={data.notificationId}
								deleteAlrim={deleteAlrim}
								ReadAlrim={ReadAlrim}
							/>
						);
					})}
				{alrimdata.content == null || alrimdata.content.length === 0 ? (
					<NullWrapper>
						<img src={nullIcon} />
						<div>새로운 알림이 없습니다.</div>
					</NullWrapper>
				) : (
					<></>
				)}
				<SpaceBetween>
					<Button onClick={alrimAllChecked}>모든 알림 읽기</Button>
					<Button onClick={alrimAllDelete}>전체 삭제</Button>
				</SpaceBetween>
			</ContentArea>
		</Wrapper>
	);
});

export default withMain(AlrimPage, "마이페이지");

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`;

const ContentArea = styled.div`
	padding: 10px 40px;

	@media screen and (max-width: 600px) {
		padding: 10px;
	}
`;

const SpaceBetween = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 10px;
`;

const Button = styled.button`
	color: ${theme.TextConentColor};
	border: 1px solid ${theme.TextSubColor};
	border-radius: 3px;
	width: calc(50% - 5px);
	height: 50px;
	display: block;
	font-size: 20px;

	@media screen and (max-width: 600px) {
		font-size: 16px;
		height: 40px;
	}
`;

const NullWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	height: calc(100% - 180px);
	margin: 20px 0px;
	& > div {
		margin-top: 20px;
		margin-bottom: 40px;
		font-family: "yg-jalnan";

		font-size: 28px;
	}
	& > img {
		width: 100%;
	}
`;
