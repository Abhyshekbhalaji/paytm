
import  { useEffect, useRef, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";


export default function Dashboard({toggleTheme,theme}) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [balance,setBalance] =useState(0);
const [user,setUser]= useState([]);
const [allUsers, setAllUsers] = useState([]);

 const [filteredUsers,setFilteredUsers]=useState([]);
const inputRef=useRef();

async function getUser(){
  let res=await axios.get('http://localhost:3000/api/v1/user/details',{
    withCredentials:true
  })

  setUser(res.data.user);
  setBalance(res.data.accountDetails.balance)
}

async function getAllUsers() {
  const res = await axios.get("http://localhost:3000/api/v1/details/all", {
    withCredentials: true,
  });
  let payload = res.data.users;
  payload = payload.filter((u) => u.username !== user.username);
  setAllUsers(payload);
  setFilteredUsers(payload);
}
  useEffect(()=>{
    getUser()

  },[])

  useEffect(()=>{
if(user.username){
  getAllUsers();
}
  },[user])

useEffect(() => {
    if (allUsers.length > 0) {
      const filtered = allUsers.filter((u) =>
        (u.firstname + " " + u.lastname)
          .toLowerCase()
          .includes(search.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [search, allUsers]);

function generateRandomHexColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor.padStart(6, '0')}`; 
}

async function handlePayment(){
  console.log(inputRef.current.value);
  let res= await axios.post('http://localhost:3000/api/v1/account/pay',{
    toUser:selectedUser.username,
    amount:parseInt(inputRef.current.value)
  },{
    withCredentials:true
  });

  if(res.data.success){
    toast.success('Transaction successful to '+selectedUser.username );
    setBalance(balance-parseInt(inputRef.current.value));
  }

  setShowModal(false);
}
return (
  <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-w-screen min-h-screen transition-colors duration-300">
   
    <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-3xl font-bold">Payments App</h1>
      <div className="flex items-center space-x-2">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded bg-gray-200 text-black dark:bg-gray-700 dark:text-white transition-colors duration-300"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <span className="text-lg">Hello, {user.firstName ? user.firstName : 'User'}</span>
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl font-bold">
          {user ? user?.firstName?.slice(0, 1) : 'U'}
        </div>
      </div>
    </div>

    {/* Balance */}
    <div className="p-6">
      <span className="text-xl font-semibold">Your Balance </span>
      <span className="text-xl font-bold">$ {balance.toFixed(2)}</span>
    </div>

    <div className="px-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <input
        className="mb-6 w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-white dark:border-gray-600 transition-colors duration-300"
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-6">
        {filteredUsers.length > 0 ? filteredUsers.map((user, i) => (
          <div
            key={i}
            className="flex items-center gap-1 justify-between mt-5 p-1 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-150"
          >
            <div className="flex items-center space-x-4">
              <div
                className="w-10 h-10 opacity-80 rounded-full flex items-center justify-center text-lg font-semibold"
                style={{ backgroundColor: generateRandomHexColor() }}
              >
                {user ? user?.firstname?.slice(0, 1) : 'U'}
              </div>

              <div className="flex flex-col items-start">
                <span className="text-lg font-medium">{user.firstname} {user.lastname}</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm font-italics">@{user.username}</span>
              </div>
            </div>

            <button
              className="bg-black text-white dark:bg-gray-800 dark:text-white px-6 py-2 rounded font-semibold hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
              onClick={() => {
                setSelectedUser(user);
                setShowModal(true);
              }}
            >
              Send Money
            </button>
          </div>
        )) : (
          <h2 className="text-xl text-gray-500 dark:text-gray-400 text-center font-bold">No users found.</h2>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-2xl max-w-sm w-full text-center border border-gray-200 dark:border-gray-700 transform transition-all duration-300 scale-100 hover:scale-[1.02]">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Send Money to <span className="text-green-600">{selectedUser.firstname + " " + selectedUser.lastname}</span>
            </h3>

            <div className="flex flex-col items-center gap-5">
              <input
                type="number"
                placeholder="Enter amount"
                className="w-2/3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors duration-300"
                ref={inputRef}
              />

              <div className="flex gap-4 w-full justify-center">
                <button
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  onClick={() => handlePayment()}
                >
                  Pay
                </button>

                <button
                  className="flex-1 bg-gray-300 hover:bg-red-500 hover:text-white text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-red-600 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);
}

 