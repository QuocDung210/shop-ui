import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import { Stack } from 'react-bootstrap';
import Buttons from '~/components/Buttons';
import Images from '~/components/Images';
import config from '~/config';
import './HeaderNotify.scss';
function HeaderNotify(props) {
    const { render, noticeList } = props;

    return (
        <>
            <div>
                <Tippy
                    trigger="click"
                    delay={[0, 300]}
                    placement="bottom-end"
                    interactive
                    arrow
                    render={(attrs) => (
                        <Stack className="nav-notify-popper content-box p-3" {...attrs}>
                            {noticeList?.length > 0 ? (
                                noticeList?.map((notice, idx) => (
                                    <div key={idx} className="user-notice-item">
                                        <Images
                                            src=""
                                            alt="user"
                                            className="sender-notice-avatar"
                                            fallback="https:cdn.pixabay.com/photo/2015/01/17/13/52/gem-602252__340.jpg"
                                            style={{
                                                boxShadow: '0px 1px 3px rgb(3 0 71 / 9%)',
                                            }}
                                        />
                                        <div>
                                            <h3>MyShop</h3>
                                            <p className="m-0">{notice?.title}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h3 className="m-0">Không có thông báo</h3>
                            )}
                            <Buttons
                                disabled={noticeList?.length > 0 ? false : true}
                                outline
                                small
                                to={config.routes.notify}
                            >
                                Xem tất cả
                            </Buttons>
                        </Stack>
                    )}
                >
                    <div className="nav-notify-icon" onClick={() => render()} style={{ position: 'relative' }}>
                        <FontAwesomeIcon icon={faBell} />
                        <div className={`notice-quantity-user ${noticeList?.length === 0 && 'd-none'}`}>
                            {noticeList?.length || 0}
                        </div>
                    </div>
                </Tippy>
            </div>
        </>
    );
}

export default HeaderNotify;
