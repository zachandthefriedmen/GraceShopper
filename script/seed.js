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
    Category.create({ name: 'Leashes/Collars' }),
    Category.create({ name: 'Treats' }),
    Category.create({ name: 'Costumes' }),
    Category.create({ name: 'Paw Wax' }),
    Category.create({ name: 'Furniture' }),
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
    Product.create({
      name: 'Enchanted Home Pet Rockwell Pet Sofa',
      price: 169.98,
      images: ['https://images-na.ssl-images-amazon.com/images/I/61XiIHpk0QL._SX425_.jpg'],
      description: "Jewel, a 45 pound Labrador-mix, can be found on the Rockwell sofa, a high quality faux-leather pet bed with a soft and plush embossed micro velvet seat cushion, featuring a back storage pocket for toys and bones. The high-loft, milled foam cushion features a removable/washable cover. The 2\" feet lift the bed off the ground, keeping your pet comfortable and draft free. Rockwell boasts our fine, fully upholstered, durable furniture grade construction.",
      rating: 5,
      available: true,
    }),
    Product.create({
      name: 'KOPEKS Deluxe Orthopedic Memory Foam Lounge Dog Bed',
      price: 99.99,
      images: ['https://i.ebayimg.com/images/g/qPMAAOSwJoNZw7or/s-l500.jpg', 'http://cdn.shopify.com/s/files/1/0897/4536/products/61mZF-XEGuL._SL1500_1024x1024.jpg?v=1495642235'],
      description: "This memory foam bed is orthopedic grade for increased support and ultimate comfort. It will not flatten overtime. Similar to therapeutic foam found in high end mattress stores. The KOPEKS Orthopedic Memory Foam Round Sofa Lounge Dog Bed can relieve your pet’s aches and pains. It is great for pets with arthritis, hip dysplasia, joint and muscle stiffness or simply to pamper your pooch that so much deserves the Best Sleep Quality. The KOPEKS Orthopedic Memory Foam Round Sofa Lounge Dog Bed has two covers that are zippered and easily removable for washing.",
      rating: 5,
      available: true,
    }),
    Product.create({
      name: 'FurHaven Orthopedic Dog Couch',
      price: 42.29,
      images: ['https://images-na.ssl-images-amazon.com/images/I/81u3CbyMsvL.jpg'],
      description: "Perfect for pets young and old, the Deluxe Plush and Suede Sofa-Style Orthopedic Pet Bed is designed to provide your loved one with maximum comfort for a good night’s rest.",
      rating: 5,
      available: true,
    }),
    Product.create({
      name: 'Paw Nectar',
      price: 14.97,
      images: ['https://images-na.ssl-images-amazon.com/images/I/81ljFvQ7rRL._SX522_.jpg'],
      description: "QualityPet is proud to introduce Paw Nectar, a holistic, natural, and organic paw wax that protects and heals chapped, cracked, and damaged paws. Paw Nectar is 100% ORGANIC and made with NATURAL INGREDIENTS that soothe and heal your dog's paws. Nozzle Nectar's proprietary formula is proven to quickly and painlessly cure a range of issues with dog paws and skin including dry, cracked, chaffed, chapped, and damaged paws. Other formulations don't contain the most important ingredients for preventing curing paw problems, so don't be fooled, Nozzle Nectar is the REAL DEAL! So don't wait, buy Nozzle Nectar today! Our 100% satisfaction guaranteed policy means that you have nothing to lose and everything to gain! We'll refund you 100% of the cost if you aren't 100% satisfied!",
      rating: 5,
      available: true,
    }),
    Product.create({
      name: 'Top Performance Paw Defense and Paw Protection Wax',
      price: 13.99,
      images: ['https://img.chewy.com/is/image/catalog/124990_MAIN._AC_SL1500_V1495546552_.jpg'],
      description: "Specially formulated to act as an invisible barrier to help prevent potential paw damage Top Performance Paw Defense Paw Protection Wax contains vitamin E to moisturize, help soothe wounds and keep paws healthy. Made in the U.S.A. When applied, Top Performance Paw Defense Paw Protection Wax protects paws from damage caused by abrasive surfaces hot or cold pavement, ice, and salt. Packaged in a 60g container.",
      rating: 5,
      available: true,
    }),
    Product.create({
      name: 'Pet Soft & Comfy Bowtie Dog Collar',
      price: 16.99,
      images: ['https://images-na.ssl-images-amazon.com/images/I/41I9NPFjXgL._SL500_AC_SS350_.jpg'],
      description: "What make us unique? Fabric: each collar is made with 100% cotton designer fabric. Spreading: the fabric is sewn on high quality cotton spreading. Hardware: all hardware is heavy duty. D-rings are welded for strength and durability. They are all handmade, adjustable for a perfect fit. Unlike most bowties made for dogs, these are traditional double bowties. Each bowtie is hand sewn and attached to collar using elastic strap. The bowtie can be attached to any collar without any alterations to the collar itself.",
      rating: 5,
      available: true,
    }),
    Product.create({
      name: 'Beirui Sharp Spiked Studded Dog Collar',
      price: 13.99,
      images: ['https://images-na.ssl-images-amazon.com/images/I/41vPJ0%2BYYJL._SS500_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/51Gqd9k7lwL._SL500_AC_SS350_.jpg'],
      description: "As you know, it's hard to hold a macho badass dog. The most bothersome situation is your pet get out of your control and attacked by others. The sharp spikes will make he or she get all jacked up before you can do anything.",
      rating: 5,
      available: true,
    }),
    Product.create({
      name: 'Gnawtlers - Premium Elk Antlers For Dogs',
      price: 19.99,
      images: ['https://images-na.ssl-images-amazon.com/images/I/41lTi%2BUdmlL._SL500_AC_SS350_.jpg', 'http://cdn.shopify.com/s/files/1/1355/5443/products/61wGbbJKn0L._SL1077_grande.jpg?v=1484547493'],
      description: "USA ELK ANTLERS FOR DOGS LARGE is sized for Dogs 40+lbs, such as a Labrador, German Shepherd, and Golden Retriever. The length of the Large Gnawtler elk antlers is 6\" - 7\". The large dog bone is a good choice for dog toys for aggressive chewers & natural dog bones for the large guys that need something to gnaw on besides your furniture, shoes or house. Large Gnawtlers are also great for large size dogs when they are teething puppies!",
      rating: 5,
      available: true,
    }),
    Product.create({
      name: 'Country Butcher 50pk Knee Caps',
      price: 49.99,
      images: ['https://www.petflow.com/images/default/products/maximal/35364-1452125483.jpg', 'https://images-na.ssl-images-amazon.com/images/I/91vIv3a41FL._SL1500_.jpg'],
      description: "Because the purpose of the kneecap is to protect and cover, Country Butcher Knee Caps are some of the strongest and thickest bones available. The beef knee joints are surrounded with meat and have a hint of liquid smoke for hours of gnawing pleasure. Country Butcher Bones are prepared by professionally trained butchers & expertly baked in smokehouses. All Country Butcher Bones have a tasty meat cover for the dog's ultimate enjoyment. The raw products are all USDA inspected \"human consumption\". No formaldehyde or acetone is allowed on premises and all products carry sell-by dates. Made in USA and 100% Guaranteed!",
      rating: 5,
      available: true,
    }),
    Product.create({
      name: 'Fleece Dog Hoodies with Pocket',
      price: 11.99,
      images: ['https://images-na.ssl-images-amazon.com/images/I/61RtXxczpnL._SY355_.jpg'],
      description: "Caution: this particular outfit does not cater to USA sizes, please measure accordingly before checking out.",
      rating: 5,
      available: true,
    }),
    Product.create({
      name: 'Petacc Dog Boots Water Resistant Dog Shoes',
      price: 21.99,
      images: ['https://images-na.ssl-images-amazon.com/images/I/61W4CroJ7eL._SY355_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/51C4AKQVsLL._SX522_.jpg'],
      description: "Made of tough, water resistant material, flexible, skid-resistant and waterproof sturdy soles, capable to keep debris out, not only bring more comfort and keep your love dog clean when they running outside but also keep their paws warm and walking on snow safty in winter.",
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
  await products[6].addCategory(5);
  await products[7].addCategory(5);
  await products[8].addCategory(5);
  await products[9].addCategory(4);
  await products[10].addCategory(4);
  await products[11].addCategory(1);
  await products[12].addCategory(1);
  await products[13].addCategory(2);
  await products[14].addCategory(2);
  await products[15].addCategory(3);
  await products[16].addCategory(3);

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
    Review.create({
      stars: 1,
      title: 'These shoes don\'t fit',
      body: "Also, there\'s four of them.",
    }),
    Review.create({
      stars: 5,
      title: 'Knees.',
      body: "Seriously. Knees. WTF.",
    }),
    Review.create({
      stars: 5,
      title: 'A little tight.',
      body: "I don't own a dog. This is for me.",
    }),
    Review.create({
      stars: 2,
      title: 'Paw Nectar is better',
      body: "Everyone knows that.",
    }),
    Review.create({
      stars: 2,
      title: 'Boo Paw Nectar',
      body: "You might as well wax your paws with a candle.",
    }),
    Review.create({
      stars: 5,
      title: 'Hilarious',
      body: "A bow tie for dogs. What will they think of next?",
    }),
    Review.create({
      stars: 5,
      title: 'Delicious',
      body: "The knee bone is connected to the stomach bone!",
    }),
    Review.create({
      stars: 1,
      title: 'Defective',
      body: "The pocket\'s on the back! How is my dog supposed to use it?",
    }),
    Review.create({
      stars: 5,
      title: 'It\'s what the pros use',
      body: "If you need wax, you need Musher\'s secret.",
    }),
    Review.create({
      stars: 3,
      title: '$170!',
      body: "That\'s a $170 dog couch. What dog has $170 to spend on a couch. They probably don\'t have any money. \'Cause they're a dog.",
    }),
    Review.create({
      stars: 4,
      title: 'Probably very comfortable',
      body: "But it\'s not for me, so I\'ll never know.",
    }),
    Review.create({
      stars: 2,
      title: 'Kind of gross',
      body: "But not as bad as those knees.",
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
  await reviews[9].setUser(6);
  await reviews[9].setProduct(17);
  await reviews[10].setUser(4);
  await reviews[10].setProduct(15);
  await reviews[11].setUser(2);
  await reviews[11].setProduct(13);
  await reviews[12].setUser(5);
  await reviews[12].setProduct(11);
  await reviews[13].setUser(9);
  await reviews[13].setProduct(10);
  await reviews[14].setUser(4);
  await reviews[14].setProduct(12);
  await reviews[15].setUser(3);
  await reviews[15].setProduct(15);
  await reviews[16].setUser(3);
  await reviews[16].setProduct(16);
  await reviews[17].setUser(1);
  await reviews[17].setProduct(3);
  await reviews[18].setUser(7);
  await reviews[18].setProduct(7);
  await reviews[19].setUser(4);
  await reviews[19].setProduct(7);
  await reviews[20].setUser(8);
  await reviews[20].setProduct(14);

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
