let express = require('express');
let router = express.Router();

let chantierValidator = require('./chantierValidator');
const validate = require('../validationCtrl').validate;
const accessControl = require('../../auth/accessControl');
let chantierCtrl = require('./chantierCtrl');
const roles = accessControl.roles;

//get all the chantiers
router.get('/',
    chantierValidator.validate('getAllChantiers'),
    accessControl.canAccess([roles.ALL]),
    chantierCtrl.getAll);

//get a chantier by its id
/**
 * @swagger
 * /api/chantier:
 *   get:
 *     tags:
 *       - Chantier
 *     name: Find chantier
 *     summary: Finds a chantier
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required:
 *           - id
 *     responses:
 *       '200':
 *         description: A single chantier object
 *         schema:
 *           $ref: '#/definitions/Chantier'
 *       '401':
 *         description: No auth token / no chantier found in db with that name
 *       '404':
 *         description: No chantier found for this id
 */
router.get('/:id',
    chantierValidator.validate('getChantier'),
    accessControl.canAccess([roles.ALL]),
    chantierCtrl.getById);

//get the client of the chantier
router.get('/:id/client',
    chantierValidator.validate('getChantier'),
    accessControl.canAccess([roles.ALL]),
    chantierCtrl.getClientOfChantier);

router.get('/:id/ouvriers',
    chantierValidator.validate('getChantier'), validate,
    accessControl.canAccess([roles.ALL]),
    chantierCtrl.getChantierWithOuvriers);

//save a chantier
router.post('/',
    chantierValidator.validate('saveChantier'),
    accessControl.canAccess([roles.ALL]),
    chantierCtrl.save);

//edit a chantier
router.put('/',
    chantierValidator.validate('saveChantier'),
    accessControl.canAccess([roles.ALL]),
    chantierCtrl.update);

//delete a chantier
router.delete('/:id',
    chantierValidator.validate('getChantier'),
    accessControl.deniedRoles([roles.BASIC]),
    chantierCtrl.destroy);

module.exports = router;