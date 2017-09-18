const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });
			if (existingUser) {
				done(null, existingUser);
			} else {
				const user = await new User({ googleId: profile.id }).save();
				done(null, user);
			}
		}
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: keys.facebookAppID,
			clientSecret: keys.facebookAppSecret,
			callbackURL: "/auth/facebook/callback",
			profileFields: ["id", "displayName", "photos", "email"],
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ facebookId: profile.id });
			if (existingUser) {
				done(null, existingUser);
			} else {
				const user = await User({
					facebookId: profile.id,
					email: profile.emails[0].value
				}).save();
				done(null, user);
			}
		}
	)
);
