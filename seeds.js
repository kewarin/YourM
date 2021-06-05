var mongoose = require('mongoose');
var movies = require('./models/movie');

var data = [
    {
        name:'Avengers Endgame' , 
        image: 'https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/88997/93196/Avengers-Endgame-Final-Style-Poster-buy-original-movie-posters-at-starstills__42370.1563973516.jpg?c=2',
        desc: 'After Thanos, an intergalactic warlord, disintegrates half of the universe, the Avengers must reunite and assemble again to reinvigorate their trounced allies and restore balance.',
        trailer : 'https://www.youtube.com/embed/TcMBFSGVi1c',
        genre: 'Action/Sci-fi/Fantasy',
        runtime: '3h 2m',
        score: 8.4
    },
    {
        name:'Titanic' , 
        image: 'https://cdn.shopify.com/s/files/1/1416/8662/products/titanic_1997_styleA_original_film_art_d26e81c0-1b87-4076-9da4-9fcdc0389ea5_1200x.jpg?v=1607475298',
        desc: 'Seventeen-year-old Rose hails from an aristocratic family and is set to be married. When she boards the Titanic, she meets Jack Dawson, an artist, and falls in love with him.',
        trailer : 'https://www.youtube.com/embed/kVrqfYjkTdQ',
        genre: 'Drama',
        runtime: '3h 30m',
        score: 7.8
    },
    {
        name:'Aladdin' , 
        image: 'https://images-na.ssl-images-amazon.com/images/I/91WNnQZdybL._AC_SL1500_.jpg',
        desc: 'Aladdin, a kind thief, woos Jasmine, the princess of Agrabah, with the help of Genie. When Jafar, the grand vizier, tries to usurp the king, Jasmine, Aladdin and Genie must stop him from succeeding.',
        trailer : 'https://www.youtube.com/embed/foyufD52aog',
        genre: 'Fantasy',
        runtime: '2h 8m',
        score: 6.9
    },
    {
        name:'Black Panther' , 
        image: 'https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg',
        desc: 'After his father is death, T.Challa returns home to Wakanda to inherit his throne. However, a powerful enemy related to his family threatens to attack his nation.',
        trailer : 'https://www.youtube.com/embed/xjDjIWPwcPU',
        genre: 'Action/Sci-fi/Fantasy',
        runtime: '2h 15m',
        score: 7.3
    },
    {
        name:'The call of the wild' , 
        image: 'https://images-na.ssl-images-amazon.com/images/I/817rgU-j71L._AC_SL1333_.jpg',
        desc: 'Buck is a big-hearted dog whose blissful domestic life gets turned upside down when he is suddenly uprooted from his California home and transplanted to the exotic wilds of the Alaskan Yukon in the 1890s. As the newest rookie on a mail-delivery dog sled team, Buck experiences the adventure of a lifetime as he ultimately finds his true place in the world.',
        trailer : 'https://www.youtube.com/embed/5P8R2zAhEwg',
        genre: 'Drama',
        runtime: '1h 40m',
        score: 6.8
    },
    {
        name:'Sicario' , 
        image: 'https://cdn.shopify.com/s/files/1/0969/9128/products/Art_Poster_-_Sicario_-_Tallenge_Hollywood_Collection_415ea107-7ebc-416f-8dd2-3fa9f0462331.jpg?v=1505078988',
        desc: 'Sicario ([si. ˈka. ɾjo], Spanish for "hitman") is a 2015 action thriller film directed by Denis Villeneuve, written by Taylor Sheridan and starring Emily Blunt, Benicio del Toro, and Josh Brolin.',
        trailer : 'https://www.youtube.com/embed/sIMChzE_aCo',
        genre: 'Action/Thriller/Drama',
        runtime: '2h 1m',
        score: 7.1
    },
    {
        name:'Time is the enemy' , 
        image: 'https://cdna.artstation.com/p/assets/images/images/024/040/318/4k/nima-neemz-nakhshab-1917-copy.jpg?1581114682',
        desc: 'During World War I, two British soldiers -- Lance Cpl. Schofield and Lance Cpl. Blake -- receive seemingly impossible orders. In a race against time, they must cross over into enemy territory to deliver a message that could potentially save 1,600 of their fellow comrades -- including Blake is own brother.',
        trailer : 'https://www.youtube.com/embed/UcmZN0Mbl04',
        genre: 'Thriller',
        runtime: '1h 35m',
        score: 6.9
    },
    {
        name:'Inception' , 
        image: 'https://maxcdn.icons8.com/app/uploads/2019/05/movie-poster-designs.jpg',
        desc: 'Cobb steals information from his targets by entering their dreams. Saito offers to wipe clean Cobb is criminal history as payment for performing an inception on his sick competitor is son.',
        trailer : 'https://www.youtube.com/embed/YoHD9XEInc0',
        genre: 'Action/Sci-fi/Thriller/Drama',
        runtime: '2h 42m',
        score: 8.6
    },
    {
        name:'Beauty and the beast' , 
        image: 'https://maxcdn.icons8.com/app/uploads/2019/05/film-poster-graphic-design.jpg',
        desc: 'Belle, a village girl, embarks on a journey to save her father from a creature that has locked him in his dungeon. Eventually, she learns that the creature is an enchanted prince who has been cursed.',
        trailer : 'https://www.youtube.com/embed/e3Nl_TCQXuw',
        genre: 'Fantasy',
        runtime: '2h 19m',
        score: 7.1
    }

];

function seedDB(){
    movies.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Remove DB completed');
            data.forEach(function (seed) {
                movies.create(seed, function (err, movie){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('New Data added');
                     }
                });
            });
        }
    });
 
}
module.exports = seedDB;