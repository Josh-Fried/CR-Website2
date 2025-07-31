const { Connection, Request, TYPES } = require('tedious');

module.exports = async function (context, req) {
    // Get the database connection string from your application settings
    const connectionString = process.env.DB_CONNECTION_STRING;

    if (!connectionString) {
        context.res = { status: 500, body: "Database connection string is not configured." };
        return;
    }

    const connection = new Connection(JSON.parse(connectionString));

    // The connection is an asynchronous process, so we wrap it in a promise
    const connect = () => new Promise((resolve, reject) => {
        connection.on('connect', err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
        connection.connect();
    });

    try {
        await connect();

        // Get the data from the form submission
        const { name, email, phone, brokerId } = req.body;

        // Basic validation
        if (!name || !email) {
            context.res = { status: 400, body: "Name and email are required." };
            return;
        }

        const sql = `
            INSERT INTO Customers (Name, Email, PhoneNumber, BrokerID)
            VALUES (@Name, @Email, @PhoneNumber, @BrokerID);
        `;

        const request = new Request(sql, (err, rowCount) => {
            if (err) {
                context.res = { status: 500, body: `Database insert failed: ${err.message}` };
            } else {
                context.res = { status: 200, body: "Contact information submitted successfully." };
            }
            connection.close();
        });

        // Add parameters to the SQL query to prevent SQL injection attacks
        request.addParameter('Name', TYPES.NVarChar, name);
        request.addParameter('Email', TYPES.NVarChar, email);
        request.addParameter('PhoneNumber', TYPES.NVarChar, phone);
        // If brokerId is not provided, insert NULL into the database
        request.addParameter('BrokerID', TYPES.Int, brokerId ? parseInt(brokerId) : null);

        connection.execSql(request);

    } catch (err) {
        context.res = { status: 500, body: `Connection failed: ${err.message}` };
    }
};