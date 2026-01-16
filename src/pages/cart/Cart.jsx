import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { getTotals, removeFromCart } from '../../features/medicine/cartSlice';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import cartImg from '../../assets/bag.png';

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const handleRemove = (product) => {
        dispatch(removeFromCart(product));
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Navbar />

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <Icon icon="solar:cart-large-bold" className="text-primary-500" />
                        Shopping Cart
                    </h1>

                    {cart.cartItems?.length > 0 ? (
                        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                            {/* Cart Items */}
                            <div className="lg:col-span-8">
                                <div className="space-y-4">
                                    {cart.cartItems.map((cartItem) => (
                                        <div
                                            key={cartItem.id || cartItem.name}
                                            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-6"
                                        >
                                            {/* Product Image */}
                                            <div className="w-full sm:w-32 h-32 bg-slate-50 rounded-xl flex items-center justify-center p-4">
                                                <img
                                                    src={cartItem.image.url}
                                                    alt={cartItem.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 w-full text-center sm:text-left">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-slate-800 mb-1">{cartItem.name}</h3>
                                                        <p className="text-slate-500 text-sm">Unit Price: <span className="font-semibold text-slate-700">৳{cartItem.price}</span></p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemove(cartItem)}
                                                        className="text-slate-400 hover:text-red-500 transition-colors bg-slate-50 p-2 rounded-full hover:bg-red-50"
                                                    >
                                                        <Icon icon="solar:trash-bin-trash-bold" className="text-xl" />
                                                    </button>
                                                </div>

                                                <div className="mt-4 flex items-center justify-between">
                                                    <div className="inline-flex items-center bg-slate-100 rounded-lg p-1">
                                                        <span className="px-3 py-1 text-sm font-bold text-slate-600">Qty: {cartItem.cartQuantity}</span>
                                                    </div>
                                                    <p className="text-xl font-bold text-primary-600">
                                                        ৳{cartItem.price * cartItem.cartQuantity}.00
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-4 mt-8 lg:mt-0">
                                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sticky top-24">
                                    <h2 className="text-lg font-bold text-slate-800 mb-6">Order Summary</h2>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between text-slate-600">
                                            <span>Subtotal</span>
                                            <span className="font-semibold text-slate-800">৳{cart.cartTotalAmount}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-600">
                                            <span>Shipping Charge</span>
                                            <span className="font-semibold text-slate-800">৳60.00</span>
                                        </div>
                                        <div className="border-t border-slate-100 pt-4 flex justify-between text-lg font-bold text-slate-900">
                                            <span>Total</span>
                                            <span className="text-primary-600">৳{cart.cartTotalAmount + 60}</span>
                                        </div>
                                    </div>

                                    <Link to="/shipping" className="block">
                                        <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary-500/30 transition-all transform active:scale-95 flex items-center justify-center gap-2">
                                            <span>Proceed to Checkout</span>
                                            <Icon icon="solar:arrow-right-bold" className="text-xl" />
                                        </button>
                                    </Link>

                                    <div className="mt-6 text-center">
                                        <Link
                                            to="/medicine/store"
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors"
                                        >
                                            <Icon icon="solar:arrow-left-bold" />
                                            Continue Shopping
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-64 h-64 mb-8 opacity-90">
                                <img src={cartImg} alt="Empty Cart" className="w-full h-full object-contain" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Your Cart is Empty</h2>
                            <p className="text-slate-500 mb-8 max-w-md">
                                Looks like you haven't added any medicines to your cart yet.
                            </p>
                            <Link to="/medicine/store">
                                <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-primary-500/30 transition-all transform hover:-translate-y-1">
                                    Start Shopping
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Cart;
