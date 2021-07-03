const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')
const usersRouter = require('express').Router()

// router.get('/profile', function(req, res, next) {
//     res.render('profile', { title: 'profile', user: req.user });
// });

usersRouter.post('/signup', async (req, res, next) => {
    try {
        const body = req.body

        if(body.password.length < 6){
            return res.status(400).json({ error: 'Password is shorter than the minimum allowed length (3).' })
        }

        const emailReq=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
        
        if(!emailReq.test(body.email)){
            return res.status(400).json({ error: 'Invalid Email' })
        }

        const saltRounds = 10

        const userExists = await User.findOne({
            email:body.email
        })
        if(userExists){
            return res.status(400).json({ error: 'Email is Already exists' })
        }

        const user = new User({
            FirstName:body.FirstName,
            LastName:body.LastName,
            email:body.email,
            password:await bcrypt.hash(body.password, saltRounds)
        })

        const savedUser = await user.save()

        res.json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

usersRouter.post('/login', async (req,res,next) => {
    try{
        const body = req.body

        const user = await User.findOne({ email: body.email })
        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(body.password, user.password)
    
        if (!(user && passwordCorrect)) {
            return res.status(401).json({
                error: 'invalid username or password'
            })
        }
    
        const userForToken = {
            email: user.email,
            id: user._id,
        }
    
        const token = jwt.sign(userForToken, process.env.SECRET)
    
        res.status(200).send({ 
            token
        })

    }catch (exception) {
        next(exception)
    }
})

usersRouter.put('/update', async (req,res,next) => {
    try{
        const body = req.body

        const user={
            FirstName:body.FirstName,
            LastName:body.LastName,
            email:body.email,
            password:await bcrypt.hash(body.password,10)
        }

        User.findByIdAndUpdate(request.params.id,user,{new:true})
            .then(updateUser =>{
                res.json(updateUser)
            })
    }catch(exception){
        next(exception)
    }
})

module.exports = usersRouter