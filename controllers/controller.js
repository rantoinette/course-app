const { Student, Class, StudentClass } = require('../models/index');
const capitalizeFirstLetter = require('../helpers/capitalizeFirstLetter');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'CourseApp.Hacktiv8@gmail.com',
        pass: 'passworD123'
    }
});

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
            gender: request.body.gender,
            major: request.body.major
        }
        // console.log(newStudent);
        Student.create(newStudent)
            .then((data) => {
                const mailOptions = {
                    from: 'CourseApp.Hacktiv8@gmail.com',
                    to: request.body.email,
                    subject: 'Thank you for registering with Course-App',
                    text: 'Welcome to Course-App! Start registering your courses now!'
                };
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) throw err;
                    console.log('Email sent: ' + info.response);
                });
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
                    console.log(request.session.user.email);
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
        // console.log(request.session.user); // USE THIS TO QUERY THE DATA
        Student.findOne({
            where: {
                id: request.session.user.id
            }
        })
            .then((data) => {
                console.log(request.session, `<<<< get profile`);
                response.render('profile.ejs', { student: data, capitalizeFirstLetter });
            })
            .catch((error) => {

            })
    }

    static getClassList(request, response) {
        Class.findAll()
        .then((data) => {
            console.log(request.session, `<<<< get class list`);
            response.render('classList.ejs', { classes: data })
        })
        .catch((err)=> {
            response.send(err)
        })
    }

    static getRegisteredClasses(request, response) {
        // console.log(request.session.user);
        // let id = 1 //change to request.session.id
        console.log(request.session, `<<<< get registered classes`);
        StudentClass.findAll({
            where: {
                StudentId: request.session.user.id
            },
            include: [{model: Class}]
        })
        .then((data) => {
            response.render('registeredClasses.ejs', { studentClass: data })
            // response.send(data)
        })
        .catch((err)=> {
            console.log(err)
            response.send(err)
        })
    }
    

    static getRegisterClass(request, response) {
        let id = request.params.id
        Class.findByPk(id)
        .then((data) => {
            let message = null;
            if (request.query.error) {
                message = request.query.error.split(',');
            }
           response.render("registerAClass.ejs",{ data, error: message, currencyFormat })
        })
        .catch((err)=> {
            console.log(err)
            response.send(err)
        })
    }

    static postRegisterClass(request, response) {
        let newStudentClass = {
            StudentId : request.session.user.id,
            ClassId : request.params.id
        }
        console.log(newStudentClass);
        StudentClass.create(newStudentClass)
        .then((data) => {
            // console.log(data)
            response.redirect("/classes")
        })
        .catch((err)=> {
            console.log(err)
            response.send(err)
        })
    }

    static getClassmates(request, response) {
        let id = request.params.id
        StudentClass.findAll({
            where:{
                ClassId: id
            }, 
            include: [{model: Student}]
        })
        .then((data) => {
            response.render('classmates.ejs', { classmates: data })
            // response.send(data)
        })
        .catch((err)=> {
            console.log(err)
            response.send(err)
        })
    }

    static getEditClass(request, response) {
        let ClassId = request.params.id
        // let StudentId = 1 //hmn... need or not?
        let classData = null;
        Class.findByPk(ClassId)
        .then((data1) => {
            classData = data1;
            return Class.findAll({
                where: {
                    name: data1.name
                }
            })
        })
        .then((data) => {
            // response.send(data)
            let message = null;
            if (request.query.error) {
                message = request.query.error.split(',');
            }
            response.render('editRegisteredClass.ejs', { classData, schedule: data, error: message })
        })
        .catch((err)=> {
            console.log(err)
            response.send(err)
        })
    }

    static postEditClass(request, response) {
        let oldClassId = request.params.id
        let separate = request.body.day.split(' ');
        console.log(separate, `<<<<<<<`);
            let newClass = {
                day: separate[0],
                period: separate[1]
            }
        Class.findOne({ 
            where: {
                name: request.body.name,
                day: newClass.day,
                period: newClass.period
            }
        })
            .then((data)=> {
                console.log(data.id, `<<<<<<`);
                console.log(request.session);
                return StudentClass.update({ClassId: data.id}, {
                    where: {
                        StudentId: request.session.user.id,
                        ClassId: oldClassId
                    }
                })
            })
        .then((data) => {
            response.redirect('/student/classes');
            // response.send(data)
        })
        .catch((err)=> {
            console.log(err)
            response.redirect(`/student/classes/${request.params.id}/edit?error=${err}`)
        })
    }

    static dropClass(request, response) {
        let ClassId = request.params.id
        let StudentId = request.session.user.id
        StudentClass.destroy({where: {
            ClassId,
            StudentId
        }})
        .then((data) => {
            // response.send(data)
            response.redirect('/student/classes');
        })
        .catch((err)=> {
            console.log(err)
            response.send(err)
        })
    }
}


module.exports = Controller;