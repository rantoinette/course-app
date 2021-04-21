// DEFINE AUTH HERE

class Controller {
    static homepage(request, response) {
        response.send('landing page')
    }

    static getRegister(request, response) {
        response.send('get register form')
    }

    static postRegister(request, response) {
        response.send('post register, redirect to landing page')
    }

    static getLogin(request, response) {
        response.send('get login form')
    }

    static postLogin(request, response) {
        response.send('if success session activated redirect to student page, else redirect to landing page')
    }

    static logout(request, response) {
        response.send('destroy session');
    }

    static getProfile(request, response) {
        
    }

    static getClassList(request, response) {

    }

    static getRegisteredClasses(request, response) {

    }

    static getRegisterClass(request, response) {

    }

    static postRegisterClass(request, response) {

    }

    static getClassmates(request, response) {

    }

    static getEditClass(request, response) {

    }

    static postEditClass(request, response) {

    }

    static dropClass(request, response) {

    }
}

module.exports = Controller;