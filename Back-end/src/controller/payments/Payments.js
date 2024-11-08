const axios = require('axios');
const crypto = require('crypto');

const ModelCart = require('../../model/ModelCart');
const ModelPaymentSuccess = require('../../model/ModelPaymentSuccess');
const { jwtDecode } = require('jwt-decode');
const { log } = require('console');

class ControllerPayments {
    async PaymentsMomo(req, res) {
        const token = req.cookies;
        const decoded = jwtDecode(token.Token);
        ModelCart.findOne({ email: decoded.email }).then((dataCart) => {
            if (dataCart) {
                var accessKey = 'F8BBA842ECF85';
                var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
                var orderInfo = `${decoded.email}`;
                var partnerCode = 'MOMO';
                var redirectUrl = 'http://localhost:5000/api/checkdata';
                var ipnUrl = 'http://localhost:3000/thanks';
                var requestType = 'payWithMethod';
                var amount = dataCart.sumPrice;
                var orderId = partnerCode + new Date().getTime();
                var requestId = orderId;
                var extraData = '';
                var paymentCode =
                    'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
                var orderGroupId = '';
                var autoCapture = true;
                var lang = 'vi';
                //before sign HMAC SHA256 with format
                //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
                var rawSignature =
                    'accessKey=' +
                    accessKey +
                    '&amount=' +
                    amount +
                    '&extraData=' +
                    extraData +
                    '&ipnUrl=' +
                    ipnUrl +
                    '&orderId=' +
                    orderId +
                    '&orderInfo=' +
                    orderInfo +
                    '&partnerCode=' +
                    partnerCode +
                    '&redirectUrl=' +
                    redirectUrl +
                    '&requestId=' +
                    requestId +
                    '&requestType=' +
                    requestType;
                '&datacart=' + dataCart.products;
                //puts raw signature

                //signature
                var signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

                //json object send to MoMo endpoint
                const requestBody = JSON.stringify({
                    partnerCode: partnerCode,
                    partnerName: 'Test',
                    storeId: 'MomoTestStore',
                    requestId: requestId,
                    amount: amount,
                    orderId: orderId,
                    orderInfo: orderInfo,
                    redirectUrl: redirectUrl,
                    ipnUrl: ipnUrl,
                    lang: lang,
                    requestType: requestType,
                    autoCapture: autoCapture,
                    extraData: extraData,
                    orderGroupId: orderGroupId,
                    signature: signature,
                });

                axios
                    .post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': Buffer.byteLength(requestBody),
                        },
                    })
                    .then((response) => res.status(200).json(response.data))
                    .catch((error) => console.error(error));
            } else {
                return res.status(401).json({ message: 'Please add product to cart' });
            }
        });
    }

    async checkData(req, res, next) {
        const email = req.query.orderInfo;
        if (req.query.resultCode === '0') {
            const dataCart = await ModelCart.findOne({ email: email });
            if (dataCart) {
                const existingPaymentSuccess = await ModelPaymentSuccess.findOne({ email: email });
                if (existingPaymentSuccess) {
                    // Nếu đã có dữ liệu trong ModelPaymentSuccess với email tương tự
                    // Thêm dữ liệu vào mảng products của dữ liệu đã tồn tại
                    dataCart.products.forEach(async (item) => {
                        const existingProductIndex = existingPaymentSuccess.products.findIndex(
                            (product) => product.nameProduct === item.nameProduct,
                        );
                        if (existingProductIndex !== -1) {
                            // Nếu sản phẩm đã tồn tại trong mảng products của ModelPaymentSuccess
                            // Cập nhật số lượng sản phẩm và giá tiền
                            existingPaymentSuccess.products[existingProductIndex].quantity += item.quantity;
                            existingPaymentSuccess.products[existingProductIndex].price += item.price;
                        } else {
                            // Nếu sản phẩm chưa tồn tại trong mảng products của ModelPaymentSuccess
                            // Thêm mới sản phẩm vào mảng
                            existingPaymentSuccess.products.push({
                                nameProduct: item.nameProduct,
                                quantity: item.quantity,
                                price: item.price,
                            });
                        }
                    });
                    // Cập nhật tổng giá tiền
                    existingPaymentSuccess.sumPrice += dataCart.sumPrice;
                    // Lưu lại dữ liệu đã cập nhật
                    await existingPaymentSuccess.save();
                } else {
                    // Nếu chưa có dữ liệu trong ModelPaymentSuccess với email tương tự
                    // Tạo mới dữ liệu và lưu vào database
                    const newDataSuccess = new ModelPaymentSuccess({
                        email: email,
                        products: dataCart.products.map((item) => ({
                            nameProduct: item.nameProduct,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                        sumPrice: dataCart.sumPrice,
                    });
                    await newDataSuccess.save();
                }
                // Xóa dữ liệu trong ModelCart
                await ModelCart.deleteOne({ email: email });
            }
        }
    }

    async GetProductsSuccess(req, res) {
        const token = req.cookies;
        const decoded = jwtDecode(token.Token);
        ModelPaymentSuccess.find({ email: decoded.email }).then((data) => {
            return res.status(200).json([data]);
        });
    }
    async Payments(req, res) {
        const token = req.cookies;
        const decoded = jwtDecode(token.Token);
        if (!decoded.email) {
            return res.status(403).json({ message: 'Bạn Cần Đăng Nhập Lại !!!' });
        }
        ModelCart.findOne({ email: decoded.email }).then((dataCart) => {
            const newDataSuccess = new ModelPaymentSuccess({
                email: decoded.email,
                products: dataCart.products.map((item) => ({
                    nameProduct: item.nameProduct,
                    quantity: item.quantity,
                    price: item.price,
                })),
                sumPrice: dataCart.sumPrice,
            });
            newDataSuccess.save();
            return res.status(200).json(dataCart);
        });
    }
}

module.exports = new ControllerPayments();
