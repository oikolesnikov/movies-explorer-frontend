import {
Route, Switch
} from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Footer from "../Footer/Footer";
import { footerLinks } from "../../config/links";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import { CurrentUserContext } from '../../context/app.context';
import 'react-toastify/dist/ReactToastify.css';

const App = (props) => {
  return (
    <div className="app">
      <CurrentUserContext value={{
        loading: props.loading,
        error: props.error,
        currentUser: props.currentUser,
      }}>
        <Switch>
          <Route exact path="/">
            <Header />
            <Main />
            <Footer links={footerLinks} />
          </Route>
          <Route path="/movies">
            <Header />
            <Movies />
            <Footer links={footerLinks} />
          </Route>
          <Route path="/saved-movies">
            <Header />
            <SavedMovies />
            <Footer links={footerLinks} />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/profile">
            <Header />
            <Profile />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </CurrentUserContext>
    </div>
  );
};

export default App;
