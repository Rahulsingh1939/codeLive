var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy=require('passport-facebook').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findOne({_id: id})
    .then(function (user) {
      done(null, user);
    })
    .catch(function (err) {
      done(err);
    });
});


passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  async function (email, password, done) {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));


  passport.use(new FacebookStrategy({
    clientID:'755027186361839',
    clientSecret:'e70be3e90a1bcec691af99df2044e228',
    callBackURL:'http://localhost:3000/auth/facebook/callback'
  },
  function(token, refreshToken, profile, done) {
    User.findOne({'facebookId': profile.id}, function(err, user) {
      if (err) return done(err);

      if (user) {
        return done(null, user);
      } else {
        User.findOne({email: profile.emails[0].value}, function (err, user) {
          if (user) {
            user.facebookId = profile.id
            return user.save(function (err) {
              if (err) return done(null, false, { message: "Can't save user info"});
              return done(null, user);
            })
          }

          var user = new User();
          user.name = profile.displayName;
          user.email = profile.emails[0].value;
          user.facebookId = profile.id
          user.save(function (err) {
            if (err) return done(null, false, { message: "Can't save user info"});
            return done(null, user);
          });
        })
      }


    });
  }
));
