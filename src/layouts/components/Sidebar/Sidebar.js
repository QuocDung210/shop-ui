import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCompactDisc, faHome, faIcons, faMusic, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import {
    faUser as farFaUser,
    faBookmark as farFaBookmark,
    faStar as farFaStart,
} from '@fortawesome/free-regular-svg-icons';

import Menu, { MenuItem } from './Menu';
import config from '~/config';
import Styles from './Sidebar.module.scss';
import Buttons from '~/components/Buttons';
const cx = classNames.bind(Styles);

function Sidebar() {
    const currentUser = false;
    return (
        <aside className={cx('wrapper')}>
            <Menu className={cx('nav__list')}>
                <MenuItem
                    to={config.routes.home}
                    icon={<FontAwesomeIcon className={cx('icon')} icon={faHome} />}
                    activeIcon={<FontAwesomeIcon className={cx('icon')} icon={faHome} />}
                    title="Trang chủ"
                />
                <MenuItem
                    to={config.routes.profile}
                    icon={<FontAwesomeIcon className={cx('icon')} icon={faUser} />}
                    activeIcon={<FontAwesomeIcon className={cx('active-icon')} icon={farFaUser} />}
                    title="Cá nhân"
                />
                <MenuItem
                    to={config.routes.following}
                    icon={<FontAwesomeIcon className={cx('icon')} icon={faBookmark} />}
                    activeIcon={<FontAwesomeIcon className={cx('active-icon')} icon={farFaBookmark} />}
                    title="Theo dõi"
                />
                <MenuItem
                    to={config.routes.upload}
                    icon={<FontAwesomeIcon className={cx('icon')} icon={faCompactDisc} />}
                    activeIcon={<FontAwesomeIcon className={cx('active-icon')} icon={faCompactDisc} />}
                    title="Khám phá"
                />

                <hr style={{ width: '90%', margin: '10px 0', backgroundColor: 'gray' }} />
            </Menu>
            <div className={cx('nav__second')}>
                <Menu className={cx('nav__second-menu')}>
                    <div>
                        <MenuItem
                            to={config.routes.newMusic}
                            icon={<FontAwesomeIcon className={cx('icon')} icon={faMusic} />}
                            activeIcon={<FontAwesomeIcon className={cx('active-icon')} icon={faMusic} />}
                            title="Nhạc mới"
                        />
                        <MenuItem
                            to={config.routes.category}
                            icon={<FontAwesomeIcon className={cx('icon')} icon={faIcons} />}
                            activeIcon={<FontAwesomeIcon className={cx('active-icon')} icon={faIcons} />}
                            title="Thể loại"
                        />
                        <MenuItem
                            to={config.routes.top}
                            icon={<FontAwesomeIcon className={cx('icon')} icon={faStar} />}
                            activeIcon={<FontAwesomeIcon className={cx('active-icon')} icon={farFaStart} />}
                            title="Top 10"
                        />
                    </div>
                    {currentUser ? (
                        <div>
                            <h4>Thư viện</h4>
                            <MenuItem
                                to={config.routes.newMusic}
                                icon={<FontAwesomeIcon className={cx('icon')} icon={faMusic} />}
                                activeIcon={<FontAwesomeIcon className={cx('active-icon')} icon={faMusic} />}
                                title="Bài hát"
                            />
                            <MenuItem
                                to={config.routes.category}
                                icon={<FontAwesomeIcon className={cx('icon')} icon={faIcons} />}
                                activeIcon={<FontAwesomeIcon className={cx('active-icon')} icon={faIcons} />}
                                title="Playlist"
                            />
                            <MenuItem
                                to={config.routes.top}
                                icon={<FontAwesomeIcon className={cx('icon')} icon={faStar} />}
                                activeIcon={<FontAwesomeIcon className={cx('active-icon')} icon={farFaStart} />}
                                title="Gần đây"
                            />
                        </div>
                    ) : (
                        <div className={cx('nav__second-recomment')}>
                            <p className={cx('title')}>hãy đăng nhập để có trải nghiệm tốt nhất</p>
                            <Buttons className={cx('btn-login')}>Đăng nhập</Buttons>
                        </div>
                    )}
                </Menu>
            </div>
            {/* <div className={cx('add__playlist-sidebar')}>
                <nav className={cx('add__playlist-btn')}>
                    <FontAwesomeIcon className={cx('add-icon')} icon={faPlus} />
                    <span className={cx('add-title')}>Thêm Playlist</span>
                </nav>
            </div> */}
        </aside>
    );
}

export default Sidebar;
