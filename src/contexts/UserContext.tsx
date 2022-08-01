import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { auth, signOut } from "../services/firebaseAuth";
import axios from "axios";
import { useStores } from "../hooks/useStores";
export const UserContext: any = React.createContext(null);

export const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState({});
	const navigate: any = useNavigate();
	const { modalStore, userStore } = useStores();

	const [firebaseUser, setFirebaseUser] = useState<any>(false);
	let defaultHeaders: any = {
		"Content-Type": "application/json",
		Accept: "application/json",
	};

	useEffect(() => {
		console.log("handle2");
		// 토큰을 가져온다.
		// Header에 인증 정보 추가
		// defaultHeaders.Authorization = `Bearer ${firebaseUser}`;
		// defaultHeaders.userAccessState = false;
		// 로그인 시도 (백엔드 API 구현 필요)

		axios
			.get(`${process.env.REACT_APP_SERVER_API_URL}/members/me`, {
				headers: {
					Authorization: `Bearer ${firebaseUser}`,
					...defaultHeaders,
				},
			})
			.then((res: any) => {
				// 로그인 성공시 user를 넘겨줌
				console.log("Result", res);
				userStore.info = res.data;
				setUser({
					...defaultHeaders,
					userAccessState: true,
					Authorization: `Bearer ${firebaseUser}`,
				});
				modalStore.signInState = false;
			})
			.catch((e) => {
				console.log("Result_Err", e, e.response);
				if (e.response?.data.code === "USER_NOT_FOUND") {
					setUser({
						...defaultHeaders,
						userAccessState: false,
						Authorization: `Bearer ${firebaseUser}`,
					});

					modalStore.signUpState = true;
					modalStore.signInState = false;
				}
			});
	}, [firebaseUser]);

	useEffect(() => {
		auth.onAuthStateChanged(async (firebaseUser: any) => {
			console.log("Auth CHange");
			if (firebaseUser) {
				const token = await firebaseUser.getIdToken(true);
				setFirebaseUser(token);
			} else {
				// 로그아웃시 Header에서
				defaultHeaders = {};
				setFirebaseUser("");
				setUser({});
			}
		});
	}, []); // 컴포넌트 첫 로딩시만 실행되도록 []
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
