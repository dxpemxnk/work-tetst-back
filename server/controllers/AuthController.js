const bcrypt = require("bcrypt");
const { User } = require("../db/models");
const generateTokens = require("../utils/generateTokens");
const jwtConfig = require("../config/jwtConfig");

exports.registrationController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password || email.trim() === "" || password.trim() === "") {
        res.status(400).json({ user: {}, message: "No email or password" });
    }
    try {
        const user = await User.findOne({ where: { email } });
        if (user) {
            res.status(400).json({ user: {}, message: "This email already use" });
            return;
        } else {
            const newUser = await User.create({ email, password: await bcrypt.hash(password, 10) });

            const targetUser = newUser.get();
            delete targetUser.password;
            if (newUser) {
                const { accessToken, refreshToken } = generateTokens({ user: targetUser });
                res.cookie(jwtConfig.refresh.type, refreshToken, { httpOnly: true, maxAge: jwtConfig.refresh.expiresIn });
                res.status(201).json({ user: targetUser, accessToken });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.authorizationController = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email && password && email.trim() !== "") {
            const user = await User.findOne({
                where: {
                    email,
                },
            });
            if (!user) {
                res.status(400).json({
                    user: {},
                    accessToken: "",
                    message: "No user with this email",
                });
                return;
            }

            const isCorrectPassword = await bcrypt.compare(password, user.password);

            const targetUser = user.get();
            delete targetUser.password;

            if (isCorrectPassword) {
                const { accessToken, refreshToken } = generateTokens({ user: targetUser });
                res.cookie(jwtConfig.refresh.type, refreshToken, {
                    httpOnly: true,
                    maxAge: jwtConfig.refresh.expiresIn,
                });

                res.status(200).json({ user: targetUser, accessToken: accessToken });
            } else {
                res
                    .status(400)
                    .json({ message: "Incorrect password or email" });
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.refreshController = (req, res) => {
    try {
        const user = res.locals.user;

        const { accessToken, refreshToken } = generateTokens({ user });
        res.cookie(jwtConfig.refresh.type, refreshToken, {
            httpOnly: true,
            maxAge: jwtConfig.refresh.expiresIn,
        });
        res.status(200).json({ user, accessToken: accessToken });
    } catch (error) {
        res.status(401).json({ user: {}, accessToken: "" });
    }
}

exports.logoutController = (req, res) => {
    res
        .clearCookie("refreshToken")
        .json({ message: "clearCookie" });
}