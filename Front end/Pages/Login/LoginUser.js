import classNames from 'classnames/bind';
import styles from './LoginUser.module.scss';

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import request from '../../config/Connect';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function LoginUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLoginUser = async () => {
        var pattern = /[A-Z]/;
        const test = pattern.test(email);
        if (email === '' || password === '' || test === true) {
            toast.error('Vui Lòng Xem Lại Thông Tin !!!');
        } else {
            try {
                const res = await request.post('/api/login', {
                    email,
                    password,
                });
                toast.success(res.data.message);
                navigate('/');
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('header-form-login')}>
                        <span>Login</span>
                        <p>Enter Login details to get access</p>
                    </div>
                    <div className={cx('input-box')}>
                        <div className={cx('form-input')}>
                            <label>Username or Email Address</label>
                            <input placeholder="Username / Email address" onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className={cx('form-input')}>
                            <label>Password</label>
                            <input
                                placeholder="Enter Password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className={cx('single-input-fields')}>
                            <div>
                                <input type="checkbox" />
                                <label>Keep me logged in</label>
                            </div>
                            <a href="/#">Forgot Password?</a>
                        </div>
                    </div>
                    <div className={cx('login-footer')}>
                        <p>
                            Don’t have an account?{' '}
                            <Link id={cx('link')} to="/register">
                                Sign Up
                            </Link>{' '}
                            here
                        </p>
                        <button onClick={handleLoginUser}>Login</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginUser;
