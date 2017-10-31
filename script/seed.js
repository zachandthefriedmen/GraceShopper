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
const {User, Order} = require('../server/db/models');

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
  console.log(`seeded ${orders.length} orders`);

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
