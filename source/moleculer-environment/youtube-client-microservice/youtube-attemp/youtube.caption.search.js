require('module-alias/register')

const { trace } = require('@helper')
const { interceptXHR } = require('./youtube.xhr')

const R = require('ramda')

const urls = [
  // 'https://www.youtube.com/watch?v=dYaznuhA4Io', // Target video with Kathleenlights
  'https://www.youtube.com/watch?v=Kuk07Y8DdAY', // Target video with Mariah Leonard
  // 'https://www.youtube.com/watch?v=esX7SFtEjHg', // Live video
  // 'https://www.youtube.com/watch?v=0r6C3z3TEKw', // Captionless video
]

const text = `
Hello hello! Just poppin' in to show you how I achieve my signature look. This is the look I always go to anytime I don't want to worry about my makeup at all, I use a set of techniques/placements that I know are always flattering no matter what tones I use on the face. Hope you enjoy and learn something!

PRODUCTS USED:
bareMinerals Original Liquid Mineral Foundation (Fairly Light)
MUFE Redness Corrector (I use this just to add more green to my foundations as my undertone is olive/green-yellow)
NARS Soft Matte Concealer (Vanilla)
Laura Mercier Secret Brightening Duo (2N)
Pat McGrath Undereye Brightening Powder
MUFE Powder Foundation (Y225)
Auric Glow Lust Radiant Luminizer (Selenite)
Dior Diorskin Nude Air Tan Powder
NARS Ibiza Powder Highlighter
Pat McGrath Dark Matter Single Shadow
Charlotte Tilbury Dolce Vita Palette
Lancome Lash Idole Mascara
Merit Beauty Clean Lash Mascara
MAC Stylized Big Boost Fiber Brow Gel
KKW Beauty Blush Lip Liner
KKW Beauty Classic Kim Lipstick

INQUIRIES:
mariah@infagency.com

INSTAGRAM:
http://www.instagram.com/mariahlleonard

TWITTER:
http://www.twitter.com/mariahlleonard

DISCLAIMER:
This video is not sponsored. This video does not contain a paid product placement or ad. All opinions are solely my own. Always do your own research and testing before purchasing any product.

All content across my platforms is conceptualized, shot, and edited by me. Any similarities in content and branding are coincidental unless stated otherwise.
`

/**
 * 
 * @param {String} description The desription of the Video
 * @returns An array of words from the description that start 
 * with capital letters
 */
const findSupposedKeywords =
  (description) =>
    description
      .split(' ')
      .filter(word => /^[A-Z]/.test(word))
      .filter(word => !/.*(f|ht)tp(s?).*/.test(word))
      .map(word => word.replace(/[\W]{1,}/, ''))

const uniqueWords = (collection) => Array.from(new Set(collection))

const getKeywords = (txt) => R.compose(uniqueWords, findSupposedKeywords)(txt)

const readDesription = (path) => path

urls.map(
  url => interceptXHR(
    url,
    // [
    //   // 'Hello',
    //   // 'PRODUCTS',

    //   'MUFE',
    //   'NARS',
    //   'Laura',
    //   'Pat',
    //   'MUFE',
    //   'Auric',
    //   'Dior',
    //   'NARS',
    //   'Pat',
    //   'Charlotte',
    //   'Lancome',
    //   'Merit',
    //   'MAC',
    //   'KKW',
    //   'KKW',

    //   // 'INQUIRIES',
    //   // 'INSTAGRAM',
    //   // 'TWITTER',
    //   // 'DISCLAIMER',
    //   // 'This',
    //   // 'All'
    // ]
    // [
    //   'Original', 'Liquid', 'Mineral', 'Foundation', 'Fairly', 'Light',
    //   'MUFE', 'Redness', 'Corrector',
    //   'NARS', 'Soft', 'Matte', 'Concealer', 'Vanilla',
    //   'Laura', 'Mercier', 'Secret', 'Brightening', 'Duo',
    //   'Pat', 'McGrath', 'Undereye', 'Brightening', 'Powder',
    //   'MUFE', 'Powder', 'Foundation',
    //   'Auric', 'Glow', 'Lust', 'Radiant', 'Luminizer', 'Selenite',
    //   'Dior', 'Diorskin', 'Nude', 'Air', 'Tan', 'Powder',
    //   'NARS', 'Ibiza', 'Powder', 'Highlighter',
    //   'Pat', 'McGrath', 'Dark', 'Matter', 'Single', 'Shadow',
    //   'Charlotte', 'Tilbury', 'Dolce', 'Vita', 'Palette',
    //   'Lancome', 'Lash', 'Idole', 'Mascara',
    //   'Merit', 'Beauty', 'Clean', 'Lash', 'Mascara',
    //   'MAC', 'Stylized', 'Big', 'Boost', 'Fiber', 'Brow', 'Gel',
    //   'KKW', 'Beauty', 'Blush', 'Lip', 'Liner',
    //   'KKW', 'Beauty', 'Classic', 'Kim', 'Lipstick'
    // ]

    trace(getKeywords(text))
  )
)
