class Model {
    constructor() {
        this.url = 'http://localhost:3000';
        this.errorMsg = '';
        this.errorsMsgList = {
            'empty': 'Please fill required fields',
            'nameError': 'Only latin characters',
            'surnameError': 'Only latin characters',
            'emailError': 'Wrong format',
            'phoneError': 'Wrong format',
            'birthdayError': 'Wrong format'
        };
        this.errorData = [];
    }

    getMembersList() {
        const makeRequest = new Promise(function (resolve, reject) {
            const url = 'http://localhost:3000';
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject('Error');
                }
            };
            xhr.send();
        });
        return makeRequest;
    }

    postMember(formData, url, method) {
        const makeRequest = new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.setRequestHeader("Content-type", 'application/json; charset=utf-8');
            xhr.onload = function () {
                if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject('Error');
                }
            };
            xhr.send(JSON.stringify(formData));
        });
        return makeRequest;
    }


    createFormMarkup(response) {
        var markup = '';
        response.forEach((item, index) => {
            markup +=
                `<div class="row">
                <div class="checkbox-wrapper"><input class="checkbox" type="checkbox"></div>
                <div class="number">${index + 1}</div>
                <div class="name">${item.name}</div>
                <div class="surname">${item.surname}</div>
                <div class="email">${item.email}</div>
                <div class="phone">${item.phone}</div>
                <div class="birthday">${item.birthday}</div>
            </div>`
        })
        return markup
    }

    createWinnerMarkup(winner) {
        let markup = `<span>${winner[0].name} ${winner[0].surname}. Congratulations!!!</span>`;
        return markup;
    }

    createErrorMsg(message, block) {
        let error = {
            errMsg: this.errorsMsgList[message],
            errBlock: block
        }
        this.errorData.push(error);
        return false;
    }

    getErrorData() {
        return this.errorData;
    }

    refreshErrorData() {
        this.errorData = [];
    }
}