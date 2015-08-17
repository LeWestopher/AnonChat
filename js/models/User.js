/**
 * Created by Westopher on 8/13/2015.
 */

(function (exports) {

    function User (config) {
        this.id             = config.id             ?   config.id           : null;
        this.handle         = config.handle         ?   config.handle       : null;
        this.public_key     = config.public_key     ?   config.public_key   : null;
        this.passphrase     = config.passphrase     ?   config.passphrase   : null;
        this.private_key    = config.private_key    ?   config.private_key  : null;
    }

    User.prototype.generateKeyPair = function (passphrase) {
        var _this = this;

        var F = kbpgp["const"].openpgp;

        var my_asp = new kbpgp.ASP({
            progress_hook: function(o) {
                console.log("I was called with progress! " + o + '%');
            }
        });

        var opts = {
            asp: my_asp,
            userid: "User McTester (Born 1979) <user@example.com>",
            primary: {
                nbits: 4096,
                flags: F.certify_keys | F.sign_data | F.auth | F.encrypt_comm | F.encrypt_storage,
                expire_in: 0  // never expire
            },
            subkeys: [
                {
                    nbits: 2048,
                    flags: F.sign_data,
                    expire_in: 86400 * 365 * 8 // 8 years
                }, {
                    nbits: 2048,
                    flags: F.encrypt_comm | F.encrypt_storage,
                    expire_in: 86400 * 365 * 8
                }
            ]
        };

        kbpgp.KeyManager.generate(opts, function(err, alice) {
            if (!err) {
                // sign alice's subkeys
                alice.sign({}, function(err) {
                    _this.KeyManager = alice;
                    console.log(alice);
                    // export demo; dump the private with a passphrase
                    alice.export_pgp_private ({
                        passphrase: 'booyeah!'
                    }, function(err, pgp_private) {
                        console.log("private key: ", pgp_private);
                        _this.private_key = pgp_private;
                    });
                    alice.export_pgp_public({}, function(err, pgp_public) {
                        console.log("public key: ", pgp_public);
                        _this.public_key = pgp_public;
                    });
                });
            } else {
                console.log(err);s
            }
        });
    }

    exports.User = User;

})( window );
