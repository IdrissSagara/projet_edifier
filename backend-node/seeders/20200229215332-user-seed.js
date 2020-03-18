'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            nom: "user-seed",
            prenom: "user-seed",
            username: "seed",
            password: "$2b$07$Ag6shPE6X1Qj.nKfhJmh2eEt8p3jKZNWmrbG4wLxG52H6ftg4uWIm",
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date(),
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', [{
            username: "user-seed",
        }])
    }
};
