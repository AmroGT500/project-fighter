import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Authentication from './components/Authentication';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import MatchHistory from './components/MatchHistory';
import FightSetup from './components/FightSetup';
import Battle from './components/Battle';
import { UserContext } from './context/user';
import './App.css';

function App() {
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
      fetch('/check_session')
          .then(r => {
              if (r.ok) {
                  r.json().then(userObj => setUser(userObj))
              }
          })
  }, [setUser])

  return (
      <Router>
        <div className="app-background"></div>
          {user ? <Navbar /> : ''}
          <Switch>
              <Route exact path="/">
                  <Authentication />
              </Route>
              <Route exact path="/authentication">
                  <Authentication />
              </Route>
              <Route exact path="/profile">
                  <Profile />
              </Route>
              <Route exact path="/fight-setup">
                  <FightSetup />
              </Route>
              <Route exact path="/match-history">
                  <MatchHistory />
              </Route>
              <Route exact path="/battle">
                  <Battle />
              </Route>
              <Route path="*">
                  <Authentication />
              </Route>
          </Switch>
      </Router>
  )
}

export default App



// react router dom v6+
// function App() {
//   const { user, setUser } = useContext(UserContext);

//   useEffect(() => {
//     fetch('/check-session')
//       .then(r => {
//         if (r.ok) {
//           r.json().then(userObj => setUser(userObj));
//         }
//       });
//   }, [setUser]);

//   return (
//     <Router>
//       <div className="app-background"></div>
//       {user ? <Navbar /> : null}
//       <Routes>
//         <Route path="/" element={<Authentication />} />
//         <Route path="/authentication" element={<Authentication />} />
//         {user ? (
//           <>
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/fight-setup" element={<FightSetup />} />
//             <Route path="/match-history" element={<MatchHistory />} />
//             <Route path="/battle" element={<Battle />} />
//           </>
//         ) : null}
//       </Routes>
//     </Router>
//   );
// }

// export default App;