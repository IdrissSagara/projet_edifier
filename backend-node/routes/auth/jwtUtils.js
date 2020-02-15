var jwt = require('jsonwebtoken');
const config = require('../../config/jwt_config');
const JWT_SIGN_SECRET = config.secret;
const EXPRIRES_IN = config.expires_in;

function parseAuthorization(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', ''): null;
}

function genToken(userData) {
    return jwt.sign({
        userId: userData.id,
            nom: userData.nom,
            prenom: userData.prenom,
            username: userData.username,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
        role: userData.role
    },
    JWT_SIGN_SECRET,
    {
        expiresIn: EXPRIRES_IN /* /!\/!\/!\/!\/!\/!\/!\ */
    })
}

function getUserInfo(authorization) {
    let user = {
        userId: -1,
        nom: "",
        prenom: "",
        username: "",
        createdAt: "",
        updatedAt: "",
        role: ""
    };

    var token = module.exports.parseAuthorization(authorization);
    
    if(token != null) {
        try {
            var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
            if(jwtToken != null) {
                user = {
                    userId: jwtToken.userId,
                    nom: jwtToken.nom,
                    prenom: jwtToken.prenom,
                    username: jwtToken.username,
                    createdAt: jwtToken.createdAt,
                    updatedAt: jwtToken.updatedAt,
                    role: jwtToken.role,
                }
            }
        } catch(err) {
            console.log('jwt verification error');
            console.log(err);
            user.status = err;
        }
    } else {
        user.status = 'No jwt Token found';
    }

    return user;
}

module.exports = {
    parseAuthorization, getUserInfo, genToken
};
