import React from "react";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import Login from "./Login";
import Register from "./Register";
import successReg from "../images/successReg.svg";
import failedReg from "../images/failedReg.svg";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/auth.js";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [selectedCardDelete, setSelectedCardDelete] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [message, setMessage] = React.useState({ image: "", text: "" });
  const [userEmail, setUserEmail] = React.useState("email");
  const history = useHistory();

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  function handleClickDeleteCard(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectedCardDelete(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setSelectedCardDelete(null);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getCardsInfo()])
        .then(([userInfo, loadCards]) => {
          setCurrentUser(userInfo.data);
          setCards(loadCards.data);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  //Удаление Карточки
  function handleDeleteCard() {
    api
      .deleteCard(selectedCardDelete._id)
      .then((res) => {
        setCards((cards) =>
          cards.filter((cardElements) => cardElements._id !== selectedCardDelete._id)
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //Лайк Карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some((userId) => userId === currentUser._id);

    api
      .toggleLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((cardElements) =>
            cardElements._id === card._id ? newCard.data : cardElements
          )
        );
      })
      .catch((err) => console.log(err));
  }

  //Изменение данных профиля
  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((userInfo) => {
        setCurrentUser(userInfo.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //Добавление Карточки
  function handleAddPlaceSubmit(item) {
    api
      .addCard(item)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //Изменение Аватара
  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((userAvatar) => {
        setCurrentUser(userAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //Закрытие попапов по оверлею
  React.useEffect(() => {
    const handleCloseByOverlay = (e) => {
      if (e.target.classList.contains("popup")) {
        closeAllPopups();
      }
    };
    document.addEventListener("mousedown", handleCloseByOverlay);
    return () =>
      document.removeEventListener("mousedown", handleCloseByOverlay);
  }, []);

  //Закрытие попапов по Esc
  React.useEffect(() => {
    const handleCloseByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keyup", handleCloseByEscape);
    return () => document.removeEventListener("keyup", handleCloseByEscape);
  }, []);

  function checkToken() {
    auth
      .checkToken()
      .then((res) => {
        setUserEmail(res.data.email);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleRegister = ({ password, email }) => {
    auth
      .register(password, email)
      .then((dataReg) => {
        if (dataReg.data._id || dataReg.statusCode !== 400) {
          setUserEmail(dataReg.data.email);
          history.push("/signin");
          setMessage({
            image: successReg,
            text: "Вы успешно зарегистрировались!",
          });
        }
      })
      .catch((err) => {
        setMessage({
          image: failedReg,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  };

  const handleLogin = ({ password, email }) => {
    auth
      .login(password, email)
      .then((res) => {
        console.log(res.message);
        if (res.message === "Вход совершен успешно") {
          setIsLoggedIn(true);
          checkToken();
          history.push("/");
          setUserEmail(email);
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setMessage({
          image: failedReg,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      });
  };

  React.useEffect(() => {
    isLoggedIn ? history.push('/') : history.push('/signin')
  }, [isLoggedIn])

  React.useEffect(() => {
    if (document.cookie.includes("jwt")) {
      checkToken()
    }
  }, []);

  /*
  React.useEffect(() => {
    checkToken();
  }, []);
  */

  const onSignOut = () => {
    auth.logout().then((res) => {
      setIsLoggedIn(false);
      history.push("/signin");
    });
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={userEmail} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            isLoggedIn={isLoggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onClickDeleteCard={handleClickDeleteCard}
          />
          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="*">
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>

        {isLoggedIn && <Footer />}

        <EditProfilePopup //Попап редактирования профиля
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        ></AddPlacePopup>

        <DeleteCardPopup
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteCard}
          isOpen={isDeleteCardPopupOpen}
          card={selectedCardDelete}
        ></DeleteCardPopup>

        <ImagePopup item={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          message={message}
        />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
