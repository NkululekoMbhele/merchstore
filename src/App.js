import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AuthProvider} from './AuthProvider'
import {PublicRoutes, home, PrivateRoutes} from './Model/routes/RouteData'

import {ProtectedRoutes} from './ProtectedRoutes'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={home.component} />
          {
            PublicRoutes.map((item, i) => {
              return <Route key={i} path={item.path} element={item.component} />
            })
          }

            <Route element={<ProtectedRoutes />}>
            {
              PrivateRoutes.map((item, i) => {
                return <Route key={i} path={item.path} element={item.component}/>
              })
            }
            </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
