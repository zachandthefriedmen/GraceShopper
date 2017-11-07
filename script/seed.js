/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db');
const { User, Order, Category, Product, Review, OrderProduct } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({
      firstName: 'Matt',
      lastName: 'Thor',
      email: 'matt@thor.com',
      password: '123',
      admin: true,
    }),
    User.create({
      firstName: 'Rick',
      lastName: 'Polidoro',
      email: 'ponies@ponies.com',
      password: '123',
      admin: false,
    }),
    User.create({
      firstName: 'Marty',
      lastName: 'Feelgood',
      email: 'marty@feel.good',
      password: '123',
      admin: false,
    }),
    User.create({
      firstName: 'Ben',
      lastName: 'Odisho',
      email: 'ben@odisho.com',
      password: '123',
      admin: true,
    }),
    User.create({
      firstName: 'Rin',
      lastName: 'Tin tin',
      email: 'rin@tintin.dog',
      password: '123',
      admin: false,
    }),
    User.create({
      firstName: 'Zach',
      lastName: 'Friedman',
      email: 'zach@cats.com',
      password: '666',
      admin: true,
    }),
    User.create({
      firstName: 'Bento',
      lastName: 'Thor',
      email: 'bento@dogs.woof',
      password: '123',
      admin: false,
    }),
    User.create({
      firstName: 'Chili',
      lastName: 'Thor',
      email: 'chili@dogs.woof',
      password: '123',
      admin: false,
    }),
    User.create({
      firstName: 'Snowball',
      lastName: 'Dog',
      email: 'fluffy@white.dog',
      password: '123',
      admin: false,
    }),
  ]);
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`);

  const orders = await Promise.all([
    Order.create({
      status: 'open',
      email: 'bento@dogs.woof',
      orderDate: new Date(),
      sessionId: 'new session',
      address: 'Bento Thor, 123 Dog Street, Chicago, IL 60608'
    }),
    Order.create({
      status: 'completed',
      email: 'chili@dogs.woof',
      orderDate: new Date(),
      sessionId: 'new session',
      address: 'Chili Thor, 123 Bark Boulevard, Chicago, IL 60607'
    }),
    Order.create({
      status: 'created',
      email: 'rin@tintin.dog',
      orderDate: new Date(),
      sessionId: 'new session',
      address: 'Rintintin, 123 Bark Boulevard, Chicago, IL 60607'
    }),
    Order.create({
      status: 'cancelled',
      email: 'fluffy@white.dog',
      orderDate: new Date(),
      sessionId: 'new session',
      address: 'Snowball, 123 Bark Boulevard, Chicago, IL 60607'
    }),
  ]);
  await orders[0].setUser(7);
  await orders[1].setUser(8);
  await orders[2].setUser(5);
  await orders[3].setUser(9);
  console.log(`seeded ${orders.length} orders`);

  const categories = await Promise.all([
    Category.create({ name: 'Leashes' }),
    Category.create({ name: 'Treats' }),
    Category.create({ name: 'Costumes' }),
    Category.create({ name: 'Paw Wax' }),
  ]);
  console.log(`seeded ${categories.length} categories`);

  const products = await Promise.all([
    Product.create({
      name: 'Primal Pet Gear Dog Leash',
      price: 14.95,
      images: ['https://images-na.ssl-images-amazon.com/images/I/41NfLs9z3hL._SL500_AC_SS350_.jpg'],
      description: "The Primal Pet Gear dog leash dual handled with Black Padded Handles has been specifically designed with 2 handles, one at the end of the leash at 6ft and another 1ft from the clip. Keep your beloved 4-legged companion safe at all times! We take pride in the high quality of our dual handle dog leash, which has been manufactured with top quality materials.",
      rating: 5,
      available: true,
    }),
    Product.create({
      name: 'Jack&Pup Premium Himalayan Yak Cheese Dog Chews Dog Treat',
      price: 14.95,
      images: ['https://images-na.ssl-images-amazon.com/images/I/81c6Y-EcBSL._SY355_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/41C0Qe0Z6pL._SL500_.jpg'],
      description: "Himalayan Yak Cheese Dog Chews is a unique, extremely hard textured, all-natural dog treat which dogs find irresistible. Amazingly long lasting; your canine will be entertained for many hours, chewing away and enjoying its’ delicious flavor!",
      rating: 5,
      available: true,
    }),
    Product.create({
      name: 'Musher\'s Secret Pet Paw Protection Wax',
      price: 12.25,
      images: ['https://images-na.ssl-images-amazon.com/images/I/81RhGVakJML._SX355_.jpg', 'https://cdn.shopify.com/s/files/1/1666/9605/products/mushers-wax-mushers-secret-paw-pad-wax-7_480x480.jpg?v=1485461704'],
      description: "Protects paws from sand, hot pavement, ice and salt with all natural 100-percent wax-based cream. Perfect for mushing, hunting, walking or before any outdoor activity. Easy-to-apply formula contains vitamin E to moisturize and help heal wounds and keep paws healthy.",
      rating: 5,
      available: true,
    }),
    Product.create({
      name: 'GoGo Pet Products 50 Count Natural Top Cut Cow Hooves',
      price: 33.03,
      images: ['https://images-na.ssl-images-amazon.com/images/I/91mxb7NY8iL.jpg', 'https://i.pinimg.com/736x/9c/e1/77/9ce177a707d8591acbcbe84ecdf46c85--dog-dental-chews-dog-chews.jpg'],
      description: "All natural; no preservatives. Long-Lasting, flavorful chew. Fill with peanut butter to keep active chewers occupied. 50 cow hooves per box.",
      rating: 5,
      available: true,
    }),
    Product.create({
      name: 'Lion Mane for Dog',
      price: 8.88,
      images: ['https://images-na.ssl-images-amazon.com/images/I/71dlySnibDL._SY355_.jpg'],
      description: "This item is adjustable,Easy to wear and take off.Fits pet's neck girth from 15.7\" to 31\" (40cm to 80cm), perfect for large or medium dogs. Faux fur and polyester, 100% brand new and high quality guaranteed. It doesn't cause any discomfort or irritation to your pet.",
      rating: 5,
      available: true,
    }),
    Product.create({
      name: 'Bantha Pet Costume',
      price: 17.45,
      images: ['https://images.halloweencostumes.com/products/14360/1-1/bantha-pet-costume.jpg', 'https://images-na.ssl-images-amazon.com/images/I/61hZ8wzTApL._SY450_.jpg', 'https://i.ytimg.com/vi/t1k6xq68DqE/maxresdefault.jpg'],
      description: "Baby Tusken Raiders are sad little creatures. They want to ride big banthas like their parents, but they're just too little to have their own mount...until now! This Bantha pet costume transforms your pooch into a perfect little bantha mount for adventurous little Sand People. Of course, your dog may not be as well suited to the desert sands of Tatooine, so you may have to just let the little Tusken Raider practice riding him in the living room, or in your yard, but any kind of practice is good for him!",
      rating: 5,
      available: true,
    }),
  ]);
  await products[0].addCategory(1);
  await products[1].addCategory(2);
  await products[2].addCategory(4);
  await products[3].addCategory(2);
  await products[4].addCategory(3);
  await products[5].addCategory(3);

  console.log(`seeded ${products.length} products`);

  const reviews = await Promise.all([
    Review.create({
      stars: 5,
      title: 'The cutest!',
      body: "He looks just like a Bantha!",
    }),
    Review.create({
      stars: 4,
      title: 'Roar',
      body: "I am become lion.",
    }),
    Review.create({
      stars: 1,
      title: 'Doesn\'t work...',
      body: "This only makes your dog LOOK like a lion.",
    }),
    Review.create({
      stars: 5,
      title: 'This leash will never break',
      body: "I bought this leash and it hasn't broken. So it'll never break! 5 stars",
    }),
    Review.create({
      stars: 5,
      title: 'Good old fashion hooves',
      body: "Just like mom used to make.",
    }),
    Review.create({
      stars: 1,
      title: 'Not funny',
      body: "I don't approve.",
    }),
    Review.create({
      stars: 3,
      title: 'A daily necessity',
      body: "Don't leave your house without paw wax.",
    }),
    Review.create({
      stars: 4,
      title: 'Himallujah',
      body: "You can really taste the yak.",
    }),
    Review.create({
      stars: 2,
      title: 'meh',
      body: "Frankly, too much yak for my taste.",
    }),
  ]);
  await reviews[0].setUser(4);
  await reviews[0].setProduct(6);
  await reviews[1].setUser(7);
  await reviews[1].setProduct(5);
  await reviews[2].setUser(6);
  await reviews[2].setProduct(5);
  await reviews[3].setUser(1);
  await reviews[3].setProduct(1);
  await reviews[4].setUser(9);
  await reviews[4].setProduct(4);
  await reviews[5].setUser(2);
  await reviews[5].setProduct(4);
  await reviews[6].setUser(3);
  await reviews[6].setProduct(3);
  await reviews[7].setUser(5);
  await reviews[7].setProduct(2);
  await reviews[8].setUser(6);
  await reviews[8].setProduct(2);
  console.log(`seeded ${reviews.length} reviews`);

  const orderProducts = await Promise.all([
        OrderProduct.create({
          quantity: 1,
          price: 14.95,
          productId: 1,
          orderId: 1,
        }),
        OrderProduct.create({
          quantity: 2,
          price: 29.90,
          productId: 2,
          orderId: 1,
        }),
        OrderProduct.create({
          quantity: 1,
          price: 33.03,
          productId: 4,
          orderId: 2,
        }),
        OrderProduct.create({
          quantity: 1,
          price: 8.88,
          productId: 5,
          orderId: 2,
        }),
        OrderProduct.create({
          quantity: 1,
          price: 12.25,
          productId: 6,
          orderId: 3,
        }),
        OrderProduct.create({
          quantity: 1,
          price: 12.25,
          productId: 3,
          orderId: 3,
        }),
        OrderProduct.create({
          quantity: 50,
          price: 1651.50,
          productId: 4,
          orderId: 4,
        }),
      ]);
      console.log('creating product/order associations');

      console.log(`seeded ${orderProducts.length} order-products`);

  console.log(`seeded successfully`);
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...');
