const userService = require("../services/user.service");
const authService = require("../services/auth.service");
const jsonwebtoken = require("jsonwebtoken");

exports.updateUser = async (req, res) => {
  try {
    const { firstname, lastname, bio } = req.body;
    console.log("req.body");
    console.log(req.body);
    const userId = req.user._id;
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    user.firstname = firstname;
    user.lastname = lastname;
    user.fullname = `${firstname} ${lastname}`;
    user.bio = bio;

    const updatedUser = await user.save();

    const { password, ...userWithoutPassword } = updatedUser.toObject();

    res.json({ message: 'Profil mis à jour avec succès', user: userWithoutPassword });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const token = req.body.jwt;
    const decodedToken = jsonwebtoken.verify(token, authService.JWT_SECRET);
    const userId = decodedToken.data.userId;

    if (!userId) {
      throw new Error("GET_USER :: Paramètres incorrects");
    }

    const user = await userService.getUserById(userId);

    const data = {
      userId: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      fullname: user.fullname,
      bio: user.bio
    };

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ e });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username || !password) {
      throw new Error("Paramètres incorrects");
    }

    let token = await authService.signIn(username, password);
    if (token) {
      res.status(200).send(token);
    } else {
      return res.status(401).send("NOT AUTHORIZED");
    }
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
};

exports.signUp = async (req, res) => {
  try {
    const { username, password, firstname, lastname } = req.body;

    if (!username || !password || (!username && !password)) {
      throw new Error("Paramètres incorrects");
    }

    const user = await userService.getUserByUsername(username);
    if (user) throw new Error("SIGNUP :: User already exist");

    await authService.signUp(username, password, firstname, lastname);
    res.status(200).send("Sign Up !");
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
};
