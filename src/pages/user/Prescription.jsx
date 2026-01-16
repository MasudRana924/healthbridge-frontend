import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPrescription } from "../../features/user/prescription/prescriptionSlice";
import { useReactToPrint } from "react-to-print";
import { Modal } from "antd";
import { Icon } from '@iconify/react';

const Prescription = () => {
  const dispatch = useDispatch();
  const { loggeduser } = useSelector((state) => state.userDetails);
  const { prescription, isLoading, isError, error } = useSelector(
    (state) => state.myPrescriptions.myPrescriptions
  );
  const userToken = loggeduser.token;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const showModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedBooking(null);
  };

  useEffect(() => {
    dispatch(fetchPrescription({ userToken }));
  }, [dispatch, userToken]);

  let content;
  if (isLoading) {
    content = <div className="text-center p-8"><Icon icon="svg-spinners:ring-resize" className="text-3xl text-primary-500 inline-block" /></div>;
  } else if (isError) {
    content = <div className="bg-red-50 text-red-600 p-4 rounded-xl">{error}</div>;
  } else if (prescription?.length === 0) {
    content = (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
          <Icon icon="solar:document-add-bold" className="text-3xl" />
        </div>
        <h3 className="text-slate-800 font-bold mb-2">No Prescriptions Yet</h3>
        <p className="text-slate-500">Your doctor's prescriptions will appear here.</p>
      </div>
    );
  } else {
    content = prescription.map((booking) => (
      <div key={booking._id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded-md uppercase">Verified</span>
            <span className="text-slate-400 text-sm">{new Date(booking.createdAt).toDateString()}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Icon icon="solar:user-id-bold" className="text-primary-500" />
            {booking.doctortitle} {booking.doctorname}
          </h3>
          <p className="text-slate-500 text-sm mt-1">Problem: <span className="font-medium text-slate-700">{booking.problem}</span></p>
        </div>

        <button
          onClick={() => showModal(booking)}
          className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-2.5 px-5 rounded-xl transition-all border border-slate-200"
        >
          <Icon icon="solar:eye-bold" className="text-lg" />
          View & Print
        </button>
      </div>
    ));
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
      <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
        <Icon icon="solar:document-medicine-bold" className="text-primary-500" />
        Prescription History
      </h2>
      <div className="space-y-4">{content}</div>

      <Modal
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
        width={700}
        className="p-0 rounded-2xl overflow-hidden"
      >
        <div className="p-6">
          {/* Print Actions */}
          <div className="flex justify-end mb-4 no-print">
            <button onClick={handlePrint} className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2">
              <Icon icon="solar:printer-bold" /> Print
            </button>
          </div>

          {/* Printable Content */}
          {selectedBooking && (
            <div ref={componentRef} className="p-8 border border-slate-200 rounded-lg bg-white">
              {/* Header */}
              <div className="border-b-2 border-slate-800 pb-6 mb-6 flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">HealthBridge</h1>
                  <p className="text-slate-500 text-sm mt-1">Digital Healthcare Platform</p>
                </div>
                <div className="text-right">
                  <h2 className="font-bold text-lg">{selectedBooking.doctortitle} {selectedBooking.doctorname}</h2>
                  <p className="text-sm text-slate-600">{selectedBooking.doctordegree}</p>
                  <p className="text-sm text-slate-500">{selectedBooking.doctorwork}</p>
                </div>
              </div>

              {/* Patient Info */}
              <div className="bg-slate-50 p-4 rounded-xl mb-6 grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-slate-500">Patient Name:</span> <span className="font-bold">{selectedBooking.name}</span></div>
                <div><span className="text-slate-500">Date:</span> <span className="font-bold">{new Date().toLocaleDateString()}</span></div>
                <div><span className="text-slate-500">Age:</span> <span className="font-bold">{selectedBooking.age}</span></div>
                <div><span className="text-slate-500">Gender:</span> <span className="font-bold">{selectedBooking.gender}</span></div>
                <div><span className="text-slate-500">Weight:</span> <span className="font-bold">{selectedBooking.weight}</span></div>
              </div>

              {/* Diagnosis */}
              <div className="mb-6">
                <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2 mb-2">Clinical Findings</h3>
                <p className="text-slate-700">{selectedBooking.problem}</p>
                <p className="text-slate-700 mt-2"><span className="font-semibold">Advice:</span> {selectedBooking.doctorAdvice}</p>
              </div>

              {/* Rx */}
              <div>
                <h3 className="font-bold text-slate-800 text-xl border-b-2 border-slate-200 pb-2 mb-4 italic font-serif">Rx</h3>
                <div className="space-y-4">
                  {selectedBooking.medicines.map((med, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white p-3 border-b border-slate-50">
                      <div>
                        <p className="font-bold text-slate-800">{med.medname}</p>
                        <p className="text-sm text-slate-500">{med.dailyUse} times daily for {med.days} days</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-end">
                <div className="text-xs text-slate-400">
                  Generated by HealthBridge
                </div>
                <div className="text-center w-32">
                  <div className="border-t border-slate-900 pt-2 font-bold text-sm">Signature</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Prescription;
