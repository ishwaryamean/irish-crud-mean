var db = require('../db/db')
const { Validator } = require('node-input-validator');

exports.insertBooks = async (req, res) => {
    let values = req.body;
    const v = new Validator(req.body, {
        title: 'required',
        author: 'required',
        description: 'required',
        publication_year: 'required',
        isbn: 'required',
    });

    v.check().then((matched) => {
        if (!matched) {
            res.status(422).send(v.errors);
        } else {
            let table = 'books_collection'
            let query = `insert into ${table} (title,author,description,publication_year,isbn)
                values('${values.title}','${values.author}','${values.description}','${values.publication_year}','${values.isbn}')`
            db.query(query, values, (err, data) => {
                if (err) {
                    res.json({
                        status: false,
                        message: 'Error inserting book into database',
                        data: err
                    })
                } else if (data.affectedRows === 0) {
                    res.json({
                        status: false,
                        message: 'Book not found',
                        data: data
                    })
                } else if (data.warningCount > 0) {
                    res.json({
                        status: false,
                        message: 'Invalid ISBN',
                        data: data
                    })
                } else {
                    res.json({
                        status: true,
                        message: 'Book inserted successfully',
                        data: data
                    })
                }
            })
        }
    });
}

exports.getBooks = async (req, res) => {
    let table = 'books_collection'
    let query = `select * from ${table}`
    db.query(query, (err, data) => {
        if (err) {
            res.json({
                status: false,
                message: 'Error fetching books from database',
                data: err
            })
        } else if (data.length === 0) {
            res.json({
                status: false,
                message: 'No books found',
                data: data
            })
        } else {
            res.json({
                status: true,
                message: 'Books fetched successfully',
                data: data
            })
        }
    })
}

exports.updateBooks = async (req, res) => {
    let table = 'books_collection'
    let id = req.params.id
    let value = req.body
    let updatequery = `UPDATE ${table} SET ? WHERE id = ${id}`
    db.query(updatequery, [value], (err, data) => {
        if (err) {
            res.json({
                status: false,
                message: 'Error updating book in database',
                data: err
            })
        } else if (data.affectedRows === 0) {
            res.json({
                status: false,
                message: 'Book not found',
                data: data
            })
        } else if (data.warningCount > 0) {
            res.json({
                status: false,
                message: 'Invalid ISBN',
                data: data
            })
        } else {
            res.json({
                status: true,
                message: 'Book updated successfully',
                data: data
            })
        }
    })
}

exports.deleteBooks = async (req, res) => {
    let table = 'books_collection'
    let value = req.params.id
    let deletequery = `delete from ${table} where id=${value}`
    db.query(deletequery, (err, data) => {
        if (err) {
            res.json({
                status: false,
                message: 'Error deleting book from database',
                data: err
            })
        } else if (data.affectedRows === 0) {
            res.json({
                status: false,
                message: 'Book not found',
                data: data
            })
        } else {
            res.json({
                status: true,
                message: 'Book deleted successfully',
                data: data
            })
        }
    })
}

exports.bookSearch = async (req, res) => {
    const searchTerm = req.query.term;
    if (searchTerm == "") {
        let query = `select * from books_collection`
        db.query(query, (err, results) => {
            if (err) {
                res.status(500).json({
                    status: false,
                    message: 'Error searching for books',
                    data: err
                });
                return;
            }
            res.json(results);
        });
    } else {
        const sql = `SELECT * FROM books_collection WHERE 
         title LIKE '%${searchTerm}%' OR
         author LIKE '%${searchTerm}%' OR
         description LIKE '%${searchTerm}%' OR
         publication_year LIKE '%${searchTerm}%' OR
         isbn LIKE '%${searchTerm}%'`;

        db.query(sql, (err, results) => {
            if (err) {
                res.status(500).json({
                    status: false,
                    message: 'Error searching for books',
                    data: err
                });
            }
            else if (results.length === 0) {
                res.json({
                    status: false,
                    message: 'No books found',
                })
            } else {
                res.json(results);
            }
        });
    }
}

exports.bookPagination = (req, res) => {
    const itemsPerPage = 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * req.query.pageSize;
    const limit = req.query.pageSize;

    const sql = `SELECT * FROM books_collection LIMIT ${limit} OFFSET ${offset}`;

    db.query(sql, (error, results, fields) => {
        if (error) {
            res.status(500).send('Internal Server Error');
        } else {
            const countSql = 'SELECT COUNT(*) AS count FROM books_collection';

            db.query(countSql, (error, countResults, fields) => {
                if (error) {
                    res.status(500).send('Internal Server Error');
                } else {
                    const totalItems = countResults[0].count;
                    const totalPages = Math.ceil(totalItems / itemsPerPage);

                    res.json({
                        items: results,
                        currentPage: page,
                        totalPages: totalPages
                    });
                }
            });
        }
    });
}





// CREATE TABLE books_collection (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     title VARCHAR(255) NOT NULL,
//     author VARCHAR(255) NOT NULL,
//     description TEXT,
//     publication_year INT,
//     isbn VARCHAR(13) NOT NULL
//   );