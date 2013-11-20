/**
 * Comment manage service.
 *
 * @author tim.tang
 */

var model = require('../model'),
    Comment = model.Comment,
    _ = require('underscore');


var CommentService = function CommentSerice() {};

_.extend(CommentService.prototype, {

    getCommentsByCardId: function(cardId, callback) {
        Comment.find({
            card_id: cardId
        }, callback);
    },

    star: function(id, star, callback) {
        Comment.findOne({
            _id: id
        }, function(err, comment) {
            if (err) {
                callback(err);
            }
            if (!comment) {
                callback(new Error('Comment not exists!'));
            }
            comment.star = star;
            comment.save(callback);
        });
    },

    saveComment: function(userId, cardId, content, callback) {
        var comment = new Comment();
        comment.user_id = userId;
        comment.card_id = cardId;
        comment.content = content;
        comment.save(function(err){
            callback(err, comment);
        });
    }
});

var commentService = new CommentService();

/** public comment module **/
module.exports = commentService;