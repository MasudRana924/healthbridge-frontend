import { Routes, Route, Navigate } from 'react-router-dom';
import HomeLayout from '../pages/layout/HomeLayout';
import Login from '../pages/auth/Login';
import Consultation from '../pages/consultation/Consultation';
import Register from '../pages/auth/Register';
import DoctorLogin from '../pages/auth/DoctorLogin';
import DoctorSignup from '../pages/auth/DoctorSignup';
import Cart from '../pages/cart/Cart';
import Shipping from '../pages/cart/Shipping';
import MedicineLayout from '../pages/layout/MedicineLayout';
import NurseLayout from '../pages/layout/NurseLayout';
import NurseDetails from '../pages/nurse/NurseDetails';
import SingleDoctor from '../pages/doctors/SingleDoctor';
import OnsiteAppointmentBooking from '../pages/appointment/OnsiteAppointmentBooking';
import UserLayout from '../pages/user-layout/UserLayout';
import Orders from '../pages/user-layout/Orders';
import UserDetails from '../pages/user/UserDetails';
import UserChangepassword from '../pages/user/UserChangepassword';
import MyConsultantHistory from '../pages/user/MyConsultantHistory';
import Prescription from '../pages/user/Prescription';
import NursesHistory from '../pages/user/NursesHistory';
import OrderHistory from '../pages/user/OrderHistory';
import Payment from '../pages/appointment/Payment';
import OrderPayment from '../pages/user/OrderPayment';
import PrivateRoute from './PrivateRoute';
import BloodLayout from '../pages/layout/BloodLayout';
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeLayout />}>
                <Route index element={<Navigate to="find-doctor" />} />
                <Route path="find-doctor" element={<Consultation />} />
            </Route>
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/user/info" element={<PrivateRoute><UserLayout /></PrivateRoute>}>
                <Route index element={<Navigate to="update-account" />} />
                <Route path="update-account" element={<PrivateRoute><UserDetails /></PrivateRoute>} />
                <Route path="change-password" element={<PrivateRoute><UserChangepassword /></PrivateRoute>} />
                <Route path="consultations-history" element={<PrivateRoute><MyConsultantHistory /></PrivateRoute>} />
                <Route path="prescription-history" element={<PrivateRoute><Prescription /></PrivateRoute>} />
                <Route path="nurses-history" element={<PrivateRoute><NursesHistory /></PrivateRoute>} />
                <Route path="orders-history" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />
                <Route path="orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
            </Route>
            <Route path="/doctor/login" element={<DoctorLogin />} />
            <Route path="/doctor/signup" element={<DoctorSignup />} />
            <Route path="/medicine/store" element={<MedicineLayout />} />
            <Route path="/doctor/:doctorId" element={<SingleDoctor />}></Route>
            <Route path="/nurses" element={<NurseLayout />} />
            <Route path="/nurse/:id" element={<NurseDetails />} />

            {/* blood */}
            <Route path="/blood-store" element={<BloodLayout />} />



            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<PrivateRoute><Shipping></Shipping></PrivateRoute>} />
            {/* appointment */}
            <Route path="/onsite/appointment" element={<PrivateRoute><OnsiteAppointmentBooking /></PrivateRoute>} />
            {/* payment-routes */}
            <Route path="/payment/successfull/:tranId" element={<Payment></Payment>}></Route>
            <Route path="/order/payment/successfull/:tranId" element={<OrderPayment></OrderPayment>}></Route>
        </Routes>
    );
};

export default AppRoutes;