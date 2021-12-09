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

const postUser = async (req=request, res=response) =>{
  try {
    const user = new User(req.body)
    const userExist = await User.findOne({
      name: req.body.name,
      lastName: req.body.lastName,
      dni: req.body.dni
    })
if (userExist) {
  res.status(400).json({
    error: 'Error, existing user',
  });
} else{
  await user.save();
  res.status(201).json({mensaje: "User added successfully", datos:user});
}
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
}

const putUser = async (req=request, res = response) => {
  try {
    const userId = req.params.id;
    let user = req.body;

    const userExist = await User.findOne({
      name: req.body.name,
      lastName: req.body.lastName,
      dni: req.body.dni,
      _id: { $ne: userId }
    })
    if (userExist) {
      return res.status(400).json({
        error: 'Error, existing user',
      });
    } else{
      user = await User.findByIdAndUpdate(userId, user, {
        new: true,
      });
    }
    if (user) {
      res.json({mensaje:"User modified successfully", datos: user});
    } else{
      res.status(404).json({ error: 'User doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
}

const deleteUser = async (req = request, res = response) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (user) {
      res.json({mensaje: "User deleted successfully", datos: user});
    } else{
      res.status(404).json({ error: 'User doesn´t exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error has occurred' });
  }
}

module.exports = {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser
};