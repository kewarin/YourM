var mongoose = require('mongoose');
var movies = require('./models/movie');
var Cinemas = require('./models/cinema.js');
var Liked = require('./models/liked.js');
var User = require('./models/user.js');

var data = [
    {
        name: 'Avengers Endgame',
        image: 'https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/88997/93196/Avengers-Endgame-Final-Style-Poster-buy-original-movie-posters-at-starstills__42370.1563973516.jpg?c=2',
        desc: 'After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.',
        trailer: 'https://www.youtube.com/embed/TcMBFSGVi1c',
        genre: 'Action/Sci-fi/Fantasy',
        runtime: '3h 2m',
        type:'showing',
        score: 8.4
    },
    {
        name: 'Titanic',
        image: 'https://cdn.shopify.com/s/files/1/1416/8662/products/titanic_1997_styleA_original_film_art_d26e81c0-1b87-4076-9da4-9fcdc0389ea5_1200x.jpg?v=1607475298',
        desc: 'Seventeen-year-old Rose hails from an aristocratic family and is set to be married. When she boards the Titanic, she meets Jack Dawson, an artist, and falls in love with him.',
        trailer: 'https://www.youtube.com/embed/kVrqfYjkTdQ',
        genre: 'Drama',
        runtime: '3h 30m',
        type:'showing',
        score: 7.8
    },
    {
        name: 'Aladdin',
        image: 'https://images-na.ssl-images-amazon.com/images/I/91WNnQZdybL._AC_SL1500_.jpg',
        desc: 'Aladdin, a kind thief, woos Jasmine, the princess of Agrabah, with the help of Genie. When Jafar, the grand vizier, tries to usurp the king, Jasmine, Aladdin and Genie must stop him from succeeding.',
        trailer: 'https://www.youtube.com/embed/foyufD52aog',
        genre: 'Fantasy',
        runtime: '2h 8m',
        type:'showing',
        score: 6.9
    },
    {
        name: 'Black Panther',
        image: 'https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg',
        desc: 'After his father is death, T.Challa returns home to Wakanda to inherit his throne. However, a powerful enemy related to his family threatens to attack his nation.',
        trailer: 'https://www.youtube.com/embed/xjDjIWPwcPU',
        genre: 'Action/Sci-fi/Fantasy',
        runtime: '2h 15m',
        type:'showing',
        score: 7.3
    },
    {
        name: 'The call of the wild',
        image: 'https://images-na.ssl-images-amazon.com/images/I/817rgU-j71L._AC_SL1333_.jpg',
        desc: 'Buck is a big-hearted dog whose blissful domestic life gets turned upside down when he is suddenly uprooted from his California home and transplanted to the exotic wilds of the Alaskan Yukon in the 1890s. As the newest rookie on a mail-delivery dog sled team, Buck experiences the adventure of a lifetime as he ultimately finds his true place in the world.',
        trailer: 'https://www.youtube.com/embed/5P8R2zAhEwg',
        genre: 'Drama',
        runtime: '1h 40m',
        type:'showing',
        score: 6.8
    },
    {
        name: 'Sicario',
        image: 'https://cdn.shopify.com/s/files/1/0969/9128/products/Art_Poster_-_Sicario_-_Tallenge_Hollywood_Collection_415ea107-7ebc-416f-8dd2-3fa9f0462331.jpg?v=1505078988',
        desc: 'Sicario ([si. ˈka. ɾjo], Spanish for "hitman") is a 2015 action thriller film directed by Denis Villeneuve, written by Taylor Sheridan and starring Emily Blunt, Benicio del Toro, and Josh Brolin.',
        trailer: 'https://www.youtube.com/embed/sIMChzE_aCo',
        genre: 'Action/Thriller/Drama',
        runtime: '2h 1m',
        type:'showing',
        score: 7.1
    },
    {
        name: 'Time is the enemy',
        image: 'https://cdna.artstation.com/p/assets/images/images/024/040/318/4k/nima-neemz-nakhshab-1917-copy.jpg?1581114682',
        desc: 'During World War I, two British soldiers -- Lance Cpl. Schofield and Lance Cpl. Blake -- receive seemingly impossible orders. In a race against time, they must cross over into enemy territory to deliver a message that could potentially save 1,600 of their fellow comrades -- including Blake is own brother.',
        trailer: 'https://www.youtube.com/embed/UcmZN0Mbl04',
        genre: 'Thriller',
        runtime: '1h 35m',
        type:'showing',
        score: 6.9
    },
    {
        name: 'Inception',
        image: 'https://maxcdn.icons8.com/app/uploads/2019/05/movie-poster-designs.jpg',
        desc: 'Cobb steals information from his targets by entering their dreams. Saito offers to wipe clean Cobb is criminal history as payment for performing an inception on his sick competitor is son.',
        trailer: 'https://www.youtube.com/embed/YoHD9XEInc0',
        genre: 'Action/Sci-fi/Thriller/Drama',
        runtime: '2h 42m',
        type:'showing',
        score: 8.6
    },
    {
        name: 'Beauty and the beast',
        image: 'https://maxcdn.icons8.com/app/uploads/2019/05/film-poster-graphic-design.jpg',
        desc: 'Belle, a village girl, embarks on a journey to save her father from a creature that has locked him in his dungeon. Eventually, she learns that the creature is an enchanted prince who has been cursed.',
        trailer: 'https://www.youtube.com/embed/e3Nl_TCQXuw',
        genre: 'Fantasy',
        runtime: '2h 19m',
        type:'showing',
        score: 7.1
    },
    {
        name: 'Venom',
        image: 'https://www.joblo.com/newsimages1/venom-poster-6-913.jpg',
        desc: 'While trying to take down Carlton, the CEO of Life Foundation, Eddie, a journalist, investigates experiments of human trials. Unwittingly, he gets merged with a symbiotic alien with lethal abilities.',
        trailer: 'https://www.youtube.com/embed/u9Mv98Gr5pY',
        genre: 'Action/Sci-fi',
        runtime: '2h 20m',
        type:'coming',
        score: 0
    },
    {
        name: 'The shape of water',
        image: 'https://cdn.shopify.com/s/files/1/0969/9128/products/The_Shape_Of_Water_-_Tallenge_Hollywood_Movie_Poster_Collection_28c21638-1466-4ae7-bde1-42d1cf2812cb.jpg?v=1570086168',
        desc: 'Elisa, a lonely janitor, stumbles upon an amphibious creature that is held captive in a secret research facility. She then develops a unique relationship with the creature.',
        trailer: 'https://www.youtube.com/embed/XFYWazblaUA',
        genre: 'Fantasy',
        runtime: '2h 3m',
        type:'coming',
        score: 0
    },
    {
        name: 'Archenemy',
        image: 'https://www.joblo.com/assets/images/joblo/news/2020/10/archenemyposter.jpg',
        desc: 'While trying to take down Carlton, the CEO of Life Foundation, Eddie, a journalist, investigates experiments of human trials. Unwittingly, he gets merged with a symbiotic alien with lethal abilities.',
        trailer: 'https://www.youtube.com/embed/7EO2IhDOSkE',
        genre: 'Action',
        runtime: '1h 30m',
        type:'coming',
        score: 0
    }
];

var cData = [
    {
        name: "ICON CINECONIC",
        image: "https://iconsiam-aws-s3-prod.s3.ap-southeast-1.amazonaws.com/assets/JVF1EKHFEIRCG_01.jpg",
        address: "299 Soi Charoen Nakhon 5 Charoen Nakhon Road Khlong Ton Sai, Khlong San Bangkok 10600",
        seat: [[0, 0, 0, 0], [0, 0, 0, 0]],
        time: [11, 14, 17, 20],
    },
    {
        name: "Cineplex Rama II",
        image: "https://cdn.majorcineplex.com/uploads/content/images/PARAGON%20Cineplex_0203.jpg",
        address: "128 Moo 6, Rama 2 Central Plaza Rama 2 Rd, Bangkok 10150",
        seat: [[0, 0, 0, 0], [0, 0, 0, 0]],
        time: [10, 13, 16, 19, 22],
    },
    {
        name: "Paragon Cineplex",
        image: "https://9968c6ef49dc043599a5-e151928c3d69a5a4a2d07a8bf3efa90a.ssl.cf2.rackcdn.com/649514-1.jpg",
        address: "991 Siam Paragon Khwaeng Pathum Wan, Khet Pathum Wan, Krung Thep Maha Nakhon 10330",
        seat: [[0, 0, 0, 0], [0, 0, 0, 0]],
        time: [, 13, 15, 18, 21],
    },
    {
        name: "Cineplex Rama IV",
        image: "https://9968c6ef49dc043599a5-e151928c3d69a5a4a2d07a8bf3efa90a.ssl.cf2.rackcdn.com/649514-1.jpg",
        address: "991 Siam Paragon Khwaeng Pathum Wan, Khet Pathum Wan, Krung Thep Maha Nakhon 10330",
        seat: [[0, 0, 0, 0], [0, 0, 0, 0]],
        time: [, 13, 15, 18, 21],
    },
    {
        name: "Cineplex Rama III",
        image: "https://9968c6ef49dc043599a5-e151928c3d69a5a4a2d07a8bf3efa90a.ssl.cf2.rackcdn.com/649514-1.jpg",
        address: "991 Siam Paragon Khwaeng Pathum Wan, Khet Pathum Wan, Krung Thep Maha Nakhon 10330",
        seat: [[0, 0, 0, 0], [0, 0, 0, 0]],
        time: [, 13, 15, 18, 21],
    }
];




function seedDB() {
    movies.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Remove DB completed');
            data.forEach(function (seed) {
                movies.create(seed, function (err, movie) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Movies Data added');
                    }
                });
            });
        }
    });
    Cinemas.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Remove Cinemas Complete");
            cData.forEach(function (seed) {
                Cinemas.create(seed, function (err, cinema) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Cinemas data added');
                    }
                });
            });
        }
    });
    Liked.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            User.updateMany({ likes: [] }, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Remove Liked Complete");
                }
            });
        }
    });
}

module.exports = seedDB;