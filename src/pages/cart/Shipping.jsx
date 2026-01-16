import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { getTotals, removeFromCart, clearCart } from '../../features/medicine/cartSlice';
import { createOrder } from '../../features/order/orderSlice';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import 'react-toastify/dist/ReactToastify.css';

const Shipping = () => {
    const dispatch = useDispatch();
    const { loggeduser } = useSelector((state) => state.userDetails);
    const cart = useSelector((state) => state.cart);
    const { order } = useSelector(state => state.order);

    const userToken = loggeduser.token;

    // State
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [paymentInfo, setPaymentInfo] = useState('Bkash');

    // Calculations
    const itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.cartQuantity * item.price, 0);
    const shippingPrice = 60;
    const totalPrice = itemsPrice + shippingPrice;

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    useEffect(() => {
        if ((paymentInfo === 'Bkash' || paymentInfo === 'Nagad') && order[0]) {
            window.location.replace(order[0].url);
        }
    }, [order, paymentInfo]);

    const handleRemove = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleCreateOrder = (e) => {
        e.preventDefault();

        if (!name || !address || !phone || !city) {
            toast.error('Please fill in all shipping details', { theme: "colored" });
            return;
        }

        const shippingInfo = { name, phone, address, city };
        const orderItems = cart.cartItems;
        const data = { shippingInfo, orderItems, itemsPrice, shippingPrice, totalPrice, paymentInfo };

        dispatch(createOrder({ data, userToken }));
        dispatch(clearCart());
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Navbar />

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <Icon icon="solar:box-minimalistic-bold" className="text-primary-500" />
                        Checkout
                    </h1>

                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        {/* Shipping Form */}
                        <div className="lg:col-span-7">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
                                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <Icon icon="solar:map-point-bold" className="text-primary-500" />
                                    Shipping Details
                                </h2>

                                <form onSubmit={handleCreateOrder} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Payment Method</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {['Bkash', 'Nagad'].map((method) => (
                                                <div
                                                    key={method}
                                                    onClick={() => setPaymentInfo(method)}
                                                    className={`cursor-pointer rounded-xl border p-4 flex items-center gap-3 transition-all ${paymentInfo === method
                                                            ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500'
                                                            : 'border-slate-200 hover:border-primary-200'
                                                        }`}
                                                >
                                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentInfo === method ? 'border-primary-500' : 'border-slate-300'
                                                        }`}>
                                                        {paymentInfo === method && <div className="w-2.5 h-2.5 rounded-full bg-primary-500" />}
                                                    </div>
                                                    <span className="font-semibold text-slate-700">{method}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Enter recipient's name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                                placeholder="01XXXXXXXXX"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                                placeholder="e.g. Dhaka"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Delivery Address</label>
                                        <textarea
                                            rows="3"
                                            className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                                            placeholder="House no, Road no, Area..."
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/30 transition-all transform hover:-translate-y-1 block md:hidden mt-8"
                                    >
                                        Confirm Order
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-5 mt-8 lg:mt-0">
                            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sticky top-24">
                                <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Order Summary</h2>

                                <div className="max-h-80 overflow-y-auto pr-2 space-y-4 mb-6 custom-scrollbar">
                                    {cart.cartItems.map((cartItem) => (
                                        <div key={cartItem.id || cartItem.name} className="flex gap-4 items-center">
                                            <div className="w-16 h-16 bg-slate-50 rounded-lg flex items-center justify-center p-2 border border-slate-100 flex-shrink-0">
                                                <img src={cartItem.image.url} alt={cartItem.name} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold text-slate-800 truncate">{cartItem.name}</h4>
                                                <p className="text-xs text-slate-500">Qty: {cartItem.cartQuantity} x ৳{cartItem.price}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-slate-700">৳{cartItem.price * cartItem.cartQuantity}</p>
                                                <button
                                                    onClick={() => handleRemove(cartItem)}
                                                    className="text-xs text-red-400 hover:text-red-500 underline mt-1"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 bg-slate-50 p-4 rounded-xl">
                                    <div className="flex justify-between text-slate-600">
                                        <span>Items Total</span>
                                        <span className="font-semibold">৳{itemsPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Shipping</span>
                                        <span className="font-semibold">৳{shippingPrice}</span>
                                    </div>
                                    <div className="border-t border-slate-200 pt-3 flex justify-between text-lg font-bold text-primary-700">
                                        <span>Total to Pay</span>
                                        <span>৳{totalPrice}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCreateOrder}
                                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/30 transition-all transform hover:-translate-y-1 mt-6 hidden md:block"
                                >
                                    Payer via {paymentInfo}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ToastContainer />
            <Footer />
        </div>
    );
};

export default Shipping;