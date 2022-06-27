import User from "../models/userModel";

export const addProductToCart = async (req, res) => {
  const user = await User.findOne({_id:req.user._id}).select({cart:1});
  let cart = user.cart;
  const addProductTotal = parseFloat(
    req.body.product.price * req.body.product.quantity
  ).toFixed(2);
  if (cart) {
    let total = cart.total + addProductToCart;
    let products = [...cart.products];
    const productIndex = products.findIndex(
      (product) => product.productId === req.body.product._id
    );
    const currentProduct = products[productIndex];
    if (currentProduct) {
      currentProduct.quantity += +req.body.product.quantity;
      currentProduct.price = req.body.product.price;
      currentProduct.subtotal = parseFloat(
        currentProduct.quantity * currentProduct.price
      );
      products[productIndex] = currentProduct;
    } else {
      products.push({
        ...req.body.product,
        productId: req.body.product._id,
        subtotal: addProductTotal,
      });
    }

    cart.products = products;
    cart.total = parseFloat(
      products.reduce((total, _product) => total + _product.subtotal, 0)
    ).toFixed(2);

    user.cart = cart;
  } else {
    let cart = {
      products: {
        ...req.body.product,
        productId: req.body.product._id,
        subtotal: parseFloat(
          req.body.product.price * req.body.product.quantity
        ),
      },
      total: addProductTotal,
    };
    user.cart = cart;
    
  
  }
  

  user.save((err,updatedUser)=>{
    if(err){
      res.send(err);
    }else{
      res.json(updatedUser.cart)
    }
  });
};
export const deleteProductToCart = async (req, res) => {
  const user = await User.findOne({_id:req.user._id}).select({cart:1});
  let cart = user.cart;
  if (cart) {
    let products = [...cart.products];
    const productIndex = products.findIndex((_product)=>_product.productId===req.body.product.productId);
    const product = products[productIndex];
    product.quantity -= req.body.product.quantity;
    product.subtotal = parseFloat(
      product.price * product.quantity
    ).toFixed(2);
    products[productIndex] = product;
    if(product.quantity <= 0){
      products.splice(productIndex,1);
    }
    cart.products = products;
    cart.total = parseFloat(
      products.reduce((total, _product) => total + _product.subtotal, 0)
    ).toFixed(2);

    user.cart = cart;
    await user.save();
    res.json(cart);




    
  }else{
    res.json(cart);
  }

  
};
export const getCart = async (req, res) => {
  const user = await User.findOne({_id:req.user._id}).select({cart:1});
  res.json(user.cart);
  //res.send("GET: get cart");
};
