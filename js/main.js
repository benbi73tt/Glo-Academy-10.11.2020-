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

// временная база данных пользователей
const listUsers = [{
        id: '01',
        email: 'maks@mail.ru',
        password: '12345',
        displayName: 'MaksJs',
        mail: 'mail.ru'
    },
    {
        id: '02',
        email: 'kate@mail.ru',
        password: '123457',
        displayName: 'KateKillMaks',
        mail: 'mail.ru'
    }
];

// работает с авторизацией
const setUsers = {
    user: null,
    logIn(email, password, handler) {
        if (!regExpValEmail.test(email)) {
            alert('email не валиден');
            return;
        }
        const user = this.getUser(email);
        if (user && user.password === password) {
            this.authorizedUser(user)
            handler();
        } else {
            alert('пользователь с такими данными не найден');
        }

    },
    logOut(handler) { //выход
        this.user = null;
        handler();
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

        if (!this.getUser(email)) {
            const user = {
                email,
                password,
                displayName: email.split('@')[0],
                mail: email.split('@')[1],
            };
            if (typeof user.mail === 'undefined' || user.mail.indexOf('.') == -1) {
                return alert('Неправильно задан логин');
            }
            listUsers.push(user);
            this.authorizedUser(user)
            handler();
        } else {
            alert('Пользователь с таким email уже зареган');
        }
    },
    editUser(userName, userPhoto, handler) {
        if (userName) {
            this.user.displayName = userName;
        }
        if (userPhoto) {
            this.user.photo = userPhoto;
        }
        handler();
    },

    // получаем конкретного пользователя по его email
    getUser(email) {
        return listUsers.find(item => item.email === email); //,i,arr)//элемент,индекс,сам массив
    },
    // let user=null;
    // for(let i=0;i<listUsers,length;i++){
    //   if(listUsers[i].email===email){
    //     user=listUsers[i];
    //   }
    // }
    // return user;
    //}
    authorizedUser(user) {
        this.user = user;
    }
};

//методы чтобы добавлять посты
const setPosts = {
    allPosts: [{
            title: "Заголовок1",
            text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения,ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит! ',
            tags: ["свежее", "новое", "горячее", "мое", "случайность"],
            author: 'maks@mail.ru',
            date: '11.11.2010,16:54:00',
            like: 15,
            comments: 20,
        }, {
            title: "Заголовок2",
            text: 'Про́за (лат. prōsa) — устная или письменная речь без деления на соизмеримые отрезки — стихи; в противоположность поэзии её ритм опирается на приблизительную соотнесенность синтаксических конструкций (периодов, предложений, колонов). Иногда термин употребляется в качестве противопоставления художественной литературы, вообще (поэзия) литературе научной или публицистической, то есть не относящейся к искусству[2].',
            tags: ["свежее", "горячее", "мое", "случайность"],
            author: 'kate@mail.ru',
            date: '09.01.2015,12:45:00',
            like: 145,
            comments: 50,
        },
        {
            title: "Заголовок3",
            text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения,ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит! ',
            tags: ["свежее", "горячее", "мое", "случайность"],
            author: 'kate@mail.ru',
            date: '09.01.2015,12:45:00',
            like: 115,
            comments: 50,
        }


    ]
};


// переключает форму авторизации (handler)
const toggleAuthDom = () => {
    const user = setUsers.user;
    console.log('user:', user);

    if (user) {
        loginElem.style.display = 'none';
        userElem.style.display = '';
        userNameElem.textContent = user.displayName;
        userAvatarElem.src = user.photo || userAvatarElem.src; //user.photo ? user.photo : userAvatarElem.src;
    } else {
        loginElem.style.display = '';
        userElem.style.display = 'none';

    }
};



const showAllPosts = () => {

    let postsHTML = '';

    setPosts.allPosts.forEach(post => {
        //дистриктуризация (ДОП)
        const { title, text, date } = post;
        //!2:20 Досмотреть 2ой урок!!!!!!!!!!!!!!!


        //интерпаляция
        postsHTML += `
        <section class="post">
                <div class="post-body">
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-text">${post.text}</p>
                    <div class="tags">
                        <a href="#" class="tag">#свежее</a>
                        <a href="#" class="tag">#новое</a>
                        <a href="#" class="tag">#горячее</a>
                        <a href="#" class="tag">#мое</a>
                        <a href="#" class="tag">#случайность</a>
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
              <span class="likes-counter">26</span>
            </button>
                        <button class="post-button comments">
              <svg width="21" height="21" class="icon icon-comment">
                <use xlink:href="img/icons.svg#comment"></use>
              </svg>
              <span class="comments-counter">157</span>
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
                            <a href="#" class="author-username">arteislamov</a>
                            <span class="post-time">5 минут назад</span>
                        </div>
                        <a href="#" class="author-link"><img src="img/avatar.jpeg" alt="avatar" class="author-avatar"></a>
                    </div>
                    <!-- /.post-author -->
                </div>
                <!-- /.post-footer -->
            </section>
        `;
    })
    postsWrapper.innerHTML = postsHTML;
};
const init = () => {
    // обработчик события отправки данных формы
    loginForm.addEventListener('submit', event => {
        event.preventDefault();

        // const passwordValue = passwordInput.value;
        // const emailValue = emailInput.value;

        setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
        loginForm.reset(); //очистка input

    });

    // эобработчик нажатия на кнопку регистрации
    loginSignup.addEventListener('click', event => {
        event.preventDefault();
        setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
        loginForm.reset(); //очистка input
    });

    exitElem.addEventListener('click', event => {
        event.preventDefault();
        setUsers.logOut(toggleAuthDom);
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
    // отслеживаем клик по кнопке меню и запускаем функцию 
    menuToggle.addEventListener('click', function(event) {
        // отменяем стандартное поведение ссылки
        event.preventDefault();
        // вешаем класс на меню, когда кликнули по кнопке меню 
        menu.classList.toggle('visible');
    });
    showAllPosts();
    // вызываем проверку авторизованности
    toggleAuthDom();
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