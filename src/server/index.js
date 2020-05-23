const express = require('express');
const axios = require('axios');
const { parseString: parseXML } = require('xml2js');

const API_KEY = process.env.API_KEY;
if (!API_KEY) throw new Error("Chave da API não provida");



const server = express();

server.get('/books', (req, res) =>  {
  const { q: query } = req.query;
  
  const apiUrl = `https://www.goodreads.com/search/index.xml?key=${API_KEY}&q=${query}`;

  axios
    .get(apiUrl)
    .then(({ data }) => {
      const results = parseResults(data);
      const books = results.map(result => result['best_book'][0]);

      const cleanedBooks = cleanBooks(books);

      res.status(200);
      res.json(cleanedBooks);
    })
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});





function parseResults(data) {
  let json;

  parseXML(data, (err, result) => {
    if (err) throw new Error(err);
    json = result['GoodreadsResponse'].search[0].results[0].work;
  });

  return json;
}

function cleanBooks(books) {
  return books.map(book => ({
    id: book.id[0]['_'],
    title: book.title[0],
    author: book.author[0].name[0],
    image: {
      normal: book['image_url'][0],
      small: book['small_image_url'][0]
    }
  }));
}





const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));