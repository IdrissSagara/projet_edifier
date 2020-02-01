let express = require('express');
let router = express.Router();

let clientValidator = require('./clientValidator');
const accessControl = require('../../auth/accessControl');
let clientCtrl = require('./clientCtrl');
const roles = accessControl.roles;

/**
 * @swagger
 * /api/client:
 *    get:
 *      summary: Returns the list of all the clients with server side pagination.
 *      description: Get all the clients
 *      tags:
 *        - Client
 *      responses:
 *        '200':
 *           description: A list of clients.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *    parameters:
 *    - name: limit
 *      in: path
 *      description: Number of clients to get
 *      required: false
 *      schema:
 *        type: array
 *        style: simple
 *        items:
 *          type: string
 *    - name: offset
 *      in: path
 *      description: Number of client to skip
 *      required: false
 *      schema:
 *        type: array
 *        style: simple
 *        items:
 *          type: string
 */
router.get('/',
    clientValidator.validate('getAllClients'),
    accessControl.canAccess([roles.ALL]),
    clientCtrl.getAll);

/**
 * @swagger
 * /api/client/:id:
 *    get:
 *      summary: Returns a client.
 *      description: Get a particular client
 *      tags:
 *        - Client
 *      responses:
 *        '200':
 *           description: A client identified the provided ID.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *    parameters:
 *    - name: id
 *      in: path
 *      description: ID of the client to get
 *      required: true
 *      schema:
 *        type: array
 *        style: simple
 *        items:
 *          type: string
 */
router.get('/:id',
    clientValidator.validate('getClient'),
    accessControl.canAccess(['advanced-user', 'admin']),
    clientCtrl.getById);

//get all the chantiers of a client
router.get('/:id/chantiers',
    clientValidator.validate('getChantiers'),
    accessControl.canAccess(['advanced-user', 'admin']),
    clientCtrl.getChantiers);

//save a client
router.post('/client',
    clientValidator.validate('saveClient'),
    accessControl.canAccess([roles.ALL]),
    clientCtrl.save);

//edit a client
router.put('/client',
    clientValidator.validate('saveClient'),
    accessControl.canAccess(['medium-user', 'advanced-user', 'admin']),
    clientCtrl.update);

//delete a client
router.delete('/client',
    clientValidator.validate('getClient'),
    accessControl.deniedRoles([roles.BASIC]),
    clientCtrl.destroy);

module.exports = router;