import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Buttons from '~/components/Buttons';
import Images from '~/components/Images';
import Menu from '~/components/Popper/Menu';
import config from '~/config';
import { Link, useNavigate } from 'react-router-dom';

import './Header.scss';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '~/redux/slices/authSlice';
import { useEffect, useState } from 'react';
import { AuthApi } from '~/api';
import useAuth from '~/hooks/useAuth';

function MainHeaderMenu({ menuItems }) {
    const token = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            label: 'Người dùng',
            link: config.routes.user,
        },
        {
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            label: 'Đăng xuất',
            action: () => {
                dispatch(logoutSuccess());
                setCurrentUser({});
                navigate('/');
                window.location.reload();
            },
        },
    ];

    useEffect(() => {
        if (token?.accessToken) {
            const fetch = async () => {
                try {
                    const res = await AuthApi.getProfile();
                    setCurrentUser(res);
                } catch (err) {
                    console.log(err);
                }
            };

            fetch();
        }
    }, [token]);

    return (
        <>
            <div className="d-none d-lg-flex h-100">
                {currentUser?.name ? (
                    <div className="d-flex justify-content-end align-items-center options__list">
                        <Link>
                            <p className="mb-0 d-none d-sm-block header-user-name">{currentUser?.name}</p>
                        </Link>
                        <Menu items={userMenu} placement={'bottom-end'}>
                            <Images
                                src={currentUser?.img || ''}
                                alt="user"
                                className="current-user"
                                fallback="https:cdn.pixabay.com/photo/2015/01/17/13/52/gem-602252__340.jpg"
                                style={{ boxShadow: '0px 1px 3px rgb(3 0 71 / 9%)' }}
                            />
                        </Menu>
                    </div>
                ) : (
                    <div className="options__list">
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
