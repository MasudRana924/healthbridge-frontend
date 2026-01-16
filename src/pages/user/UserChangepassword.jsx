import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { updatePassword } from '../../features/user/changePassword/updatePasswordSlice';
import { Icon } from '@iconify/react';

const UserChangepassword = () => {
  const dispatch = useDispatch();
  const { loggeduser } = useSelector((state) => state.userDetails);
  const { error } = useSelector((state) => state.updatePassword);

  const userToken = loggeduser?.token;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      message.error("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      message.error("New password and confirm password do not match.");
      return;
    }
    if (userToken) {
      const data = { oldPassword, newPassword, confirmPassword };
      dispatch(updatePassword({ data, userToken }));
      message.success("Password update request sent.");
    } else {
      message.error("User token is missing. Please log in again.");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
      <h2 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
        <Icon icon="solar:lock-password-bold" className="text-primary-500" />
        Change Password
      </h2>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2 border border-red-100">
          <Icon icon="solar:danger-triangle-bold" className="text-xl" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={registerSubmit} className="max-w-md">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-slate-200 transition-all transform active:scale-95 flex items-center justify-center gap-2"
        >
          <Icon icon="solar:check-circle-bold" className="text-xl" />
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UserChangepassword;
