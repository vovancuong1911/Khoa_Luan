import classNames from 'classnames/bind'; // Thư viện để kết hợp các lớp CSS với điều kiện
import styles from './Loading.module.scss'; // Tệp CSS module chứa các lớp CSS cho Loading component

import imgLoading from './img/logo.png'; // Hình ảnh hiển thị khi đang tải dữ liệu

// Khởi tạo hàm cx để liên kết các lớp CSS với các điều kiện
const cx = classNames.bind(styles);

function Loading({ isLoading }) {
    // Nếu không có trạng thái `isLoading` (hoặc `isLoading` là false), không render gì
    if (!isLoading) return null;

    return (
        <div className={cx('wrapper')}> {/* Bao bọc toàn bộ phần tử Loading */}
            <div className={cx('overlay')}> {/* Phần overlay mờ phía sau hình ảnh */}
                <div className={cx('inner')}> {/* Phần hiển thị hình ảnh tải dữ liệu */}
                    <img id={cx('img-loading')} src={imgLoading} alt="" /> {/* Hình ảnh loading */}
                </div>
                <div className={cx('test')}> {/* Phần hiển thị thông báo */}
                    <span>We are processing your request, please wait a few minutes</span> {/* Thông báo cho người dùng */}
                </div>
            </div>
        </div>
    );
}

export default Loading; // Xuất khẩu component Loading để sử dụng ở các phần khác của ứng dụng
