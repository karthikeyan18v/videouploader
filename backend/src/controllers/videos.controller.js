// strmly-backend/src/controllers/videos.controller.js
const Joi   = require('joi');
const Video = require('../models/Video');

const uploadSchema = Joi.object({
  title:       Joi.string().required(),
  description: Joi.string().allow(''),
});
exports.upload = async (req, res, next) => {
  try {
    const { title, description } = await uploadSchema.validateAsync(req.body);
    if (!req.file || !req.file.path)
      return res.status(400).json({ error: 'Video file missing' });

    const video = await new Video({
      title,
      description,
      url: req.file.path,
      owner: req.user.id
    }).save();

    res.status(201).json(video);
  } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
  try {
    const videos = await Video
      .find()
      .populate('owner', 'name')
      .sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) { next(err); }
};
