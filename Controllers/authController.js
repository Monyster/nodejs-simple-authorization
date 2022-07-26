const User = require('../Models/User')
const Role = require('../Models/Role')



class authController {
    async registration(req, res) {
        try {
            const { username, password } = req.body

            const candidate = await User.findOne({ username })
            if(candidate){
                return res.status(400).json({message:"Username is already created"})
            }

            const user = new User({username, password})
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Registration error", error: error })
        }
    }

    async login(req, res) {
        try {

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: "Login error", error: error })
        }
    }

    async getUsers(req, res) {
        try {
            res.json("server work")
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new authController();