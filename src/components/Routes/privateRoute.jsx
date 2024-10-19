import React, { useCallback, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];
const idleTime = 10 * 60 * 1000;

// Placeholder for a custom dialog component
const TimedDialog = ({ onTimeout, onConfirm, isVisible }) => {
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      onTimeout();
    }, 10000); // close after 10 seconds

    return () => clearTimeout(timer);
  }, [isVisible, onTimeout]);

  if (!isVisible) return null;

  return (
    <div style={{ display:"flex",flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"center",position: 'fixed', top: '0%',textAlign:"center", padding: '10px', zIndex: 1000 }}>
      <div  style={{ color:"white",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",position: 'fixed', top: '0%',textAlign:"center", backgroundColor: 'red', padding: '10px', zIndex: 1000 }}>
      You've been idle. Click OK to continue.
      <button style={{border:"none",marginLeft:"5px", borderRadius:"20%"}} onClick={onConfirm}>OK</button>
      </div>
     
    </div>
  );
};

const ProtectedRoute = (props) => {
  const userId = localStorage.getItem("userId")? Number(localStorage.getItem("userId")) : ""
  const userName = localStorage.getItem("userName");
  const location = useLocation();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const [showDialog, setShowDialog] = useState(false);

  const handleLogout = useCallback(() => {
    // Changes here: instead of using confirm, we show the dialog
    setShowDialog(true);
  }, []);

  const handleDialogTimeout = () => {
    // Logic to remove user and navigate
    if (userId && userName) {
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
    }
    navigate("/");
  };
  const handleDialogConfirm = () => {
    setShowDialog(false); // Hide dialog
    // Set new timestamp to extend session
    const currentTime = new Date().getTime();
    const expirationTime = currentTime + idleTime;
    localStorage.setItem("timeStamp", expirationTime.toString());
  };

  //network errror
  useEffect(() => {
    const goOnline = () => {
      setIsOnline(true);
      // Optionally, reload the page
      //window.location.reload();
      alert(
        "Success is walking from failure to failure with no loss of enthusiam."
      );
    };

    const goOffline = () => {
      setIsOnline(false);
      alert("Please verify your network connection and try again.");
    };

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

   // Automatic logout on missing userId
   useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  useEffect(() => {
    if (location.pathname === "/") {
      return; // Avoid logout action if the path is "/"
    }

    

    

    let timer = setTimeout(handleLogout, idleTime);

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(handleLogout, idleTime);
    };

    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [handleLogout, location.pathname]);

  return (
    <>
      {showDialog && (
        <TimedDialog
          isVisible={showDialog}
          onTimeout={handleDialogTimeout}
          onConfirm={handleDialogConfirm}
        />
      )}
      {userId ? props.children : <Navigate to="/" />}
    </>
  );
};

export default ProtectedRoute;