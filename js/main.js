// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function(event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню 
    menu.classList.toggle('visible');
});


const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

// временная база данных пользователей
const listUsers = [{
        id: '01',
        email: 'maks@mail.ru',
        password: '12345',
        displayName: 'MaksJs'
    },
    {
        id: '02',
        email: 'kate@mail.ru',
        password: '123457',
        displayName: 'KateKillMaks'
    }
];

// работает с авторизацией
const setUsers = {
    user: null,
    logIn(email, password, handler) {
        const user = this.getUser(email);
        if (user && user.password === password) {
            this.authorizedUser(user)
            handler();
        } else {
            alert('пользователь с такими данными не найден');
        }

    },
    logOut() {
        console.log('logOut'); //выход
    },
    signUp(email, password, handler) { //регистрация
        if (!this.getUser(email)) {
            const user = {
                email,
                password,
                displayName: email.split('@')[0],
                mail: email.split('@')[1]
            }
            if (typeof mail === 'undefined' || email.indexOf('@') && mail.indexOf('.') < 0)
                return alert('Неправильно задан логин');
            listUsers.push(user);
            this.authorizedUser(user)
            handler();
        } else {
            alert('Пользователь с таким email уже зареган');
        }
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

// переключает форму авторизации
const toggleAuthDom = () => {
    const user = setUsers.user;
    console.log('user:', user);

    if (user) {
        loginElem.style.display = 'none';
        userElem.style.display = '';
        userNameElem.textContent = user.displayName;
    } else {
        loginElem.style.display = '';
        userElem.style.display = 'none';

    }
};

// обработчик события отправки данных формы
loginForm.addEventListener('submit', event => {
    event.preventDefault();

    // const passwordValue = passwordInput.value;
    // const emailValue = emailInput.value;

    setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);

});

// эобработчик нажатия на кнопку регистрации
loginSignup.addEventListener('click', event => {
    event.preventDefault();
    setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
});

// вызываем проверку авторизованности
toggleAuthDom();


//ДЗ при добавлении
// email:superBoss@emailInput.ru
// password:123423
// name:superBoss//чтобы в name сохранялся mail
//1. написать функцию, чтобы не пропускало без .ru/.com