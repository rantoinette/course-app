const { Student, Class, StudentClass } = require('../models/index');
const capitalizeFirstLetter = require('../helpers/capitalizeFirstLetter');

// DEFINE AUTH HERE
let bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);

class Controller {
    static homepage(request, response) {
        response.render('index.ejs');
    }

    static getRegister(request, response) {
        let message = null;
        if (request.query.error) {
            message = request.query.error.split(',');
        }
        response.render('register.ejs', { error: message })
    }

    static postRegister(request, response) {
        let hash = bcrypt.hashSync(request.body.password)
        let newStudent = {
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            email: request.body.email,
            password: hash,
            gender: request.body.gender
        }
        // console.log(newStudent);
        Student.create(newStudent)
            .then((data) => {
                response.redirect('/');
            })
            .catch((error) => {
                response.redirect(`/register?error=${error}`);
            })
    }

    static getLogin(request, response) {
        let message = null;
        if (request.query.error) {
            message = request.query.error.split(',');
        }
        response.render('login.ejs', { error: message });
    }

    static postLogin(request, response) {
        Student.findOne({
            where: {
                email: request.body.email
            }
        })
            .then((data) => {
                if (data == null || bcrypt.compareSync(request.body.password, data.password) == false) {
                    let message = "Your username or password is incorrect!";
                    response.redirect(`/login?error=${message}`);
                } else {
                    // ACTIVATE SESSION, REDIRECT TO STUDENT PAGE
                    request.session.user = data;
                    response.redirect(`/student`);
                }
            })
            .catch((error) => {
                response.redirect(`/login?error=${error}`);
            })
    }

    static logout(request, response) {
        request.session.destroy();
        response.redirect('/');
    }

    static getProfile(request, response) {
        console.log(request.session.user); // USE THIS TO QUERY THE DATA
        Student.findOne({
            where: {
                id: request.session.user.id
            }
        })
            .then((data) => {
                response.render('profile.ejs', { student: data, capitalizeFirstLetter });
            })
            .catch((error) => {

            })
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