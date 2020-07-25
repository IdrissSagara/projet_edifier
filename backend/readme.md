# Edifier backend application
## 1. Getting started

### Configure database
Create a new `MySql` database and name it `edifier` or any name you want.

You need to configure at least the development database.
So create a config file under `backend-node/config/config.json` and copy/paste (thanks to [Larry Tesler](https://en.wikipedia.org/wiki/Larry_Tesler)) 
the following content into it and replace username and password by your own.
```json
{
  "development": {
    "username": "db_username",
    "password": "password",
    "database": "edifier",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
```

### Configure authentication information
Create a config file under `backend-node/config/jwt_config.json` and copy/paste 
 the following content into it.
 
 *`secret`* is used to sign the authentication jwt<br>
 *`expires_in`* defines the validity period<br>
 *`salt_factor`* defines the password hash factor
```json
{
    "secret": "my extra long jwt signature string",
    "expires_in": "8d",
    "salt_factor": 7
}
```

### Launch the application

First install dependencies by running:
```npm
npm install
```
You need to install `sequelize v5` globally in order to to make and import 
migrations:
```npm
npm install -g sequelize-cli
```
Then make migrations by running:
```npm
npx sequelize-cli db:migrate
``` 
Finally run the app with the command:
```npm
npm start
```
More information about sequelize on their [website](https://sequelize.org/v5/manual/).
## 2. Useful links
### Validators
- https://flaviocopes.com/express-validate-input/
- https://flaviocopes.com/express-sanitize-input/
- https://github.com/validatorjs/validator.js#validators
### Fixtures generator
- https://www.databasetestdata.com/
### HTTP status
- https://en.wikipedia.org/wiki/List_of_HTTP_status_codes