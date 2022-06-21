import axios from "axios";
import XMLParser from "react-xml-parser";

export const AbandonedAnimals = () => {
	return new Promise((resolve, reject) => {
		axios
			.get(
				`http://openapi.animal.go.kr:80/openapi/service/rest/abandonmentPublicSrvc?_wadl&type=xml`,
				{
					headers: {
						Authorization:
							"Bearer bNYMycUzaFkh3GXimcoDB2ZyjhRBw4wtJOVnzELf+tGrEUnWv09F8lhU5D33vD+BD14xi0TuG+m6VDdQC2jncg==",
					},
				}
			)
			.then((response) => {
				console.log(response);
				const dataArr = new XMLParser().parseFromString(response)
					.children;
				console.log(dataArr);
				resolve(dataArr);
			})
			.catch((e) => {
				reject(e);
			});
	});
};
