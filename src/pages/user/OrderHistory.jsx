import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../../features/user/order/myOrderSlice';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const OrderHistory = () => {
    const dispatch = useDispatch();
    const { loggeduser } = useSelector((state) => state.userDetails);
    const { orders, isLoading, isError, error } = useSelector((state) => state.orders.orders);

    const userToken = loggeduser.token;

    useEffect(() => {
        dispatch(fetchMyOrders({ userToken }));
    }, [dispatch, userToken]);

    let content;

    if (isLoading) {
        content = <div className="col-span-12 text-center p-8"><Icon icon="svg-spinners:ring-resize" className="text-3xl text-primary-500 inline-block" /></div>;
    } else if (isError) {
        content = <div className="col-span-12 bg-red-50 text-red-600 p-4 rounded-xl">{error}</div>;
    } else if (orders?.length === 0) {
        content = (
            <div className="col-span-12 text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Icon icon="solar:bag-corss-bold" className="text-3xl" />
                </div>
                <h3 className="text-slate-800 font-bold mb-2">No Past Orders</h3>
                <Link to="/medicine/store" className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition">Shop Medicine</Link>
            </div>
        );
    } else if (orders?.length > 0) {
        content = orders.map((order) => (
            <div key={order._id} className="col-span-12">
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-wrap justify-between items-center border-b border-slate-50 pb-4 mb-4">
                        <div>
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Order ID</span>
                            <p className="text-sm font-bold text-slate-700">#{order._id.slice(-6).toUpperCase()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${order.orderStatus === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                                }`}>
                                {order.orderStatus || 'Processing'}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {order.orderItems.map((item) => (
                            <div key={item._id} className="flex gap-4 items-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-lg p-2 border border-slate-100 flex-shrink-0">
                                    <img src={item.image.url} alt={item.name} className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-slate-800 text-sm">{item.name}</h4>
                                    <div className="flex justify-between mt-1">
                                        <p className="text-xs text-slate-500">Qty: {item.qty} x {item.price}</p>
                                        <p className="text-sm font-bold text-slate-700">{item.qty * item.price} Tk</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-slate-500 text-sm font-medium">Total Amount</span>
                        <span className="text-lg font-bold text-primary-700">{order.totalPrice} Tk</span>
                    </div>
                </div>
            </div>
        ));
    }

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                <Icon icon="solar:cart-large-4-bold" className="text-primary-500" />
                Order History
            </h2>
            <div className="grid grid-cols-12 gap-6">
                {content}
            </div>
        </div>
    );
};

export default OrderHistory;