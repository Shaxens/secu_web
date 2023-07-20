const postService = require("../services/post.service");
const authService = require("../services/auth.service");
const jsonwebtoken = require("jsonwebtoken");

exports.deletePost = async (req, res) => {
  try {
    const uuid = req.params.id;

    if (!uuid) {
      return res.status(404).json({ error: "L'id du post n'a pas été trouvé" })
    }
    const post = await postService.deletePost(uuid)

    res.status(200).json(post);
  } catch (e) {
    console.error(`Erreur lors de la suppression du post : ${e}`)
    res.status(500).json({ message: `Erreur lors de la suppresion du post ${e}` })
  }

}


exports.getUserPost = async (req, res) => {
  try {
    console.log(req.user)
    const userId = req.user.uuid;
    const posts = await postService.getPostsByUserId(userId);
    res.status(200).json(posts);
  } catch (error) {
    console.error('Erreur lors de la récupération des posts de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des posts de l\'utilisateur' });
  }
}

exports.editPost = async (req, res) => {
  try {
    const uuid = req.params.id;
    const { label, content } = req.body;

    const post = await postService.getPostByUuidAndUserId(uuid, userId);

    if (!post) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    post.label = label;
    post.content = content;

    const updatedPost = await post.save();

    res.json({ message: 'Post mis à jour avec succès', post: updatedPost });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du post :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du post' });
  }

};

exports.getAllPost = async (req, res) => {
  try {

    const post = await postService.getAllPost()

    res.status(200).json(post);
  } catch (e) {
    console.error(e)
    res.status(500).json({ e });
  }
}


exports.getPostByUuidAndUserId = async (req, res) => {
  try {
    const uuid = req.params.id
    const userId = req.user.uuid;

    if (!uuid) {
      throw new Error("GET_USER :: Paramètres incorrects")
    }

    const post = await postService.getPostByUuidAndUserId(uuid, userId)

    console.log(post)
    const data = {
      uuid: post.uuid,
      label: post.label,
      content: post.content,
      like: post.like,
      comments: post.comments,
      createdDate: post.createdDate,
      userId: {
        uuid: userId,
        fullname: post.userId.fullname
      }
    }

    res.status(200).json(data);
  } catch (e) {
    console.error(e)
    res.status(500).json({ e });
  }
}

exports.getPostByUuid = async (req, res) => {
  try {
    const uuid = req.params.id

    if (!uuid) {
      throw new Error("GET_USER :: Paramètres incorrects")
    }

    const post = await postService.getPostById(uuid)

    console.log("post")
    console.log(post)
    const data = {
      uuid: post.uuid,
      label: post.label,
      content: post.content,
      like: post.like,
      comments: post.comments,
      createdDate: post.createdDate,
      userId: {
        uuid: post.userId.uuid,
        fullname: post.userId.fullname
      }
    }

    res.status(200).json(data);
  } catch (e) {
    console.error(e)
    res.status(500).json({ e });
  }
}

exports.createPost = async (req, res) => {
  try {
    const { label, content, jwt } = req.body;
    const decodedToken = jsonwebtoken.verify(jwt, authService.JWT_SECRET);
    const userId = decodedToken.data.uuid;
    const comments = []

    if (!label || !content || !userId) {
      console.error('CREATEPOST ERROR: Paramètres incorrects, impossible de créer le post');
      res.status(400).send('Paramètres incorrects');
      return;
    }

    if (!jwt) {
      console.error('CREATEPOST ERROR: Jeton JWT non fourni');
      res.status(400).send('Jeton JWT non fourni');
      return;
    }

    await postService.createPost(label, content, userId, comments);
    res.status(200).send('Post successfully created!');
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Erreur lors de la création du post' });
  }
};

