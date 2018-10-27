class Controller {
    constructor(model, view, validator, service, domElements) {
        this.model = model;
        this.view = view;
        this.validator = validator;
        this.service = service;
        this.domElements = domElements.domElements;
        this.url = {
            save: 'http://localhost:3000',
            findOne: 'http://localhost:3000/find-one'
        }
        this.methods = { post: 'POST', put: 'PUT', delete: 'DELETE' };
        this.errorBlocks = ['errorBlock', 'nameErrorBlock', 'surnameErrorBlock', 'emailErrorBlock', 'phoneErrorBlock'];
        this.formHeader = { registration: 'Registration form', person: 'Personal data' };
    }

    initComponent() {
        this.displayMembersList();
        this.initListeners();
    }

    displayMembersList() {
        this.view.renderBlock(this.formHeader.registration, 'regFormBlock');
        this.model.getMembersList()
            .then(data => {
                let markup = this.model.createFormMarkup(JSON.parse(data));
                this.view.renderBlock(markup, 'renderBlock');
            })
    }

    initListeners() {

        this.domElements.startBtn.addEventListener('click', this.startHandler.bind(this));
        this.domElements.saveBtn.addEventListener('click', this.saveMemberHandler.bind(this));
        this.domElements.renderBlock.addEventListener('click', this.choseMemberHandler.bind(this))
        this.view.domElements.updateBtn.addEventListener('click', this.updateMemberHandler.bind(this));
        this.view.domElements.deleteBtn.addEventListener('click', this.deleteMemberHandler.bind(this));
    }

    startHandler() {
        this.model.getMembersList()
            .then(data => {
                let winner = this.service.getRandomMember(JSON.parse(data));
                let markup = this.model.createWinnerMarkup(winner);
                this.view.renderBlock(markup, 'winnerMsg');
            }).catch(error => console.log(error));
    }

    saveMemberHandler() {
        this.view.checkAndHideErrorBlock(this.errorBlocks);
        this.model.refreshErrorData();
        let formData = this.view.getFormData();
        if (!this.validator.validate(formData)) {
            this.model.postMember(formData, this.url.save, this.methods.post)
                .then(data => {
                    this.displayMembersList();
                    this.view.clearForm();
                    let errorData = this.model.getErrorData();
                    errorData && this.view.hideElements(formData);
                }).catch(error => console.log(error));
        } else {
            let errorData = this.model.getErrorData();
            this.view.showErrors(errorData);
            this.view.showElements(errorData);
        }
    }

    choseMemberHandler(e) {
        this.view.renderBlock(this.formHeader.person, 'regFormBlock');
        let person = {};
        let elements = document.querySelectorAll('.checkbox')
        this.view.removeChecked(elements);
        e.target.closest('.row').children[0].firstChild.checked = true;
        person.name = e.target.closest('.row').children[2].innerText;
        this.model.postMember(person, this.url.findOne, this.methods.post)
            .then(data => {
                this.view.fillForm(JSON.parse(data));
                this.view.disableBtn(['saveBtn']);
                this.view.activateBtn(['updateBtn', 'deleteBtn']);
            }).catch(error => console.log(error));
    }

    updateMemberHandler() {
        this.initHandler(this.methods.put);
    }

    deleteMemberHandler() {
        this.initHandler(this.methods.delete);
    }

    initHandler(method) {
        this.view.checkAndHideErrorBlock(this.errorBlocks);
        this.model.refreshErrorData();
        let formData = this.view.getFormData();
        if (!this.validator.validate(formData)) {
            this.model.postMember(formData, this.url.save, method)
                .then(data => {
                    this.displayMembersList();
                    this.view.clearForm();
                    this.view.disableBtn(['updateBtn', 'deleteBtn']);
                    this.view.activateBtn(['saveBtn']);
                    let errorData = this.model.getErrorData();
                    errorData && this.view.hideElements(formData);
                    this.view.renderBlock(this.formHeader.registration, 'regFormBlock');
                }).catch(error => console.log(error));
        } else {
            let errorData = this.model.getErrorData();
            this.view.showErrors(errorData);
            this.view.showElements(errorData);
        }
    }

}