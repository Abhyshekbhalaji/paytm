import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  async function validateUser(){

    try {
      let res=await axios.get("http://localhost:3000/api/v1/validate", {withCredentials: true  }) ;
      if(res.data.loggedIn){
        setIsLoggedIn(true);
      }
    } catch (error) {
        setIsLoggedIn(false);
        console.log(error);
    }finally{
      setLoading(false);
    }
      
  }


  useEffect(() => {
      validateUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
