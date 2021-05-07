const { Pool } = require('pg');

const connectionString = `postgresql://Typo:saas-36@localhost:5432/saas-36`;

const pool = new Pool({
    connectionString: connectionString
});

module.exports = {pool};