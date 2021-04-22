// DEFINE AUTH HERE
const {Student, Class, StudentClass} = require("../models")

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
        Student.findAll()
        .then((data) => {
            response.render("students", {data})
        })
        .catch((err)=> {
            response.send(err)
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
        let id = 1 //change to request.session.id
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
            StudentId : 1, //becomes request.session.id
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
        let StudentId = request.session.id
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
        let StudentId = request.session.id
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