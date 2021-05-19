var mongoose = require('mongoose');
var movies = require('./models/movie');
var top5 = require('./models/top5');

var data = [
    {
        name:'Avengers Endgame' , 
        image: 'https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/88997/93196/Avengers-Endgame-Final-Style-Poster-buy-original-movie-posters-at-starstills__42370.1563973516.jpg?c=2',
        desc: 'XXXXX'
    },
    {
        name:'Titanic' , 
        image: 'https://cdn.shopify.com/s/files/1/1416/8662/products/titanic_1997_styleA_original_film_art_d26e81c0-1b87-4076-9da4-9fcdc0389ea5_1200x.jpg?v=1607475298',
        desc: 'XXXXX'
    },
    {
        name:'Aladdin' , 
        image: 'https://images-na.ssl-images-amazon.com/images/I/91WNnQZdybL._AC_SL1500_.jpg',
        desc: 'XXXXX'
    },
    {
        name:'Black Panther' , 
        image: 'https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg',
        desc: 'XXXXX'
    },
    {
        name:'The call of the wild' , 
        image: 'https://images-na.ssl-images-amazon.com/images/I/817rgU-j71L._AC_SL1333_.jpg',
        desc: 'XXXXX'
    },
    {
        name:'Sicario' , 
        image: 'https://cdn.shopify.com/s/files/1/0969/9128/products/Art_Poster_-_Sicario_-_Tallenge_Hollywood_Collection_415ea107-7ebc-416f-8dd2-3fa9f0462331.jpg?v=1505078988',
        desc: 'XXXXX'
    },
    {
        name:'Time is the enemy' , 
        image: 'https://cdna.artstation.com/p/assets/images/images/024/040/318/4k/nima-neemz-nakhshab-1917-copy.jpg?1581114682',
        desc: 'XXXXX'
    },
    {
        name:'Inception' , 
        image: 'https://maxcdn.icons8.com/app/uploads/2019/05/movie-poster-designs.jpg',
        desc: 'XXXXX'
    },
    {
        name:'Beauty and the beast' , 
        image: 'https://maxcdn.icons8.com/app/uploads/2019/05/film-poster-graphic-design.jpg',
        desc: 'XXXXX'
    }

];
var data5 = [
    {
        name:'Avengers Endgame' , 
        image: 'https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1280x1280/products/88997/93196/Avengers-Endgame-Final-Style-Poster-buy-original-movie-posters-at-starstills__42370.1563973516.jpg?c=2',
    },
    {
        name:'Titanic' , 
        image: 'https://cdn.shopify.com/s/files/1/1416/8662/products/titanic_1997_styleA_original_film_art_d26e81c0-1b87-4076-9da4-9fcdc0389ea5_1200x.jpg?v=1607475298',
    },
    {
        name:'Aladdin' , 
        image: 'https://images-na.ssl-images-amazon.com/images/I/91WNnQZdybL._AC_SL1500_.jpg',
    },
    {
        name:'Black Panther' , 
        image: 'https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg',
    },
    {
        name:'The call of the wild' , 
        image: 'https://images-na.ssl-images-amazon.com/images/I/817rgU-j71L._AC_SL1333_.jpg',
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
    top5.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Remove DB completed');
            data5.forEach(function (seed) {
                top5.create(seed, function (err, top){
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