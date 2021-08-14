class Validator  {
    constructor(form) {
        this.form = form
        this.send = true
        this.inputs = this.getInputs()
        this.handleSubmit()
    }

    getInputs() {
        return this.form.querySelectorAll('input')
    }

    clearErrors() {
        let errorElements = document.querySelectorAll('.error')
        for (let input of this.inputs) {
            input.style = ''
        }
        for(let errorElement of errorElements) {
            errorElement.remove()
        }
        this.send = true
    }

    showError(input, error) {
        input.style.borderColor = '#f00'
        let errorElement = document.createElement('div')
        errorElement.classList.add('error')
        errorElement.innerHTML = error
        input.parentElement.insertBefore(errorElement, input.nextElementSibiling)
    }

    validateInput(input) {
        let rules = input.getAttribute('data-rules')
        if (rules !== null) {
            rules = rules.split('|')
            for (let rule of rules) {
                let ruleDetail = rule.split('=')
                switch (ruleDetail[0]){
                    case 'required':
                        if (input.value === '') return 'Este campo não pode estar vazio!'
                    break
                    case 'min':
                        if (input.value.length < ruleDetail[1]) return `Deve ter o mínimo de ${ruleDetail[1]} caracteres`
                    break
                    case 'email':
                        if (input.value !== '') {
                            let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                            if (!regex.test(input.value.toLowerCase())) return 'Endereço de e-mail inválido'
                        }
                    break
                    default:
                    break
                }
            }
        }

        return true
    }

    checkInputs() {
        for (let input of this.inputs) {
            let check = this.validateInput(input)
            
            if(check !== true) {
                this.send = false
                this.showError(input, check)
            }
        }
    }

    handleSubmit() {
       this.form.addEventListener('submit',  event => {
        event.preventDefault()
        this.clearErrors()
        this.checkInputs()
        if (this.send) {
            this.form.submit()
        }
    })
    } 
}

const form = document.querySelector('.validator')
const validator = new Validator(form)
