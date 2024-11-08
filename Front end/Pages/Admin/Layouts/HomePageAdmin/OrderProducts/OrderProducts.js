import { useEffect, useState } from 'react';

import request from '../../../../../config/Connect';
import { CheckProduct } from '../../../Modal/Modal';

function OrderProducts() {
    const [dataOrder, setDataOrder] = useState([]);
    const [show, setShow] = useState(false);
    const [idProduct, setIdProduct] = useState(false);

    useEffect(() => {
        request.get('/api/getorder').then((res) => setDataOrder(res.data));
    }, [show]);

    const handleCheckProduct = (data) => {
        setShow(!show);
        setIdProduct(data);
    };

    return (
        <div>
            <h1>Order Products</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Email</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {dataOrder?.map((item) => (
                        <tr>
                            <th scope="row">{item?.email}</th>
                            {item.products.map((item2) => (
                                <>
                                    <th>
                                        <td key={item2._id}> {item2?.nameProduct}</td>
                                    </th>
                                    <th>
                                        <td>$ {item2.price?.toLocaleString()}</td>
                                    </th>
                                    <th>
                                        <td>x {item2.quantity}</td>
                                    </th>
                                    <td>
                                        <button
                                            onClick={() => handleCheckProduct(item.email)}
                                            type="button"
                                            className="btn btn-primary"
                                        >
                                            Duyệt
                                        </button>
                                    </td>
                                </>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <CheckProduct show={show} setShow={setShow} idProduct={idProduct} />
        </div>
    );
}

export default OrderProducts;
