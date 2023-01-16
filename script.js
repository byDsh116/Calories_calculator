document.addEventListener('DOMContentLoaded', function () {

    const result = document.querySelector('.calculating__result span')
    let ratio = 1.375
    let height, weight, age, gender

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

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`)

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio')
                } else {
                    gender = e.target.getAttribute('id')
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass)
                })

                e.target.classList.add(activeClass)

                calcTotal()
            })
        })
    }
    getStaticInformation('#gender', 'calculating__choose-item_active')
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active')

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