import AWS from "aws-sdk";
import { v1 } from "uuid";

function AwsS3(fileList) {
	return new Promise(async (resolve, reject) => {
		console.log("stat");
		const s3 = new AWS.S3({
			accessKeyId: process.env.REACT_APP_AWSAccessKeyId,
			secretAccessKey: process.env.REACT_APP_AWSSecretKey,
		});

		let resultList = [];
		for (let file of fileList) {
			var fileExt = file.type.slice(file.type.indexOf("/") + 1);
			console.log(file, fileExt);
			const param = {
				Bucket: "petp-s3",
				Key: `images/${v1().toString().replace("-", "")}.${fileExt}`,
				Body: file,
				ACL: "public-read",
				ContentType: file.type,
			};
			console.log(param);

			function UpLoad() {
				return new Promise((resolve, reject) => {
					s3.upload(param, (err, result) => {
						if (err) throw err;
						console.log(result);
						resultList.push(result.Location);
						resolve(result);
					});
				});
			}
			await UpLoad();
		}
		console.log("result", resultList);
		resolve(resultList);
	});
}
export { AwsS3 };
