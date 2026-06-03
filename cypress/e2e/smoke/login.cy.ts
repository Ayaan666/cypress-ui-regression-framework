import LoginPage from '../../pages/login.page';

describe('Login Smoke Suite', () => {

    it('Login Success', () => {

        cy.fixture('users').then((users) => {

            LoginPage.visit();

            LoginPage.login(
                users.admin.username,
                users.admin.password
            );

        });

    });

});