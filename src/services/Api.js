import axios from "axios";
import XMLParser from "react-xml-parser";

export const AbandonedAnimals = () => {
	return new Promise((resolve, reject) => {
		axios
			.get(
				`https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=wPvuYWDBBrqTMYnyvn%2BVxPOMP16o0uUHFPl0CumevcsUyxBTsyLhW9rtuzYFDCyLMbiYp%2FuYkrq4vIVXJIdxxA%3D%3D&_type=json`
			)
			.then((response) => {
				console.log(response);
				resolve(response.data.response.body.items.item);
			})
			.catch((e) => {
				reject(e);
			});
	});
};
