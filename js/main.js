 // Your web app's Firebase configuration
 const firebaseConfig = {
     apiKey: "AIzaSyB-ce-Ud4M-sRzdjwmakuWLjfA97ykOYzU",
     authDomain: "pikady-71e9a.firebaseapp.com",
     databaseURL: "https://pikady-71e9a.firebaseio.com",
     projectId: "pikady-71e9a",
     storageBucket: "pikady-71e9a.appspot.com",
     messagingSenderId: "276367910867",
     appId: "1:276367910867:web:da0f12beb65e1e6358b126"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 console.log(firebase)

 // Создаем переменную, в которую положим кнопку меню
 let menuToggle = document.querySelector('#menu-toggle');
 // Создаем переменную, в которую положим меню
 let menu = document.querySelector('.sidebar');


 //w+ - до собаки W+\.\w{2,} 2 знака минимум
 const regExpValEmail = /^\w+@\w+\.\w{2,}$/; //для учитывания почты в нормальном виде(с точками)

 const loginElem = document.querySelector('.login');
 const loginForm = document.querySelector('.login-form');
 const emailInput = document.querySelector('.login-email');
 const passwordInput = document.querySelector('.login-password');
 const loginSignup = document.querySelector('.login-signup');

 const userElem = document.querySelector('.user');
 const userNameElem = document.querySelector('.user-name');

 const exitElem = document.querySelector('.exit');
 const editElem = document.querySelector('.edit');
 const editContainer = document.querySelector('.edit-container');

 const editUsername = document.querySelector('.edit-username');
 const editPhotoURL = document.querySelector('.edit-photo');
 const userAvatarElem = document.querySelector('.user-avatar');

 const postsWrapper = document.querySelector(".posts");

 const buttonNewPost = document.querySelector('.button-new-post'); //отеление поста
 const sidebarNavBlock = document.querySelector('.sidebar-nav');

 const addPostElem = document.querySelector('.add-post');

 const DEFAULT_PHOTO = userAvatarElem.src;
 const loginForget = document.querySelector('.login-forget');


 // работает с авторизацией
 const setUsers = {
     user: null,
     initUser(handler) {
         firebase.auth().onAuthStateChanged(user => {
             if (user) {
                 this.user = user;
             } else {
                 this.user = null;
             }
             if (handler) handler();
         });
     },
     logIn(email, password, handler) {
         if (!regExpValEmail.test(email)) {
             alert('email не валиден');
             return;
         }

         firebase.auth().signInWithEmailAndPassword(email, password)
             .catch(err => {
                 const errCode = err.code;
                 const errMessage = err.message;
                 if (errCode === 'auth/wrong-password') {
                     console.log(errMessage);
                     alert('Неверный пароль');
                 } else if (errCode === 'auth/user-not-found') {
                     console.log(errMessage);
                     alert('Пользователь не найден');
                 } else {
                     alert(errMessage);
                 }
                 console.log(err);
             }); //catch --провал

         //  const user = this.getUser(email);
         //  if (user && user.password === password) {
         //      this.authorizedUser(user)
         //      handler();
         //  } else {
         //      alert('пользователь с такими данными не найден');
         //  }

     },
     logOut() { //выход
         firebase.auth().signOut();
         //  this.user = null;
         //  handler();
     },
     signUp(email, password, handler) { //регистрация
         if (!regExpValEmail.test(email)) {
             alert('email не валиден');
             return;
         }

         if (!email.trim() || !password.trim()) { //проверка введен ли пароль или email
             alert('введите данные'); //trim убирает пробелы слева и справа
             return;
         }

         //обещание что чтото случиться
         firebase.auth().createUserWithEmailAndPassword(email, password)
             .then(data => {
                 this.editUser(email.substring(0, email.indexOf('@')), null, handler) //then -- успех
             })
             .catch(err => {
                 const errCode = err.code;
                 const errMessage = err.message;
                 if (errCode === 'auth/weak-password') {
                     console.log(errMessage);
                     alert('Слабый пароль');
                 } else if (errCode === 'auth/email-already-in-use') {
                     console.log(errMessage);
                     alert('Этот email уже используется');
                 } else {
                     alert(errMessage);
                 }
                 console.log(err);
             }); //catch --провал
         //  if (!this.getUser(email)) {
         //      const user = {
         //          email,
         //          password,
         //          displayName: email.split('@')[0],
         //          mail: email.split('@')[1],
         //      };
         //      if (typeof user.mail === 'undefined' || user.mail.indexOf('.') == -1) {
         //          return alert('Неправильно задан логин');
         //      }
         //      listUsers.push(user);
         //      this.authorizedUser(user)
         //      handler();
         //  } else {
         //      alert('Пользователь с таким email уже зареган');
         //  }
     },
     editUser(displayName, photoURL, handler) {

         const user = firebase.auth().currentUser;


         if (displayName) {
             if (photoURL) {
                 user.updateProfile({
                     displayName,
                     photoURL
                 }).then(handler)
             } else {
                 user.updateProfile({
                     displayName
                 }).then(handler)
             }
         }
     },
     sendForget(email) {
         firebase.auth().sendPasswordResetEmail(email)
             .then(() => {
                 alert('Письмо отправлено')
             })
             .catch(err => {
                 console.log(err);
             })
     }

     //  // получаем конкретного пользователя по его email
     //  getUser(email) {
     //      return listUsers.find(item => item.email === email); //,i,arr)//элемент,индекс,сам массив
     //  },
     //  // let user=null;
     //  // for(let i=0;i<listUsers,length;i++){
     //  //   if(listUsers[i].email===email){
     //  //     user=listUsers[i];
     //  //   }
     //  // }
     //  // return user;
     //  //}
     //  authorizedUser(user) {
     //      this.user = user;
     //  }
 };
 loginForget.addEventListener('click', event => {
     event.preventDefault();
     setUsers.sendForget(emailInput.value);
     emailInput.value = '';
 })

 //методы чтобы добавлять посты
 const setPosts = {
     allPosts: [],
     addPost(title, text, tags, handler) {


         this.allPosts.unshift({ //Добавляет пост в начало
             id: `postID${+new Date().toString(16)}-${setUsers.user.uid}`,
             title,
             text,
             tags: tags.split(',').map(item => item.trim()), //map убирает, trim убирает пробелы
             author: {
                 displayName: setUsers.user.displayName,
                 photo: setUsers.user.photoURL,
             },
             date: new Date().toLocaleString(),
             like: 0,
             comments: 0,
         })
         firebase.database().ref('post').set(this.allPosts)
             .then(() => this.getPosts(handler));
     },

     getPosts(handler) {
         firebase.database().ref('post').on('value', snapshot => {
             this.allPosts = snapshot.val() || [];
             handler();
         })
     }
 };


 // переключает форму авторизации (handler)
 const toggleAuthDom = () => {
     const user = setUsers.user;
     console.log('user:', user);

     if (user) { //только авторизованные пользователи
         loginElem.style.display = 'none';
         userElem.style.display = '';
         userNameElem.textContent = user.displayName;
         userAvatarElem.src = user.photoURL || DEFAULT_PHOTO; //user.photo ? user.photo : userAvatarElem.src;
         buttonNewPost.classList.add('visible');


     } else {
         loginElem.style.display = '';
         userElem.style.display = 'none';
         buttonNewPost.classList.remove('visible');
         addPostElem.classList.remove('visible');
         postsWrapper.classList.add('visible');
     }
 };

 // проверка email
 const emailValidate = (email) => {
     return regExpValidEmail.test(email)
 }

 const showAddPost = () => {
     addPostElem.classList.add('visible');
     postsWrapper.classList.remove('visible');
 }

 const showAllPosts = () => {


         let postHTML = '';

         setPosts.allPosts.forEach(({ title, text, date, author, tags, like, comments }) => {
                     //дистриктуризация (ДОП)
                     //!2:20 Досмотреть 2ой урок!!!!!!!!!!!!!!!


                     //интерпаляция
                     postHTML += `
        <section class="post">
                <div class="post-body">
                    <h2 class="post-title">${title}</h2>
                    <p class="post-text">${text}</p>
                    <div class="tags">
                    ${tags.map(tag => `<a href="#" class="tag">#${tag}</a>`)}
                    </div>
                    <!-- /.tags -->
                </div>
                <!-- /.post-body -->
                <div class="post-footer">
                    <div class="post-buttons">
                        <button class="post-button likes">
              <svg width="19" height="20" class="icon icon-like">
                <use xlink:href="img/icons.svg#like"></use>
              </svg>
              <span class="likes-counter">${like}</span>
            </button>
                        <button class="post-button comments">
              <svg width="21" height="21" class="icon icon-comment">
                <use xlink:href="img/icons.svg#comment"></use>
              </svg>
              <span class="comments-counter">${comments}</span>
            </button>
                        <button class="post-button save">
              <svg width="19" height="19" class="icon icon-save">
                <use xlink:href="img/icons.svg#save"></use>
              </svg>
            </button>
                        <button class="post-button share">
              <svg width="17" height="19" class="icon icon-share">
                <use xlink:href="img/icons.svg#share"></use>
              </svg>
            </button>
                    </div>
                    <!-- /.post-buttons -->
                    <div class="post-author">
                        <div class="author-about">
                            <a href="#" class="author-username">${author.displayName}</a>
                            <span class="post-time">${date}</span>
                        </div>
                        <a href="#" class="author-link"><img src=${author.photo||"img/avatar.jpeg"} alt="avatar" class="author-avatar"></a>
                    </div>
                    <!-- /.post-author -->
                </div>
                <!-- /.post-footer -->
            </section>
        `;
    });
    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');   
    postsWrapper.innerHTML = postHTML;
    

};

const init = () => {
      // отслеживаем клик по кнопке меню и запускаем функцию 
    menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню 
    menu.classList.toggle('visible');
  })

    // обработчик события отправки данных формы
loginForm.addEventListener('submit', event => {
     event.preventDefault();
        // const passwordValue = passwordInput.value;
        // const emailValue = emailInput.value;

        setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
        loginForm.reset(); //очистка input

    });

    // обработчик нажатия на кнопку регистрации
    loginSignup.addEventListener('click', event => {
        event.preventDefault();
        setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
        loginForm.reset(); //очистка input
          loginForm.reset();
    });

    exitElem.addEventListener('click', event => {
        event.preventDefault();
        setUsers.logOut();
    })

    editElem.addEventListener('click', event => {
        event.preventDefault();
        editContainer.classList.toggle('visible');
        editUsername.value = setUsers.user.displayName;
    });

    editContainer.addEventListener('submit', event => {
        event.preventDefault();
        setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
        editContainer.classList.remove('visible');
    });

    buttonNewPost.addEventListener('click',event=>{
        event.preventDefault();
        showAddPost();
    });

    addPostElem.addEventListener('submit',event=>{
        event.preventDefault();
        console.dir(addPostElem);
        const {title,text,tags}=addPostElem.elements;//=[...addPostElem.elements].filter(elem=>elem.tagName!=='button');//чтобы создать массив и отфильтровать без button
        // console.log(title,text,tags);

        if(title.value.length<6){
            alert("слишком короткий заголовок")
            return;
        }
        if(text.value.length<50){
            alert("Недостаточно длинный пост")
            return;
        }

        setPosts.addPost(title.value,text.value,tags.value,showAllPosts);
        addPostElem.classList.remove('visible');
        addPostElem.reset();

    });



    setUsers.initUser(toggleAuthDom);
    setPosts.getPosts(showAllPosts);
    // вызываем проверку авторизованности
}

document.addEventListener('DOMContentLoaded', init); //тоже самое что и ниже
// document.addEventListener('DOMContentLoaded', () => { //Ничего не работае до полной прогрузки страницы
//     init();
// });




//ДЗ при добавлении
// email:superBoss@emailInput.ru
// password:123423
// name:superBoss//чтобы в name сохранялся mail
//1. написать функцию, чтобы не пропускало без .ru/.com

//Дз2 в видео 2:20