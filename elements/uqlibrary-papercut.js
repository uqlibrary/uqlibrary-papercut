/**
 * By Jan-Willem Wisgerhof <j.wisgerhof@uq.edu.au>
 */
(function () {
    Polymer({
        is: 'uqlibrary-papercut',
        properties: {
            /**
             * URL to the external papercut application
             */
            _papercutUrl: {
                type: String,
                value: 'https://lib-print.library.uq.edu.au:9192'
            },
            /**
             * Required. Whether the app should start in standalone mode or not.
             * @type Boolean
             */
            standAlone: {
                type: Object,
                value: true
            },
            /**
             * Whether the PaperCut app should auto load the API
             * @type Boolean
             */
            autoLoad: {
                type: Object,
                value: true
            },
            /**
             * The top values available to users
             */
            _topUpValues: {
                type: Array,
                value: [5, 10, 20, 50]
            },
            /**
             * Holds the PaperCut API data
             */
            _paperCut: {
                type: Object,
                observer: '_paperCutChanged'
            },
            /**
             * Loads the account info for the current user
             */
            _account: {
                type: Object
            },
            /**
             * Holds the "Retrieved xx minutes from now" string
             */
            _retrievedAt: {
                type: String
            },
            /**
             * Base URL of the top up service page
             */
            _topUpBaseUrl: {
                type: String,
                value: 'https://payments.uq.edu.au/OneStopWeb/aspx/TranAdd.aspx?TRAN-TYPE=W361'
            },

            /**
             * header title - application name
             */
            headerTitle: {
                type: String,
                value: 'Printing balance'
            },
            /**
             * Login button text
             */
            loginBtnText: {
                type: String,
                value: 'Login to print account'
            }
        },
        ready: function () {
            var self = this;

            this.$.papercutApi.addEventListener('uqlibrary-api-papercut-loaded', function (e) {
                self._paperCut = e.detail;
            });

            if (this.autoLoad) {
                this.$.papercutApi.get();
            }

            this.$.accountApi.addEventListener('uqlibrary-api-account-loaded', function (e) {
                self._account = e.detail;
            });

            this.$.accountApi.get();
        },
        /**
         * Called whenever the PaperCut data is changed
         * @private
         */
        _paperCutChanged: function () {
            if (this._paperCut.retrievedAt) {
                this._retrievedAt = moment(this._paperCut.retrievedAt).fromNow();
            }
            this.fire('uqlibrary-papercut-loaded');
        },
        /**
         * Toggles the drawer panel of the main UQL app
         * @private
         */
        _toggleDrawerPanel: function () {
            this.fire('uqlibrary-toggle-drawer');
        },
        /**
         * Redirects the user to the main PaperCut URL
         * @private
         */
        _openPaperCut: function () {
            this.$.ga.addEvent('Log in to Papercut click');
            window.location.href = this._papercutUrl;
        },
        /**
         * Redirects the user to the top up page with the given value
         * @param e
         * @private
         */
        _topUp: function (e) {
            this.$.ga.addEvent('Top-up click', e.model.item);
            var url = this._topUpBaseUrl;
            url += '&username=' + ((typeof(this._account.id) !== 'undefined' && this._account.id !== null) ? this._account.id : '');
            url += '&unitamountinctax=' + e.model.item;
            url += '&email=' + ((typeof(this._paperCut.email) !== 'undefined' && this._paperCut.email !== null) ? this._paperCut.email : '');

            window.location.href = url;
        }
    })
})();