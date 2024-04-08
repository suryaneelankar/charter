const path = require("path");
const Product = require("../models/Product");

module.exports.addAdminProducts = (req, res, next) => {
    console.log('got req is ::>>', req);
    const title = req.body.title;
    // const imageUrl = req.file;
    const price = req.body.price;
    const description = req.body.description;
    console.log('imageUrl is::>>',imageUrl)
    const product = new Product({
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price,
        // userId:'66042f9bed06443887d361f2',
    });
    // console.log(req.session,'session re is ***************')
    product.save().then((result) => {
        console.log("result is ::>>", result);
        res.send("successlly added product");
    })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.deleteProduct = (req, res, next) => {
    console.log("req.params.id is::>>", req.params.id);
    Product.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send('Product deleted successfully')
        })
        .catch((err) => {
            res.send('Product not found')
        });
};

module.exports.updateProduct = (req, res, next) => {
    const prodId = req.params.id;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;
    console.log(updatedTitle,'updatet title is ')
    Product.findById(prodId).then(product => {
        console.log('searched pro is::>>',product,prodId)
     product.title = updatedTitle;
     product.imageUrl = updatedImageUrl;
     product.description = updatedDescription;
     product.price = updatedPrice;

     product.save()
    .then(result => res.send('updated product successfully'))
    .catch(err => console.log(err))
    }
    );
}

module.exports.getAddedProduct = (req, res, next) => {
    res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
};

module.exports.getShopProducts = (req, res, next) => {
    const fetchData = Product.find()
        .then((result) => {
            console.log('calling this func',result)
            // res.setHeader('Set-Cookie',"isLoggedIn=true; HttpOnly");
            // req.session.isLoggedIn = true;
            return res.send(result);
        }
        )
        .catch((err) => {
            console.log(err);
        });
};

module.exports.getCartProducts = (req, res, next) => {
    const product = new Product();
    res.render("cart", {
        MyTitle: "Cart Page",
    });
};

module.exports.getProducts = (req, res, next) => {
    const product = new Product();
    product.fetchAll((products) =>
        res.render("products", {
            products: products,
            MyTitle: "Shop",
        })
    );
};

module.exports.getProductDetails = (req, res, next) => {
    Product.findById(req.params.id)
        .then((product) => {
            console.log("product is ::>>", product);
            res.send(product);
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.getProductsWithOffset = (req, res, next) => {
    const LimitPerPage = 2;
    const page = req.params.page;
    Product.find()
    .skip((page-1) * LimitPerPage)
    .limit(LimitPerPage)
    .then(products => {
        res.write(JSON.stringify({
            "status": 200,
            "message": 'data retrived successfully',
            "data": products
        }));
        res.end();
        // res.send(products);
    })
    .catch(err => {console.log(err),res.send('no data found')})
}

