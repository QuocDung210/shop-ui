import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Buttons from '~/components/Buttons';
import Images from '~/components/Images';
import Menu from '~/components/Popper/Menu';
import config from '~/config';
import { Link } from 'react-router-dom';

import './Header.scss';

function MainHeaderMenu({ menuItems }) {
    const currentUser = true;
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            label: 'Người dùng',
            link: config.routes.user,
            separateBottom: true,
        },
        {
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            label: 'Đăng xuất',
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
                                style={{ boxShadow: '0px 1px 3px rgb(3 0 71 / 9%)' }}
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
