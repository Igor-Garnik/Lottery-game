class Validator {
    constructor(model) {
        this.model = model;
        this.namePattern = /[A-Za-z]+/;
        this.surnamePattern = /^[A-Za-z+-]+$/;
        this.emailPattern = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        this.phonePattern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
        this.errorMsg = null;
    }
    validate(formData) {
        let isValid = []
        if (!this.isEmpty(formData)) return true;
        isValid.push(this.isNameMissmatchPattern(formData));
        isValid.push(this.isSurnameMissmatchPattern(formData));
        isValid.push(this.isEmailMissmatchPattern(formData));
        isValid.push(this.isPhoneMissmatchPattern(formData));
        return isValid.includes(false);
    }

    isEmpty(formData) {
        return (formData.name && formData.surname && formData.email) || this.model.createErrorMsg('empty', 'errorBlock');
    }

    isNameMissmatchPattern(formData) {
        return this.namePattern.test(formData.name) || this.model.createErrorMsg('nameError', 'nameErrorBlock');
    }

    isSurnameMissmatchPattern(formData) {
        return this.surnamePattern.test(formData.surname) || this.model.createErrorMsg('surnameError', 'surnameErrorBlock');
    }

    isEmailMissmatchPattern(formData) {
        return this.emailPattern.test(formData.email) || this.model.createErrorMsg('emailError', 'emailErrorBlock');
    }

    isPhoneMissmatchPattern(formData) {
        if (!formData.phone) return true;
        return this.phonePattern.test(formData.phone) || this.model.createErrorMsg('phoneError', 'phoneErrorBlock');
    }
}