import { useState } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CircularProgress from '@mui/material/CircularProgress';

import Button from './Button';
import ProductForm from './ProductForm';
import Modal from '../Modal/Modal';
import List from './List';

import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from '../../redux/product/productAPI';

import s from './styles/Banner.module.scss';
import { useEffect } from 'react';

const Banner = () => {
  const { data = {}, isSuccess } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [product, setProduct] = useState({});
  const [isUpdateProduct, setIsUpdateProduct] = useState(false);
  const [load, setLoad] = useState(false);
  const [newLoad, setNewLoad] = useState(false);

  useEffect(() => {
    setLoad(false);
  }, [data]);

  const handleClickAdd = () => {
    setShowAddModal(true);
  };

  const handleClickUpdate = product => {
    setIsUpdateProduct(true);
    setProduct(product);
    setShowUpdateModal(true);
  };

  const handleClickDelete = async id => {
    setLoad(true);
    try {
      await deleteProduct(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={s.section}>
      <div>
        <Button className="btnProduct" onClick={handleClickAdd}>
          {newLoad ? (
            <CircularProgress color="inherit" size={15} />
          ) : (
            'Add new product'
          )}
        </Button>
        {showAddModal && (
          <Modal title="Add new product" onClose={setShowAddModal}>
            <ProductForm titleBtn="Add" onClose={setShowAddModal} />
          </Modal>
        )}
      </div>

      <List>
        {data?.products?.map(({ role, title, _id }) => (
          <li key={_id} className={s.product}>
            <div className={s.titleWrap}>
              <p>{title === '' ? role : title}</p>
              {load ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                <DeleteOutlineOutlinedIcon
                  className={s.icon}
                  onClick={() => handleClickDelete(_id)}
                />
              )}
            </div>
            <Button
              className="btnProduct"
              onClick={() => handleClickUpdate(product)}
              disabled={role === 'banner'}
            >
              {title === '' ? role : 'Update product'}
            </Button>
          </li>
        ))}

        {showUpdateModal && (
          <Modal title="Update product" onClose={setShowUpdateModal}>
            <ProductForm
              titleBtn="Update"
              product={product}
              onClose={setShowUpdateModal}
              isUpdateProduct={isUpdateProduct}
            />
          </Modal>
        )}
      </List>
    </section>
  );
};

export default Banner;
