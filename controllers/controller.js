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
            gender: request.body.gender
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
        console.log(request.session.user, "SESSION USER"); // USE THIS TO QUERY THE DATA
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
        Class.findAll()
        .then((data) => {
            response.send(data)
        })
        .catch((err)=> {
            response.send(err)
        })
    }

    static getRegisteredClasses(request, response) {
        let id = request.session.user.id //change to request.session.id
        Student.findAll({
            where: {id},
            include: [{model: Class}]
        })
        .then((data) => {
            response.send(data)
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
           // response.render("",{data})
        })
        .catch((err)=> {
            console.log(err)
            response.send(err)
        })
    }

    static postRegisterClass(request, response) {
        let newStudentClass = {
            StudentId : request.session.user.id, 
            ClassId : request.body.id
        }
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
        Class.findAll({
            where:{id}, 
            include: [{model: Student}]
        })
        .then((data) => {
            response.send(data)
        })
        .catch((err)=> {
            console.log(err)
            response.send(err)
        })
    }

    static getEditClass(request, response) {
        let ClassId = request.params.id
        // let StudentId = 1 //hmn... need or not?
        
        Class.findByPk(ClassId)
        .then((data) => {
            response.render("", {data})
        })
        .catch((err)=> {
            console.log(err)
            response.send(err)
        })
    }

    static postEditClass(request, response) {
        let StudentId = request.session.user.id
        let oldClassId = request.params.id
        let newClassId = request.body.id  
        
        StudentClass.findAll({where: {StudentId}})
        .then((data) => {
            if (data.classId == oldClassId) {
                data.ClassId = newClassId
            }
            return data.save()
        })
        .then((data) => {
            response.send(data)
        })
        .catch((err)=> {
            console.log(err)
            response.send(err)
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
            response.send(data)
        })
        .catch((err)=> {
            console.log(err)
            response.send(err)
        })
    }
}

module.exports = Controller;