const ModelProducts = require('../../model/ModelProducts');
const ModelCart = require('../../model/ModelCart');

const { jwtDecode } = require('jwt-decode');

require('dotenv').config();

class ControllerProducts {
    GetProducts(req, res) {
        ModelProducts.find({}).then((dataProducts) => {
            return res.status(200).json(dataProducts);
        });
    }
    GetOneProduct(req, res) {
        const id = req.query.id;
        ModelProducts.findOne({ id: id }).then((dataProducts) => res.status(200).json(dataProducts));
    }
    async PostCart(req, res) {
        const token = req.cookies;
        const decoded = jwtDecode(token.Token);

        try {
            const data = req.body;
            let total = 0;
            const products = [];

            for (const item of data) {
                const dataProducts = await ModelProducts.findOne({ id: item.id });

                if (dataProducts) {
                    products.push({
                        nameProduct: dataProducts.nameProducts,
                        quantity: item.quantity,
                        price: dataProducts.priceNew,
                    });
                }
            }

            products.reduce((acc, item) => {
                total += item.price * item.quantity;
            }, 0);

            const newCart = new ModelCart({
                email: decoded.email,
                products: products,
                sumPrice: total,
            });

            await newCart.save();

            return res.status(200).json({ message: 'Success' });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async GetCart(req, res) {
        const token = req.cookies;
        const decoded = jwtDecode(token.Token);
        ModelCart.find({ email: decoded.email }).then((dataCart) => {
            return res.status(200).json(dataCart);
        });
    }
    async SearchProduct(req, res) {
        const keyword = req.query.nameProduct;
        ModelProducts.find({ nameProducts: { $regex: keyword, $options: 'i' } }).then((dataProducts) => {
            if (dataProducts.length <= 0) {
                return res.status(200).json([
                    {
                        img: 'https://st3.depositphotos.com/23594922/31822/v/450/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
                        nameProducts: 'Không Tìm Thấy Sản Phẩm !!!',
                        price: 0,
                    },
                ]);
            } else {
                return res.status(200).json(dataProducts);
            }
        });
    }
}

module.exports = new ControllerProducts();
