import React, { useEffect, useState } from 'react';
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
    const location = useLocation();
    const navigate = useNavigate();
    //вошёл пользователь в систему или нет
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("jwt") ?? false);
    const [currentUser, setCurrentUser] = useState({});
    const [isPreloader, setIsPreloader] = useState(false);
    //ширина окна браузера
    const [widthWindow, setWidthWindow] = useState(window.innerWidth);
    //иконка и текст в popup
    const [infoPopup, setInfoPopup] = useState({ img: null, title: null });
    const [isOpenPopup, setIsOpenPopup] = useState(false);

    //фильмы сохраненные в ЛС
    // const moviesLS = JSON.parse(localStorage.getItem('movies'));

    //фильмы с сервера
    const [movies, setMovies] = useState([]);
    //инпут на странице "Фильмы"
    const [valueMoviesInput, setValueMoviesInput] = useState((localStorage.getItem('valueMoviesInput')) ?? '');
    //короткометражки на странице "Фильмы"
    const [isShortMovies, setIsShortMovies] = useState((JSON.parse(localStorage.getItem('isShortMovies'))) ?? false);
    //указывает, был ли запрос на сервер и загружены ли "Фильмы"
    const [isLoadedMovies, setIsLoadedMovies] = useState(false);

    //фильмы, добавленные в сохраненные
    const [savedMovies, setSavedMovies] = useState([]);
    //инпут на странице "Сохраненные фильмы"
    const [valueSavedMoviesInput, setValueSavedMoviesInput] = useState('');
    //короткометражки на странице "Сохраненные фильмы"
    const [isShortSavedMovies, setIsShortSavedMovies] = useState(false);

    //сохранение данных в ЛС
    useEffect(() => {
        if (loggedIn) {
            localStorage.setItem('valueMoviesInput', JSON.stringify(valueMoviesInput));
        }
    },[loggedIn, valueMoviesInput])

    //отслеживаю ширину окна
    const handleResize = (e) => {
        setWidthWindow(e.target.innerWidth)
    }

    //добавляю слушатель на resize window
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })

    //проверка токена на валидность
    useEffect(() => {
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
                if (err === 409) {
                    handleInfoPopup(iconError, 'Пользователь с данным email уже зарегистрирован!');
                    handleOpenPopup();
                    console.error(`Ошибка регистрации: ${err}`);
                } else if (err) {
                    handleInfoPopup(iconError, 'Что-то пошло не так! Попробуйте ещё раз.');
                    handleOpenPopup();
                    console.error(`Ошибка регистрации: ${err}`);
                }
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

    //выход из аккаунта
    function handleLogout () {
        localStorage.clear();
        setValueMoviesInput('');
        setMovies([]);
        setIsLoadedMovies(false);
        setLoggedIn(false);
    }

    //загрузка обновленной информации о пользователе на сервер
    function handleUpdateUser ({ name, email }) {
        mainApi.updateUserInfo({ name, email })
            .then(resultUser => setCurrentUser(resultUser))
            .catch(err => {
                if (err === 409) {
                    handleInfoPopup(iconError, 'Пользователь с данным email уже зарегистрирован!');
                    handleOpenPopup();
                    console.error(`Ошибка отправки данных о пользователе на сервер: ${err}`)
                } else if (err) {
                    handleInfoPopup(iconError, 'Что-то пошло не так! Попробуйте ещё раз.');
                    handleOpenPopup();
                    console.error(`Ошибка отправки данных о пользователе на сервер: ${err}`)
                }
            })
    }

    //загрузка текущей информации о пользователе с сервера / получение списка сохраненных фильмов
    useEffect(() => {
        if(loggedIn) {
            Promise.all([mainApi.getUserInfo(), mainApi.getSavedMoviesList()])
                .then(([resultUser, savedMovies]) => {
                    setCurrentUser(resultUser)
                    setSavedMovies(savedMovies.reverse())
                })
                .catch(err => console.error(`Ошибка загрузки данных с сервера: ${err}`))
        }
    }, [loggedIn, valueMoviesInput])

    //загрузка фильмов со стороннего сервера
    function getBeatFilms() {
        console.log("отработал getBeatFilms")
        showPreloader();
        moviesApi.getBeatFilmCardList()
            .then(movies => movies.map(movie => {
                if (savedMovies.some(saved => saved.movieId === movie.movieId)) {
                    movie.isLiked = true;
                }
                return movie;
            }))
            .then(movies => {
                setMovies(movies);
                localStorage.setItem('movies', JSON.stringify(movies));
            })
            .then(() => {
                setIsLoadedMovies(true);
            })
            .catch(err => console.error(`Ошибка загрузки фильмов с сервера: ${err}`))
            .finally(() => hidePreloader());
    }

    //лайк/дизлайк фильма на странице "Фильмы"
    function handleSaveMovie (movie) {
        if (movie.isLiked) {
            const savedMovie = savedMovies.find(m => m.movieId === movie.movieId) //возвращается необходимый фильм

            mainApi.deleteMovie(savedMovie._id)
                .then(() => {
                    movies.forEach(m => {
                        if(m.movieId === movie.movieId)
                            m.isLiked = false
                    })
                    setSavedMovies(movie => movie.filter(m => m.movieId !== savedMovie.movieId))
                })
                .catch(err => console.log(`Ошибка удаления фильма из избранного: ${err}`))

        } else {
            mainApi.saveMovie(movie)
                .then(movie => {
                    movies.forEach(m => {
                        if(m.movieId === movie.movieId)
                            m.isLiked = true
                    })
                    setSavedMovies([movie, ...savedMovies])
                })
                .catch(err => console.error(`Ошибка сохранения фильма в избранное: ${err}`))
        }
    }

    //удаление фильма со страницы "Сохраненные фильмы"
    function handleDeleteMovie (savedMovie) {
        mainApi.deleteMovie(savedMovie._id)
            .then(() => {
                movies.forEach(m => {
                    if(m.movieId === savedMovie.movieId)
                        m.isLiked = false
                })
                setSavedMovies(movie => movie.filter(m => m.movieId !== savedMovie.movieId))
            })
            .catch(err => console.log(`Ошибка удаления фильма из избранного: ${err}`))
    }

    //фильтрация фильмов по поисковому запросу и чекбоксу
    function moviesFiltration (moviesList, hook) {
        moviesList = moviesList ?? [];

        if (localStorage.getItem("isShortMovies") === "true") {
            moviesList = moviesList.filter(movie => movie.duration <= 40);
        }

        if (valueMoviesInput) {
            moviesList = moviesList.filter(movie => movie.nameRU.toLowerCase().includes(valueMoviesInput.toLowerCase())
                || movie.nameEN.toLowerCase().includes(valueMoviesInput.toLowerCase()));
        }

        if (moviesList.length === 0) {
            handleInfoPopup(iconError, 'Ничего не найдено');
            handleOpenPopup();
        }

        localStorage.setItem('movies', JSON.stringify(moviesList));
        hook(moviesList);
    }

    //изменение картинки и сообщения в попапе InfoPopup
    function handleInfoPopup(img, title){
        setInfoPopup({ img, title });
    }

    function handleOpenPopup () {
        setIsOpenPopup(true);
    }

    function closePopup () {
        setIsOpenPopup(false);
    }

    //закрытие модального окна нажатием на 'Esc'
    useEffect(() => {
        const closePopupOnEsc = (e) => {
            if (e.key === 'Escape') {
                closePopup();
            }
        }
        document.addEventListener('keydown', closePopupOnEsc);
    })

    function showPreloader () {
        setIsPreloader(true);
    }

    function hidePreloader () {
        setIsPreloader(false);
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
                                    setMovies={setMovies}
                                    getBeatFilms={getBeatFilms}
                                    infoPopup={handleInfoPopup}
                                    openPopup={handleOpenPopup}
                                    onSaveMovie={handleSaveMovie}
                                    widthWindow={widthWindow}
                                    valueInput={valueMoviesInput}
                                    setValueInput={setValueMoviesInput}
                                    isLoaded={isLoadedMovies}
                                    moviesFiltration={moviesFiltration}
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
                                    setSavedMovies={setSavedMovies}
                                    onDeleteMovie={handleDeleteMovie}
                                    valueInput={valueMoviesInput}
                                    setValueInput={setValueMoviesInput}
                                    moviesFiltration={moviesFiltration}
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
                                    onLogout={handleLogout}
                                    infoPopup={handleInfoPopup}
                                    openPopup={handleOpenPopup}
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
