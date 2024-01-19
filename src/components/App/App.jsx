import React, { useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import Preloader from '../Preloader/Preloader';
import PopupInfo from '../PopupInfo/PopupInfo';
import iconOK from '../../images/icon_ok.png';
import iconError from '../../images/icon_error.png';

function App() {
    const [currentUser, setCurrentUser] = React.useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const [isPreloader, setIsPreloader] = useState(false);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [infoPopup, setInfoPopup] = useState({ img: null, title: null });
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    // const [loggedIn, setLoggedIn] = React.useState(false);

    const [loggedIn, setLoggedIn] = React.useState(() => {
        return !!localStorage.getItem("jwt");
    }); //вошёл пользователь в систему или нет

    //проверка токена на валидность
    React.useEffect(() => {
        const token = localStorage.getItem('jwt');

        if(token) {
            mainApi.checkToken(token)
                .then(res => {
                    if (res) {
                        setLoggedIn(true);
                    }
                })
                .catch(err => {
                    localStorage.removeItem('jwt');
                    console.error(`Ошибка запроса проверки токена: ${err}`);
                })
        }
    }, [setLoggedIn])

    //регистрация
    function handleRegistration( name, email, password ) {
        mainApi.register( name, email, password )
            .then(res => {
                if (res) {
                    handleInfoPopup(iconOK, 'Вы успешно зарегистрированы');
                    handleOpenPopup();
                    handleAuthorization( email, password ) //после удачной регистрации автоматически авторизуется
                }
            })
            .catch(err => {
                handleInfoPopup(iconError, 'Что-то пошло не так! Попробуйте ещё раз.');
                handleOpenPopup();
                console.error(`Ошибка регистрации: ${err}`);
            })
    }

    //авторизация
    function handleAuthorization( email, password ) {
        mainApi.login( email, password )
            .then(res => {
                if(res) {
                    setLoggedIn(true);
                    navigate('/movies');
                }
            })
            .catch(err => {
                handleInfoPopup(iconError, 'Вы ввели неправильные имя или пароль');
                handleOpenPopup();
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
                .catch(err => console.error(`Ошибка загрузки с сервера: ${err}`))
        }
    }, [loggedIn, setCurrentUser])

    //загрузка информации о пользователе на сервер
    function handleUpdateUser ({ name, email }) {
        mainApi.updateUserInfo({ name, email })
            .then(resultUser => {
                setCurrentUser(resultUser)
            })
            .catch(err => console.error(`Ошибка отправки данных о пользователе на сервер: ${err}`))
    }

    //загрузка фильмов со стороннего сервера
    function getBeatFilms() {
        moviesApi.getBeatFilmCardList()
            .then(resultMovies => {
                setMovies(resultMovies)
            })
            .catch(err => console.error(`Ошибка загрузки фильмов с сервера: ${err}`))
    }

    //сохранение фильма в избранное/лайк
    function handleSaveMovie (movie, isLiked)  {
        // const isLiked = savedMovies.some(m => m.movieId === movie.id); //возвращается true or false

        if(!isLiked) {
            mainApi.saveMovie(movie)
                .then(movies => setSavedMovies([movies, ...savedMovies]))
                .catch(err => console.error(`Ошибка сохранения фильма в избранное: ${err}`))
        } else {
            const savedMovie = savedMovies.find(m => m.movieId === movie.id) //возвращаается необходимый фильм

            mainApi.deleteMovie(savedMovie.id)
                .then(() => setSavedMovies(movie => movie.filter(m => m.movieId !== savedMovie.id)))
                .catch(err => console.log(`Ошибка удаления фильма из избранного: ${err}`))
        }
    }

    //получение списка сохраненных фильмов
    React.useEffect(() => {
        mainApi.getSavedMoviesList()
            .then(savedMovies => setSavedMovies(savedMovies.reverse()))
    }, [setSavedMovies])

    function showPreloader () {
        setIsPreloader(true);
    }

    function hidePreloader () {
        setIsPreloader(false);
    }

    //изменение картинки и сообщения в попапе InfoPopup
    function handleInfoPopup(img, title){
        setInfoPopup({ img, title })
    }

    function handleOpenPopup () {
        setIsOpenPopup(true)
    }

    function closePopup () {
        setIsOpenPopup(false)
    }

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
                        { !loggedIn ? (
                            <Route
                                path='/signup'
                                element={
                                    <Register
                                        onRegister={handleRegistration}
                                    />
                                }
                            />
                            ) : (
                                <Route
                                    path='/signup'
                                    element={
                                        <Navigate to='/' />
                                    }
                                />
                            )
                        }
                        { !loggedIn ? (
                            <Route
                                path='/signin'
                                element={
                                    <Login
                                        onLogin={handleAuthorization}
                                    />
                                }
                            />
                            ) : (
                                <Route
                                    path='/signin'
                                    element={
                                        <Navigate to='/' />
                                    }
                                />
                            )
                        }

                        <Route
                            path='/'
                            element={
                                <Main />
                            }
                        />
                        <Route
                            path='/movies'
                            element={
                                <ProtectedRoute
                                    loggedIn={loggedIn}
                                    setLoggedIn={setLoggedIn}
                                    element={Movies}
                                    movies={movies}
                                    getBeatFilms={getBeatFilms}
                                    infoPopup={handleInfoPopup}
                                    openPopup={handleOpenPopup}
                                    onSaveMovie={handleSaveMovie}
                                    savedMovies={savedMovies}
                                />
                            }
                        />
                        <Route
                            path='/saved-movies'
                            element={
                                <ProtectedRoute
                                    loggedIn={loggedIn}
                                    setLoggedIn={setLoggedIn}
                                    element={SavedMovies}
                                    infoPopup={handleInfoPopup}
                                    openPopup={handleOpenPopup}
                                    movies={savedMovies}
                                />
                            }
                        />
                        <Route
                            path='/profile'
                            element={
                                <ProtectedRoute
                                    loggedIn={loggedIn}
                                    setLoggedIn={setLoggedIn}
                                    element={Profile}
                                    onUpdateUser={handleUpdateUser}
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

                <Preloader
                    isOpen={isPreloader}
                />

                <PopupInfo
                    isOpen={isOpenPopup}
                    onClose={closePopup}
                    img={infoPopup.img}
                    title={infoPopup.title}
                />
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;
