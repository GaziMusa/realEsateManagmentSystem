import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { useEffect, useReducer, createContext } from 'react';
import Home from './Components/Home';
import {
  Routes,
  Route,
} from "react-router-dom";
import SelectPage from './Components/SelectPage';
import AgentSignIn from './Components/agent/AgentSignIn';
import AgentLogin from './Components/agent/AgentLogin';
import AgentDashboard from './Components/agent/AgentDashboard';
import AgentProfile from './Components/agent/AgentProfile';
import AgentProperties from './Components/agent/AgentProperties';
import AddProperties from './Components/agent/AddProperties';
import UserHomePage from './Components/user/UserHomePage';
import Properties from './Components/user/Properties';
import UserSignin from './Components/user/userSignin';
import UserLogin from './Components/user/UserLogin';
import axios from 'axios';
import { intialState, reducer } from "./Reducer/Reducer";
import AboutUs from './Components/AboutUs';
import AdminProfile from './Components/Admin/AdminProfile';
import AdmAgents from './Components/Admin/AdmAgents';
import AdmUsers from './Components/Admin/AdmUsers';
import AdminDash from './Components/Admin/AdminDash';
import AdmProperties from './Components/Admin/AdmProperties';
import AdminLogin from './Components/Admin/AdminLogin';
import BookedProperties from './Components/agent/BookedProperties'
// @user context
export const userContext = createContext();

function App() {

  const [state, dispatch] = useReducer(reducer, intialState);

  useEffect(() => {

    const isLogin = async () => {

      // @ckeck if admin is login
      const adminLogin = await axios.get('/isAdminLogin');
      if (adminLogin.data) {
        dispatch({
          type: 'ADMIN', adminPayload: {
            isLogin: true,
            type: adminLogin.data.type,
            id: adminLogin.data.id,
            name: adminLogin.data.name,
            email: adminLogin.data.email
          }
        })
      }

      // @check if agent is loged in
      const agnLogin = await axios.get('/isAgentlogin');
      // console.log(agnLogin)
      if (agnLogin.data) {
        dispatch({
          type: 'AGENT', agentPayload: {
            isLogin: true,
            type: agnLogin.data.type,
            id: agnLogin.data.id,
            name: agnLogin.data.name,
            email: agnLogin.data.email
          }
        });
      } else {
        // @else check if user is loged in
        const userLogin = await axios.get('/isUserLogin');
        if (userLogin.data) {
          dispatch({
            type: 'USER', userPayload: {
              isLogin: true,
              type: userLogin.data.type,
              id: userLogin.data.id,
              name: userLogin.data.name,
              email: userLogin.data.email
            }
          });
        }
      }
    }
    isLogin();
  }, []);

  return (
    <>
      <userContext.Provider value={{ state, dispatch }} >
        <Routes>
          {/* @home page routes */}
          <Route exact path='/' element={state.isLogin ?
            state.type === "agent" ?
              < AgentDashboard /> 
            : state.type === "admin" ?
              <AdminDash /> : <Home /> : <Home />} />

          {/* @use ternary opreator */}
          {/* @login sign pages */}
          {state.isLogin ? " " : <>
            <Route exact path='/selectPage' element={<SelectPage />} />
            <Route exact path='/Agentsignin' element={<AgentSignIn />} />
            <Route exact path='/agentLogin' element={<AgentLogin />} />
            <Route exact path='/usersignin' element={<UserSignin />} />
            <Route exact path='/userLogin' element={<UserLogin />} />

          </>
          }

          {/* @user routes */}
          {state.isLogin & state.type === "user" ? <>
            <Route exact path='/userHome' element={<UserHomePage />} />
            <Route exact path='/properties' element={<Properties />} /> </> : ""

          }


          {/* @Admin dash routes */}
          <Route exact path='/AdminLogin' element={<AdminLogin />} />
          {state.isLogin & state.type === "admin" ?
            <Route path='/adminDash' element={<AdminDash />}>
              <Route index element={<AdminProfile />} />
              <Route exact path='adminProfile' element={<AdminProfile />} />
              <Route exact path='admProperties' element={<AdmProperties />} />
              <Route exact path='admAgents' element={<AdmAgents />} />
              <Route exact path='admUsers' element={<AdmUsers />} /> </Route>
            : " "
          }


          {/* @agent Pannel */}
          {state.isLogin & state.type === "agent" ?
            <Route path='/agentDashboard' element={<AgentDashboard />}>
              <Route index element={<AgentProfile />} />
              <Route exact path='agentProfile' element={<AgentProfile />} />
              <Route exact path='agentProperties' element={<AgentProperties />} />
              <Route exact path='addproperty' element={<AddProperties />} />
              <Route exact path='bookedProperites' element={ <BookedProperties /> } />
            </Route> : ""}

          {/* @about us page */}
          <Route exact path='/aboutUs' element={<AboutUs />} />

          {/* @not found */}
          <Route path='*' element={<Home />} />
        </Routes>
      </userContext.Provider>
    </>
  );
}

export default App;
