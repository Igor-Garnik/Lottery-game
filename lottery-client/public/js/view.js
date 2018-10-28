class View {
    constructor(domElements) {
        this.domElements = domElements.domElements;
    }

    getFormData() {
        return {
            _id: this.domElements.personId.innerText,
            name: this.domElements.nameInp.value,
            surname: this.domElements.surnameInp.value,
            email: this.domElements.emailInp.value,
            phone: this.domElements.telInp.value,
            birthday: this.domElements.dateInp.value

        }
    }

    fillForm(member) {
        this.domElements.nameInp.value = member.name;
        this.domElements.surnameInp.value = member.surname;
        this.domElements.emailInp.value = member.email;
        this.domElements.telInp.value = member.phone;
        this.domElements.dateInp.value = member.birthday;
        this.domElements.personId.innerText = member._id;
    }

    clearForm() {
        this.domElements.nameInp.value = '';
        this.domElements.surnameInp.value = '';
        this.domElements.emailInp.value = '';
        this.domElements.telInp.value = '';
        this.domElements.dateInp.value = '';
    }

    checkAndHideErrorBlock(elements) {
        elements.forEach(element => {
            if (!this.domElements[element].classList.contains('hide')) {
                this.domElements[element].classList.add("hide");
            }
        })
    }

    renderBlock(text, element) {
        this.domElements[element].innerHTML = text;
    }

    showErrors(errorData) {
        errorData.forEach(element => {
            this.domElements[element.errBlock].innerHTML = element.errMsg;
        })
    }

    showElements(errorData) {
        errorData.forEach(element => {
            this.domElements[element.errBlock].classList.remove('hide');
        })
    }

    hideElements(errorData) {
        errorData.forEach(element => {
            this.domElements[element.errBlock].classList.add('hide');
        })
    }

    activateBtn(btns) {
        btns.forEach(btn => {
            this.domElements[btn].removeAttribute('disabled');
        })
    }

    disableBtn(btns) {
        btns.forEach(btn => {
            this.domElements[btn].setAttribute('disabled', 'disabled');
        })
    }

    removeChecked(elements) {
        elements.forEach(elem => elem.checked = false);
    }
}