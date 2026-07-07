const mongoose = require('mongoose');

const TimelineItemSchema = new mongoose.Schema({
  id: String,
  date: String,
  title: String,
  description: String,
  image: String,
}, { _id: false });

const GalleryItemSchema = new mongoose.Schema({
  id: String,
  src: String,
  category: String,
  caption: String,
}, { _id: false });

const VideoItemSchema = new mongoose.Schema({
  id: String,
  title: String,
  thumbnail: String,
  videoUrl: String,
}, { _id: false });

const LetterItemSchema = new mongoose.Schema({
  id: String,
  title: String,
  date: String,
  body: String,
}, { _id: false });

const QuoteItemSchema = new mongoose.Schema({
  id: String,
  text: String,
  author: String,
}, { _id: false });

const PlaylistItemSchema = new mongoose.Schema({
  id: String,
  title: String,
  artist: String,
  src: String,
  cover: String,
}, { _id: false });

const FutureDreamSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  icon: String,
}, { _id: false });

const StorySchema = new mongoose.Schema(
  {
    couple: {
      nameA: { type: String, default: 'Your Name' },
      nameB: { type: String, default: 'Her Name' },
      tagline: { type: String, default: 'Two hearts, one story' },
      sinceDate: { type: String, default: '2022-02-14T18:30:00' },
    },
    hero: {
      eyebrow: { type: String, default: 'A love story, still being written' },
      heading: { type: String, default: 'Your Name & Her Name' },
      typedMessages: [{ type: String }],
      heroImage: { type: String, default: '' },
    },
    theme: {
      mode: { type: String, default: 'night' },
    },
    timeline: [TimelineItemSchema],
    gallery: [GalleryItemSchema],
    videos: [VideoItemSchema],
    letters: [LetterItemSchema],
    quotes: [QuoteItemSchema],
    playlist: [PlaylistItemSchema],
    futureDreams: [FutureDreamSchema],
    countdownDate: { type: String, default: '2022-02-14T18:30:00' },
    footerMessage: {
      type: String,
      default: 'Made with every beat of my heart, for the one who owns all of it.',
    },
    adminPassword: { type: String, default: 'ourlovestory' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Story', StorySchema);
