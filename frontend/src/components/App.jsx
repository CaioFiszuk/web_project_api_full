import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, Link } from "react-router-dom";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import * as auth from "../utils/auth.js";
import * as token from "../utils/token.js";
import { api } from "../utils/api.js";
import  { currentUserContext }  from "../contexts/CurrentUserContext.js";
import { removeToken } from "../utils/token.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState();

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userData, setUserData] = useState({ email: "" });

  const navigate = useNavigate();

  const handleRegistrationPopupOpen = () => {
    setIsRegistrationPopupOpen(true);
  }

  const handleLoginPopupOpen = () => {
    setIsLoginPopupOpen(true);
  }

  const handleRegistration = ({
    email,
    password,
  }) => {
    auth.register(email, password)
      .then(() => {
        handleRegistrationPopupOpen();  
        navigate("/signin");
        
      })
      .catch(console.error);   
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return handleLoginPopupOpen();
    }    
     
   auth
     .authorize(email, password)
       .then((data) => {
        if (data.token) {
          token.setToken(data.token);
          setUserData(email);
          setIsLoggedIn(true); 
          navigate("/"); 
        }      
       })
       .catch(
        ()=>handleLoginPopupOpen()
       );
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
     setIsAddPlacePopupOpen(true);
  }

  const handleAvatarEditClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsRegistrationPopupOpen(false);
    setIsLoginPopupOpen(false);
    setSelectedCard('');
  }

  const handleUpdateUser = async (data) => {

    try {
      const newData = await api.editProfile(data.name, data.about);
      setCurrentUser(newData);      closeAllPopups();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPlaceSubmit = async (data) => {
    try {
      const newCard = await api.addCard(data.name, data.link);
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch(error) {
      console.error(error);
    }
  }

  const handleUpdateAvatar = async (data) => {
    try{
      const newData = await api.updateAvatar(data.avatar);
      setCurrentUser(newData);
      closeAllPopups();
    }catch(error) {
      console.error(error);
    }
  }

  const handleCardLike = async (card) => {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    
    if(isLiked) {
      await api.toDislike(card._id).catch(error=>console.log(error));
    }else{
      await api.toLike(card._id).catch(error=>console.log(error));
    }

    await api.getInitialCards().then(data=>{
      setCards(data);
   });
  }

  const handleCardDelete = async (card) => {

    try {
      await api.deleteCard(card._id);
      setCards(cards.filter((c) => c._id !== card._id));
    } catch (error) {
      console.error(error);
    }

  }

  const signOut = () => {
    removeToken();
    navigate("/login");
    setIsLoggedIn(false);
  }

  useEffect(()=>{

  const jwt = token.getToken();
    
  if (jwt) {

    /*api.getUserInfo().then(data=>{
      setCurrentUser(data);
    });*/

   /* api.getInitialCards().then(data=>{
      setCards(data);
   });*/

    auth
    .getUserInfo(jwt)
    .then(( data ) => {
      setUserData(data.data.email);
      setIsLoggedIn(true);
      navigate("/");
      setCurrentUser(data);
      console.log(data)
    })
    .catch(console.error);
  }

  }, [navigate]);
   
  return (
    <div className="page">

    <currentUserContext.Provider value={ {currentUser, handleUpdateUser, handleUpdateAvatar} }>

      <Routes>
          <Route 
           path="/"
           element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Header 
                userData={userData} 
                headerLink={<button className="button" type="button" onClick={signOut}>Sair</button>} 
                />
                
                <Main 
                isEditProfilePopupOpen={isEditProfilePopupOpen} 
                isAddPlacePopupOpen={isAddPlacePopupOpen} 
                isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onEditAvatarClick={handleAvatarEditClick}
                onClosePopups={closeAllPopups}
                selectedCard={selectedCard}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onAddPlaceSubmit={handleAddPlaceSubmit}
                cards={cards}
              />

              <Footer />
            </ProtectedRoute>
           }
          />

          <Route 
            path="/signin"
            element={
            <>

          <Header 
            userData={""} 
            headerLink={<Link to='/signup' className='link'>Inscreva-se</Link>}
          />

             <Login 
              handleLogin={handleLogin}
              isRegistrationPopupOpen={isRegistrationPopupOpen}
              isLoginPopupOpen={isLoginPopupOpen}
              closePopup={closeAllPopups}
              setIsLoggedIn={setIsLoggedIn}
             />
            </>}
          />

          <Route 
            path="/signup"
            element={
            <>
              <Header 
              userData={""} 
              headerLink={<Link to='/signin' className='link'>Fazer login</Link>}
              />

              <Register 
              handleRegistration={handleRegistration}               setIsLoggedIn={setIsLoggedIn}
              />
            </>}
          />

          <Route
            path="*"
            element={
              isLoggedIn ? (
              <Navigate to="/" replace />
              ) : (
              <Navigate to="/signin" replace />
              )
            }
          />
      </Routes>
    </currentUserContext.Provider>

    </div>
  );
}

export default App;