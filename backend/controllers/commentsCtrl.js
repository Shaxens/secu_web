const commentsService = require("../services/comments.service");
const postService = require("../services/post.service");
const authService = require("../services/auth.service");
const jsonwebtoken = require("jsonwebtoken");

exports.deleteComments = async (req, res) => {
  try {
    const commentId = req.params.id;

    if (!commentId) {
      return res.status(404).json({ error: "L'id du commentaire n'a pas été trouvé" })
    }
    const comment = await commentsService.deleteComments(commentId);

    res.status(200).json(comment);
  } catch (e) {
    console.error(`Erreur lors de la suppression du commentaire : ${e}`)
    res.status(500).json({ message: `Erreur lors de la suppression du commentaire ${e}` })
  }

}


exports.getUserComments = async (req, res) => {
  try {
    const userId = req.user.userId;
    const comments = await commentsService.getCommentsByUserId(userId);
    res.status(200).json(comments);
  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des commentaires de l\'utilisateur' });
  }
}

exports.editComments = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { label, content } = req.body;

    const comment = await commentsService.getCommentsByUuidAndUserId(commentId, userId);

    if (!comment) {
      return res.status(404).json({ message: 'Commentaires non trouvé' });
    }

    comment.label = label;
    comment.content = content;

    const updatedComments = await comment.save();

    res.json({ message: 'Commentaires mis à jour avec succès', comment: updatedComments });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des commentaires :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour des commentaires' });
  }

};

exports.getAllComments = async (req, res) => {
  try {

    const comments = await commentsService.getAllComments();

    res.status(200).json(comments);
  } catch (e) {
    console.error(e)
    res.status(500).json({ e });
  }
}

exports.getComments = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.userId;

    if (!commentId) {
      throw new Error("GET_COMMENTS :: Paramètres incorrects")
    }

    const comment = await commentsService.getCommentsByUuidAndUserId(commentId, userId);

    console.log(comment)
    const data = {
      uuid: comment.uuid,
      label: comment.label,
      content: comment.content,
      like: comment.like,
      comments: comment.comments,
      createdDate: comment.createdDate,
      userId: {
        uuid: userId,
        fullname: comment.userId.fullname
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
    console.log("content : " + req.body)
    const postId = req.params.id;
    const userId = req.user._id;

    if (!content || !userId) {
      console.error('CREATE_COMMENTS ERROR: Paramètres incorrects, impossible de créer le commentaire');
      res.status(400).send('Paramètres incorrects');
      return;
    }

    const comment = await commentsService.createComments(content, userId);

    const post = await postService.getPostById(postId);

    if (!post) {
      console.error('CREATE_COMMENTS ERROR: Post non trouvé');
      res.status(404).json({ message: 'Post non trouvé' });
      return;
    }

    post.comments.push(comment._id);

    await post.save();
    res.status(200).send('Commentaire créé avec succès!');
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Erreur lors de la création du commentaire' });
  }
};
