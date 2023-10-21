import { useState, useEffect } from 'react';

import RadioBox from './RadioBox';
import Input from './Input';
import Button from './Button';
import UploadFile from './UploadFile';
import CheckBox from './CheckBox';

import {
  useAddProductMutation,
  useUpdateProductMutation,
} from '../../redux/product/productAPI';

import s from './styles/ProductForm.module.scss';

const roles = ['product', 'banner'];

const ProductForm = ({ titleBtn, product = {}, onClose, isUpdateProduct }) => {
  const [role, setRole] = useState(product.role || roles[0]);
  const [file, setFile] = useState('');
  const [title, setTitle] = useState(product.title || '');
  const [description, setDescription] = useState(product.description || '');
  const [price, setPrice] = useState(product.price || '');
  const [urlChoose, setUrlChoose] = useState(product.urlChoose || '');
  const [sale, setSale] = useState(product.sale || 1);
  const [vegan, setVegan] = useState(product.vegan || false);
  const [spicy, setSpicy] = useState(product.spicy || false);
  const [novelty, setNovelty] = useState(product.novelty || false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [isEmptyFiele, setIsEmptyFiele] = useState(false);

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (file !== '') {
      setDisabledBtn(false);
    }
    if (isUpdateProduct) {
      setDisabledBtn(false);
    }
    if (title !== '' && file === '') {
      setIsEmptyFiele(true);
    } else {
      setIsEmptyFiele(false);
    }
  }, [file, isUpdateProduct, title]);

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    if (role === roles[0]) {
      formData.append('title', title);
      formData.append('description', description);
      formData.append('urlChoose', urlChoose);
      formData.append('price', price);
      formData.append('sale', sale);
      formData.append('vegan', vegan);
      formData.append('spicy', spicy);
      formData.append('novelty', novelty);
    }

    formData.append('role', role);

    if (!isUpdateProduct) {
      formData.append('file', file, file.name);
    }

    try {
      if (!isUpdateProduct) {
        await addProduct({ formData });
      } else {
        await updateProduct({ id: product._id, formData });
      }
    } catch (error) {
      console.log(error);
    }
    onClose(false);
  };

  return (
    <form
      className={s.form}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      {!isUpdateProduct && (
        <RadioBox setRole={setRole} roles={roles} title="Choose role" />
      )}
      {!isUpdateProduct && <UploadFile setFile={setFile} />}
      {isEmptyFiele && !isUpdateProduct && (
        <p className={s.errorText}>Загрузіть фото будь ласка!</p>
      )}
      {role === roles[0] && (
        <div className={s.container}>
          <div className={s.inputWrap}>
            <Input
              className="inputProduct"
              value={title}
              setValue={setTitle}
              label="title"
            />
            <Input
              className="inputProduct"
              value={description}
              setValue={setDescription}
              label="description"
            />
            <Input
              className="inputProduct"
              value={urlChoose}
              setValue={setUrlChoose}
              label="urlChoose"
            />
            <Input
              className="inputProduct"
              value={price}
              setValue={setPrice}
              label="price"
              type="number"
            />
            <Input
              className="inputProduct"
              value={sale}
              setValue={setSale}
              label="sale"
              type="number"
            />
          </div>
          <div className={s.checkBoxWrap}>
            <CheckBox checked={vegan} setChecked={setVegan} label="vegan" />
            <CheckBox checked={spicy} setChecked={setSpicy} label="spicy" />
            <CheckBox
              checked={novelty}
              setChecked={setNovelty}
              label="novelty"
            />
          </div>
        </div>
      )}
      <Button className="btnProduct" type="submit" disabled={disabledBtn}>
        {titleBtn}
      </Button>
    </form>
  );
};

export default ProductForm;
