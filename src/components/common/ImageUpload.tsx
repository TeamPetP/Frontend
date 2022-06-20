import React, { useState } from "react";
import { style } from "./imageUpload.style";
import imgIcon from "../../assets/images/img-icon.png";
//import axios from 'axios';

export async function imageUploader(file: any) {
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", "oxdsrfek");
  // const response = await axios(
  // 	'https://api.cloudinary.com/v1_1/divncmfka/image/upload',
  // 	{
  // 		method: 'POST',
  // 		data: form,
  // 	}
  // );
  // return response;
}

interface IUploadFileInfo {
  file: any | undefined;
  imagePreviewUrl: any;
}

const ImageUpload = (setImageUpload: any) => {
  const [loading, setLoading] = useState(false);
  const [loadedProfileImage, setLoadedProfileImage] = useState<IUploadFileInfo>(
    {
      file: null,
      imagePreviewUrl: "",
    }
  );

  // 이미지 변경
  const handleChange = async (e: any) => {
    setLoading(true);
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setLoadedProfileImage({ file: file, imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(file);
    console.log(file);

    setLoading(false);
    /* setImageUpload(
      {
        name: `${uploaded.data.original_filename}.${uploaded.data.format}`,
        url: uploaded.data.url,
      },
      'add',
    ); */
  };

  return (
    <Wrap>
      {loading ? (
        <div>로딩중</div>
      ) : (
        <Label htmlFor="ex_file">
          {loadedProfileImage.file !== null ? (
            <Preview>
              <img
                src={loadedProfileImage.imagePreviewUrl}
                alt="미리보기 이미지"
              />
              <div>{loadedProfileImage.file.name}</div>
            </Preview>
          ) : (
            <div>
              <img src={imgIcon} alt="사진 추가 아이콘" />
              <div>사진 추가</div>
            </div>
          )}
        </Label>
      )}
      <File
        type="file"
        id="ex_file"
        accept="image/jpg, image/png, image/jpeg"
        onChange={handleChange}
      />
    </Wrap>
  );
};

export default ImageUpload;

const { Wrap, Label, File, Preview } = style;
