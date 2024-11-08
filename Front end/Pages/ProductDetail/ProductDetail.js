import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';

import Header from '../../Layouts/Header/Header';
import Footer from '../../Layouts/Footer/Footer';

import request from '../../config/Connect';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/actions';

const cx = classNames.bind(styles);

function ProductDetail() {
    const [dataProducts, setDataProducts] = useState();
    const idProduct = window.location.pathname.slice(11, 999);
    const dispatch = useDispatch();

    const handleAddProduct = () => {
        dispatch(addProduct(dataProducts));
    };

    useEffect(() => {
        request
            .get(`/api/getproduct`, {
                params: { id: idProduct },
            })
            .then((res) => setDataProducts(res.data));
    }, [idProduct]);

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <main className={cx('form-detail')}>
                <div className={cx('inner-detail')}>
                    <header className={cx('form-info-product')}>
                        <div className={cx('img-product')}>
                            <img src={dataProducts?.img} alt="" />
                        </div>

                        <div className={cx('features-caption')}>
                            <h3>{dataProducts?.nameProducts}</h3>
                            <p>{dataProducts?.author}</p>
                            <span>$ {dataProducts?.priceNew.toLocaleString()}</span>
                            <div>
                                <div>
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                </div>
                                <div>
                                    <p>(120 Review)</p>
                                </div>
                                <p id={cx('text-des')}>{dataProducts?.des}</p>
                            </div>

                            <div className={cx('btn-add-product')}>
                                <button onClick={handleAddProduct}>Add To Cart</button>
                            </div>
                        </div>
                    </header>
                </div>
                <div className={cx('main-detail-product')}>
                    <div className={cx('header-des')}>
                        <button className={cx('nav-one', 'btn-active')}>Miêu Tả</button>
                        <button className={cx('nav-one')}>Tác Giả</button>
                        <button className={cx('nav-one')}>Bình Luận</button>
                        <button className={cx('nav-one')}>Đánh Giá</button>
                    </div>
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default ProductDetail;
