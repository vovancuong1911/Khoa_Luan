import classNames from 'classnames/bind';
import styles from './Testimonial.module.scss';

const cx = classNames.bind(styles);

const testimonials = [
    {
        id: 1,
        text: "Kể từ khi sử dụng nền tảng AI này, việc lập trình của tôi trở nên dễ dàng và nhanh chóng hơn rất nhiều. Các gợi ý code rất chính xác, giúp tôi sửa lỗi chỉ trong vài phút thay vì mất hàng giờ để tìm ra vấn đề.",
        name: "Lập Trình Nam",
        imageUrl: "https://i.imgur.com/KmbmZq1.png"
    },
    {
        id: 2,
        text: "This AI platform has been a game-changer for my coding projects. It not only suggests useful code snippets but also helps me debug quickly, making my workflow more efficient.",
        name: "Developer John",
        imageUrl: "https://i.imgur.com/ULYoQDO.jpeg"
    },
    {
        id: 3,
        text: "Là một nhà phân tích dữ liệu, công cụ AI này đã thay đổi hoàn toàn cách tôi xử lý dữ liệu lớn. Nó không chỉ giúp tôi tiết kiệm thời gian mà còn cung cấp những insights rất giá trị.",
        name: "Nhi Mê lập trình",
        imageUrl: "https://i.imgur.com/2gjVZ2y.jpeg"
    },
    {
        id: 4,
        text: "Trợ lý AI này hỗ trợ tôi rất nhiều trong việc tóm tắt hồ sơ bệnh án và cập nhật thông tin y khoa. Nhờ nó, tôi có thể dành nhiều thời gian hơn cho bệnh nhân thay vì phải tập trung vào thủ tục giấy tờ.",
        name: "Designer Tú",
        imageUrl: "https://i.imgur.com/f84gZWx.jpeg"
    },
    {
        id: 5,
        text: "I’ve been using this AI for content creation and marketing analytics, and the results have exceeded my expectations. It provides insights that have helped improve my campaigns significantly.",
        name: "Marketer Mia",
        imageUrl: "https://i.imgur.com/3CNmtvU.jpeg"
    },
    {
        id: 6,
        text: "AI này thực sự tuyệt vời trong việc tối ưu hóa các chiến dịch marketing của tôi. Các phân tích và đề xuất rất chi tiết đã giúp cải thiện tỷ lệ chuyển đổi đáng kể.",
        name: "Nhà Tiếp Thị Linh",
        imageUrl: "https://i.imgur.com/5NyIUsp.jpeg"
    },
    {
        id: 7,
        text: "The AI tool is indispensable for grading and providing feedback. It allows me to manage large classes effortlessly, ensuring students receive timely and constructive feedback.",
        name: "Professor Peter",
        imageUrl: "https://i.imgur.com/qY3rcZj.jpeg"
    },
    {
        id: 8,
        text: "Tôi sử dụng AI này để tạo mockups và ý tưởng thiết kế mới. Nó cung cấp các gợi ý sáng tạo và giúp tôi thử nghiệm với các ý tưởng mới một cách nhanh chóng.",
        name: "Designer Dung",
        imageUrl: "https://i.imgur.com/NiDjqQ9.jpeg"
    }
];

function Testimonial() {
    return (
        <div className={cx('testimonial-wrapper')}>
            <h2 className={cx('title')}>Trusted by Users</h2>
            <p className={cx('subtitle')}>Here's what our customers have to say about us.</p>
            <div className={cx('testimonial-grid')}>
                {testimonials.map(testimonial => (
                    <div key={testimonial.id} className={cx('testimonial-card')}>
                        <div className={cx('customer-info')}>
                            <img 
                                className={cx('customer-image')} 
                                alt={`Customer ${testimonial.name}`} 
                                src={testimonial.imageUrl} 
                            />
                            <div className={cx('customer-details')}>
                                <p className={cx('customer-name')}>{testimonial.name}</p>
                            </div>
                        </div>
                        <div className={cx('testimonial-content')}>
                            <p className={cx('testimonial-text')}>{testimonial.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Testimonial;
