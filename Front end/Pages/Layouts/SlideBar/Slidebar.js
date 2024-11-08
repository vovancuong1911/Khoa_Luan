import classNames from 'classnames/bind';
import styles from './Slidebar.module.scss';

const cx = classNames.bind(styles);

function SlideBar({ setValueType, valueInput1, setValueInput1 }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('select-option')}>
                <div>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setValueType(e.target.value)}
                    >
                        <>
                            <option value="" selected>
                                Type
                            </option>
                            <option value="perfume">AI hỗ trợ tra cứu</option>
                            <option value="scentedCandles">AI hỗ trợ tạo hình ảnh </option>
                            <option value="shoe">AI Phân tích dữ liệu </option>
                            <option value="lipstick">AI Tạo nội dung </option>
                            <option value="lipstick">AI Nhận diện hình ảnh và giọng nói  </option>
                            <option value="lipstick">AI trong Thương mại điện tử và Tư vấn khách hàng </option>
                            <option value="lipstick">AI trong Y tế  </option>
                            <option value="lipstick">AI Tự động hóa công việc </option>
                        </>
                    </select>
                </div>
            </div>

            <div className={cx('range-filter')}>
                <div className={cx('price-controls')}>
                    Min
                    <input className={cx('min-price')} type="text" value={0} />
                    Max
                    <input
                        className={cx('max-price')}
                        type="text"
                        value={valueInput1}
                        onChange={(e) => setValueInput1(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default SlideBar;
