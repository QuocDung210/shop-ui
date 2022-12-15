import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Buttons from '~/components/Buttons';
import Images from '~/components/Images';
import Menu from '~/components/Popper/Menu';
import config from '~/config';
import { Link } from 'react-router-dom';

import './Header.scss';

function MainHeaderMenu({ menuItems }) {
    const currentUser = false;
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Người dùng',
            to: '/profile',
            separateBottom: true,
        },
        {
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            title: 'Đăng xuất',
            separateTop: true,
        },
    ];

    return (
        <>
            <div className="d-none d-lg-flex h-100">
                {currentUser ? (
                    <div className="d-flex justify-content-end align-items-center options__list">
                        <Link>
                            <p className="mb-0 d-none d-sm-block header-user-name">tên người dùng</p>
                        </Link>
                        <Menu items={userMenu} placement={'bottom-end'}>
                            <Images
                                src=""
                                alt="user"
                                className="current-user"
                                fallback="https:cdn.pixabay.com/photo/2015/01/17/13/52/gem-602252__340.jpg"
                            />
                        </Menu>
                    </div>
                ) : (
                    <div className=" options__list">
                        <Buttons primary rounded to={config.routes.login}>
                            Log in
                        </Buttons>
                    </div>
                )}
            </div>
        </>
    );
}

export default MainHeaderMenu;
