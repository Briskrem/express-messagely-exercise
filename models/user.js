/** User class for message.ly */
const db = require('../db')
const bcrypt = require('bcrypt')
const {BCRYPT_WORK_FACTOR, SECRET_KEY} = require('../config')
const jwt = require('jsonwebtoken')



/** User of the site. */

class User {
  constructor(username, password, first_name, last_name, phone){
    this.username = username
    this.password = password
    this.first_name=first_name
    this.last_name = last_name
    this.phone = phones
  }


  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

   static async register({username, password, first_name, last_name, phone}) {
    let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    console.log(hashedPassword)
    const results = await db.query(`
      INSERT INTO users 
      (username, password, first_name, last_name, phone,join_at, last_login_at)
      VALUES 
      ($1, $2, $3, $4, $5,current_timestamp, current_timestamp)
      RETURNING username, password, first_name, last_name, phone
    `,[username, hashedPassword, first_name, last_name, phone])
    return results.rows[0]
   }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate({username, password}) { 
    let results = await db.query(`
      SELECT * FROM users
      WHERE username = $1
    `,[username])
    let user = results.rows[0]
    let x = await bcrypt.compare(password, user.password)
    if(x){
      const token = jwt.sign({ username }, SECRET_KEY);
      return token
    }
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) { }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() {
    let results = await db.query(
      `SELECT * from users`
    )
    console.log(results.rows, 'models')
    return results.rows
  }




  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) { 
      let results = await db.query(
        `SELECT * FROM users
        WHERE username = $1`,
        [username]
      )
      console.log(results.rows[0])
      return results.rows[0]
  }








  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {
    let results = await db.query(
      `SELECT `
    )
  }




  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) {
    console.log('inside users model')
    let results = await db.query(
      `SELECT m.body FROM messages AS m
      JOIN users AS u 
      ON u.username = m.to_username
      WHERE u.username = $1`,
      [username]
    )
    console.log(results.rows, 'models')
    return results.rows
   }
}


module.exports = User;