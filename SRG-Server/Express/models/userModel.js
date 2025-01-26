const db = require("../config/db.config.js");

const User = {
  createUser: (userData, callback) => {
    const query =
      "INSERT INTO users (username, email, password) VALUES(?, ?, ?)";
    db.query(
      query,
      [userData.username, userData.email, userData.password],
      (err, results) => {
        if (err) {
          console.error("Error creating user:", err);
          return callback(err, null);
        }
        console.log("User created successfully:", results.insertId);
        callback(null, results);
      }
    );
  },

  getAllUsers: (callback) => {
    const query = "SELECT * FROM users";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching users:", err);
        return callback(err, null);
      }
      console.log("Fetched users:", results.length);
      callback(null, results);
    });
  },

  getUserByEmail: (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error("Error fetching user by email:", err);
        return callback(err, null);
      }
      callback(null, results[0]); // Return the first match
    });
  },
};

module.exports = User;
