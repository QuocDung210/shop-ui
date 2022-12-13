import PropTypes from 'prop-types';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useState } from 'react';
import './Menu.scss';
import Tippy from '@tippyjs/react/headless';

function Menu({ children, items = [], placement = 'bottom' }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    item={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        }
                    }}
                />
            );
        });
    };
    return (
        <Tippy
            delay={[0, 200]}
            placement={placement}
            interactive
            render={(attrs) => (
                <div className="header-menu" tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        {history.length > 1 && (
                            <Header
                                title={current.title}
                                onClick={() => setHistory((prev) => prev.slice(0, prev.length - 1))}
                            />
                        )}
                        <div className="menu-options">{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    placement: PropTypes.string.isRequired,
};

export default Menu;
