import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApponitments } from "../../features/user/appointment/myAppointmentsSlice";
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import MyConsultants from "./MyConsultants";

const MyConsultantHistory = () => {
  const { loggeduser } = useSelector((state) => state.userDetails);
  const userToken = loggeduser?.token;
  const dispatch = useDispatch();
  const { appointment, isLoading, isError, error } = useSelector(
    (state) => state.myAppointments.myAppointments
  );

  useEffect(() => {
    if (userToken) {
      dispatch(fetchApponitments({ userToken }));
    }
  }, [dispatch, userToken]);

  let content;

  if (isLoading) {
    content = (
      <div className="col-span-12 flex items-center justify-center p-8">
        <Icon icon="svg-spinners:ring-resize" className="text-3xl text-primary-500" />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="col-span-12 bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-2">
        <Icon icon="solar:danger-triangle-bold" className="text-xl" />
        {error}
      </div>
    );
  } else if (!appointment?.length) {
    content = (
      <div className="col-span-12 text-center py-12">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
          <Icon icon="solar:clipboard-remove-bold" className="text-3xl" />
        </div>
        <h3 className="text-slate-800 font-bold mb-2">No Consultations Found</h3>
        <p className="text-slate-500 mb-6">You haven&apos;t taken any consultations yet.</p>
        <Link to="/find-doctor" className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition">
          Find a Doctor
        </Link>
      </div>
    );
  } else {
    content = appointment.map((consultant) => (
      <div key={consultant._id} className="col-span-12 md:col-span-6 lg:col-span-4 p-4 border rounded-2xl bg-white shadow-sm hover:shadow-md transition-all">
        {/* Simplified Card Display - assuming MyConsultants handles details or we rework it here. 
                    Given I cannot see MyConsultants code, I will keep using it if it exists. 
                    However, wrapping it in a better grid.
                 */}
        <MyConsultants consultant={consultant} />
      </div>
    ));
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
      <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
        <Icon icon="solar:history-bold" className="text-primary-500" />
        Consultations History
      </h2>

      <div className="grid grid-cols-12 gap-6">
        {content}
      </div>
    </div>
  );
};

export default MyConsultantHistory;
