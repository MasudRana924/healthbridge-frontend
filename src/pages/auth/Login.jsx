import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { InputAdornment } from '@mui/material';
import { Rings } from 'react-loader-spinner';
import { createLogin } from '../../features/user/Login/loginSlice.js';
import { Navbar } from '../../components/common/Navbar.jsx';
import Footer from '../../components/common/Footer.jsx';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, loggeduser, isLoading } = useSelector(
        (state) => state.userDetails
    );
    const user = loggeduser.user
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        myForm.set("password", password);
        dispatch(createLogin(myForm));
    };

    useEffect(() => {
        if (user) {
            navigate('/');
            toast.info('Login Succesfull');
        }
    }, [user, navigate,]);
    return (
        <div>
            <Navbar/>
            <div className=" flex flex-col items-center justify-center mt-24 lg:mt-52 mb-20  ">
                <div className="lg:w-5/12 2xl:w-3/12 border border-white rounded-lg shadow-xl">
                    <div className=" p-8">
                        <h2 className="text-start text-2xl font-semibold leading-6 text-gray-900">Welcome to Login</h2>
                        {
                            error ? <Alert severity="error" className="mt-5">{error}</Alert> : null
                        }
                        <form action="" className="space-y-6 py-6 mt-6" onSubmit={registerSubmit}>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Email"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                className="w-full py-3 px-6"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                id="input-with-icon-textfield"
                                label="Password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOpenIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                className="w-full py-3 px-6"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />

                            <div className="lg:flex justify-between">
                                <div className="mt-5 text-start">
                                    <span className="text-sm tracking-wide text-gray-400 text-start">Are you a Doctor ?</span> <Link to="/doctor/login"> <span className="text-sm font-semibold leading-6 text-gary-900"  >Login as a doctor</span>
                                    </Link>
                                </div>
                                <div className="mt-5">
                                    <Link to="/user/password">
                                        <span className="text-start  text-sm  text-blue-700 mt-10">Forgot password ?</span>

                                    </Link>
                                </div>
                            </div>
                            <div>
                                {
                                    isLoading ? <button className=" h-12 w-full mb-5 border rounded-lg" style={{backgroundColor:"#EB569A"}}>
                                        <Rings
                                            height={40}
                                            width={60}
                                            color="red"
                                            visible={true}
                                            secondaryColor="red"
                                            className="border"

                                        />
                                    </button> : <button className=" h-12 w-full mb-5 border rounded-lg" style={{backgroundColor:"#EB569A", border:'1px solid #EB569A'}}>
                                        <span className="font-semibold text-white text-lg">Login</span>
                                    </button>
                                }
                                <span className="text-sm tracking-wide text-gray-400 mt-5">Dont have any account ?</span> <Link to="/user-signup"> <span className="text-sm font-semibold leading-6 text-gray-900"  >Create new account</span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>

                <ToastContainer
                    position="top-right"
                    autoClose={500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"

                />
                {/* Same as */}
                <ToastContainer />
            </div>
            <Footer/>
        </div>
    );
};
export default Login;