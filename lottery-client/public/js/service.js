class Service {
    constructor() { }

    getRandomMember(membersList) {
        var winner = membersList[Math.floor(Math.random() * (membersList.length))];
        console.log(winner)
        return [winner];
    }

}