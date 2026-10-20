import express from 'express';
import mysql from 'mysql2/promise';
import getRandomName from './name_generator.js';

const app = express();
const port = 3000;

const dbConfig = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'desafiodb'
};

let pool;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function connectDatabase() {
    while (true) {
        try {
            pool = mysql.createPool(dbConfig);
            
            await pool.query(`
                CREATE TABLE IF NOT EXISTS people (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL
                )
            `);
            break;
        } catch (e) {
            console.log("Aguardando o banco de dados inicializar completamente...");
            await sleep(5000);
        }
    }
}

app.get('/', async (req, res) => {
    try {
        const newName = getRandomName();
        await pool.query('INSERT INTO people (name) VALUES (?)', [newName]);

        const [list] = await pool.query('SELECT name FROM people ORDER BY name ASC');

        const tableName = list.map(registry => `<li>- ${registry.name}</li>`).join('\n');

        const htmlFinal = `
          <!DOCTYPE html>
          <html lang="pt-BR">
          <head><meta charset="UTF-8"></head>
          <body>
              <h1>Full Cycle Rocks! </h1>
              <ul style="list-style: none; padding-left: 0;">
                  ${tableName}
              </ul>
          </body>
          </html>
        `;

        res.send(htmlFinal);
    } catch (e) {
        console.error(e);
    }
});

connectDatabase().then(() => {
    app.listen(port, () => { 
        console.log('Rodando na porta ' + port); 
    });
});
