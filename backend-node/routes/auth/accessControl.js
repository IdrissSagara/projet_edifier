const login = require('../auth/login');

/**
 * Ensures that the user is connected and has the minimum accreditation level to access
 * @param {*} role role of the user which want to access the ressource
 * @param {*} minimumRole Minimum role to give access to ressources
 */
function canAccess(authorisedRoles = []) {

    if (typeof authorisedRoles === 'string') {
        authorisedRoles = [authorisedRoles];
    }
    return [
        (req, res, next) => {
            authInfo = login.isAuthenticated(req);
            console.log(authInfo);

            //If the user is not authenticated
            if (!authInfo.isAuth) {
                return res.status(401).json({
                    message: (authInfo.status === '') ? 'Vous n\'êtes pas authentifié' : authInfo.status
                });
            }

            //If the user is not authorised to access the ressource
            if ( !authorisedRoles.includes(authInfo.role) && !authorisedRoles.includes('all')) {                
                return res.status(401).json({
                    message: 'Vous n\'êtes pas autorisé à acceder à cette ressource'
                });
            }

            next();
        }
    ]
}

function deniedRoles(deniedRoles = []) {
    if (typeof deniedRoles === 'string') {
        deniedRoles = [deniedRoles];
    }
    return [
        (req, res, next) => {
            authInfo = login.isAuthenticated(req);
            console.log(authInfo);

            //If the user is not authenticated
            if (!authInfo.isAuth) {
                return res.status(401).json({
                    message: (authInfo.status === '') ? 'Vous n\'êtes pas authentifié' : authInfo.status
                });
            }

            //If the user is denied to access the ressource
            if ( deniedRoles.includes(authInfo.role)) {                
                return res.status(401).json({
                    message: 'Vous n\'êtes pas autorisé à acceder à cette ressource'
                });
            }

            next();
        }
    ]
}

module.exports = {
    canAccess, deniedRoles,
}