import Images from '~/components/Images';
function NotifyItem({ notice }) {
    return (
        <div className="notify-item-wrapper ">
            <Images
                src=""
                alt="user"
                className="notify-item-avatar"
                fallback="https:cdn.pixabay.com/photo/2015/01/17/13/52/gem-602252__340.jpg"
                style={{ boxShadow: '0px 1px 3px rgb(3 0 71 / 9%)' }}
            />
            <div className="notify-item-title">
                <h3>Admin</h3>
                <p>{notice?.title}</p>
            </div>
        </div>
    );
}

export default NotifyItem;
