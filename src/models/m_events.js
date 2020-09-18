/**
 * Config MySQL
 * .
 * load config mysql
 */
const conn = require('../helpers/mysql');

/**
 * Helpers
 */
const myHelpers = require('../helpers/myHelpers');

/**
 * CRUD
 */
async function getData(search, page, limit) {
  let sqlQuery = "";

  // pagination
  const datas = await getTotalData();
  let pages = 0;
  pages = Math.ceil(datas / limit);
  let start = (limit * page) - limit;
  
  if (limit < 1) {
    sqlQuery = 'SELECT * FROM events';
  } else {
   sqlQuery = `
   SELECT * FROM 
     events 
   WHERE 
     location LIKE '%${search}%' OR 
     title LIKE '%${search}%' OR 
     date LIKE '%${search}%' OR 
     participant LIKE '%${search}%' OR 
     note LIKE '%${search}%'
   LIMIT ${start}, ${limit}
   `;
  }
   
  return new Promise((resolve, reject) => {
    conn.query(sqlQuery, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve({data: result, totalPage: pages, previousPage: "", nextPage: ""})
    })
  })
}

function addData(data) {
  return new Promise((resolve, reject) => {
    const sqlQuery = "INSERT INTO events SET ?";
    conn.query(sqlQuery, data, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
    })
  })
}

function getDataByName(title) {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM events WHERE title = ?";
    conn.query(sqlQuery, title, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
    })
  })
}

function getFieldsName() {
  return new Promise((resolve, reject) => {
    conn.query(`DESCRIBE events`, function (error, result) {
      //      conn.query(`DESCRIBE events`, function (error, result) {
      if (error) {
        reject(error);
      }
      let fields = {};
      result.forEach(field => {
        fields[field.Field] = field.Field;
      });
      resolve(fields);
    })
  })

}

function getTotalData() {
  return new Promise((resolve, reject) => {
    conn.query(`SELECT COUNT(id) AS total_data FROM events`, function (error, result) {
      //      conn.query(`DESCRIBE events`, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result[0].total_data);
    })
  })

}


module.exports = {
  getData,
  addData,
  getDataByName,
  getFieldsName,
  getTotalData,
}