const login = require('../auth/login');

const roles = {
    ADMIN: 'admin',
    ADVANCED: 'advanced-user',
    ALL: 'all',
    BASIC: 'basic-user',
    MEDIUM: 'medium-user',
};

/**
 * Ensures that the user is connected and has the required accreditation level to access
 * @param authorisedRoles
 */
function canAccess(authorisedRoles = []) {

    if (typeof authorisedRoles === 'string') {
        authorisedRoles = [authorisedRoles];
    }
    return [
        (req, res, next) => {
            let authInfo = login.isAuthenticated(req);

            //If the user is not authenticated
            if (!authInfo.isAuth) {
                return res.status(401).json({
                    message: (authInfo.status === '') ? 'Vous n\'êtes pas authentifié' : authInfo.status
                });
            }

            //If the user is not authorised to access the resource
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
            let authInfo = login.isAuthenticated(req);

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
    canAccess, deniedRoles, roles,
};
