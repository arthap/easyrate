// MEAN Stack RESTful API Tutorial - Contact List App

var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var app = express();
var mandrill = require('node-mandrill');
var md5 = require('md5');
// var Mailgun = require('mailgun-js');
// var nodemailer = require('nodemailer');
// var mg = require('nodemailer-mailgun-transport');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var async = require('async');
var crypto = require('crypto');
var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var HttpError = require('./error').HttpError;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(require('./middleware/sendHttpError'));

 var __rootDir="public"
app.use('/css', express.static(__rootDir + '/css'));
app.use('/js', express.static(__rootDir + '/js'));
app.use('/less', express.static(__rootDir + '/less'));
app.use('/fonts', express.static(__rootDir + '/fonts'));
app.use('/img', express.static(__rootDir + '/img'));
app.use('/images', express.static(__rootDir + '/images'));
app.use('/html', express.static(__rootDir + '/html'));
app.use('/*/css', express.static(__rootDir + '/css'));
app.use('/*/js', express.static(__rootDir + '/js'));
app.use('/*/less', express.static(__rootDir + '/less'));
app.use('/*/fonts', express.static(__rootDir + '/fonts'));
app.use('/*/img', express.static(__rootDir + '/img'));
app.use('/*/images', express.static(__rootDir + '/images'));
app.use('/*/html', express.static(__rootDir + '/html'));



//
// var express = require('express');
// var bodyParser = require('body-parser');
// var app = express();
//var mongojs = require('mongojs');
//var db = mongojs('contactlist', ['contactlist']);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.use(session({ secret: 'session secret key' }));
app.use(flash());
// app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
var ip = process.env.IP || '127.0.0.1';
var port = process.env.PORT || 8080;
var mysql = require('mysql');
var connection = mysql.createConnection({
    // connectionLimit : 10,

    host:  ip || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    user: 'newuser'||'root'||'adminv5U5hn4' ,
    password: 'password' ||'root'|| 'qt-ph4iJS-JW',
    database: 'easytes'
    // host     :  '127.2.204.130',
    // user     : 'adminv5U5hn4',
    // password : 'qt-ph4iJS-JW',
    // database : 'easytest'

    /*// host     :  '127.6.74.2',
     // user     : 'adminW2N7hPi',
     // password : 'tN5Zz2PsYb65',
     // database : 'easyratenode'*/
});
var pool = mysql.createPool({
    connectionLimit: 10,
    host: ip  || 'localhost',
    user: 'newuser' || 'root',
    password: 'password' || 'root',
    database: 'easytes'
    // host     :  '127.2.204.130',
    // user     : 'adminv5U5hn4',
    // password : 'qt-ph4iJS-JW',
    // database : 'easytest'
    // host     :  '127.6.74.2',
    // user     : 'adminW2N7hPi',
    // password : 'tN5Zz2PsYb65',
    // database : 'easyratenode'
});

// pool.getConnection(function(err, connection) {
//   // connected! (unless `err` is set)
// });
//connection.connect();
//connection.query('SELECT * from labels', function(err, rows, fields) {
//  if (!err)
//    console.log('The solution is: ', rows);
//  else
//    console.log('Error while performing Query.');
//});
//
//connection.end();


connection.on('close', function (err) {
    if (err) {
        // Oops! Unexpected closing of connection, lets reconnect back.
        connection = mysql.createConnection(connection.config);
    } else {
        console.log('Connection closed normally.');
    }
});

app.get('/email', function (req, res) {

    // sendgrid.send({
    //   to: 'artiom.sar@gmail.com',
    //   from: 'anna@contoso.com',
    //   subject: 'test mail',
    //   text: 'This is a sample email message.'
    // },function (err,json) {
    //   if(err){return console.error(err);}
    //   console.log(json);
    // });
    var options = {
        auth: {
            api_user: 'vgevogyan@gmail.com',
            api_key: 'vahe1975'
        }
    }

    var client = nodemailer.createTransport(sgTransport(options));

    var email = {
        from: 'easyratetest@gmail.com',
        to: 'artiom.sar@gmail.com',
        subject: 'Hello',
        text: 'Hello world',
        html: '<b>Hello world</b>'
    };

    client.sendMail(email, function (err, info) {
        if (err) {
            // console.log(error);
        }
        else {
            console.log('Message sent: ' + info.response);
            res.send('ok-your e-mail was sending')
        }
    });
});

app.post('/GetProductDetailById/:id', function (req, res, next) {


    var key = req.params.id;
    var queryString = 'SELECT * FROM ey_product  WHERE  ID = ?';

    connection.query(queryString, [key], function (err, productDetail) {
        if (!err) {
            console.log('The solution is: ', productDetail);
            res.json(productDetail);
        }


        else
            console.log('Error while performing Query.');
        //connection.release();
        //connection.end();

    });

});
app.post('/GetCategoryLvL1', function (req, res, next) {

    var queryString = 'SELECT * FROM rf_category_lvl1';

    connection.query(queryString, function (err, rf_category_lvl1) {
        if (!err) {
            console.log('The solution is: ', rf_category_lvl1);
            res.json(rf_category_lvl1);
        }


        else
            console.log('Error while performing Query.');
        //connection.release();
        //connection.end();

    });

});
app.post('/GetCategoryLvL2', function (req, res, next) {
    var queryString = 'SELECT * FROM rf_category_lvl2';

    connection.query(queryString, function (err, rf_category_lvl2) {
        if (!err) {
            console.log('The solution is: ', rf_category_lvl2);
            res.json(rf_category_lvl2);
        }


        else
            console.log('Error while performing Query.');
        //connection.release();
        //connection.end();

    });

});
app.post('/GetFollowProductByUserId/:userId', function (req, res, next) {


    var key = req.params.userId;
    var queryString = 'SELECT * FROM ey_user_followup where USER_ID=' + key;

    connection.query(queryString, function (err, followProduct) {
        if (!err) {
            console.log('The solution is: ', followProduct);
            res.json(followProduct);
        }


        else
            console.log('Error while performing Query.');
        //connection.release();
        //connection.end();

    });

});
app.post('/GetManufacturerId/:name', function (req, res, next) {


    var key = req.params.id;
    var queryString = 'SELECT * FROM ey_manufacturers';

    connection.query(queryString, function (err, productDetail) {
        if (!err) {
            console.log('The solution is: ', productDetail);
            res.json(productDetail);
        }


        else
            console.log('Error while performing Query.');
        //connection.release();
        //connection.end();

    });

});
app.post('/GetBrandsId/:name', function (req, res, next) {


    var key = req.params.name;
    var queryString = 'SELECT NAME,ID FROM ey_brands ';

    connection.query(queryString, [key], function (err, productDetail) {
        if (!err) {
            console.log('The solution is: ', productDetail);
            res.json(productDetail);
        }


        else
            console.log('Error while performing Query.');
        //connection.release();
        //connection.end();

    });

});
app.post('/getProductList', function (req, res) {
    // var key = '%'+req.params.searchingText+'%';
    var term = [];
    var sqlLike = "";
    var pageNumber = parseInt(req.body.pageNumber);
    var limit = 10;
    var firstIndex = 0;
    var total;
    var index = req.body.pageNumber;
    var categoryId = req.body.categoryId;
    var seachByCategoryId = ""
    var categoryJoin = "";
    if (categoryId >= 0) {
        seachByCategoryId = " AND ey_product_category.CATEGORY_ID=" + categoryId + "";
        categoryJoin = "left join ey_product_category on ey_product_category.PRODUCT_ID = ey_product.ID"
    }

    if (pageNumber > 0) {
        firstIndex = pageNumber * 10;
        limit = +firstIndex + 10;

    }

    term = req.body.searchingText.split(" ");
    for (var i = 0; i < term.length; i++) {
        term[i];
        console.log(term[i]);
        if (term.length > 1) {
            var and = "and "
            if (term.length - 1 === i) {
                // NAME LIKE '%art%' or DESCRIPTION LIKE '%art%' or SHORT_TEXT LIKE '%art%' and  NAME LIKE '%art%' or DESCRIPTION LIKE '%pro' or SHORT_TEXT LIKE '%product%'

                and = "";
            }
            sqlLike += "NAME LIKE '%" + term[i] + "%' or DESCRIPTION LIKE '%" + term[i] + "%' or SHORT_TEXT LIKE '%" + term[i] + "%' " + and
        }
        else {
            sqlLike += "NAME LIKE '%" + term[i] + "%' or DESCRIPTION LIKE '%" + term[i] + "%' or SHORT_TEXT LIKE '%" + term[i] + "%'"
        }
    }
    console.log(sqlLike);
    var key = req.params.searchingText;

    var queryString2 = "select count(*) as PRODUCT_ID from ey_product left join ey_product_resource on ey_product_resource.PRODUCT_ID = ey_product.ID " + categoryJoin + " where (" + sqlLike + ")" + seachByCategoryId + " AND `ey_product`.`STATUS`='1' AND `ey_product_resource`.`ORDER`='1' ";
   // var queryString = 'SELECT * FROM ey_product WHERE   NAME OR SHORT_TEXT OR DESCRIPTION = ? LIMIT 2';
    console.log(queryString2);
    connection.query(queryString2, function (error, count) {
        if (!error) {
            // console.log('The solution is: ', count);
            total = count[0].PRODUCT_ID;
            if (total - 1 === limit) {
                return;
            }
            if (total < limit) {
                limit = total - 1
            }

            var product = [];
            var queryString = "select * from ey_product left join ey_product_resource on ey_product_resource.PRODUCT_ID = ey_product.ID " + categoryJoin + " where (" + sqlLike + ")" + seachByCategoryId + " AND `ey_product`.`STATUS`='1' AND `ey_product_resource`.`ORDER`='1'  ORDER BY ey_product.ID LIMIT " + firstIndex + "," + 10;
            connection.query(queryString, function (err, product) {
                if (!err) {
                    console.log('The solution is product: ', product);

                    var data = {
                        'product': product,
                        'total': total,
                        'index': index
                    };

                    res.json(data);
                }


                else
                    console.log('Error while performing Query.');
                //connection.release();
                //connection.end();

            });
        }


        else
            console.log('Error while performing Query.');
        //connection.release();
        //connection.end();

    });


});
app.post('/getSimilarProductList', function (req, res) {
    // var key = '%'+req.params.searchingText+'%';
    var term = [];
    var sqlLike = "";
    var pageNumber = req.body.pageNumber;
    var limit = 10;
    var firstIndex = 0;
    var total;
    var index = req.body.pageNumber;
    var categoryId = req.body.categoryId;
    if (pageNumber > 0) {
        firstIndex = +pageNumber + 1;
        limit = +firstIndex + 2;
    }

    term = req.body.searchingText.split(" ");
    for (var i = 0; i < term.length; i++) {
        term[i];
        console.log(term[i]);
        if (term.length > 1) {
            var and = "and "
            if (term.length - 1 === i) {
                // NAME LIKE '%art%' or DESCRIPTION LIKE '%art%' or SHORT_TEXT LIKE '%art%' and  NAME LIKE '%art%' or DESCRIPTION LIKE '%pro' or SHORT_TEXT LIKE '%product%'

                and = "";
            }
            sqlLike += "NAME LIKE '%" + term[i] + "%' or DESCRIPTION LIKE '%" + term[i] + "%' or SHORT_TEXT LIKE '%" + term[i] + "%' " + and
        }
        else {
            sqlLike += "NAME LIKE '%" + term[i] + "%' or DESCRIPTION LIKE '%" + term[i] + "%' or SHORT_TEXT LIKE '%" + term[i] + "%'"
        }
    }
    console.log(sqlLike);
    var key = req.params.searchingText;

    var queryString2 = "select * from ey_product left join ey_product_resource on ey_product_resource.PRODUCT_ID = ey_product.ID left join ey_product_category on ey_product_category.PRODUCT_ID = ey_product.ID where (" + sqlLike + ") AND ey_product_category.CATEGORY_ID=" + categoryId + " AND ey_product_resource.`ORDER`=1 ";
    // var queryString = 'SELECT * FROM ey_product WHERE   NAME OR SHORT_TEXT OR DESCRIPTION = ? LIMIT 2';
    console.log(queryString2);
    connection.query(queryString2, function (error, count) {
        if (!error) {
            console.log('The solution is: ', count);
            total = count.length;
            if (total < limit) {
                limit = total
            }
            var queryString = "select * from ey_product left join ey_product_resource on ey_product_resource.PRODUCT_ID = ey_product.ID left join ey_product_category on ey_product_category.PRODUCT_ID = ey_product.ID where (" + sqlLike + ") AND ey_product_category.CATEGORY_ID=" + categoryId + " AND ey_product_resource.`ORDER`=1 ORDER BY ey_product.ID LIMIT " + firstIndex + "," + limit;
            connection.query(queryString, function (err, product) {
                if (!err) {
                    console.log('The solution is: ', product);

                    var data = {
                        'product': product,
                        'total': total,
                        'index': index
                    };

                    res.json(data);
                }


                else
                    console.log('Error while performing Query.');
                //connection.release();
                //connection.end();

            });
        }


        else
            console.log('Error while performing Query.');
        //connection.release();
        //connection.end();

    });


});
app.post('/GetProductDetailById/:id', function (req, res, next) {


    var key = req.params.id;
    var queryString = 'SELECT * FROM ey_product  WHERE  ID = ?';

    connection.query(queryString, [key], function (err, productDetail) {
        if (!err) {
            console.log('The solution is: ', productDetail);
            res.json(productDetail);
        }


        else
            console.log('Error while performing Query.');
        //connection.release();
        //connection.end();

    });

});
app.post('/GetProductDetailById/:id', function (req, res, next) {


    var key = req.params.id;
    var queryString = 'SELECT * FROM ey_product  WHERE  ID = ?';

    connection.query(queryString, [key], function (err, productDetail) {
        if (!err) {
            console.log('The solution is: ', productDetail);
            res.json(productDetail);
        }


        else
            console.log('Error while performing Query.');
        //connection.release();
        //connection.end();

    });

});
app.post('/GetProductListByManufacturerId/:manufacId', function (req, res, next) {


    var key = req.params.manufacId;
    var queryString = 'SELECT * FROM ey_product  WHERE  MANUFACTURER_ID = ?';

    connection.query(queryString, [key], function (err, product) {
        if (!err) {
            console.log('The productReviewDetail is: ', product);
            res.json(product);
        }


        else
            console.log('Error while performing Query.');
        //connection.release();
        //connection.end();

    });

});
app.post('/GetProductReviewtById/:id', function (req, res, next) {
    var quer="select a.ID,a.REVIEW_TEXT,"+
        " a.LIKES_CNT,a.DISLIKE_CNT,a.CREATOR_USER_ID ,"+
        " a.CURRENT_RATE,a.PRODUCT_ID,a.REVIEW_CAPTION,c.USERNAME,c.AVATAR,c.CURRENT_RATE AS USER_CURRENT_RATE,"+
        " GROUP_CONCAT(b.RESOURCE ORDER BY b.RESOURCE) AS ey_review_resource"+
        " FROM  ey_review a"+
        " LEFT JOIN ey_review_resource b ON a.ID = b.REVIEW_ID " +
        " LEFT JOIN ey_users c on c.ID = a.CREATOR_USER_ID where  a.PRODUCT_ID=?"+
        " GROUP BY  a.ID,a.REVIEW_TEXT,a.LIKES_CNT,a.DISLIKE_CNT,a.CREATOR_USER_ID ,"+
        " a.CURRENT_RATE,a.PRODUCT_ID,a.REVIEW_CAPTION" ;

    var key = req.params.id;
    var queryString = 'SELECT * FROM ey_review  WHERE  PRODUCT_ID = ?';
    // var queryString= "select * from ey_review left join ey_review_resource on ey_review_resource.REVIEW_ID = ey_review.ID where  ey_review.PRODUCT_ID=? ";
    var queryString = "select ey_review.ID,ey_review.REVIEW_TEXT,ey_review.LIKES_CNT,ey_review.DISLIKE_CNT,ey_review.CREATOR_USER_ID ,ey_review.CURRENT_RATE,ey_review.PRODUCT_ID,ey_review.REVIEW_CAPTION,ey_users.AVATAR from ey_review right join ey_users on ey_users.ID = ey_review.CREATOR_USER_ID where  ey_review.PRODUCT_ID=? ";

    connection.query(quer, [key], function (err, productReviewDetail) {
        if (!err) {
            console.log('The productReviewDetail is: ', productReviewDetail);
            res.json(productReviewDetail);
        }


        else
            console.log('Error while performing Query.');
        //connection.release();
        //connection.end();

    });

});
app.post('/GetReviewCountByCreatorId/:id', function (req, res, next) {
    var key = req.params.id;
    var queryString = 'SELECT  COUNT(CREATOR_USER_ID) AS reviewCount  FROM ey_review  WHERE  CREATOR_USER_ID = ?';
    connection.query(queryString, [key], function (err, review) {
        if (!err) {
            console.log('The productReviewDetail is: ', review[0]);
            res.json(review[0].reviewCount);
        }
        else
            console.log('Error while performing Query.');
    })
});
app.post('/GetAddProductCountByCreatorId/:id', function (req, res, next) {
    var key = req.params.id;
    var queryString = 'SELECT  COUNT(CREATER_USER_ID) AS addProductCount  FROM ey_product  WHERE  CREATER_USER_ID = ?';
    connection.query(queryString, [key], function (err, productCount) {
        if (!err) {
            console.log('The product count is: ', productCount[0]);
            res.json(productCount[0].addProductCount);
        }
        else
            console.log('Error while performing Query.');
    })
});
// app.post('/GetProductAndImageReviewtById/:id', function (req, res, next) {
//     var quer="select a.ID,a.REVIEW_TEXT,"+
//     "a.LIKES_CNT,a.DISLIKE_CNT,a.CREATOR_USER_ID ,"+
//     "a.CURRENT_RATE,a.PRODUCT_ID,a.REVIEW_CAPTION,"+
//     "GROUP_CONCAT(b.RESOURCE ORDER BY b.RESOURCE) AS ey_review_resource"+
//     "FROM  ey_review a+
//     "LEFT JOIN ey_review_resource b ON a.ID = b.REVIEW_ID " +
//     "LEFT JOIN ey_users c on c.ID = a.CREATOR_USER_ID where  a.PRODUCT_ID=?"+
//     "GROUP BY  a.ID,a.REVIEW_TEXT,a.LIKES_CNT,a.DISLIKE_CNT,a.CREATOR_USER_ID ,"+
//     "a.CURRENT_RATE,a.PRODUCT_ID,a.REVIEW_CAPTION" ;
//
//
//     var key = req.params.id;
//     var queryString = 'SELECT * FROM ey_review  WHERE  PRODUCT_ID = ?';
//     // var queryString= "select * from ey_review left join ey_review_resource on ey_review_resource.REVIEW_ID = ey_review.ID where  ey_review.PRODUCT_ID=? ";
//     var queryString = "select ey_review.ID,ey_review.REVIEW_TEXT," +
//         "ey_review.LIKES_CNT,ey_review.DISLIKE_CNT,ey_review.CREATOR_USER_ID ," +
//         "ey_review.CURRENT_RATE,ey_review.PRODUCT_ID,ey_review.REVIEW_CAPTION," +
//         "ey_users.AVATAR from ey_review" +
//         " right join ey_users on ey_users.ID = ey_review.CREATOR_USER_ID" +
//         " where  ey_review.PRODUCT_ID=? ";
//
//     connection.query(queryString, [key], function (err, productReviewDetail) {
//         if (!err) {
//             console.log('The productReviewDetail is: ', productReviewDetail);
//             res.json(productReviewDetail);
//         }
//
//
//         else
//             console.log('Error while performing Query.');
//         //connection.release();
//         //connection.end();
//
//     });
//
// });
app.post('/getProductDetaiExternalReviewList/:id', function (req, res, next) {


    var key = req.params.id;
    var queryString = 'SELECT * FROM ey_product_external_review  WHERE  PRODUCT_ID = ?';
    // var queryString= "select * from ey_review left join ey_review_resource on ey_review_resource.REVIEW_ID = ey_review.ID where  ey_review.PRODUCT_ID=? ";
    // var queryString= "select ey_product_external_review.ID,ey_review.REVIEW_TEXT,ey_review.LIKES_CNT,ey_review.DISLIKE_CNT,ey_review.CREATOR_USER_ID ,ey_review.CURRENT_RATE,ey_review.PRODUCT_ID,ey_review.REVIEW_CAPTION,ey_users.AVATAR from ey_review right join ey_users on ey_users.ID = ey_review.CREATOR_USER_ID where  ey_review.PRODUCT_ID=? ";

    connection.query(queryString, [key], function (err, externalReview) {
        if (!err) {
            console.log('The externalReview is: ', externalReview);
            res.json(externalReview);
        }


        else
            console.log('Error while performing Query.');
        //connection.release();
        //connection.end();

    });

});
app.post('/GetFollowProductById/:id', function (req, res, next) {


    var key = req.params.id;
    var queryString = 'SELECT * FROM ey_product  WHERE   ID = ?';
    var queryString = "select * from ey_product left join ey_product_resource on ey_product_resource.PRODUCT_ID = ey_product.ID where ey_product.ID=" + key + "  LIMIT 20";

    connection.query(queryString, function (err, product) {
        if (!err) {
            console.log('The productReviewDetail is: ', product);
            res.json(product);
        }


        else
            console.log('Error while performing Query.' + err);
        //connection.release();
        //connection.end();

    });

});

app.post('/GetProductDetailImageById/:id', function (req, res, next) {

    var key = req.params.id;
    var queryString = 'SELECT * FROM ey_product_resource WHERE PRODUCT_ID = ?';

    connection.query(queryString, [key], function (err, productImages) {
        if (!err) {
            console.log('The solution is: ', productImages);
            res.json(productImages);
        }

        else
            console.log('Error while performing Query.');
    });
});

app.post('/GetProductReviewImageById/:id', function (req, res, next) {

    var key = req.params.id;
    var queryString = 'SELECT * FROM ey_review_resource WHERE REVIEW_ID = ?';

    connection.query(queryString, [key], function (err, reviewImages) {
        if (!err) {
            console.log('The solution is: ', reviewImages);
            res.json(reviewImages);
        }

        else
            console.log('Error while performing Query.');
    });
});
app.post('/GetProductReviewCreatorNameById/:id', function (req, res, next) {

    var key = req.params.id;
    var queryString = 'SELECT USERNAME,CURRENT_RATE FROM ey_users WHERE ID = ?';

    connection.query(queryString, [key], function (err, creatorName) {
        if (!err) {
            console.log('The solution is: ', creatorName);
            res.json(creatorName);
        }

        else
            console.log('Error while performing Query.');
    });
});

app.post('/GetFollowProductDetailsByid/', function (req, res, next) {

    var productId = req.body.productId;
    var userId = req.body.userId;

    var queryString = 'SELECT * FROM ey_user_followup WHERE PRODUCT_ID = ? AND USER_ID=?';

    connection.query(queryString, [productId, userId], function (err, followProduct) {
        if (!err) {
            if (followProduct.length > 0) {
                return res.json({success: true});

            } else {
                return res.status(500);
            }
        }

        else
            console.log('Error while performing Query.');
    });


});
app.post('/DeleteFollowProduct', function (req, res, next) {
    var userId = req.body.userId;
    var productId = req.body.productId;
    var categoryId = req.body.categoryId;
    var values = [userId, productId, categoryId];
    var queryString = 'SELECT * FROM ey_user_followup WHERE PRODUCT_ID = ? AND USER_ID=?';


    connection.query(queryString, [productId, userId], function (err, followProduct) {
        if (!err) {
            if (followProduct.length > 0) {

                connection.query('DELETE FROM ey_user_followup WHERE PRODUCT_ID=? AND USER_ID=?', [productId, userId], function (error2, response) {
                    if (!error2) {
                        console.log('Increased the salary for Joe.');
                        return res.json({success: true});
                    }
                    else {

                        // console.log(error)

                        // var succes = true;
                    }
                });
            } else {
                connection.query('INSERT INTO ey_user_followup (USER_ID, PRODUCT_ID, CATEGORY_ID) VALUES(?,?,?)', values, function (error, response) {
                    if (!error) {
                        console.log('Increased the salary for Joe.');
                        return res.json({sucsess: true, err_desc: error});
                        // next();
                    }
                    else {

                        console.log(error)

                        // var succes = true;
                    }
                });
            }

        }

        else
            console.log('Error while performing Query.');
    });


});
app.post('/AddFollowProduct', function (req, res, next) {
    var userId = req.body.userId;
    var productId = req.body.productId;
    var categoryId = req.body.categoryId;
    var values = [userId, productId, categoryId];

    //Update a record.


    var queryString = 'SELECT * FROM ey_user_followup WHERE PRODUCT_ID = ? AND USER_ID=?';


    connection.query(queryString, [productId, userId], function (err, followProduct) {
        if (!err) {
            if (followProduct.length < 1) {

                connection.query('INSERT INTO ey_user_followup (USER_ID, PRODUCT_ID, CATEGORY_ID) VALUES(?,?,?)', values, function (error, response) {
                    if (!error) {
                        console.log('Increased the salary for Joe.');
                        return res.json({sucsess: true, err_desc: error});
                      }
                    else {
                        console.log(error);
                         next();
                        // var succes = true;
                    }
                });
            }
            else {

                connection.query('DELETE FROM ey_user_followup WHERE PRODUCT_ID=? AND USER_ID=?', [productId, userId], function (error2, response) {
                    if (!error2) {
                        console.log('Increased the salary for Joe.');
                        return res.json({success: true});
                    }
                    else {

                        // console.log(error)

                        // var succes = true;
                    }
                });
            }
        }

        else
            console.log('Error while performing Query.');
    });


});
app.post('/GetProductCategory/:productId', function (req, res, next) {

    var productId = req.params.productId;
    // var categoryName=req.body.categoryName;


    //SELECT a record.
    var queryString = 'SELECT * FROM ey_product_category  WHERE  PRODUCT_ID = ?';

    connection.query(queryString, [productId], function (err, ey_product_category) {

        if (!err) {
            console.log('Increased the salary for Joe.');
            return res.json(ey_product_category);
        }
        else {

            console.log(err)

            // var succes = true;
        }
    });


});

app.post('/DeleteImage', function (req, res, next) {
    // var productId=req.body.productId;
    var array = [];
    var array = req.body.imageUrlArray;

    // respond JSON object
    var _respond = {
        'status': 200
    };
    array.forEach(function (imageUrl, i, arr) {

        (function () {
            connection.query("DELETE FROM ey_product_resource WHERE RESOURCE LIKE  '%" + (imageUrl.slice(0, imageUrl.lastIndexOf('.'))) + "%'", function (errorDelete, rows, fields) {
                if (!errorDelete) {
                    var fs = require('fs');
                    var filePath = "public/" + imageUrl;
                    try {

                        fs.unlinkSync(filePath);

                        // res.status(200).json(_respond)
                    }
                    catch (e) {
                        // ...
                    }

                }
                else
                    console.log('Error while performing Query.');
                //connection.release();
                //connection.end();
            });
        }());
    })

});
// register route URL
app.post('/UpdateProductCategory', function (req, res, next) {
    var productId = req.body.productId;
    var array = [];
    var array = req.body.categoryArr;

    // respond JSON object
    var _respond = {
        'status': 200
    };
    connection.query('DELETE FROM ey_product_category WHERE PRODUCT_ID=' + productId, function (err, rows, fields) {
        if (!err) {
            for (var k = 0; k < array.length; k++) {
                var sql = 'SELECT * FROM rf_category_lvl1  WHERE  NAME = ?';
                console.log(k);
                (function () {
                    var categoryName = array[k].parentName;
                    connection.query(sql, [categoryName], function (error, results) {
                        console.log("DATABASE " + categoryName);
                        if (results.length !== 0) {
                            var values = [productId, 0, results[0].ID, new Date(), new Date()];
                            connection.query('INSERT INTO ey_product_category (PRODUCT_ID, CATEGORY_ID, CATEGORY_PARENT_ID,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?,?)', values, function (error1, response) {
                                if (!error1) {
                                }
                            });
                        }
                    });
                    var sql2 = 'SELECT * FROM rf_category_lvl2  WHERE  NAME = ?';
                    if (array[k].childName) {
                        var childCategoryName = array[k].childName;
                        var parentCategoryId = array[k].parentId;
                        connection.query(sql2, [childCategoryName], function (err, res) {
                            // if(err){}
                            console.log("DATABASE " + childCategoryName);
                            if (res.length !== 0) {
                                var values = [childCategoryName, parentCategoryId];
                                var updateRecord = 'UPDATE ey_product_category SET CATEGORY_ID=? where CATEGORY_PARENT_ID=?';
                                connection.query(updateRecord, values, function (err2, result) {

                                    if (!err2) {

                                    }
                                });
                            }
                        });
                    }
                }());
            }
            res.status(200).json(_respond)

        }
        else
            console.log('Error while performing Query.');
        //connection.release();
        //connection.end();
    });

});

app.post('/AddProductCategory', function (req, res, next) {

    var productId = req.body.productId;
    var array = [];
    var array = req.body.categoryArr;
    var j = 0;
    // respond JSON object
    var _respond = {
        'status': 200
    };
    for (var k = 0; k < array.length; k++) {
        var sql = 'SELECT * FROM rf_category_lvl1  WHERE  NAME = ?';
        console.log(k);
        (function () {
            var categoryName = array[k].parentName;
            connection.query(sql, [categoryName], function (error, results) {
                console.log("DATABASE " + categoryName);
                if (results.length !== 0) {
                    var values = [productId, 0, results[0].ID, new Date(), new Date()];
                    connection.query('INSERT INTO ey_product_category (PRODUCT_ID, CATEGORY_ID, CATEGORY_PARENT_ID,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?,?)', values, function (error1, response) {
                        if (!error1) {
                        }
                    });
                }
            });
            var sql2 = 'SELECT * FROM rf_category_lvl2  WHERE  NAME = ?';
            if (array[k].childName) {
                var childCategoryName = array[k].childName;
                connection.query(sql2, [childCategoryName], function (err, res) {
                    if(err){}
                    console.log("DATABASE " + childCategoryName);
                    if (res.length !== 0) {
                        var values = [productId, res[0].ID, new Date(), new Date(), res[0].PARENT_ID,];
                        connection.query('INSERT INTO ey_product_category (PRODUCT_ID,CATEGORY_ID, CREATED_AT,UPDATED_AT,CATEGORY_PARENT_ID) VALUES(?,?,?,?,?)', values, function (err2, response) {
                            if (!err2) {
                                res.status(200).json(_respond)
                            }
                        });
                    }
                });
            }
        }());
    }


    // array.forEach(function(categoryName, i, arr) {
    //   //SELECT a record.
    //   var queryString = 'SELECT * FROM rf_category_lvl1  WHERE  NAME = ?';
    //
    //   connection.query(queryString, [categoryName], function (err, rf_category_lvl1) {
    //     if (!err) {
    //
    //       valueArray.push();
    //       var values = [productId, rf_category_lvl1[0].ID, new Date(), new Date()];
    //       valueArray.push(values);
    //   j++;
    //     }
    //   });
    // if(j===array.length){
    //   valueArray.forEach(function(values, i, arr) {
    //   connection.query('INSERT INTO ey_product_category (PRODUCT_ID, CATEGORY_ID,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?)', values, function (err2, response) {
    //     if (!err2) {
    //       console.log('Increased the salary for Joe.');
    //       return ;
    //     }
    //     else {
    //
    //       console.log(err2)
    //
    //       // var succes = true;
    //     }
    //   });
    // });
    // }
    // });

});
app.post('/AddManufacturerId/:name', function (req, res, next) {
    var name = req.params.name;

    var values = [name, 1, new Date(), new Date()];


    connection.query('INSERT INTO ey_manufacturers (NAME,STATUS,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?)', values, function (error, result) {

        if (!error) {
            var queryString = 'SELECT * FROM ey_manufacturers  WHERE  NAME = ?';

            connection.query(queryString, [name], function (err, ey_manufacturers) {
                if (!err) {
                    return res.json({data: ey_manufacturers[0].ID});
                    // console.log("Increased the salary for Joe.");
                }
            });


        }
        else {
            console.log('Error while performing Query. add error');
        }
    });

});
app.post('/GetproductReviewRaiting/:productId', function (req, res, next) {
    var productId = req.params.productId;

    var queryString = 'SELECT CURRENT_RATE,CREATED_AT FROM ey_review  WHERE  PRODUCT_ID = ?';

    connection.query(queryString, [productId], function (err, reviewRaitingData) {
        if (!err) {
            return res.json({data: reviewRaitingData});
            // console.log('Increased the salary for Joe.');
        }
    });


});
app.post('/AddBrandId', function (req, res, next) {

    var name = req.body.name;
    var manufactId = req.body.manufactId;


    var values = [manufactId, name, 1, new Date(), new Date()];


    connection.query('INSERT INTO ey_brands (MANUFACTURER_ID,NAME,STATUS,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?,?)', values, function (error, result) {

        if (!error) {
            var queryString = 'SELECT * FROM ey_brands  WHERE  NAME = ?';

            connection.query(queryString, [name], function (err, ey_brands) {
                if (!err) {
                    var id = ey_brands[0].ID;
                    return res.json({id: id, success: true});
                    // console.log('Increased the salary for Joe.');
                }
            });


        }
        else {
            console.log('Error while performing Query. add error');
        }
    });


});
app.post('/AddReviewActivity', function (req, res, next) {
    var userId = req.body.userId;
    var productId = req.body.productId;
    var reviewId = req.body.reviewId;
    var activType = 2;
    var comment = "REVIEW CREATE";
    var actLink = "/REVIEW CREATE/";
    var values = [userId, activType, comment, actLink, productId, reviewId, 0, new Date(), new Date(), new Date()];


    connection.query('INSERT INTO ey_user_activity (USER_ID, ACTIVITY_TYPE, COMMENT,ACTIVITY_LINK,PRODUCT_ID,REVIEW_ID,ISDELETE,ACTIVITY_DATE,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?,?,?,?,?,?,?)', values, function (error, result) {

        if (!error) {


            return res.json({sucsess: true});
            // console.info('Increased the salary for Joe.');
        }
        else {
            console.log('Error while performing Query. add error');
        }
    });

});
///////////////////add product score/////////
app.post('/AddProductScore/:id', function (req, res, next) {
    var key = req.params.id;

    // var values = [userId, activType, comment,actLink,productId,reviewId,0,new Date(), new Date(), new Date()];


    var queryString = 'SELECT * FROM ey_review  WHERE  PRODUCT_ID = ?';

    connection.query(queryString, [key], function (err, ey_reviews) {
        if (!err) {
            var leng = ey_reviews.length;
            var score = 0;
            ey_reviews.forEach(function (reviewScore, i, arr) {
                score += reviewScore.CURRENT_RATE;
            });
            score = score / leng;
            connection.query('UPDATE ey_product SET CURRENT_SCORE =' + score + '   WHERE ID=' + key, function (err2, rows, fields) {
                if (!err2) {
                    return res.json({sucsess: true});
                }
                else
                    console.log('Error while performing Query.');
            });
            console.log('Increased the salary for Joe.');
        }
    });

});
//////////////////add product score end/////
/////////////add like//////////////
app.post('/AddLike', function (req, res, next) {
    var reviewId = req.body.reviewId;
    var key = req.body.reviewId;
    var userId = req.body.userId;
    var like = req.body.like;
    var dislike = req.body.dislike
    var activType = 4;
    var comment = "user  liked this product";
    var actLink = "/AddLike";
    var prodId = req.body.productId;
    var updateRecord = 'UPDATE ey_review SET LIKES_CNT = ' + like + ', DISLIKE_CNT = ' + dislike + ' WHERE ID=?';


    var values = [userId, activType, comment, actLink, prodId, reviewId, 0, new Date(), new Date(), new Date()];
    connection.query(updateRecord, [reviewId], function (err, result) {
        if (err) throw err;
        else {
            connection.query('INSERT INTO ey_user_activity (USER_ID, ACTIVITY_TYPE, COMMENT,ACTIVITY_LINK,PRODUCT_ID,REVIEW_ID,ISDELETE,ACTIVITY_DATE,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?,?,?,?,?,?,?)', values, function (error, result) {

                if (!error) {


                    return res.json({sucsess: true});
                    // console.log('Increased the salary for Joe.');
                }
                else {
                    console.log('Error while performing Query. add error'+error);
                }
            });

        }
    });


    connection.query('UPDATE ey_user_activity SET ISDELETE = 1  WHERE USER_ID=' + userId + ' AND (ACTIVITY_TYPE=5 OR ACTIVITY_TYPE=6) AND REVIEW_ID=' + key, function (err2, rows, fields) {
        if (!err2) {
            console.log('The solution is: ', rows);
        }
        else
            console.log('Error while performing Query.');
    });
});
/////////////add like end//////////////
/////////////add likerecovere//////////////
app.post('/LikeRecovere', function (req, res, next) {
    var reviewId = req.body.reviewId;
    var key = req.body.reviewId;
    var userId = req.body.userId;
    var like = req.body.like;

    var activType = 6;
    var comment = "abstain like or dislike";
    var actLink = "/dsfsdfs/fsd/fsdgfsdf";
    var prodId = req.body.productId;
    var updateRecord = 'UPDATE ey_review SET LIKES_CNT = ' + like + ' WHERE ID=?';


    var values = [userId, activType, comment, actLink, prodId, reviewId, 0, new Date(), new Date(), new Date()];
    connection.query(updateRecord, [reviewId], function (err, result) {
        if (err) throw err;
        else {
            connection.query('INSERT INTO ey_user_activity (USER_ID, ACTIVITY_TYPE, COMMENT,ACTIVITY_LINK,PRODUCT_ID,REVIEW_ID,ISDELETE,ACTIVITY_DATE,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?,?,?,?,?,?,?)', values, function (error, result) {

                if (!error) {


                    return res.json({sucsess: true});
                    // console.log('Increased the salary for Joe.');
                }
                else {
                    console.log('Error while performing Query. add error');
                }
            });

        }
    });

    connection.query('UPDATE ey_user_activity SET ISDELETE = 1  WHERE USER_ID=' + userId + ' AND (ACTIVITY_TYPE=5 Or ACTIVITY_TYPE=4) AND REVIEW_ID=' + key, function (err2, rows, fields) {
        if (!err2) {
            console.log('The solution is: ', rows);
        }
        else
            console.log('Error while performing Query.');
    });

});
/////////////add likerecovere end//////////////
/////////////add dislike //////////////
app.post('/AddDisLike', function (req, res, next) {
    var reviewId = req.body.reviewId;
    var key = req.body.reviewId;
    var userId = req.body.userId;
    var like = req.body.like;
    var dislike = req.body.dislike;
    var prodId = req.body.productId;
    var updateRecord = 'UPDATE ey_review SET DISLIKE_CNT = ' + dislike + ',LIKES_CNT = ' + like + '  WHERE ID=?';
    // var updateRecord2 = 'UPDATE ey_review SET LIKES_CNT = '+like+' WHERE ID=?';
    var activType = 5;
    var comment = "user added dislike";
    var actLink = "/AddDisLike";
    var values = [userId, activType, comment, actLink, prodId, key, 0, new Date(), new Date(), new Date()];
    connection.query(updateRecord, [key], function (err, result) {
        if (err) throw err;
        else {
            connection.query('INSERT INTO ey_user_activity (USER_ID, ACTIVITY_TYPE, COMMENT,ACTIVITY_LINK,PRODUCT_ID,REVIEW_ID,ISDELETE,ACTIVITY_DATE,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?,?,?,?,?,?,?)', values, function (error, result) {
                if (!error) {
                    return res.json({sucsess: true});
                    // console.log('Increased the salary for Joe.');
                }
                else {
                    console.log('Error while performing Query. add error'+ error);
                }
            });
        }
    });

    connection.query('UPDATE ey_user_activity SET ISDELETE = 1  WHERE USER_ID=' + userId + ' AND (ACTIVITY_TYPE=4 OR ACTIVITY_TYPE=6) AND REVIEW_ID=' + key, function (err2, rows, fields) {
        if (!err2) {
            console.log('The solution is: ', rows);
        }
        else
            console.log('Error while performing Query.');
    });
});
/////////////add dislike end//////////////
/////////////add dislikerecovere//////////////
app.post('/DisLikeRecovere', function (req, res, next) {
    var reviewId = req.body.reviewId;
    var key = req.body.reviewId;
    var userId = req.body.userId;
    var dislike = req.body.dislike;

    var activType = 6;
    var comment = "abstain like or dislike";
    var actLink = "/dsfsdfs/fsd/fsdgfsdf";
    var prodId = req.body.productId;
    var updateRecord = 'UPDATE ey_review SET DISLIKE_CNT = ' + dislike + ' WHERE ID=?';


    var values = [userId, activType, comment, actLink, prodId, reviewId, 0, new Date(), new Date(), new Date()];
    connection.query(updateRecord, [reviewId], function (err, result) {
        if (err) throw err;
        else {
            connection.query('INSERT INTO ey_user_activity (USER_ID, ACTIVITY_TYPE, COMMENT,ACTIVITY_LINK,PRODUCT_ID,REVIEW_ID,ISDELETE,ACTIVITY_DATE,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?,?,?,?,?,?,?)', values, function (error, result) {

                if (!error) {


                    return res.json({sucsess: true});
                    // console.log('Increased the salary for Joe.');
                }
                else {
                    console.log('Error while performing Query. add error');
                }
            });

        }
    });
    connection.query('UPDATE ey_user_activity SET ISDELETE = 1  WHERE USER_ID=' + userId + ' AND (ACTIVITY_TYPE=4 OR ACTIVITY_TYPE=5) AND REVIEW_ID=' + key, function (err2, rows, fields) {
        if (!err2) {
            console.log('The solution is: ', rows);
        }
        else
            console.log('Error while performing Query.');
    });


});
/////////////add dislikerecovere end//////////////

/////////////Get User Activity By UserId//////////////
app.post('/GetUserActivityByUserId/:id', function (req, res, next) {


    var key = req.params.id;
    var queryString = 'SELECT * FROM ey_user_activity  WHERE   USER_ID = ? AND (ACTIVITY_TYPE=5 OR ACTIVITY_TYPE=4 OR ACTIVITY_TYPE=6) AND ISDELETE=0';


    connection.query(queryString, [key], function (err, userActivity) {
        if (!err) {
            console.log('The User Activity By User Id is: ', userActivity);
            res.json(userActivity);
        }


        else
            console.log('Error while performing Query.' + err);
        //connection.release();
        //connection.end();

    })
});
/////////////Get User Activity By UserId End//////////////


// app.post('/fileUpload', function (req, res) {
//
//
//     var updateRecord = 'UPDATE ey_users SET TOKEN = ?  WHERE ID=?';
//     //Update a record.
//     connection.query(updateRecord, [resetPasswordToken,  user[0].ID], function (err, result) {
//         if (err) throw err;
//         else {
//             console.log('Increased the salary for Joe.');
//             // var succes = true;
//
//         }
//     });
//
//     console.log(req.body);
//     //connection.end();
//     //db.contactlist.insert(req.body, function(err, doc) {
//     //  res.json(doc);
//     //});
// });
var extention = [];
var fileN3 = [];
var storage3 = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/img/review');
    },
    filename: function (req, file, callback) {
        fileName3 = file.fieldname + '-' + Date.now() + file.originalname;
        fileN3.push(fileName3);
        extention.push(file.originalname.substring(file.originalname.lastIndexOf(".") + 1));
        callback(null, fileName3);
    }
});
var upload3 = multer({storage: storage3}).array('reviewPhoto', 3);


// app.get('/',function(req,res){
//     res.sendFile(__dirname + "/index2.html");
// });

app.post('/api/photo3', function (req, res) {
    fileN3 = [];
    extention = [];
    upload3(req, res, function (err) {
        if (!err) {

            var queryString = 'SELECT  ID FROM ey_review  ORDER BY  ID DESC LIMIT 1';
            var reviewNextId
            connection.query(queryString, function (err, reviewId) {
                if (!err) {
                    reviewNextId = reviewId[0].ID + 1;
                    var reviewId = reviewNextId;
                    var j = 0;
                    for (var i = 0; i < fileN3.length; i++) {
                        var resouce = "img/review/" + fileN3[i];
                        var values = [reviewId, resouce, extention[i], new Date(), new Date()];
                        // vals.push([reviewId,  fileN3[i], 'jpg', new Date(), new Date()]);
                        // pool.getConnection(function(err, connection) {
                        // Use the connection

                        connection.query('INSERT INTO ey_review_resource (REVIEW_ID, RESOURCE, RESOURCE_TYPE,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?,?)', values, function (err, result) {

                            if (!err) {
                                j = j + 1;
                                console.log('The solution is: ', req.body);
                                // connection.release();
                                if (i === fileN3.length && j === fileN3.length) {
                                    // res.json({error_code: 1, err_desc: err});
                                    // res.redirect('/#/phones/' + req.body.id);
                                }
                            }

                            else {
                                console.log('Error while performing Query. add error');
                            }

                        });

                    }
                }
            });
        }
        else {
            console.log('Error while performing Query. add error');
            // res.json({error_code: 1, err_desc: err});
        }

    });

});


var fileName;
var storage2 = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/img/uploads');
    },
    filename: function (req, file, callback) {
        fileName = 'userFoto-' + Date.now() + file.originalname.substring(file.originalname.lastIndexOf("."))
        callback(null, fileName);
    }
});
var upload2 = multer({storage: storage2}).single('file');

// app.get('/',function(req,res){
//     res.sendFile(__dirname + "/index2.html");
// });

app.post('/api/photo', function (req, res) {
    upload2(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        var id = req.body.id;
        var imagePath = "img/uploads/" + fileName;
        var updateRecord = 'UPDATE ey_users SET AVATAR = ?  WHERE ID=?';
        connection.query(updateRecord, [imagePath, id], function (err, result) {
            if (err) throw err;
            else {
                console.log('Increased the salary for Joe.');

                // var succes = true;

            }
        });

        return res.json({error_code: 0, err_desc: null});
    });
});
/////////////////review add start////////////////
app.post('/reviewAdd', function (req, res) {
    upload(req, res, function (error) {
        if (error) {
            res.json({error_code: 1, err_desc: error});
            return;
        }

        var userId = req.body.userId;

        var review = req.body.review;

        var curRate = req.body.rating;
        var productId = req.body.productId;


        var like = 0;
        var disLike = 0;
        var status = 1;
        var values = [productId, 'capch', review, like, disLike, curRate, userId, status, new Date(), new Date()];
        connection.query('INSERT INTO ey_review (PRODUCT_ID, REVIEW_CAPTION, REVIEW_TEXT, LIKES_CNT, DISLIKE_CNT, CURRENT_RATE, CREATOR_USER_ID, STATUS, CREATED_AT, UPDATED_AT) VALUES(?,?,?,?,?,?,?,?,?,?)', values, function (err, result) {

            if (err) {
                throw err;
                // console.log(err)
            }
            else {
                var queryString = 'SELECT ID FROM ey_review WHERE CREATOR_USER_ID=? ORDER BY ID DESC LIMIT 1';

                connection.query(queryString, [userId], function (err2, idProduct) {
                    if (!err2) {
                        console.log('The solution is: ', idProduct[0]);
                        productId = idProduct[0].ID;

                        return res.json({id: productId});
                    }
                    else
                        console.log('Error while performing Query.');
                });

                // return  res.json({error_code:0,err_desc:null});
                // console.log('Increased the salary for Joe.');
                // var succes = true;

            }
        });

        //
        // var values = ['4','3',req.body.name,req.body.shortText,'1.5',req.body.description,userId,req.body.status,new Date(),new Date()];
        //   var imagePath="img/uploads/"+fileName ;
        //   var productId;
        //
        //   var insertEyproductQuery='INSERT INTO ey_product (MANUFACTURER_ID, BRAND_ID,NAME, SHORT_TEXT, CURRENT_SCORE,DESCRIPTION, CREATER_USER_ID, STATUS,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?,?,?,?,?,?,?)';
        //   connection.query(insertEyproductQuery, values, function(err1, result) {
        //
        //
        //     if (!err1) {


        //   }
    });


});
var imgPath = [];
var fileName;
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/img/review')
    },
    filename: function (req, file, cb) {
        fileName = file.fieldname + '-' + Date.now() + file.originalname.substring(file.originalname.lastIndexOf("."))
        fileNameArray.push(fileName);
        imgPath.push("img/review/" + fileName);
        var datetimestamp = Date.now();
        cb(null, fileName)
    }
});

var reviewUpload = multer({storage: storage}).single('file');
var fileNameArray = [];
var i = 0;

app.post('/reviewImgUpload', function (req, res) {
    reviewUpload(req, res, function (error) {
        if (error) {
            res.json({error_code: 1, err_desc: error});
            return;
        } else {
            i++;
            var userId = req.body.userId
            var reviewId = req.body.reviewId;
            var values = [reviewId, userId, imgPath[i - 1], fileNameArray[i - 1].substring(fileNameArray[i - 1].indexOf(".") + 1), new Date(), new Date()];
            // var values = [reviewId, imgPath[i-1],fileNameArray[i-1].substring(fileNameArray[i-1].indexOf(".")+1), new Date(), new Date()];
            connection.query('INSERT INTO ey_review_resource (REVIEW_ID,USER_ID, RESOURCE, RESOURCE_TYPE,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?,?,?)', values, function (err, result) {
                // connection.query('INSERT INTO ey_review_resource (REVIEW_ID, RESOURCE, RESOURCE_TYPE,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?,?)', values, function (err, result) {


                if (!err) {

                    console.log('The solution is: ', i);

                    if (fileNameArray.length === i) {
                        fileNameArray = [];
                        i = 0;
                        imgPath = [];

                        return res.json({error_code: 0, err_desc: null});
                    }


                }
                else {
                    console.log('Error while performing Query. add error');

                    return res.json({error_code: 1, err_desc: err});
                }

            });
        }

    })

});
////////////////////review add end/////////
app.post('/productCategoriAdd', function (req, res) {





    // var insertEyproductQuery='INSERT INTO rf_category_lvl1 (NAME,CREATED_AT,UPDATED_AT) VALUES(?,?,?)';
    var insertEyproductQuery = 'INSERT INTO rf_category_lvl2 (PARENT_ID,NAME,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?)';

    // var arrayData=['Appliances' ,
    //  'Apps &amp; Games' ,
    // 'Arts, Crafts &amp; Sewing'  ,
    //  'Automotive' ,
    //  'Baby'  ,
    //  'Beauty &amp; Personal Care'   ,
    //  'Books'    ,
    //  'Cell Phones &amp; Accessories'  ,
    //  'Clothing, Shoes &amp; Jewelry ' ,
    //  'Collectibles &amp; Fine Art'   ,
    // 'Computers'                 ,
    // 'Credit and Payment Cards'   ,
    // 'Digital Music'     ,
    // 'Electronics'  ,
    // 'Gift Cards'   ,
    // 'Grocery &amp; Gourmet Food' ,
    // 'Handmade'           ,
    // 'Health, Household &amp; Baby Care'  ,
    // 'Home &amp; Business Services'  ,
    // 'Home &amp; Kitchen'          ,
    // 'Industrial &amp; Scientific',
    // 'Kindle Store '           ,
    // 'Luggage &amp; Travel Gear '  ,
    // 'Luxury Beauty'      ,
    // 'Magazine Subscriptions '   ,
    // 'Movies &amp; TV'    ,
    // 'Musical Instruments'    ,
    // 'Office Products'       ,
    // 'Patio, Lawn &amp; Garden'  ,
    // 'Pet Supplies'    ,
    // 'Prime Pantry'          ,
    // 'Software '                   ,
    // 'Sports &amp; Outdoors'     ,
    // 'Tools &amp; Home Improvement' ,
    // 'Toys &amp; Games '        ,
    // 'Video Games'     ,
    // 'Wine'      ];


    var arr = [
        'Women',
        'Men  ',
        'Girls',
        'Boys ',
        'Baby '
    ];
    arr.forEach(function (fileName, i, arr) {
        // var values = [fileName,new Date(),new Date()];
        var values = [11, fileName, new Date(), new Date()];
        connection.query(insertEyproductQuery, values, function (err1, result) {


            if (!err1) {


            } else {
                return res.json({err: err1.message});
            }
        });

    });

});

app.post('/DeleteProductById/:productId', function (req, res) {

    var productId = req.params.productId;
    var deleted = 2;
    var values = [deleted, productId];
    var updateRecord = 'UPDATE ey_product SET  STATUS=?   WHERE ID=?';
    var _respond = {
        'status': 200
    };

    //Update a record.
    connection.query(updateRecord, values, function (err, result) {
        if (!err) {
            return res.status(200).json({success: true});
        }
        else {
            return res.json({err: err.message});
        }
    });
});

app.post('/RestoreProductById/:productId', function (req, res) {

    var productId = req.params.productId;
    var activate = 1;
    var values = [activate, productId];
    var updateRecord = 'UPDATE ey_product SET  STATUS=?   WHERE ID=?';
    var _respond = {
        'status': 200
    };

    //Update a record.
    connection.query(updateRecord, values, function (err, result) {
        if (!err) {
            return res.status(200).json({success: true});
        }
        else {
            return res.json({err: err.message});
        }
    });
});
app.post('/productEdit', function (req, res) {

    var productId = req.body.productId;
    var userId = req.body.userId;
    var name = req.body.name;
    var shortText = req.body.shortText;
    var description = req.body.description;
    var manufacturer = req.body.manufacturer;
    var brandId = req.body.brandId;
    var raiting = req.body.rating;
    var values = [brandId, req.body.name, req.body.shortText, raiting, req.body.description, userId, new Date(), productId];
    var updateRecord = 'UPDATE ey_product SET  BRAND_ID=?,NAME=?, SHORT_TEXT=?, CURRENT_SCORE=?,DESCRIPTION=?, CREATER_USER_ID=?, UPDATED_AT=?  WHERE ID=?';
    //Update a record.
    connection.query(updateRecord, values, function (err, result) {
        if (!err) {
            return res.json({error_code: 0, id: "ok"});
        }
        else {
            return res.json({err: err1.message});
        }
    });
});


app.post('/productAdd', function (req, res) {
    upload(req, res, function (error) {
        if (error) {
            res.json({error_code: 1, err_desc: error});
            return;
        }

        var userId = req.body.userId;
        var name = req.body.name;
        var shortText = req.body.shortText;
        var description = req.body.description;
        var status = req.body.status;
        var createrId = req.body.id;
        var manufacturer = req.body.manufacturer;
        var brandId = req.body.brandId;
        var raiting = req.body.rating;
        var values = [manufacturer, brandId, req.body.name, req.body.shortText, raiting, req.body.description, userId, req.body.status, new Date(), new Date()];
        var imagePath = "img/uploads/" + fileName;
        var productId;

        var insertEyproductQuery = 'INSERT INTO ey_product (MANUFACTURER_ID, BRAND_ID,NAME, SHORT_TEXT, CURRENT_SCORE,DESCRIPTION, CREATER_USER_ID, STATUS,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?,?,?,?,?,?,?)';
        connection.query(insertEyproductQuery, values, function (err1, result) {


            if (!err1) {


                var queryString = 'SELECT ID FROM ey_product WHERE CREATER_USER_ID=? ORDER BY ID DESC LIMIT 1';

                connection.query(queryString, [userId], function (err, idProduct) {
                    if (!err) {
                        console.log('The solution is: ', idProduct[0]);
                        productId = idProduct[0].ID;

                        var valuesActivity = [userId, 1, "new produkt : " + name, "/hgdkh/hfdh", productId, new Date(), new Date(), new Date()];

                        connection.query('INSERT INTO ey_user_activity (USER_ID, ACTIVITY_TYPE, COMMENT,ACTIVITY_LINK,PRODUCT_ID,ACTIVITY_DATE,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?,?,?,?,?)', valuesActivity, function (error, result) {

                            if (!error) {


                                // return  res.json({sucsess:true});
                                console.log('Increased the salary for Joe.');
                            }
                            else {
                                console.log('Error while performing Query. add error');
                            }
                        })
                        return res.json({error_code: 0, id: productId});
                    }
                    else
                        console.log('Error while performing Query.');
                });
            } else {
                return res.json({err: err1.message});
            }
        })

    })

});

var fileName;
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/img/uploads')
    },
    filename: function (req, file, cb) {
        fileName = file.fieldname + '-' + Date.now() + file.originalname.substring(file.originalname.lastIndexOf("."))
        fileNameArray.push(fileName);
        imgPath.push("img/uploads/" + fileName);
        var datetimestamp = Date.now();
        cb(null, fileName)
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');
var fileNameArray = [];
var i = 0;
var imgPath = [];
app.post('/productImgUpload', function (req, res) {
    upload(req, res, function (error) {
        if (error) {
            res.json({error_code: 1, err_desc: error});
            return;
        } else {
            i++;

            var productId = req.body.productId;

            var values2 = [productId, imgPath[i - 1], i, fileNameArray[i - 1].substring(fileNameArray[i - 1].indexOf(".") + 1), new Date(), new Date()];
            connection.query('INSERT INTO ey_product_resource (PRODUCT_ID, RESOURCE, `ORDER`, RESOURCE_TYPE ,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?,?,?)', values2, function (err, response) {

                if (!err) {
                    console.log('The solution is: ', i);
                    console.log('The solution is: ', productId);
                    if (fileNameArray.length === i) {
                        fileNameArray = [];
                        i = 0;
                        imgPath = [];

                        return res.json({error_code: 0, err_desc: null});
                    }


                }
                else {
                    console.log('Error while performing Query. add error');

                    return res.json({error_code: 1, err_desc: err});
                }

            });
        }

    })

});
// var fileName;
// var storage = multer.diskStorage({ //multers disk storage settings
//   destination: function (req,  file,cb) {
//     cb(null, './public/img/uploads')
//   },
//   filename: function (req,  file,cb) {
//     fileName=file.fieldname + '-' + Date.now()+file.originalname.substring(file.originalname.lastIndexOf("."))
//     fileNameArray.push(fileName);
//     imgPath.push("img/uploads/"+fileName);
//     var datetimestamp = Date.now();
//     cb(null,fileName)
//   }
// });
//
// var productImgUpload = multer({ //multer settings
//   storage: storage
// }).single('file');
// var order=1;
// var fileNameArray=[];
// var imgPath=[];
// var date=0;
// app.post('/productUpload', function(req, res ) {
//   productImgUpload(req,res,function(error){
//     if(error){
//       res.json({error_code:1,err_desc:error});
//       return;
//     }
//
//     var userId=req.body.userId;
//     var name=req.body.name;
//     var shortText=req.body.shortText;
//     var description=req.body.description;
//     var status =req.body.status;
//     var createrId=req.body.id;
//
//
//
//     var productId;
//
//     var insertEyproductQuery='INSERT INTO ey_product (ID,MANUFACTURER_ID, BRAND_ID,NAME, SHORT_TEXT, CURRENT_SCORE,DESCRIPTION, CREATER_USER_ID, STATUS,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
//
//     var queryString = 'SELECT ID FROM ey_product ORDER BY ID DESC LIMIT 1';
//
//     connection.query(queryString,  function(err, idProduct) {
//       if (!err){
//
//             productId=idProduct[0].ID+1;
//            if((Date.now()-date)>20000){ var values = [productId,'4','3',req.body.name,req.body.shortText,'1.5',req.body.description,userId,req.body.status,new Date(),new Date()];}
//
//
//             connection.query(insertEyproductQuery, values, function(err1, result) {
//               if (!err1) {
//                 fileNameArray.forEach(function(fileName, i, arr) {
//                   console.log(fileName);
//                   var values2 = [productId,imgPath[i],i+1,fileName.substring(fileName.indexOf(".")+1),new Date(),new Date()];
//                   connection.query('INSERT INTO ey_product_resource (PRODUCT_ID, RESOURCE, `ORDER`, RESOURCE_TYPE ,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?,?,?)', values2, function(err2, res) {
//
//                     if (!err2) {
//                       console.log('The solution is: ', req.body);
//                       console.log('The solution is: ', productId);
//
//                     }
//                     else{
//                       console.log('Error while performing Query. add error');
//
//                       return  res.json({error_code:1,err_desc:err2});}
//
//                   });
//                   if(fileNameArray.length===i+1){fileNameArray=[];imgPath=[];date=Date.now();}
//                   console.log(i);
//                 });
//                 // for(var i=0;i<fileNameArray.length;i++){
//                 //   var values2 = [productId,imagePath,i+1,fileNameArray[i].substring(fileNameArray[i].indexOf(".")+1),new Date(),new Date()];
//                 //   connection.query('INSERT INTO ey_product_resource (PRODUCT_ID, RESOURCE, `ORDER`, RESOURCE_TYPE ,CREATED_AT,UPDATED_AT) VALUES(?,?,?,?,?,?)', values2, function(err2, res) {
//                 //
//                 //     if (!err2) {
//                 //       console.log('The solution is: ', req.body);
//                 //       order++;
//                 //       return  res.json({error_code:0,err_desc:null});
//                 //     }
//                 //     else{
//                 //       console.log('Error while performing Query. add error');
//                 //
//                 //       return  res.json({error_code:1,err_desc:err2});}
//                 //
//                 //   });
//                 //   if(fileNameArray.length===i-1){fileNameArray=[];}}
//                 console.log('The solution is: ', req.body);
//
//                 return  res.json({error_code:0,err_desc:null});
//               }
//
//             });
//        }else console.log('Error while performing Query.');
//
//
//         });
//
//
//
//   })
//
// });

app.post('/PostProductReviewById/', function (req, res) {
    if (req.body.userId === "undefined") {
        var error = new Error('Some error');
        error.name = 'My Error';
        error.status = 500;
        throw error;
    }
    var productId = req.body.productId;
    var review = req.body.review;
    var userId = req.body.userId;
    var like = 0;
    var disLike = 0;
    var curRate = req.body.curRate;
    var status = req.body.status;
    var values = [productId, 'capch', review, like, disLike, curRate, userId, status, new Date(), new Date()];
    connection.query('INSERT INTO ey_review (PRODUCT_ID, REVIEW_CAPTION, REVIEW_TEXT, LIKES_CNT, DISLIKE_CNT, CURRENT_RATE, CREATOR_USER_ID, STATUS, CREATED_AT, UPDATED_AT) VALUES(?,?,?,?,?,?,?,?,?,?)', values, function (err, result) {

        if (err) {
                console.log(err)
            throw err;
        
        }
        else {
            return res.json({error_code: 0, err_desc: null});
                 // var succes = true;

        }
    });


});
app.post('/api/sendemail/', function (req, res, next) {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            var key = req.body.email;
            var queryString = 'SELECT * FROM ey_users WHERE EMAIL = ?';

            connection.query(queryString, [key], function (err, user) {

                if (user.length === 0) {
                    res.status(500);
                    return res.end('E-mail ' + req.body.email + 'do not match!');
                }
                var TOKEN = token;
                var resetPasswordExpires = Date.now() + 3600000; // 1 hour
                var updateRecord = 'UPDATE ey_users SET TOKEN = ?  WHERE ID=?';
                //Update a record.
                connection.query(updateRecord, [TOKEN, user[0].ID], function (err, result) {
                    if (err) throw err;
                    else {
                        console.log('Increased the salary for Joe.');
                        // var succes = true;

                    }
                });
                // user.save(function(err) {
                done(err, token, user);
                // });
            });
        },

        function (token, user, done) {
            //Your api key, from Mailgun’s Control Panel
//       var api_key = 'key-da5afd9663a86904074e27ff036015cc';
//
// //Your domain, from the Mailgun Control Panel
//       var domain = 'sandboxa2666cba0e4a4013a4683aca13e4d233.mailgun.org';
//
// //Your sending email address
//       var from_who = 'easyratetest@gmail.com';
//
//       var mailgun = new Mailgun({apiKey: api_key, domain: domain});
//
//       var data = {
//         //Specify email data
//         from: from_who,
//         //The email to contact
//         to:req.body.email,
//         //Subject and text data
//         subject: 'Hello from Mailgun',
//         html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + req.params.mail + '">Click here to add your email address to a mailing list</a>'
//       }
//
//       //Invokes the method to send emails given the above data with the helper library
//       mailgun.messages().send(data, function (err, body) {
//         //If there is an error, render the error page
//         if (err) {
//
//           console.log("got an error: ", err);
//         }
//         //Else we can greet    and leave
//         else {
//           //Here "submitted.jade" is the view file for this landing page
//           //We pass the variable "email" from the url parameter in an object rendered by Jade
//
//           console.log(body);
//         }
//       });
            // var sendgrid = require("sendgrid")("easyRate", "a1234567890b");
            // var email = new sendgrid.Email();
            //
            // email.addTo("test@sendgrid.com");
            // email.setFrom("easyratetest@gmail.com");
            // email.setSubject("Sending with SendGrid is Fun");
            // email.setHtml("and easy to do anywhere, even with Node.js");
            //
            // sendgrid.send(email);
            //
            var options = {
                auth: {
                    api_user: 'vgevogyan@gmail.com',
                    api_key: 'vahe1975'
                }
            }

            var client = nodemailer.createTransport(sgTransport(options));

            var email = {
                from: 'easyratetest@gmail.com',
                to: req.body.email,
                subject: 'Reset your password',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n' // plaintext body
                // html: '<b>Hello world 🐴 </b>' // html body
            };

            client.sendMail(email, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200);
                    res.end('An e-mail has been sent to  ' + req.body.email + '   with further instructions.');
                    console.log('Message sent: ' + info.response);
                }
            });


            // var auth = {
            //   auth: {
            //     api_key: 'key-da5afd9663a86904074e27ff036015cc',
            //     domain: 'easyrate-yert.rhcloud.com'
            //   }
            // };


            // var transporter = nodemailer.createTransport(mg(auth));

            // var mailOptions = {
            //   from: 'easyratetest@gmail.com', // sender address
            //   to: req.body.email, // list of receivers
            //   subject: 'Reset your password',
            //   text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            //   'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            //   'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            //   'If you did not request this, please ignore this email and your password will remain unchanged.\n' // plaintext body
            //   // html: '<b>Hello world 🐴 </b>' // html body
            // };

            // send mail with defined transport object
            // transporter.sendMail(mailOptions, function(error, info){
            //   if(error){
            //     console.log(error);
            //   }else{
            //     res.status(200);
            //     res.end( 'An e-mail has been sent to  '+req.body.email +'   with further instructions.');
            //     console.log('Message sent: ' + info.response);
            //   }
            // });
        }



        // var sendgrid = require("sendgrid")("easyRate", "a1234567890b");
        // var email = new sendgrid.Email();
        //
        // email.addTo("test@sendgrid.com");
        // email.setFrom("easyratetest@gmail.com");
        // email.setSubject("Sending with SendGrid is Fun");
        // email.setHtml("and easy to do anywhere, even with Node.js");

        // sendgrid.send(email);


        // function(token, user, done) {
        //   var options = {
        //     service: 'Gmail',
        //     auth: {
        //       user: 'arthap123@gmail.com',
        //       pass: 'ganchka123'
        //     }
        //   };
        //   var transporter = nodemailer.createTransport( options);
        //   // setup e-mail data with unicode symbols
        //   var mailOptions = {
        //     from: 'arthap123@gmail.com', // sender address
        //     to: req.body.email, // list of receivers
        //     subject: 'Reset your password',
        //     text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        //     'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        //     'http://' + req.headers.host + '/reset/' + token + '\n\n' +
        //     'If you did not request this, please ignore this email and your password will remain unchanged.\n' // plaintext body
        //     // html: '<b>Hello world 🐴 </b>' // html body
        //   }
        //   // send mail with defined transport object
        //   transporter.sendMail(mailOptions, function(error, response){
        //     if(error){
        //       console.log(error);
        //     }else{
        //       console.log("Message sent: " + response.message);
        //       // done(err, 'done');
        //       res.status(200);
        //       res.end( 'An e-mail has been sent to  '+req.body.email +'   with further instructions.');
        //       // res.redirect('/#/forgot' );
        //     }
        //   })
        //   // transporter.sendMail(mailOptions, function(err) {
        //   //     // req.flash('info', 'An e-mail has been sent to ' + 'artiom.sar@gmail.com' + ' with further instructions.');
        //   //     res.
        //   //     done(err, 'done');
        //   // });
        // }
    ], function (err) {
        if (err) return next(err);
        res.redirect('/forgot');
    });
});

app.get('/reset/:token', function (req, res, next) {
    // var token=req.params.token;
    var key = req.params.token;// req.params.token;"art";
    // var key1 =  Date.now()  ;
    var queryString = 'SELECT * FROM ey_users WHERE TOKEN=?  ';
    // var queryString = 'SELECT * FROM ey_users WHERE PASSWORD=? AND USER_TYPE<?';

    connection.query(queryString, [key], function (err, user) {
        if (err) return next(err);
        if (user.length === 0) {

            res.status(400);
            // res.redirect('/#/forgot');
            res.redirect('/#/tokenError')
            return res.end('Password reset token is invalid or has expired.');
        }

        return res.redirect('/#/reset/' + req.params.token);

    });
});


app.get('/test', function (req, res, next) {

    var queryString = 'select * from equipment';


    connection.query(queryString,  function (err, user) {
           console.log('Increased the salary for Joe.'+ err);
        if (err)  return res.end(err +'Success! Your password has been changed!');
        // return next(err);
        if (user.length === 0) {

            res.status(400);
            
                     return res.end(err);
        }
           res.status(200);
        return  res.json({success: 200, message: user[0]});

    });
});

//////RESET-Password/////

app.post('/reset/:token', function (req, res) {
    async.waterfall([
        function (done) {
            var key = req.params.token;
            // var key1 =   Date.now() + 3600000;
            var queryString = 'SELECT * FROM ey_users WHERE TOKEN=? ';
            var updateRecord = 'UPDATE ey_users SET PASSWORD = ?,TOKEN= null WHERE ID=?';

            connection.query(queryString, [key], function (err, user) {
                if (user.length === 0) {
                    var a = 1;
                    // req.flash('error', 'Password reset token is invalid or has expired.');
                    // res.status(400);
                    // res.end('Password reset token is invalid or has expired.');
                    res.status(500);
                    return res.end('You password has expired!');
                    // return res.redirect('back');
                }

                var id = user[0].ID
                var password = req.body.PASSWORD;
                var confirm = req.body.CONFIRM_PASSWORD;
                var token = 1;
                var resetPasswordExpires = undefined;

                if (password !== confirm) {
                    res.status(500);
                    return res.end('passwords do not match');
                }
                else {

                    //Update a record.
                    connection.query(updateRecord, [password, id], function (err, res) {
                        if (err) throw err;
                        else {
                            console.log('Increased the salary for Joe.');
                            // var succes = true;
                            done(err, user);
                        }
                    });
                    // if(succes)  return res.end('passwords was Update');
                }
            });
            // var updateToken = 'UPDATE ey_users SET TOKEN = ?  WHERE TOKEN=?';
            //
            // connection.query(updateToken, [token, key], function (errTok, result) {
            //   if (errTok) throw errTok;
            //   else {
            //     console.log('Increased the salary for Joe.');
            //     // var succes = true;
            //
            //   }
            // });

        },
        function (user, done) {
            var options = {
                auth: {
                    api_user: 'vgevogyan@gmail.com',
                    api_key: 'vahe1975'
                }
            }

            var client = nodemailer.createTransport(sgTransport(options));

            var email = {
                from: 'easyratetest@gmail.com',
                to: 'artiom.sar@gmail.com',
                subject: 'Reset',
                text: 'Hello,\n\n' +
                'Reset to Easy Rate.\n'
            };

            client.sendMail(email, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else {
                    
                    console.log('Message sent: ' + info.response);
                    done(err);
                    return res.end('Success! Your password has been changed!');
                   
                  
                }
            });
            // var options = {
            //   service: 'Gmail',
            //   auth: {
            //     user: 'arthap123@gmail.com',
            //     pass: 'ganchka123'
            //   }
            // };
            // var transporter = nodemailer.createTransport( options);
            // var mailOptions = {
            //   from: 'arthap123@gmail.com', // sender address
            //   to: 'artiom.sar@gmail.com', // list of receivers
            //   subject: 'Your password has been changed',
            //   text: 'Hello,\n\n' +
            //   'This is a confirmation that the password for your account ' + 'artiom.sar@gmail.com' + ' has just been changed.\n'
            // };
            //
            // transporter.sendMail(mailOptions, function(error, response){
            //   if(error){
            //     console.log(error);
            //   }else{
            //     console.log("Message sent: " + response.message);
            //     return res.end('Passwords was Update!');
            //     done(err);
            //   }
            // })
            // smtpTransport.sendMail(mailOptions, function(err) {
            //     req.flash('success', 'Success! Your password has been changed.');
            //     done(err);
            // });
        }
    ], function (err) {
        res.redirect('/#');
    });
});
/////////////////Reset -End////////////////

//////Change Password- /////
app.post('/ChangePassword/:email', function (req, res, next) {


    var password = md5(req.body.PASSWORD);
    var key = req.params.email;
    var updateRecord = 'UPDATE ey_users SET PASSWORD = ? WHERE EMAIL=?';


    //Update a record.
    connection.query(updateRecord, [password, key], function (err, response) {
        if (err) return next(err);
        else {
            console.log('Increased the salary for Joe.');
            // var succes = true;
            return res.json({error_code: 0, message: "Success! Your password has been changed!"});
        }
    });


});
//////Change Password-END /////
app.post('/ChangeEmail/:id', function (req, res, next) {

    var key = req.params.id;
    var email = req.body.EMAIL;
    var updateRecord = 'UPDATE ey_users SET EMAIL =  WHERE EMAIL=?';

    //Update a record.
    connection.query(updateRecord, [email, key], function (err, response) {

        if (!err) {
            console.log('Increased the salary for Joe.');

            return res.json({error_code: 0, message: "E-mail change success!"});
        }
        else {

            res.status(500);
            return res.end("An error occurred, try again!");
            // next(500);
        }
    });


});

app.post('/api/usersCreate', function (req, res) {

    async.waterfall([
        function (done) {
            var userName = req.body.USERNAME;
            var email = req.body.E_MAIL;
            var eula = 0;
            var password=md5(req.body.PASSWORD)
            var values = [userName, password, "A", eula, email]

            var queryString = 'SELECT * FROM ey_users WHERE USERNAME = ?';

            connection.query(queryString, [userName], function (err, user) {
                if (err) {
                    res.status(500);
                    return res.end('This user name is already registered!');
                }
                if (user.length > 0) {
                    res.status(500);
                    return res.end('This user name is already registered!');
                }

                //     connection.query('INSERT INTO labels (articleNumber,name,size,indicator,color,brand,pricegroup,material,description,image,date,longDescription,kategorie,warehouse ) VALUES(214233320,"hapikt","34","1","red","chanel","A","cotton","fdkhgasldg.NSGV.","/A/A/A/A.PNG","2016","H","londone","aaaaa")', function(err, rows, fields) {
//     connection.query("INSERT INTO ey_users  SET ? ",data ,  function(err, rows) {
//     connection.query('INSERT INTO ey_users (  USERNAME, PASSWORD, SOURCE, EULA_ACCEPTED, LAST_LOGIN, USER_TYPE, MANUFACTURER_ID, USER_STATUS,EMAIL,  AVATAR, CURRENT_RATE, CREATED_AT, UPDATED_AT) VALUES ( "kapik","Artyomik", "A", "1", NULL, "1", 4, "1","art@salhd.am", NULL,  NULL, now(), now())',  function(err, rows, fields) {
                connection.query('INSERT INTO ey_users (USERNAME, PASSWORD, SOURCE,EULA_ACCEPTED,EMAIL) VALUES(?, ?, ?,?,?)', values, function (err, result) {


                    if (!err) {
                        console.log('The solution is: ', req.body);
                        // res.writeHead(200, {"Content-Type": "application/json"});
                        // // res.end("{'status:' 200}");
                        // var _respond = {
                        //     'status': 200
                        // };
                        res.json("{'status': 200}");

                        // res.status(200).json("{'status': 200}");
                        // res.writeHead(200, { "Content-Type": "application/json" });
                        //  res.end("Adding was  successfully completed");
                        done(err, email, result);
                    }
                    else
                        console.log('Error while performing Query. add error');
                    // res.writeHead(404, { "Content-Type": "application/json" });
                    // res.status(404)
                    // json("{'status': 404 }");

                });

            });

        },
        function (email, result, done) {
            var options = {
                auth: {
                    api_user: 'vgevogyan@gmail.com',
                    api_key: 'vahe1975'
                }
            }

            var client = nodemailer.createTransport(sgTransport(options));

            var email = {
                from: 'easyratetest@gmail.com',
                to: email,
                subject: 'Welcome',
                text: 'Hello,\n\n' +
                'Welcom to Easy Rate.\n'
            };

            client.sendMail(email, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Message sent: ' + info.response);

                    return res.end('check your e-mail');
                }
            });
        }
    ], function (err) {
        res.redirect('/#');
    });


});

app.post('/AddEULA/:id', function (req, res) {

    var id = req.params.id;
    var eula = 1;
    console.log(id);

    connection.query('UPDATE ey_users SET EULA_ACCEPTED =' + eula + ' WHERE ID=' + id, function (err, rows, fields) {
        if (!err) {
            console.log('The solution is: ', rows);
            res.json({sucsess: true});
        }
    });
});

app.post('/userdelete/:user', function (req, res) {
    var user = req.params.user;
    console.log(req.params.user);
    console.log(user);
    // connection.connect();
    connection.query('DELETE FROM ey_users WHERE AVATAR=' + user, function (err, rows, fields) {
        if (!err) {
            console.log('The solution is: ', rows);
            console.log(req.params.user)
        }
        else
            console.log('Error while performing Query1!!!.');
    });

});

app.post('/getDataUserById', function (req, res) {
    var key = req.body.id;
    var queryString = 'SELECT ID,AVATAR,USERNAME,CURRENT_RATE,EMAIL  FROM ey_users  WHERE  ID = ?';
    connection.query(queryString, [key], function (err, rows) {
        if (!err) {
            res.json(rows[0]);
        }
        else {
            res.status(400);
            return res.end('This user is not found!');
        }
    });
})
function ensureAuthorized(req, res, next) {
    var basicToken;
    var basicHeader = req.headers["authorization"];
    if (typeof basicHeader !== 'undefined') {
        var basic = basicHeader.split(" ");
        basicToken = basic[1];
        req.token = basicToken;
        next();
    } else {
        res.send(403);
    }
}
process.env.SECRET_KEY="My_secret";
app.post('/userAuthentication', function (req, res) {
    // // connection.connect();
    var user = req.body.username;
    var password = req.body.password;
    // var key = req.params.userName;
    var queryString = 'SELECT * FROM ey_users  WHERE username = ? and password = md5(?)' ;

    connection.query(queryString, [user, password], function (err, rows, fields) {

        // if (err) throw err;
        if (rows.length < 1) {
            res.status(500);
            return res.end('This user name is not registered!');
        }
        if (!err) {

            var token = jwt.sign({username:rows[0].USERNAME, email:rows[0].EMAIL, avatar : rows[0].AVATAR}, process.env.SECRET_KEY, {
                expiresIn: 1440 // expires in 1 hours

        });
            rows[0].token=token;
            res.json(rows);
            // for (var i in rows) {
            //   console.log(rows[i]);
            // }
        }
        else {
            res.status(500);
            return res.end('This user name is not correct!');
        }
    });

    // connection.end();
//     var id = req.params.id;
//     console.log(id);
//
//     // connection.connect();
// //
// connection.query('SELECT * FROM ey_users WHERE AVATAR='+id, function(err, rows, fields) {
//     if (err) throw err;
//          if (!err){
//             console.log('The solution2 is: ', rows);
//             res.json(rows);
//              for (var i in rows) {
//                  console.log("2");
//                  console.log(rows[i]);
//              }
//            }
//
//
//      else
//           console.log('Error while performing Query.');
//     // connection.release();
//     //  connection.end();
//     });

});
// app.put('/contactlist/:id', function (req, res) {
//   var id = req.params.id;
//   console.log(req.body.id);
//   // connection.connect();
//   connection.query( 'UPDATE labels SET color="Green" WHERE articleNumber='+id,  function(err, rows, fields) {
//     //res.json('.. assume you translated your database response a javascript object yet again .. ')
//     //connection.release();
//   });
//   //db.contactlist.findAndModify({
//   //  query: {_id: mongojs.ObjectId(id)},
//   //  update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
//   //  new: true}, function (err, doc) {
//   //    res.json(doc);
//   //  }
//   //);
//   //  connection.end();
// });

app.use(function (err, req, res, next) {
    if (typeof err == 'number') { // next(404);
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        // if (app.get('env') == 'development') {
        //   express.errorHandler()(err, req, res, next);
        // } else {
        //   log.error(err);
        err = new HttpError(500);
        res.sendHttpError(err);
        // }
    }
});
app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('/public/index.html', { root: __dirname });

});
app.use(function(req, res) {
    res.render('404', {layout: false, title: '404: File Not Found'});
});





app.listen(port, ip);
console.log("Server running on port 8080");


