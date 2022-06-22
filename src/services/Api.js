import axios from "axios";
import XMLParser from "react-xml-parser";

export const AbandonedAnimals = () => {
	return new Promise((resolve, reject) => {
		console.log("1111");
		axios
			.get(
				`https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=wPvuYWDBBrqTMYnyvn%2BVxPOMP16o0uUHFPl0CumevcsUyxBTsyLhW9rtuzYFDCyLMbiYp%2FuYkrq4vIVXJIdxxA%3D%3D&_type=json`
			)
			.then((response) => {
				console.log("111111", response);
				resolve(response.data.response.body.items.item);
			})
			.catch((e) => {
				console.log("catch", e);
				reject(e);
			});
	});
};
