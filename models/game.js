var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GameSchema = new Schema(
  {
    title: {type: String, required: true},
    summary: {type: String, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
    image: {type: String}
  }
);

// Virtual for book's URL
GameSchema
.virtual('url')
.get(function () {
  return '/catalog/game/' + this._id;
});

//Export model
module.exports = mongoose.model('Game', GameSchema);