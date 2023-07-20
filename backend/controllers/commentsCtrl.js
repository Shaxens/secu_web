const commentsService = require("../services/comments.service");
const postService = require("../services/post.service");
const authService = require("../services/auth.service");
const jsonwebtoken = require("jsonwebtoken");

exports.deleteComments = async (req, res) => {
  try {
    const uuid = req.params.id;

    if (!uuid) {
      return res.status(404).json({ error: "L'id du post n'a pas été trouvé" })
    }
    const post = await postService.deleteComments(uuid)

    res.status(200).json(post);
  } catch (e) {
    console.error(`Erreur lors de la suppression du post : ${e}`)
    res.status(500).json({ message: `Erreur lors de la suppresion du post ${e}` })
  }

}


exports.getUserComments = async (req, res) => {
  try {
    console.log(req.user)
    const userId = req.user.uuid;
    const posts = await postService.getCommentssByUserId(userId);
    res.status(200).json(posts);
  } catch (error) {
    console.error('Erreur lors de la récupération des posts de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des posts de l\'utilisateur' });
  }
}

exports.editComments = async (req, res) => {
  try {
    const uuid = req.params.id;
    const { label, content } = req.body;

    const post = await postService.getCommentsByUuidAndUserId(uuid, userId);

    if (!post) {
      return res.status(404).json({ message: 'Comments non trouvé' });
    }

    post.label = label;
    post.content = content;

    const updatedComments = await post.save();

    res.json({ message: 'Comments mis à jour avec succès', post: updatedComments });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du post :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du post' });
  }

};

exports.getAllComments = async (req, res) => {
  try {

    const post = await postService.getAllComments()

    res.status(200).json(post);
  } catch (e) {
    console.error(e)
    res.status(500).json({ e });
  }
}

exports.getComments = async (req, res) => {
  try {
    const uuid = req.params.id
    const userId = req.user.uuid;

    if (!uuid) {
      throw new Error("GET_USER :: Paramètres incorrects")
    }

    const post = await postService.getCommentsByUuidAndUserId(uuid, userId)

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

exports.createComments = async (req, res) => {
  try {
    const { content } = req.body;
    const postId = req.params.id;
    const userId = req.user.uuid;

    if (!content || !userId) {
      console.error('CREATECOMMENTS ERROR: Paramètres incorrects, impossible de créer le commentaire');
      res.status(400).send('Paramètres incorrects');
      return;
    }

    const comment = await commentsService.createComments(content, userId);
    console.log("comment.response");
    console.log(comment);

    const post = await postService.getPostById(postId);
    console.log(post);
    console.log("post.comments");
    console.log(post.comments);
    if (!post) {
      console.error('CREATECOMMENTS ERROR: Post non trouvé');
      res.status(404).json({ message: 'Post non trouvé' });
      return;
    }

    post.comments.push(comment._id);

    await post.save();
    res.status(200).send('Comment successfully created!');
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Erreur lors de la création du commentaire' });
  }
};


