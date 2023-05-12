import { Container, Row, Stack } from 'react-bootstrap';
import './WarrantyPolicy.scss';
function WarrantyPolicy() {
    return (
        <Container fluid>
            <Row className="warranty-title-section ">
                <div className="warranty-title-section-bg"></div>
                <div className="warranty-title-section-content">
                    <h2>CHÍNH SÁCH BẢO HÀNH</h2>
                    <h3>TẠI MYSHOP</h3>
                    <p>
                        Nếu Quý Khách gặp khó khăn trong việc liên hệ Trung Tâm Bảo Hành, Quý Khách vui lòng liên hệ với
                        bộ phận chăm sóc khách hàng của MyShop theo thông tin sau để được hỗ trợ:
                    </p>
                    <p>E-mail: cskh@gearvn.com • Hotline: 1800.6173</p>
                </div>
            </Row>

            <Container className="my-5 content-box">
                <h3 className="warranty-title">I. CÁC BƯỚC BẢO HÀNH</h3>
                <Row className="warranty-steps">
                    <Stack gap={4}>
                        <div className="step">
                            <h3>BƯỚC 1</h3>
                            <p>
                                Khi quý khách có nhu cầu bảo hành sản phẩm, xin hãy liên hệ với chúng to qua các các sau
                                đây:
                            </p>
                            <ul>
                                <li>
                                    Tổng đài bảo hành : <strong>0123456789</strong>
                                </li>
                                <li>
                                    Liên hệ qua email: <strong>mystore@gmail.com</strong>
                                </li>
                                <li>
                                    <strong>Liên hệ trực tiếp</strong> tại cửa hành MyStore
                                </li>
                            </ul>
                        </div>
                        <div className="step">
                            <h3>BƯỚC 2</h3>
                            <p>Quý khách gửi hoặc mang sản phẩm cần bảo hành đến:</p>
                            <ul>
                                <li>
                                    <strong>Trung tâm bảo hành MyShop</strong> : hoạt động từ 09H00 đến 18H00 hàng ngày
                                </li>
                                <li>
                                    Địa chỉ :{' '}
                                    <strong>
                                        Đường số 2 Võ Oanh, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam
                                    </strong>{' '}
                                </li>
                            </ul>
                        </div>
                        <div className="step success">
                            <h3>BƯỚC 3</h3>
                            <p>Hoàn tất xử lý bảo hành và bàn giao sản phẩm đến khách hàng</p>
                        </div>
                    </Stack>
                </Row>
                <h3 className="warranty-title">II. ĐIỀU KIỆN BẢO HÀNH</h3>
                <Row className="warranty-conditions">
                    <Stack gap={4}>
                        <div>
                            <h3 className="warranty-conditions-yes">CÁC SẢN PHẨM ĐỦ ĐIỀU KIỆN BẢO HÀNH</h3>

                            <ul>
                                <li>
                                    Sản phẩm nếu có tem niêm phong (seal) trên sản phẩm thì tem niêm phong phải còn
                                    nguyên vẹn.
                                </li>
                                <li>Đối với sản phẩm bảo hành trên hộp: sản phẩm còn đầy đủ hộp.</li>
                                <li>Sản phẩm không trầy xước, cấn móp, bể, vỡ, biến dạng so với ban đầu.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="warranty-conditions-no">CÁC SẢN PHẨM KHÔNG ĐỦ ĐIỀU KIỆN BẢO HÀNH</h3>

                            <ul>
                                <li>Hết thời hạn bảo hành.</li>
                                <li>Không có tem niêm phong, hoặc bị tẩy xóa, không còn nguyên dạng ban đầu.</li>
                                <li>
                                    Bị tác động vật lý làm trầy xước, cong vênh, rạn nứt, bể vỡ trong quá trình quá
                                    trình sử dụng.
                                </li>
                                <li>
                                    Bị hư hỏng do tự ý thảo mở, sửa chữa, thay đổi cấu trúc sản phẩm bên trong mà chưa
                                    có sự xác nhận đồng ý hoặc giám sát bởi kỹ thuật viên GearVN.
                                </li>
                                <li>
                                    Bị hư hỏng, chập, cháy do sử dụng sai mục đích, tự ý tháo, lắp đặt không tuân theo
                                    các hướng dẫn sử dụng đính kèm theo sản phẩm.
                                </li>
                                <li>Bị hư hỏng do côn trùng xâm nhập (chuột, gián, kiến, mối…)</li>
                                <li>
                                    Bị hư hỏng do thiên tai, hỏa hoạn, lụt lội, sét đánh, rỉ sét, hao mòn do môi trường
                                    gây ra.
                                </li>
                            </ul>
                        </div>
                    </Stack>
                </Row>
                <h3 className="warranty-title">III. CHÍNH SÁCH BẢO HÀNH CHUNG</h3>
                <Row className="general-warranty-policy">
                    <Stack gap={4}>
                        <h3>1. Chính sách đổi mới 100%</h3>

                        <div className="d-flex flex-wrap gap-4">
                            <div>
                                <h4>
                                    ĐIỀU KIỆN SẢN PHẨM ĐƯỢC ÁP DỤNG <strong>ĐỔI MỚI 100%</strong>
                                </h4>
                            </div>
                            <ul>
                                <li>Sản phẩm có tem niêm phong (seal) còn nguyên vẹn.</li>
                                <li>Sản phẩm không trầy xước, còn đầy đủ hộp, sách và phụ kiện.</li>
                                <li>Hộp sản phẩm còn nguyên vẹn, không để rách, nát, biến dạng.</li>
                            </ul>
                            <p>
                                <strong>Thời gian đước áp dụng trong 7 ngày kể từ ngày đầu tiên mua hàng</strong>
                            </p>
                        </div>
                        <h3>2. Thời gian đối với xử lý bảo hành sản phẩm</h3>
                        <h3 style={{ color: 'var(--color-1)' }}>A. LỖI DO NHÀ SẢN XUẤT</h3>
                        <div>
                            <p>
                                Nhân viên kĩ thuật – bảo hành GearVN tiến hành kiểm tra ngay thời điểm tiếp nhận sản
                                phẩm bảo hành:
                            </p>
                            <ul>
                                <li>
                                    <strong>Phát hiện ra lỗi : </strong> MyStore xử lý bảo hành theo chính sách bảo hành
                                    sản phẩm.
                                </li>
                                <li>
                                    <strong>Chưa phát hiện ra lỗi : </strong> MyStore có thể giữ lại sản phẩm để tiếp
                                    tục kiểm tra trong vòng 3 ngày làm việc nếu có yêu cầu kiểm tra của khách hàng(không
                                    bao gồm thứ 7, Chủ Nhật & các ngày Lễ, Tết). Sau 3 ngày kiểm tra vẫn chưa phát hiện
                                    được lỗi của sản phẩm, MyStore xin phép hoàn trả lại sản phẩm đến quý khách.
                                </li>
                            </ul>
                        </div>

                        <strong>
                            Chính sách bảo hành của hãng được áp dụng cho từng nhóm hàng/sản phẩm cụ thể như sau:
                        </strong>
                        <div className="warranty-img">
                            <img
                                src="https://w.ladicdn.com/s1550x1000/5bf3dc7edc60303c34e4991f/chinhsachbaohanh-recovered-29-20220810033852.jpg"
                                alt="img"
                            />
                        </div>
                        <h3 style={{ color: 'var(--color-1)' }}>
                            B. LỖI DO NGƯỜI DÙNG:{' '}
                            <strong style={{ color: 'var(--color-6)' }}>
                                MyStore từ chối bảo hành các sản phẩm lỗi phát sinh do người sử dụng.
                            </strong>
                        </h3>
                        <h3>
                            3. Trường hợp sản phẩm bị lỗi kĩ thuật và Nhà sản xuất không còn sản phẩm thay thế, đổi trả
                            bảo hành hoặc ngưng kinh doanh, khách hàng lựa chọn một trong những phương án sau:
                        </h3>
                        <div className="d-flex flex-wrap gap-4">
                            <div>
                                <h3 style={{ color: 'var(--color-1)' }}>A. ĐỔI SẢN PHẨM KHÁC</h3>
                                <p>
                                    Đổi ngay sản phẩm tương đương: Cùng nhóm, cùng cấu hình, cùng dung lượng, … hoặc cao
                                    hơn do GearVN đề xuất.
                                </p>
                            </div>
                            <div>
                                <h3 style={{ color: 'var(--color-1)' }}>B. SỬA CHỮA SẢN PHẨM</h3>
                                <p>
                                    MyStore sẽ gửi sản phẩm bị lỗi về Hãng/Nhà sản xuất để sửa chữa hoặc thay thế theo
                                    qui định của Hãng và không thu phí phát sinh.
                                </p>
                            </div>
                            <div>
                                <h3 style={{ color: 'var(--color-1)' }}>C. HOÀN TRẢ LẠI SẢN PHẨM - HOÀN TIỀN</h3>
                                <p>
                                    Trong 1 tháng đầu tiên, MyStore hoàn lại 80% giá trị sản phẩm theo hóa đơn. Từ tháng
                                    thứ 2 trở đi, trừ thêm 5% giá trị sản phẩm theo hóa đơn mỗi tháng nhưng trừ không
                                    quá tối đa 70% giá trị sản phẩm.
                                </p>
                            </div>
                            <div className="warranty-img">
                                <img
                                    src="https://w.ladicdn.com/s1600x600/5bf3dc7edc60303c34e4991f/chinhsachbaohanh-recovered-30-20201106073424.png"
                                    alt="img"
                                />
                            </div>
                        </div>
                    </Stack>
                </Row>
            </Container>
        </Container>
    );
}

export default WarrantyPolicy;
