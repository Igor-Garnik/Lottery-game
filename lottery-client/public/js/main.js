const service = new Service();
const domElements = new DomElements();
const model = new Model();
const view = new View(domElements);
const validator = new Validator(model);
const controller = new Controller(model, view, validator, service, domElements);
controller.initComponent();