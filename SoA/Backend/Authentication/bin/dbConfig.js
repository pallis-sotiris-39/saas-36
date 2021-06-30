const { Pool } = require('pg');

const connectionString = `postgresql://typo:password@localhost:5432/saas-36`;

const pool = new Pool({
    connectionString: connectionString
});

module.exports = {pool};
