import React, { useRef, useState } from 'react';
import { style } from './imageUpload.style';
import axios from 'axios';

export async function imageUploader(file : any) {
  const form = new FormData();
  form.append('file', file);
  form.append('upload_preset', 'oxdsrfek');
  const response = await axios(
    'https://api.cloudinary.com/v1_1/divncmfka/image/upload',
    {
      method: 'POST',
      data: form,
    },
  );
  return response; 
}

const ImageUpload = (setImageUpload : any ) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const reviewInputRef = useRef();
  const postInputRef = useRef();

  // 변경 버튼 클릭
  const onbuttonClick = (event : any) => {
    event.preventDefault();
    //postInputRef.current.click();
  };

  // 이미지 변경
  const onChange = async (event : any) => {
    setLoading(true);
    const uploaded = await imageUploader(event.target.files[0]);
    setLoading(false);
    /* setImageUpload(
      {
        name: `${uploaded.data.original_filename}.${uploaded.data.format}`,
        url: uploaded.data.url,
      },
      'add',
    ); */
  };

  const handleChange = async (event : any) => {
    setLoading(true);
    setFileList(event.target.files);
    const uploaded = await imageUploader(event.target.files[0]);
    console.log(uploaded);
    setLoading(false);
    //setImageUpload(uploaded.data.url);
  };

  return (
    <Wrap>
      <ReviewInput
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
      {!loading ? (
        <PostWrap>
          <PostInput
            type="file"
            accept="image/*"
            name="file"
            onChange={handleChange}
          />
          <PostUpload
            onClick={(e) => {
              onbuttonClick(e);
            }}
          >
            {fileList.length >= 8 ? null : (
              <UploadContent>
                <div style={{ marginTop: 8 }}>Upload</div>
              </UploadContent>
            )}
          </PostUpload>
        </PostWrap>
      ) : (
        <PostWrap>
          <PostUpload>
            <UploadContent>
            <div>로딩중</div>
            </UploadContent>
          </PostUpload>
        </PostWrap>
      )}
    </Wrap>
  );
};

export default ImageUpload;

const {
  Wrap,
  ReviewInput,
  PostWrap,
  PostUpload,
  UploadContent,
  PostInput,
  ButtonContent,
} = style;
