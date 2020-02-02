var jwt = require('jsonwebtoken');
//const JWT_SIGN_SECRET = 'cl3 de ch1ffr3m3nt_JWT';
const JWT_SIGN_SECRET = require('../../config/jwt_config').secret;

function parseAuthorization(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', ''): null;
}

function genToken(userData) {
    return jwt.sign({
        userId: userData.id,
        role: userData.role
    },
    JWT_SIGN_SECRET,
    {
        expiresIn: '8d' /* /!\/!\/!\/!\/!\/!\/!\ */
    })
}

function getUserInfo(authorization) {
    var userId = -1;
    var role = '';
    var status = '';
    var token = module.exports.parseAuthorization(authorization);
    
    if(token != null) {
        try {
            var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
            if(jwtToken != null) {
                userId = jwtToken.userId;
                role = jwtToken.role;        
            }
        } catch(err) {
            console.log('jwt verification error');
            console.log(err);
            status = err;
        }
    }

    return {userId, status, role};
}

module.exports = {
    parseAuthorization, getUserId: getUserInfo, genToken
}