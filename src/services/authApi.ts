import axios from "axios";

export const SignUp = (user: any, nickname: string, introduce: string) => {
	axios
		.post(
			"http://3.39.122.247:8080/members",
			{
				nickname: nickname,
				imgUrl:
					"https://github.githubassets.com/images/modules/profile/badge--acv-64.png",
				introduce: introduce,
			},
			{
				headers: user,
			}
		)
		.then((e) => {
			console.log(e);
		});
};
