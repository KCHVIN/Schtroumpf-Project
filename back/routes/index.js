const requests = require('../requests/requests');

module.exports = function(params) {
        let passport = params.passport;
        let router = params.router;

        router.get('/schtroumpf/:schtroumpfId',
        passport.authenticate(['bearer'], {
                session: false
            }),
            requests.getSchtroumpfs);

        router.post('/schtroumpf', requests.postData);
        router.put('/schtroumpf/:id', passport.authenticate(['bearer'], {
                session: false
            }),requests.updateSchtroumpf);

        router.delete('/schtroumpf/:id', requests.deleteData);

        router.post('/schtroumpfaccount', requests.createAccount);
        router.get('/schtroumpfaccount', requests.getAccounts);

        router.post('/schtroumpflogin', requests.connexionAccount);

        router.post('/friendschtroumpf/:id', passport.authenticate(['bearer'], {
                session: false
            }),requests.addFriend);
        router.put('/friendschtroumpf/:id', passport.authenticate(['bearer'], {
                session: false
            }),requests.removeFriend);

        router.get('/myaccount/:id', passport.authenticate(['bearer'], {
                session: false
            }),requests.accountInformation);

        return router;
}