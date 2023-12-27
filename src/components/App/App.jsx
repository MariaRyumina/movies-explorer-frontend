import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from "../Preloader/Preloader";

function App() {
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false); //вошёл пользователь в систему или нет
    const location = useLocation();
    const navigate = useNavigate();

    //регистрация
    function handleRegistration( name, email, password ) {
        mainApi.register( name, email, password )
            .then(res => {
                if (res) {
                    navigate('/signin');
                }
            })
            .catch(err => {
                console.error(`Ошибка регистрации: ${err}`);
            })
    }

    //авторизация
    function handleAuthorization( email, password ) {
        mainApi.login( email, password )
            .then(res => {
                if(res) {
                    setLoggedIn(true);
                    navigate('/');
                }
            })
            .catch(err => {
                console.error(`Ошибка авторизации: ${err}`);
            })
    }

    //загрузка информации о пользователе с сервера
    React.useEffect(() => {
        if(loggedIn) {
            mainApi.getUserInfo()
                .then(resultUser => {
                    setCurrentUser(resultUser)
                })
                .catch(err => console.log(`Ошибка загрузки с сервера: ${err}`))
        }
    }, [loggedIn])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="content">
                    { ["/", "/movies", "/saved-movies", "/profile"].includes(location.pathname)
                        && <Header
                            loggedIn={loggedIn}
                        />
                    }
                    <div className="main">
                        <Routes>
                            <Route
                                path='/*'
                                element={
                                    <NotFoundPage />
                                }
                            />
                            <Route
                                path='/signup'
                                element={
                                    <Register
                                        onRegister={handleRegistration}
                                    />
                                }
                            />
                            <Route
                                path='/signin'
                                element={
                                    <Login
                                        onLogin={handleAuthorization}
                                        setLoggedIn={setLoggedIn}
                                    />
                                }
                            />
                            <Route
                                path='/'
                                element={
                                    <Main />
                                }
                            />
                            <Route
                                path='/movies'
                                element={ <ProtectedRoute
                                    element={Movies}
                                />}
                            />
                            <Route
                                path='/saved-movies'
                                element={
                                    <ProtectedRoute
                                        element={SavedMovies}
                                    />
                                }
                            />
                            <Route
                                path='/profile'
                                element={
                                    <ProtectedRoute
                                        element={Profile}
                                        setLoggedIn={setLoggedIn}
                                    />
                                }
                            />
                        </Routes>
                    </div>
                    { (location.pathname === '/' ||
                            location.pathname === '/movies' ||
                            location.pathname === '/saved-movies')
                        && <Footer />
                    }

                    <Preloader />
                </div>
        </CurrentUserContext.Provider>
    )
}

export default App;
