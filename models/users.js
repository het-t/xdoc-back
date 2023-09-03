import bcrypt from 'bcrypt';

function User() {}

User.prototype.authByPassword = authByPassword;

//authenticate user
async function authByPassword(name, password) {
    try {
        const userDoc = await this.collection['users'].find({name}).toArray()
        if (userDoc.length !== 1) {
            throw "user_not_found"
        }
        const userPasswordDoc = await this.collection['userPasswords'].find({id: userDoc?.[0]?.id}).toArray()
        
        const isPasswordValid = await bcrypt.compare(password, userPasswordDoc?.[0]?.password)
        
        return isPasswordValid
    }
    catch(err) {
        console.log(err)
        return false
    }
}

export default User;