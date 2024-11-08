import classNames from 'classnames/bind';
import styles from './Blogger.module.scss';

import Header from '../../Layouts/Header/Header';
import Footer from '../../Layouts/Footer/Footer';
import Banner from '../Layouts/Banner/Banner';
import { useEffect, useState } from 'react';
import request from '../../config/Connect';

const cx = classNames.bind(styles);

function Blogger() {
    const [dataBlog, setDataBlog] = useState([]);

    useEffect(() => {
        request.get('/api/getblog').then((res) => setDataBlog(res.data));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <div>
                <Banner />
            </div>

            <main className={cx('inner')}>
                {dataBlog.map((item, index) => (
                    <div key={index} className={cx('form-blogger')}>
                        <img src={item.img} alt="Blog Image" />
                        <h2>{item.title}</h2>
                        <p>{item.des}</p>
                        {[...Array(5)].map((_, i) => (
                            <>
                                {item[`title${i + 1}`] && item[`des${i + 1}`] && (
                                    <div key={i} className={cx('blog-entry')}>
                                        <h3>{item[`title${i + 1}`]}</h3>
                                        <p>{item[`des${i + 1}`]}</p>
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                ))}
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Blogger;
