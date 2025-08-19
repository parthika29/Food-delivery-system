const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();


const User = require('../models/User');
const Chef = require('../models/Chef');
const Menu = require('../models/Menu');
const Order = require('../models/Order');
const Payment = require('../models/Payment');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  // Clear existing data
  await User.deleteMany({});
  await Chef.deleteMany({});
  await Menu.deleteMany({});
  await Order.deleteMany({});
  await Payment.deleteMany({});

  // Seed Users
  const usersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'users.json')));
  const userRefMap = {};
  const usersToInsert = usersData.map(u => {
    const { ref, ...rest } = u;
    return rest;
  });
  const insertedUsers = await User.insertMany(usersToInsert);
  usersData.forEach((u, idx) => {
    userRefMap[u.ref] = insertedUsers[idx]._id;
  });

  // Seed Chefs
  const chefsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'chefs.json')));
  const chefRefMap = {};
  const chefsToInsert = chefsData.map(c => {
    const { ref, userRef, ...rest } = c;
    return { ...rest, user: userRefMap[userRef] };
  });
  const insertedChefs = await Chef.insertMany(chefsToInsert);
  chefsData.forEach((c, idx) => {
    chefRefMap[c.ref] = insertedChefs[idx]._id;
  });

  // Seed Menus
  const menusData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'menus.json')));
  const menuRefMap = {};
  const menusToInsert = menusData.map(m => {
    const { ref, chefRef, ...rest } = m;
    return { ...rest, chef: chefRefMap[chefRef] };
  });
  const insertedMenus = await Menu.insertMany(menusToInsert);
  menusData.forEach((m, idx) => {
    menuRefMap[m.ref] = insertedMenus[idx]._id;
  });

  // Seed Orders
  const ordersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'orders.json')));
  const orderRefMap = {};
  const ordersToInsert = ordersData.map(o => {
    const { ref, userRef, chefRef, menuRef, ...rest } = o;
    return {
      ...rest,
      user: userRefMap[userRef],
      chef: chefRefMap[chefRef],
      menu: menuRefMap[menuRef]
    };
  });
  const insertedOrders = await Order.insertMany(ordersToInsert);
  ordersData.forEach((o, idx) => {
    orderRefMap[o.ref] = insertedOrders[idx]._id;
  });

  // Seed Payments
  const paymentsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'payments.json')));
  const paymentsToInsert = paymentsData.map(p => {
    const { ref, orderRef, userRef, ...rest } = p;
    return {
      ...rest,
      order: orderRefMap[orderRef],
      user: userRefMap[userRef]
    };
  });
  await Payment.insertMany(paymentsToInsert);

  console.log('Database seeded from JSON files!');
  mongoose.connection.close();
}

seed();
