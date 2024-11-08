import classNames from 'classnames/bind';
import styles from './DefaultPage.module.scss';
import Header from '../../Layouts/Header/Header';
import Footer from '../../Layouts/Footer/Footer';
import Banner from '../Layouts/Banner/Banner';
import SlideBar from '../Layouts/SlideBar/Slidebar';
import HomePage from '../Layouts/HomePage/HomePage';
import request from '../../config/Connect';

import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function DefaultPage() {
    const [valueType, setValueType] = useState('');
    const [dataProducts, setDataProducts] = useState([]);
    const [valueInput1, setValueInput1] = useState(10000);

    const [setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const perPage = 9;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request.get('/api/products');
                const totalItems = response.data.length;
                const calculatedTotalPages = Math.ceil(totalItems / perPage);
                setTotalPages(calculatedTotalPages);
                setDataProducts(response.data.filter(
                    (item) =>
                        valueType === '' || (item.checkProducts === valueType && item.priceNew >= valueInput1),
                ).slice(0, perPage));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [valueType , valueInput1]);

    const handlePageChange = async (selectedPage) => {
        try {
            const response = await request.get('/api/products');
            const startIndex = selectedPage * perPage;
            const endIndex = startIndex + perPage;
            setDataProducts(response.data.filter(
                (item) =>
                    valueType === '' || (item.checkProducts === valueType && item.priceNew >= valueInput1),
            ).slice(startIndex, endIndex));
            setCurrentPage(selectedPage);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    function checkProducts(data) {
     
        return data.checkProducts === valueType;
    }

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <div className={cx('banner')}>
                <Banner />
            </div>

            <main className={cx('main-category')}>
                <div className={cx('container')}>
                    <div>
                        <SlideBar
                            setValueType={setValueType}
                            dataProducts={dataProducts}
                            valueInput1={valueInput1}
                            setValueInput1={setValueInput1}
                        />
                    </div>

                    <div>
                        <HomePage
                            dataProducts={dataProducts}
                            checkProducts={checkProducts}
                            valueType={valueType}
                            valueInput1={valueInput1}
                            setValueInput1={setValueInput1}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default DefaultPage;
