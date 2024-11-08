const UserRoute = require('./UserRoutes');
const ProductsRoutes = require('./ProductsRoutes');
const Payments = require('./PaymentsRoutes');
const AdminRoutes = require('./AdminRoutes');
const WebRoutes = require('./WebRoutes');
function route(app) {
    // User
    app.post('/api/register', UserRoute);
    app.post('/api/login', UserRoute);
    app.get('/api/auth', UserRoute);
    app.post('/api/changepass', UserRoute);
    app.get('/api/logout', UserRoute);
    app.post('/api/editprofile', UserRoute);
    app.post('/api/sendmessage', UserRoute);
    app.post('/api/avatar', UserRoute);

    // Products
    app.get('/api/products', ProductsRoutes);
    app.get('/api/getproduct', ProductsRoutes);
    app.post('/api/cart', ProductsRoutes);
    app.get('/api/getcart', ProductsRoutes);
    app.get('/api/search', ProductsRoutes);

    // Admin
    app.get('/api/getorder', AdminRoutes);
    app.get('/api/datauser', AdminRoutes);
    app.post('/api/addproduct', AdminRoutes);
    app.post('/api/deleteproduct', AdminRoutes);
    app.post('/api/editproduct', AdminRoutes);
    app.get('/api/auth/me', AdminRoutes);
    app.post('/api/checkproduct', AdminRoutes);

    // Payments
    app.post('/api/paymentmomo', Payments);
    app.get('/api/checkdata', Payments);
    app.get('/api/successPayment', Payments);
    app.post('/api/payment', Payments);

    // Blog
    app.get('/api/getblog', WebRoutes);
    app.post('/api/addblog', WebRoutes);
    app.post('/api/deleteblog', WebRoutes);
}

module.exports = route;
