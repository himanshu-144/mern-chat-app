
const bcrypt = require('bcryptjs');

const hashPassword = async(password)=>{
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
        
    } catch (error) {
        console.log(error.message);
    }
}

const comparePassword = async(password, hashedPassword)=>{
    return bcrypt.compare(password, hashedPassword);
}

module.exports = {comparePassword, hashPassword};