class DomElements {
    constructor() {
        this.domElements = {
            winnerMsg: document.querySelector('#winner-msg'),
            renderBlock: document.querySelector('#render-block'),
            nameErrorBlock: document.querySelector('#name-error-msg'),
            surnameErrorBlock: document.querySelector('#surname-error-msg'),
            emailErrorBlock: document.querySelector('#email-error-msg'),
            phoneErrorBlock: document.querySelector('#tel-error-msg'),
            startBtn: document.querySelector('#start-lottery-btn'),
            saveBtn: document.querySelector('#save-member-btn'),
            updateBtn: document.querySelector('#update-member-btn'),
            deleteBtn: document.querySelector('#delete-member-btn'),
            nameInp: document.querySelector('#name-inp'),
            surnameInp: document.querySelector('#surname-inp'),
            emailInp: document.querySelector('#email-inp'),
            telInp: document.querySelector('#tel-inp'),
            dateInp: document.querySelector('#date-inp'),
            errorBlock: document.querySelector('#error-msg-block'),
            regFormBlock: document.querySelector('#registration-form'),
            personId: document.querySelector('.person-id')
        }
    }

}