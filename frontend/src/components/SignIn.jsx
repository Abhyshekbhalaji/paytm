import  { useState } from 'react';
import {Link} from 'react-router-dom'
import BottomGradient from './BottomGradient';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const SignIn = () => {
  const [username,setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);


    try {
      
let res= await axios.post('http://localhost:3000/api/v1/login' ,{
      username:username,
      password:password
    },{
  withCredentials: true
});

    if(res.data.success){
      toast.success('Welcome ' +username)
      navigate('/dashboard');
      return;
    }
 
    } catch (error) {
      toast.error(error.message);

        setError(error)
    }finally{
      setIsLoading(false)
    }



  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center p-4 ">
      <div className="w-full max-w-md dark:bg-gray-900 " >
        


        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-gray-400  text-black p-4 md:rounded-2xl md:p-8 dark:bg-black border border-neutral-800">

          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
              Welcome back
            </h2>
           
          </div>

          <BottomGradient/>
         

            <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />


          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-700/50 rounded-lg">
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>

<div className="my-8">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="user123"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="123123"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </LabelInputContainer>

            <div className="mb-6 text-right">
              <a href="#" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200">
                Forgot your password?
              </a>
            </div>

            <button
              className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50 disabled:cursor-not-allowed"
         
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login →'}
              <BottomGradient />
            </button>
          </div>

          </form>
          

          {/* Sign Up Link */}
          <div className="w-full text-center mt-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

       
      </div>
    </div>
  );
};



const LabelInputContainer = ({ children, className }) => (
  <div className={`flex w-full flex-col space-y-2 ${className || ''}`}>
    {children}
  </div>
);

const Label = ({ htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className="text-sm font-medium text-neutral-800 dark:text-neutral-200"
  >
    {children}
  </label>
);

const Input = ({ id, placeholder, type, value, onChange }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600"
  />
);

export default SignIn;