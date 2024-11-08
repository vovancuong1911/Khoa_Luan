import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <header className={cx('header-footer')}>
                    <div className={cx('header-column-1')}>
                        <h3>Subscribe to Our Newsletter</h3>
                        <p>Stay updated on the latest AI tools and tutorials.</p>
                    </div>
                    <div className={cx('input-contact')}>
                        <input placeholder="Enter Your Email" />
                        <button>Subscribe</button>
                    </div>
                    <div className={cx('icons')}>
                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faInstagram} />
                        <FontAwesomeIcon icon={faYoutube} />
                    </div>
                </header>
                <main className={cx('info-contact')}>
                    <div className={cx('column')}>
                        <h4>AI Tools</h4>
                        <ul>
                            <li>GPT-4 Code Assistant</li>
                            <li>Image Recognition</li>
                            <li>Data Analysis</li>
                        </ul>
                    </div>
                    <div className={cx('column')}>
                        <h4>Learning</h4>
                        <ul>
                            <li>AI Tutorials</li>
                            <li>Machine Learning Guides</li>
                            <li>AI Ethics</li>
                        </ul>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Footer;
