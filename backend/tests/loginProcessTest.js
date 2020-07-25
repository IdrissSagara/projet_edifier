// Import the dependencies for testing
let chai = require('chai');
let assert = chai.assert;
let chaiHttp = require('chai-http');
let app = require('../app');
const userDao = require('../dao/userDAO');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Test userDao", () => {
    let user = {
        id: 1,
        nom: 'admin',
        prenom: 'admin',
        username: 'admin',
        password:
            '$2b$07$Ag6shPE6X1Qj.nKfhJmh2eEt8p3jKZNWmrbG4wLxG52H6ftg4uWIm',
        role: 'admin',
        createdAt: '2020-02-29T23:15:30.000Z',
        updatedAt: '2020-02-29T23:15:30.000Z'
    };
    let username = 'admin';

    describe("getByUsername", () => {
        it("Should return the user with username: " + username, async () => {
            const result = await userDao.getByUsername(username);
            //console.log(result);
            assert.isDefined(result);
            assert(result.username === username, 'The returned username is not correct');
        });

        username = 'afmin1';
        it("Should return null for username " + username, async () => {
            const result = await userDao.getByUsername('afmin1');
            console.log(result);
            assert.isDefined(result);
            assert(result === null, `Shouldn't get any user`);
        });
    });

    describe("pwdCompare", () => {
        username = 'admin';
        let pwd = 'admin';
        it("Should authentify the user " + username, async () => {
            const result = userDao.pwdCompare(user.password, pwd);
            assert.isDefined(result, 'Result should be defined');
            assert(result === true, 'user admin should log in with pwd admin');
        });

        it("Should fail authentication due to wrong pwd", async () => {
            pwd = 'afmin1';
            const result = userDao.pwdCompare(user.password, pwd);
            assert.isDefined(result);
            assert(result === false);
        });
    });
});
