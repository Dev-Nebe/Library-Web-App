const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadsService');

const parser = xml2js.Parser({ explicitArray: false });

const bookService = () => {
  const getBookById = (id) => new Promise((resolve, reject) => {
    axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=QrW10MsxKhQbLYPawQXnwg`)
      .then((response) => {
        parser.parseString(response.data, (err, result) => {
          if (err) {
            debug(err);
          } else {
            debug(result);
            resolve(result.GoodreadsResponse.book);
          }
        });
      })
      .catch((error) => {
        reject(error);
        debug(error);
      });
  });

  return { getBookById };
};

module.exports = bookService();
