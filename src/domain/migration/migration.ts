import { Database } from 'sqlite3';
import { DbContext } from '../../main/context';
import { HttpMethodEntity } from '../../main/entities/HttpMethodEntity';

// Define the `createTable` function for each model
export function createTables(db: DbContext): void {
  createHttpMethodTable(db);
  createRequestTable(db);

  createHttpHeaderTable(db);
  createQueryParameterTable(db);
  createRoadParameterTable(db);

  createRequestsStreamTable(db);
  createRequestsStreamResultLogTable(db);
  createRequestsStreamItemTable(db);
}

function createRequestsStreamItemTable(db: DbContext): void {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS requests_stream_item (
      id INTEGER PRIMARY KEY,
      requests_stream_id INTEGER,
      request_id INTEGER,
      request_next_id INTEGER NULL,
      mapping_json TEXT NULL,
      FOREIGN KEY (requests_stream_id) REFERENCES requests_stream(id),
      FOREIGN KEY (request_id) REFERENCES request(id),
      FOREIGN KEY (request_next_id) REFERENCES request(id)
    );
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating requests_stream_result_log table:', err.message);
    } else {
      console.log('requests_stream_result_log table created successfully.');
    }
  });
}

function createRequestsStreamResultLogTable(db: DbContext): void {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS requests_stream_result_log (
      id INTEGER PRIMARY KEY,
      requests_stream_id INTEGER,
      result_json TEXT,
      date DATETIME,
      FOREIGN KEY (requests_stream_id) REFERENCES requests_stream(id)
    );
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating requests_stream_result_log table:', err.message);
    } else {
      console.log('requests_stream_result_log table created successfully.');
    }
  });
}

function createRequestsStreamTable(db: DbContext): void {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS requests_stream (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      last_start DATETIME
    );
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating requests_stream table:', err.message);
    } else {
      console.log('requests_stream table created successfully.');
    }
  });
}

function createHttpMethodTable(db: DbContext): void {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS http_method (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      UNIQUE(id, name)
    );
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating http_method table:', err.message);
    } else {
      console.log('http_method table created successfully.');
      Promise.all([db.HttpMethodController.Save(new HttpMethodEntity({id: undefined, name: 'GET'})),
        db.HttpMethodController.Save(new HttpMethodEntity({id: undefined, name: 'POST'})),
        db.HttpMethodController.Save(new HttpMethodEntity({id: undefined, name: 'PUT'})),
        db.HttpMethodController.Save(new HttpMethodEntity({id: undefined, name: 'DELETE'}))]).then((values) => {
        console.log(values);
      });
    }
  });
}

function createRequestTable(db: DbContext): void {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS request (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      http_method_id INTEGER NOT NULL,
      path TEXT NOT NULL,
      body TEXT NULL,
      FOREIGN KEY (http_method_id) REFERENCES http_method(id)
    );
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating request table:', err.message);
    } else {
      console.log('request table created successfully.');
    }
  });
}

function createHttpHeaderTable(db: DbContext): void {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS http_header (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      request_id INTEGER,
      name TEXT NOT NULL,
      value TEXT NOT NULL,
      FOREIGN KEY (request_id) REFERENCES api_requests(id)
    );
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating http_header table:', err.message);
    } else {
      console.log('http_header table created successfully.');
    }
  });
}

function createQueryParameterTable(db: DbContext): void {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS query_parameter (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      api_request_id INTEGER,
      name TEXT NOT NULL,
      value TEXT NOT NULL,
      FOREIGN KEY (api_request_id) REFERENCES api_requests(id)
    );
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating query_parameter table:', err.message);
    } else {
      console.log('query_parameter table created successfully.');
    }
  });
}

function createRoadParameterTable(db: DbContext): void {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS road_parameter (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      api_request_id INTEGER,
      name TEXT NOT NULL,
      value TEXT NOT NULL,
      FOREIGN KEY (api_request_id) REFERENCES api_requests(id)
    );
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating road_parameter table:', err.message);
    } else {
      console.log('road_parameter table created successfully.');
    }
  });
}
