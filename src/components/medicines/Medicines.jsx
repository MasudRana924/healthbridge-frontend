import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { message } from "antd";
import { Link } from 'react-router-dom';
import { addToCart, getTotals } from '../../features/medicine/cartSlice';

const Medicines = ({ medicine }) => {
    const dispatch = useDispatch();

    const handleCart = (product) => {
        dispatch(addToCart(product));
        dispatch(getTotals());
        message.success("Medicine added to cart");
    };

    return (
        <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-300 group overflow-hidden flex flex-col h-full">
                <div className="relative p-4 bg-slate-50 flex items-center justify-center h-48 group-hover:bg-white transition-colors">
                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1 bg-primary-50 text-primary-600 text-[10px] uppercase font-bold px-2 py-1 rounded-md shadow-sm">
                            <Icon icon="solar:pill-bold" />
                            {medicine.type}
                        </span>
                    </div>

                    {/* Wishlist */}
                    <button className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 shadow-sm transition-all duration-200 hover:scale-110">
                        <Icon icon="solar:heart-bold" className="text-lg" />
                    </button>

                    <Link to={`/medicine/${medicine._id}`} className="block w-full h-full">
                        <img
                            src={medicine.image?.url}
                            className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 will-change-transform"
                            alt={medicine.name}
                        />
                    </Link>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                    <Link to={`/medicine/${medicine._id}`} className="block mb-2">
                        <h3 className="text-slate-800 font-bold text-lg line-clamp-1 hover:text-primary-600 transition-colors">
                            {medicine.name}
                        </h3>
                    </Link>

                    <div className="flex items-center gap-1 mb-4">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Icon key={i} icon="solar:star-bold" className="text-sm" />
                            ))}
                        </div>
                        <span className="text-xs text-slate-400 font-medium ml-1">(4.8)</span>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-400 font-medium uppercase">Price</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-bold text-slate-800">৳{medicine.price}</span>
                                <span className="text-xs text-slate-500">/unit</span>
                            </div>
                        </div>

                        {medicine?.quantity > 0 ? (
                            <button
                                onClick={() => handleCart(medicine)}
                                className="flex items-center gap-2 bg-slate-800 hover:bg-primary-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg shadow-slate-200 hover:shadow-primary-500/30 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
                            >
                                <Icon icon="solar:cart-plus-bold" className="text-lg" />
                                Add
                            </button>
                        ) : (
                            <button
                                disabled
                                className="flex items-center gap-2 bg-slate-100 text-slate-400 text-sm font-medium px-4 py-2.5 rounded-xl cursor-not-allowed"
                            >
                                <Icon icon="solar:forbidden-circle-bold" className="text-lg" />
                                Out of Stock
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

Medicines.propTypes = {
    medicine: PropTypes.object.isRequired
};

export default Medicines;