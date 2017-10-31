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
const {User, Order, Category, Product, Review} = require('../server/db/models');

async function seed () {
  await db.sync({force: true});
  console.log('db synced!');
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Fryman',
      email: 'cody@email.com',
      password: '123',
      admin: true,
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'Eddie',
      email: 'murphy@email.com',
      password: '123',
      admin: false,
    })
  ]);
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`);

  const orders = await Promise.all([
    Order.create({
      items: [{productId: 1, qty: 2, price: 4.65},
              {productId: 2, qty: 154, price: 0.99}],
      status: 'open',
      email: 'bento@dogs.woof',
      orderDate: new Date(),
      address: 'Bento Thor, 123 Dog Street, Chicago, IL 60608'
    }),
    Order.create({
      items: [{productId: 4, qty: 4, price: 4.00},
              {productId: 24, qty: 1, price: 1900.99}],
      status: 'completed',
      email: 'chili@dogs.woof',
      orderDate: new Date(),
      address: 'Chili Thor, 123 Bark Boulevard, Chicago, IL 60607'
    }),
  ]);
  await orders[0].setUser(1);
  await orders[1].setUser(2);
  console.log(`seeded ${orders.length} orders`);

  const categories = await Promise.all([
    Category.create({ name: 'leashes' }),
    Category.create({ name: 'treats' }),
  ]);
  console.log(`seeded ${categories.length} orders`);

  const products = await Promise.all([
    Product.create({
      name: 'Super Duper Leash',
      price: 36.95,
      images: ['https://img.chewy.com/is/catalog/67364_MAIN._AC_SL1500_V1477926503_.jpg',
        'https://img.chewy.com/is/catalog/104017_MAIN._AC_SL1500_V1477485456_.jpg'],
      description: 'This is the coolest leash you have EVER seen! It also will never break.',
      rating: 2.3,
      available: true,
    }),
    Product.create({
      name: 'Delicious Bone',
      price: 4.99,
      images: ['https://s7d1.scene7.com/is/image/PETCO/2178937-right-1',
        'https://www.bestbullysticks.com/content/images/thumbs/0005502_monster-dog-bone-14-18-inches.jpeg'],
      description: "This bone is HUGE. We're talkin' MASSIVE. It's literally a femur.",
      rating: 4.7,
      available: false,
     }),
  ]);
  await products[0].addCategory(1);
  await products[1].addCategory(2);
  console.log(`seeded ${products.length} orders`);

  const reviews = await Promise.all([
    Review.create({
      stars: 5,
      title: 'This leash will never break',
      body: "I bought this leash and it hasn't broken. So it'll never break! 5 stars",
    }),
    Review.create({
      stars: 2,
      title: 'This bone broke',
      body: "My dog chewed on this bone and it broke within 2 weeks. It's garbage.",
     }),
  ]);
  await reviews[0].setUser(1);
  await reviews[0].setProduct(1);
  await reviews[1].setUser(2);
  await reviews[1].setProduct(2);
  console.log(`seeded ${reviews.length} orders`);

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
