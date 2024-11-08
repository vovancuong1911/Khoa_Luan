import classNames from 'classnames/bind';
import styles from './CategoriesArea.module.scss';

import services1 from './img/services1.png';
import services2 from './img/services2.png';
import services3 from './img/services3.png';
import services4 from './img/services4.png';

const cx = classNames.bind(styles);

function CategoriesArea() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('row-1')}>
                <img src={services1} alt="" />
                <h5>thông tin đa dạng</h5>
                <p>Thông tin được cập nhật một cách nhanh nhất</p>
            </div>

            <div className={cx('row-1')}>
                <img src={services2} alt="" />
                <h5>Bảo Mật thông tin</h5>
                <p>Tài khoản của khách hàng luôn được bảo vệ an toàn</p>
            </div>

            <div className={cx('row-1')}>
                <img src={services3} alt="" />
                <h5>Kết Nối khắp thế giới</h5>
                <p>Mọi người trên thế giới có thể kết nối với nhau</p>
            </div>

            <div className={cx('row-1')}>
                <img src={services4} alt="" />
                <h5>Online Support</h5>
                <p>luôn phản hồi nhanh nhất cho khách hàng</p>
            </div>
        </div>
    );
}

export default CategoriesArea;
