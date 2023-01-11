import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Collapse, Nav } from 'react-bootstrap';

function MainNavItem({ item, handleOpenOffcanvas, handleClickNavItem }) {
    const [open, setOpen] = useState(false);
    const handleOpen = (e) => {
        setOpen(!open);
    };
    return (
        <>
            <div className="w-100">
                <div
                    className="d-flex justify-content-between"
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    <span className="me-1 nav-item-label" onClick={() => handleClickNavItem(item)}>
                        {item.label}
                    </span>
                    <div className="nav-item-icon " onClick={handleOpen}>
                        {open ? <FontAwesomeIcon icon={faMinus} /> : <FontAwesomeIcon icon={faPlus} />}
                    </div>
                </div>
                <Collapse in={open} dimension="height" timeout={100}>
                    <div id="example-collapse-text" className="nav-item-collapse">
                        <Nav as="ul">
                            {item.items.map((navItem, idx) => (
                                <Nav.Item as="li" className="d-flex m-0 nav-item" key={idx}>
                                    {navItem.items ? (
                                        <div className="w-100">
                                            <MainNavItem
                                                item={navItem}
                                                handleOpenOffcanvas={handleOpenOffcanvas}
                                                handleClickNavItem={handleClickNavItem}
                                            />
                                        </div>
                                    ) : (
                                        <span className="nav-item-label" onClick={() => handleClickNavItem(navItem)}>
                                            {navItem.label}
                                        </span>
                                    )}
                                </Nav.Item>
                            ))}
                        </Nav>
                    </div>
                </Collapse>
            </div>
        </>
    );
}

export default MainNavItem;
