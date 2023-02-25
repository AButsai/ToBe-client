import Button from './Button';

import s from './styles/UploadFile.module.scss';

const UploadFile = ({ setFile, className = 'inputUpload' }) => {
  const handleChange = async e => {
    const file = e.target.files[0];
    if (!file) return;

    setFile(file);
  };

  return (
    <div className={s.uploadImage}>
      <input
        className={s[className]}
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
      <Button className="uploadImg">Upload Images*</Button>
    </div>
  );
};

export default UploadFile;
