import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/DashBoard";
import Register from "./components/RegisterForm";
import Login from "./components/LoginForm";
import type { AppDispatch, RootState } from "./redux/store/store";
import { logout } from "./redux/slice/userSlice";
import { fetchData } from "./redux/thunk/fetchUser";
import { toast, Toaster } from "sonner";
import { logoutUser } from "./api/Api";
import { Routes,Route } from "react-router-dom";
import Redirect from "./components/Redirect";
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>("landing");
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );


  const handleLogin = () => {
    dispatch(fetchData());
    setCurrentView("dashboard");
  };

  const handleRegister = () => {
    setCurrentView("login");
  };
  useEffect(() => {
  if (!isAuthenticated) {
    setCurrentView("landing");
  }
}, [isAuthenticated]);

  const reset = ()=>{
        logoutUser()
      .then((val: any) => {
        if (val.data.status) {
          dispatch(logout());
          setCurrentView("landing");
          toast.success(val.data?.message);
        } else {
          toast.error(val.data?.message);
        }
      })
      .catch((err:any) => {
        toast.error(err.response.data.message.message);
      });
  }

  const handleLogout = () => {
    reset()
  };
  const goToLanding = () => {
    setCurrentView("landing");
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      setCurrentView("dashboard");
    } else {
      setCurrentView("login");
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "landing":
        return <LandingPage onGetStarted={handleGetStarted} />;
      case "login":
        return (
          <>
            {!isAuthenticated && (
              <Login
                onLogin={handleLogin}
                onSwitchToRegister={() => setCurrentView("register")}
                goToLanding={goToLanding}
              />
            )}
          </>
        );
      case "register":
        return (
          <>
            {!isAuthenticated && (
              <Register
                onRegister={handleRegister}
                onSwitchToLogin={() => setCurrentView("login")}
                goToLanding={goToLanding}
              />
            )}
          </>
        );
      case "dashboard":
        return (
          isAuthenticated && (
            <Dashboard
              user={user!}
              onLogout={handleLogout}
              goToLanding={goToLanding}
            />
          )
        );
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <>
      <Toaster richColors position="bottom-right" />
      <Routes>
        <Route path="/" element={renderCurrentView()} />
        <Route path="/:shordId" element={<Redirect/>}/>
      </Routes>
    </>
  );
};

export default App;
