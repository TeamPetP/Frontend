import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { auth, signOut } from "../services/firebaseAuth";
import axios from "axios";
import { useStores } from "../hooks/useStores";

export const UserContext: any = React.createContext(null);

export const defaultHeaders: any = {
	"Content-Type": "application/json",
	Accept: "application/json",
};

export const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState(null);
	const navigate: any = useNavigate();
	const { modalStore } = useStores();

	useEffect(() => {
		// 로그아웃
		signOut();
		auth.onAuthStateChanged(async (firebaseUser: any) => {
			console.log("auth auto state");
			if (firebaseUser) {
				console.log("login");
				// 토큰을 가져온다.
				const token = await firebaseUser.getIdToken();
				console.log(token);
				// Header에 인증 정보 추가
				defaultHeaders.Authorization = `Bearer ${token}`;
				// 로그인 시도 (백엔드 API 구현 필요)
				setUser(defaultHeaders);
				console.log("testtest");
				axios
					.get("http://3.39.122.247:8080/members/me", {
						headers: defaultHeaders,
					})
					.then(async (res: any) => {
						console.log("testdtest");

						// 로그인 성공시 user를 넘겨줌
						console.log(res.data);
						// setUser(user);
						modalStore.signInState = false;
					})
					.catch((e) => {
						console.log("test2dtest");

						if (e.response?.data.code === "USER_NOT_FOUND") {
							modalStore.signUpState = true;
							modalStore.signInState = false;
						}
					});
			} else {
				// 로그아웃시 Header에서
				delete defaultHeaders.Authorizations;
				setUser(null);
			}
		});
	}, []); // 컴포넌트 첫 로딩시만 실행되도록 []
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
