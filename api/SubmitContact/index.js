const { Connection, Request, TYPES } = require('tedious');

// Helper function to wrap the database execution in a Promise
function executeSql(connection, request) {
    return new Promise((resolve, reject) => {
        request.on('requestCompleted', () => {
            resolve();
        });
        request.on('error', err => {
            reject(err);
        });
        connection.execSql(request);
    });
}

module.exports = async function (context, req) {
    const connectionString = process.env.DB_CONNECTION_STRING;
    if (!connectionString) {
        context.res = { status: 500, body: "Database connection string is not configured." };
        return;
    }

    const connection = new Connection(JSON.parse(connectionString));

    try {
        // Connect to the database
        await new Promise((resolve, reject) => {
            connection.on('connect', err => err ? reject(err) : resolve());
            connection.connect();
        });

        const { name, email, phone, brokerId } = req.body;
        if (!name || !email) {
            context.res = { status: 400, body: "Name and email are required." };
            return;
        }

        const sql = `
            INSERT INTO Customers (Name, Email, PhoneNumber, BrokerID)
            VALUES (@Name, @Email, @PhoneNumber, @BrokerID);
        `;

        const request = new Request(sql);
        request.addParameter('Name', TYPES.NVarChar, name);
        request.addParameter('Email', TYPES.NVarChar, email);
        request.addParameter('PhoneNumber', TYPES.NVarChar, phone);
        request.addParameter('BrokerID', TYPES.Int, brokerId ? parseInt(brokerId) : null);

        // Execute the SQL and wait for it to finish
        await executeSql(connection, request);

        context.res = { status: 200, body: "Contact information submitted successfully." };

    } catch (err) {
        // If any error occurs in the process, it will be caught here
        context.res = { status: 500, body: `An error occurred: ${err.message}` };
    } finally {
        // Always close the connection
        if (connection.closed) {
            // Already closed
        } else {
            connection.close();
        }
    }
};
