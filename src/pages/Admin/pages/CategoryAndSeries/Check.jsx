import { Stack } from 'react-bootstrap';
import Buttons from '~/components/Buttons';

function Check(props) {
    const { type, add, cancel, setData, nameRef, desRef, update } = props;
    return (
        <>
            <h3>{type ? 'Cập nhật' : 'Tạo mới'}</h3>
            <Stack className="catgory-form" gap={3}>
                <div className="catgory-form-ip gap-3">
                    <p>Tên</p>
                    <input
                        ref={nameRef}
                        type="text"
                        placeholder="Name..."
                        id="catgory-form-ip-name"
                        onChange={setData}
                    />
                </div>
                <div className="catgory-form-ip gap-3">
                    <p>Mô tả</p>
                    <input
                        ref={desRef}
                        type="text"
                        placeholder="Descriptiom..."
                        id="catgory-form-ip-description"
                        onChange={setData}
                    />
                </div>
                <div>
                    <Buttons
                        primary
                        small
                        onClick={() => {
                            if (type) {
                                update();
                            } else {
                                add();
                            }
                        }}
                    >
                        OK
                    </Buttons>
                    <Buttons outline small onClick={cancel}>
                        Cancel
                    </Buttons>
                </div>
            </Stack>
        </>
    );
}

export default Check;
