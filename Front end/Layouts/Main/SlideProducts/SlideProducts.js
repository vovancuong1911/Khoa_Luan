import classNames from 'classnames/bind';
import styles from './SlideProducts.module.scss';
import { useState } from 'react';

import latest1 from './img/01.jpg';
import latest2 from './img/02.jpg';
import latest3 from './img/03.jpg';
import latest4 from './img/04.jpg';
import latest5 from './img/05.jpg';

const cx = classNames.bind(styles);

function SlideProducts() {
    const [hoveredProduct, setHoveredProduct] = useState(null);

    const productDescriptions = {
        'JASCO': 'JASCO là mô hình AI đa phương thức mới của Meta, ra mắt năm 2024, cho phép xử lý đồng thời văn bản, hình ảnh và video, ứng dụng trong kiểm duyệt nội dung và truyền thông tương tác.',
        'Presidio AI Framework': 'Presidio AI Framework đặt trọng tâm vào việc quản lý và sử dụng AI có trách nhiệm, tích hợp các yếu tố đạo đức và giảm thiểu sai lệch trong các hệ thống tự động.',
        'AI Retail Advisor': 'Cố vấn mua sắm AI, sử dụng các mô hình ngôn ngữ lớn, giúp cá nhân hóa trải nghiệm mua sắm trực tuyến, hướng dẫn khách hàng chọn sản phẩm phù hợp.',
        'NVIDIA AI Drug Discovery': 'Các mô hình AI của NVIDIA trong lĩnh vực y tế tự động hóa quá trình phân tích dữ liệu sinh học, giúp phát hiện mối quan hệ trong nghiên cứu dược phẩm và gen.',
        'Reka Core': 'Reka Core sử dụng kỹ thuật truy xuất kết hợp với sinh nội dung, cho phép tạo ra các phản hồi chính xác và có ngữ cảnh, phù hợp cho hỗ trợ khách hàng và dịch vụ tri thức.'
    };
    

    const images = [latest1, latest2, latest3, latest4,latest5];
    const productNames = Object.keys(productDescriptions);

    return (    
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Top 5 AI mới nhất ít người biết tới</h2>
            <div className={cx('products-container')}>
                {productNames.map((productName, index) => (
                    <div
                        key={productName}
                        className={cx('row-product')}
                        onMouseEnter={() => setHoveredProduct(productName)}
                        onMouseLeave={() => setHoveredProduct(null)}
                    >
                        <div className={cx('content')}>
                            <span className={cx('product-name')}>{productName}</span>
                            <p className={cx('description')}>
                                {productDescriptions[productName]}
                            </p>
                            <button className={cx('learn-more-button')}>
                                Tìm hiểu thêm
                            </button>
                        </div>
                        <div className={cx('image-container')}>
                            <img id={cx('img-item')} src={images[index]} alt={productName} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SlideProducts;
