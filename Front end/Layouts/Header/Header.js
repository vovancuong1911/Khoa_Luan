import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Logo from './img/logo.png';
import request from '../../config/Connect';


import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faCartPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useDebounce from '../../customHook/useDebounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const cx = classNames.bind(styles);

function Header() {
    // Kiểm tra cookie token để xác định người dùng đã đăng nhập hay chưa
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

    const [showMenu, setShowMenu] = useState(false);
    const [dataSearch, setDataSearch] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const debounce = useDebounce(searchValue, 500);

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        try {
            if (searchValue === '') {
                return;
            }
            request.get('/api/search', { params: { nameProduct: debounce } })
                .then((res) => setDataSearch(res.data));
        } catch (error) {
            console.log(error);
        }
    }, [debounce]);

    return (
        <div className={cx('wrapper')}>
            <Link style={{ textDecoration: 'none' }} to="/">
                <div className={cx('logo')}>
                    <img src={Logo} alt="Logo" />
                </div>
            </Link>

            <div className={cx('search-container')}>
                <div className={cx('input-search')}>
                    <input
                        type="text"
                        placeholder="Tool AI bạn quan tâm"
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <FontAwesomeIcon icon={faSearch} style={{ paddingRight: '15px' }} />
                </div>
                
                <div className={cx('search-result')}>
                    {dataSearch.length > 0 && searchValue ? (
                        <div className={cx('result')}>
                            {dataSearch.map((item) => (
                                <Link to={`/prodetail/${item.id}`} key={item?._id} id={cx('test')}>
                                    <div className={cx('form-result')}>
                                        <img id={cx('img-result')} src={item?.img} alt={item?.nameProducts} />
                                        <h5>{item?.nameProducts}</h5>
                                        <span>{item?.priceNew?.toLocaleString()} đ</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <></> // Không hiển thị gì nếu không có dữ liệu tìm kiếm
                    )}
                </div>
            </div>

            <div className={cx('menu')}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/category">Products</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/checkout">Checkout</Link></li>
                </ul>
            </div>

            <div className={cx('auth-buttons')}>
    {token ? (
        // Hiển thị khi đã đăng nhập
        <>
            <Link style={{ textDecoration: 'none', color: '#333' }} to="/info">
                <FontAwesomeIcon icon={faUser} className={cx('user-icon')} />
                <span>Thông tin cá nhân</span>
            </Link>
            <Link style={{ textDecoration: 'none', color: '#333' }} to="/cart">
                <FontAwesomeIcon icon={faCartPlus} className={cx('cart-icon')} />
                <span>Giỏ hàng</span>
            </Link>
        </>
    ) : (
        // Hiển thị khi chưa đăng nhập
        <>
            <Link to="/login" className={cx('login-button')}>Đăng Nhập</Link>
            <Link to="/register" className={cx('register-button')}>Đăng Ký</Link>
        </>
    )}
    {/* Biểu tượng giỏ hàng luôn hiển thị */}
    <Link to="/cart">
        <button>
            <FontAwesomeIcon icon={faShoppingCart} style={{ color: 'orange', background: 'black' }} />
        </button>
    </Link>
    </div>
</div>
);
}

export default Header;
