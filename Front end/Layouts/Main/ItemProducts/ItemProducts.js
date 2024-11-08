import classNames from 'classnames/bind';
import styles from './ItemProducts.module.scss';
import { useState } from 'react';

import img1 from './img/hinh1.jpg'; // Thay thế các hình ảnh này bằng hình ảnh thực tế liên quan đến các công cụ AI
import img2 from './img/hinh2.jpg';
import img3 from './img/hinh3.jpg';
import img4 from './img/hinh4.jpg';
import img5 from './img/hinh5.jpg';

const cx = classNames.bind(styles);

function ItemProducts() {
    const [hoveredTool, setHoveredTool] = useState(null);

    // Thông tin mô tả về các công cụ AI
    const toolDescriptions = {
        'GPT-4 (OpenAI)': 'GPT-4 là phiên bản mới nhất của mô hình ngôn ngữ từ OpenAI, cung cấp khả năng xử lý ngôn ngữ tự nhiên tiên tiến cho việc tạo nội dung, hoàn thành mã, và nhiều ứng dụng khác.',
        'Midjourney': 'Midjourney là công cụ tạo hình ảnh dựa trên AI, giúp tạo ra các tác phẩm nghệ thuật số đẹp mắt dựa trên mô tả bằng văn bản, được sử dụng rộng rãi trong các dự án sáng tạo.',
        'DALL-E (OpenAI)': 'DALL-E là mô hình AI của OpenAI có khả năng tạo ra hình ảnh từ các mô tả văn bản, có thể tạo ra các hình ảnh thực tế và sáng tạo.',
        'Stable Diffusion': 'Stable Diffusion là công cụ AI mã nguồn mở giúp tạo ra các hình ảnh chất lượng cao từ mô tả bằng văn bản, phổ biến trong cộng đồng nghệ thuật AI.',
        'TensorFlow (Google)': 'TensorFlow là thư viện học máy do Google phát triển, được sử dụng để xây dựng và huấn luyện các mô hình học sâu trong nhiều ứng dụng.'
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Top 5 AI Hot Nhất Hiện Tại</h2>

            <div className={cx('products-container')}>
                {Object.keys(toolDescriptions).map((toolName, index) => {
                    const imageSrc = [img1, img2, img3, img4, img5][index];
                    return (
                        <div
                            key={toolName}
                            className={cx('row-product')}
                            onMouseEnter={() => setHoveredTool(toolName)}
                            onMouseLeave={() => setHoveredTool(null)}
                        >
                            <img id={cx('img-item')} src={imageSrc} alt={toolName} />
                            <span>{toolName}</span>
                            {hoveredTool === toolName && (
                                <div className={cx('description')}>
                                    <p>{toolDescriptions[toolName]}</p>
                                    <button className={cx('learn-more-button')}>
                                        Tìm hiểu thêm
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ItemProducts;
