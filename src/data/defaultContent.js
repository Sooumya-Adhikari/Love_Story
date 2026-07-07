// This is the seed content shown the very first time the site loads.
// Everything here can be changed afterwards from /admin — nothing here
// needs to be hand-edited, but you can also just edit this file directly
// if you prefer working in code.

const PLACEHOLDER_PHOTO = (seed, w = 800, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`

export const defaultContent = {
  couple: {
    nameA: 'Your Name',
    nameB: 'Her Name',
    tagline: 'Two hearts, one story',
    sinceDate: '2022-02-14T18:30:00'
  },

  hero: {
    eyebrow: 'A love story, still being written',
    heading: 'Your Name & Her Name',
    typedMessages: [
      'Every love story is beautiful, but ours is my favorite.',
      'You are my today and all of my tomorrows.',
      'In a sea of people, my eyes will always search for you.'
    ],
    heroImage: PLACEHOLDER_PHOTO('hero-couple', 1200, 1400)
  },

  theme: {
    mode: 'day' // 'day' | 'night'
  },

  timeline: [
    {
      id: 't1',
      date: 'February 2022',
      title: 'The Day We Met',
      description:
        'A crowded room, a chance glance, and somehow the rest of the world went quiet. I still remember exactly what you were wearing.',
      image: PLACEHOLDER_PHOTO('memory-1')
    },
    {
      id: 't2',
      date: 'June 2022',
      title: 'Our First Trip',
      description:
        'Three days, one tiny car, and a hundred wrong turns that somehow all felt right because you were next to me.',
      image: PLACEHOLDER_PHOTO('memory-2')
    },
    {
      id: 't3',
      date: 'December 2022',
      title: 'Meeting the Family',
      description:
        'You walked in nervous and walked out already part of the family group chat. Everyone loved you as fast as I did.',
      image: PLACEHOLDER_PHOTO('memory-3')
    },
    {
      id: 't4',
      date: 'February 2024',
      title: 'Two Years, One Promise',
      description:
        'Under the same string lights from our first date, I promised you forever — and meant it more than I have ever meant anything.',
      image: PLACEHOLDER_PHOTO('memory-4')
    }
  ],

  gallery: [
    { id: 'g1', src: PLACEHOLDER_PHOTO('gallery-1', 700, 900), category: 'travel', caption: 'Sunset chasing' },
    { id: 'g2', src: PLACEHOLDER_PHOTO('gallery-2', 700, 700), category: 'us', caption: 'Lazy Sunday' },
    { id: 'g3', src: PLACEHOLDER_PHOTO('gallery-3', 700, 950), category: 'travel', caption: 'That little café' },
    { id: 'g4', src: PLACEHOLDER_PHOTO('gallery-4', 700, 800), category: 'family', caption: 'First Diwali together' },
    { id: 'g5', src: PLACEHOLDER_PHOTO('gallery-5', 700, 900), category: 'us', caption: 'Rainy day, no plans' },
    { id: 'g6', src: PLACEHOLDER_PHOTO('gallery-6', 700, 700), category: 'travel', caption: 'Mountains, finally' }
  ],

  videos: [
    {
      id: 'v1',
      title: 'Our Trip Recap',
      thumbnail: PLACEHOLDER_PHOTO('video-1', 800, 500),
      videoUrl: ''
    },
    {
      id: 'v2',
      title: 'Happy Birthday, Love',
      thumbnail: PLACEHOLDER_PHOTO('video-2', 800, 500),
      videoUrl: ''
    }
  ],

  letters: [
    {
      id: 'l1',
      title: 'For the day you feel low',
      date: 'Whenever you need it',
      body:
        'My love, if you are reading this, take a breath. Whatever today has been, it does not change one thing: you are the softest, strongest, most wonderful person I know. I am so proud of you, and I am not going anywhere. — Always yours.'
    },
    {
      id: 'l2',
      title: 'One Year In',
      date: 'February 2023',
      body:
        'A year ago I did not know your favourite song or how you take your tea. Now I cannot imagine my life without either. Thank you for choosing me, every single day. Here is to a hundred more years of this.'
    }
  ],

  quotes: [
    { id: 'q1', text: 'You are my sun, my moon, and all of my stars.', author: 'E.E. Cummings' },
    { id: 'q2', text: 'I have found the one whom my soul loves.', author: 'Song of Solomon' },
    { id: 'q3', text: 'Whatever our souls are made of, his and mine are the same.', author: 'Emily Brontë' }
  ],

  playlist: [
    { id: 'p1', title: 'Add your song', artist: 'From the Admin panel', src: '', cover: PLACEHOLDER_PHOTO('album-1', 500, 500) }
  ],

  countdownDate: '2022-02-14T18:30:00',

  futureDreams: [
    { id: 'd1', title: 'Our Dream Home', description: 'A little house, a big kitchen, and a garden full of roses.', icon: '🏡' },
    { id: 'd2', title: 'See the World', description: 'Japan in cherry blossom season is non-negotiable.', icon: '✈️' },
    { id: 'd3', title: 'Grow Old Together', description: 'Rocking chairs, bad jokes, and still holding hands at 80.', icon: '💍' }
  ],

  footerMessage: 'Made with every beat of my heart, for the one who owns all of it.',

  adminPassword: 'ourlovestory'
}
