const { request, response } = require('express');
const User = require('../Model/users');

const getUsers = async (req = request, res = response) => {
  try {
    const { name, lastName, telephone, direction, dni } = req.query;
    let termsUser = {};

    if (name) {
      const regex = new RegExp(name, 'i');
      termsUser.name = { $regex: regex };
    }
    if (lastName) {
      const regex = new RegExp(lastName, 'i');
      termsUser.lastName = { $regex: regex };
    }
    if (telephone) {
      const regex = new RegExp(telephone, 'i');
      termsUser.telephone = { $regex: regex };
    }
    if (direction) {
      const regex = new RegExp(direction, 'i');
      termsUser.direction = { $regex: regex };
    }
    if (dni) {
      const regex = new RegExp(dni, 'i');
      termsUser.dni = { $regex: regex };
    }
    const users = await User.find(termsUser);
    res.send(users);
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
    console.log(error);
  }
};

const getUser = async (req = request, res = response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
};
