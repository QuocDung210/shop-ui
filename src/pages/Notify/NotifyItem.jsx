import Images from '~/components/Images';

function NotifyItem() {
    return (
        <div className="notify-item-wrapper my-3">
            <Images
                src=""
                alt="user"
                className="notify-item-avatar"
                fallback="https:cdn.pixabay.com/photo/2015/01/17/13/52/gem-602252__340.jpg"
                style={{ boxShadow: '0px 1px 3px rgb(3 0 71 / 9%)' }}
            />
            <div className="notify-item-title">
                <h4>#Tiêu đề</h4>
                <p className="m-0">#loại thông báo</p>
            </div>
        </div>
    );
}

export default NotifyItem;
