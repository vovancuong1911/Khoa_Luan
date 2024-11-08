import classNames from 'classnames/bind';
import styles from './Checkout.module.scss';

import Header from '../../Layouts/Header/Header';
import Footer from '../../Layouts/Footer/Footer';
import Banner from '../Layouts/Banner/Banner';
import request from '../../config/Connect';

import LogoMomo from './img/MoMo_Logo.png';

import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Layouts/Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Checkout() {
    const [dataCart, setDataCart] = useState({});
    const [checkBox, setCheckBox] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [firstName, setFirsName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');

    const token = document.cookie;

    const navigate = useNavigate();

    const dataAddress = { firstName, lastName, phoneNumber, email, country, addressLine1, city };

    useEffect(() => {
        if (token) {
            request.get('/api/getcart').then((res) => res.data.map((item) => setDataCart(item)));
        }
    }, [token]);

    const handlePaymentMomo = async () => {
        if (
            checkBox === false ||
            firstName === '' ||
            lastName === '' ||
            companyName === '' ||
            phoneNumber === '' ||
            email === '' ||
            country === '' ||
            addressLine1 === '' ||
            addressLine2 === '' ||
            city === '' ||
            zip === ''
        ) {
            toast.error('Please accept our terms or you are missing information');
        } else if (!dataCart) {
            toast.error('Please Return to Purchase Page !!!');
        } else {
            try {
                setIsLoading(true);
                const res = await request.post('/api/paymentmomo', {
                    dataAddress,
                });
                if (res) {
                    setIsLoading(false);
                    toast.success(res.data.message);
                    setTimeout(() => {
                        window.open(res.data.payUrl);
                    }, 2000);
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    };

    const handlePayment = async () => {
        if (
            checkBox === false ||
            firstName === '' ||
            lastName === '' ||
            companyName === '' ||
            phoneNumber === '' ||
            email === '' ||
            country === '' ||
            addressLine1 === '' ||
            addressLine2 === '' ||
            city === '' ||
            zip === ''
        ) {
            toast.error('Please accept our terms or you are missing information');
        } else if (!dataCart) {
            toast.error('Please Return to Purchase Page !!!');
        } else {
            request.post('/api/payment').then((res) => console.log(res.data));
            navigate('/thanks');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <header>
                <Header />
            </header>

            <Loading isLoading={isLoading} />

            <div>
                <Banner />
            </div>

            <main className={cx('inner')}>
                <div className={cx('inner-checkout')}>
                    <div className={cx('column-billing')}>
                        <h1 id={cx('title-billing')}>Billing Details</h1>
                        <div className={cx('input-name')}>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="First name"
                                    onChange={(e) => setFirsName(e.target.value)}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Last name"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Company name"
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={cx('input-name')}>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Phone number"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Email Address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Country"
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <div></div>

                        <div className="mt-5">
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Address line 01"
                                    onChange={(e) => setAddressLine1(e.target.value)}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Address line 02"
                                    onChange={(e) => setAddressLine2(e.target.value)}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Town/City"
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>

                            <div className="input-group mb-3 mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="PostCode/ZIP"
                                    onChange={(e) => setZip(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={cx('form-order')}>
                        <div className={cx('inner-order')}>
                            <h1 id={cx('title-order')}>You Oder</h1>

                            <div>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Product</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataCart?.products?.map((item) => (
                                            <tr key={item?._id}>
                                                <td>{item?.nameProduct}</td>
                                                <td>x {item?.quantity}</td>
                                                <td>$ {item.price?.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                    <tbody>
                                        <tr>
                                            <td>Total</td>
                                            <td></td>
                                            <td>$ {dataCart?.sumPrice?.toLocaleString()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={cx('form-pay')}>
                                <div className={cx('checkbox-terms')}>
                                    <input onChange={(e) => setCheckBox(e.target.checked)} type="checkbox" />
                                    <label>I’ve read and accept the terms & conditions*</label>
                                </div>

                                <div className={cx('payment-momo')}>
                                    <button onClick={handlePaymentMomo}>
                                        <img src={LogoMomo} alt="" />
                                        <span>Payments in Momo</span>
                                    </button>
                                </div>

                                <div className={cx('payment-on-delivery')}>
                                    <button onClick={handlePayment}>Thanh Toán Khi Nhận Hàng</button>
                                </div>

                                <div className={cx('continue')}>
                                    <button>
                                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/thanks">
                                            <span>Continue </span>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Checkout;
