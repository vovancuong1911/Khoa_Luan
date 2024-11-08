import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import classNames from 'classnames/bind';
import styles from './Slide.module.scss';

import banner1 from './img/banner1.jpg';
import banner2 from './img/banner2.jpg';
import banner3 from './img/banner3.jpg';
import banner4 from './img/banner4.jpg';


const cx = classNames.bind(styles);

function SlideWeb() {
    const slideImages = [
        {
            url: banner1,
        },
        {
            url: banner2,
        },
        {
            url: banner3,
        },
        {
            url: banner4,
        },
    ];

    return (
        <div className={cx('slide-container')}>
            <Slide autoplay duration={4500} transitionDuration={700}>
                {slideImages.map((slideImage, index) => (
                    <div key={index}>
                        <div className={cx('img')}>
                            <img src={slideImage.url} alt="" />
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    );
}

export default SlideWeb;
