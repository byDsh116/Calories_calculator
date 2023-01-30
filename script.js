document.addEventListener('DOMContentLoaded', function () {

    // Создаю хэдр
    let title = document.createElement('h3')
    title.setAttribute('class', 'header')
    title.innerHTML = 'Рассчитаем вашу потребность в калориях?'

    ////////////
    let calcFieldDiv = document.createElement('div')
    calcFieldDiv.setAttribute('class', 'calculating__field')

    let calcSubtitle = document.createElement('div')
    calcSubtitle.setAttribute('class', 'calculating__subtitle')
    calcSubtitle.innerHTML = 'Ваш пол'

    let chooseGenderDiv = document.createElement('div')
    chooseGenderDiv.setAttribute('class', 'calculating__choose')
    chooseGenderDiv.setAttribute('id', 'gender')

    let chooseGenderWoman = document.createElement('div')
    chooseGenderWoman.setAttribute('class', 'calculating__choose-item calculating__choose-item_active')
    chooseGenderWoman.setAttribute('id', 'woman')
    chooseGenderWoman.innerHTML = 'Женщина'

    let chooseGenderMan = document.createElement('div')
    chooseGenderMan.setAttribute('class', 'calculating__choose-item')
    chooseGenderMan.setAttribute('id', 'man')
    chooseGenderMan.innerHTML = 'Мужчина'

    let chooseConstitutionTitle = document.createElement('div')
    chooseConstitutionTitle.setAttribute('class', 'calculating__subtitle')
    chooseConstitutionTitle.innerHTML = 'Ваша конституция'

    let constitutionInputsDiv = document.createElement('div')
    constitutionInputsDiv.setAttribute('class', 'calculating__choose calculating__choose_medium')




    let fillPersonHeight = document.createElement('input')
    fillPersonHeight.setAttribute('class', 'calculating__choose-item')
    fillPersonHeight.setAttribute('id', 'height')
    fillPersonHeight.setAttribute('type', 'text')
    fillPersonHeight.setAttribute('placeholder', 'Введите рост')
 
    let fillPersonWeight = document.createElement('input')
    fillPersonWeight.setAttribute('class', 'calculating__choose-item')
    fillPersonWeight.setAttribute('id', 'weight')
    fillPersonWeight.setAttribute('type', 'text')
    fillPersonWeight.setAttribute('placeholder', 'Введите вес')

    let fillPersonAge = document.createElement('input')
    fillPersonAge.setAttribute('class', 'calculating__choose-item')
    fillPersonAge.setAttribute('id', 'age')
    fillPersonAge.setAttribute('type', 'text')
    fillPersonAge.setAttribute('placeholder', 'Введите возраст')

    chooseGenderDiv.append(chooseGenderWoman, chooseGenderMan  )
    calcFieldDiv.append(calcSubtitle, chooseGenderDiv,chooseConstitutionTitle, constitutionInputsDiv)
    constitutionInputsDiv.append(fillPersonHeight,fillPersonWeight,fillPersonAge)
    document.body.append(title, calcFieldDiv)
    ////////////

    // <!-- /////// -->
    // <div class="calculating__field"> = chooseGenderDiv


    //             <div class="calculating__choose calculating__choose_medium">    //  

    //                 <input type="text" id="age" placeholder="Введите возраст" class="calculating__choose-item">
    //             </div>

    //             <div class="calculating__subtitle">
    //                 Выберите вашу физическая активность
    //             </div>











    const result = document.querySelector('.calculating__result span')
    let height, weight, age, gender, ratio;

    if (localStorage.getItem('gender')) {
        gender = localStorage.getItem('gender')
    } else {
        gender = 'woman'
        localStorage.setItem('gender', 'woman')
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = '1.375'
        localStorage.setItem('ratio', '1.375')
    }

    function calcTotal() {
        if (!gender || !height || !weight || !age || !ratio) {
            result.textContent = ' '
            return;
        }
        if (gender === 'woman') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
        }
    }

    calcTotal()

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('gender')) {
                elem.classList.add(activeClass)
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass)
            }
        })
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active')
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active')

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector)

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio')
                } else {
                    gender = e.target.getAttribute('id')
                    localStorage.setItem('gender', e.target.getAttribute('id'));
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass)
                })

                e.target.classList.add(activeClass)

                calcTotal()
            })
        })
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active')
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active')

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector)

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                // add text to error
                input.style.border = "1px solid red"
            } else {
                input.style.border = 'none'
            }

            switch (input.getAttribute('id')) {
                case "height":
                    height = +input.value
                    break;
                case "weight":
                    weight = +input.value
                    break;
                case "age":
                    age = +input.value
                    break;
            }

            calcTotal()
        })
    }

    getDynamicInformation('#height')
    getDynamicInformation('#weight')
    getDynamicInformation('#age')

})