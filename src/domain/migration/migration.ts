import { DbContext } from '../../main/context';
import { HttpMethodEntity } from '../../main/entities/HttpMethodEntity';
import { RequestEntity } from '../../main/entities/RequestEntity';
import { RequestsStreamEntity } from '../../main/entities/RequestsStreamEntity';
import { RequestsStreamItemEntity } from '../../main/entities/RequestsStreamItemEntity';
import { MappingEntity } from '../../main/entities/MappingEntity';
import { CallerV1 } from '../../caller/CallerV1';

// Define the `createTable` function for each model
export async function createTables(db: DbContext): Promise<void> {

  await createHttpMethodTable(db);
  await createRequestTable(db);
  await createHttpHeaderTable(db);

  await createRequestsStreamTable(db);
  await createRequestsStreamResultLogTable(db);
  await createRequestsStreamItemTable(db);
  await createMappingTable(db);

  return initDefaultData(db);
}

function createRequestsStreamItemTable(db: DbContext): Promise<void> {

  return new Promise<void> ((resolve, reject) => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS requests_stream_item (
      id INTEGER PRIMARY KEY,
      requests_stream_id INTEGER,
      request_id INTEGER,
      position_index INTEGER,
      FOREIGN KEY (requests_stream_id) REFERENCES requests_stream(id),
      FOREIGN KEY (request_id) REFERENCES request(id)
    );
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating requests_stream_item table:', err.message);
      reject();
    } else {
      console.log('requests_stream_item table created successfully.');
      resolve();
    }
  });
  })
}

function createRequestsStreamResultLogTable(db: DbContext): Promise<void> {
  return new Promise<void> ((resolve, reject) => {

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
      reject();
    } else {
      console.log('requests_stream_result_log table created successfully.');
      resolve();
    }
  });
  });

}

function createRequestsStreamTable(db: DbContext): Promise<void> {
  return new Promise<void> ((resolve, reject) => {
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
      reject();
    } else {
      console.log('requests_stream table created successfully.');
      resolve();
    }
  });
  })
}

function createHttpMethodTable(db: DbContext): Promise<void> {
  return new Promise<void> ((resolve, reject) => {

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
      reject();
    } else {
      console.log('http_method table created successfully.');
      resolve();
    }
  });
  });

}

function createRequestTable(db: DbContext): Promise<void> {
  return new Promise<void> ((resolve, reject) => {
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
      reject();
    } else {
      console.log('request table created successfully.');
      resolve();
    }
  });
  });

}

function createHttpHeaderTable(db: DbContext): Promise<void> {
  return new Promise<void> ((resolve, reject) => {
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
      reject();
    } else {
      console.log('http_header table created successfully.');
      resolve();
    }
  });
  })

}
function createMappingTable(db: DbContext) : Promise<void> {
  return new Promise<void> ((resolve, reject) => {

    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS mapping (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      requests_stream_item_id INTEGER,
      field_from_path TEXT NOT NULL,
      field_to_path TEXT NOT NULL,
      FOREIGN KEY (requests_stream_item_id) REFERENCES requests_stream_item(id)
    );
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating mapping table:', err.message);
      reject();
    } else {
      console.log('mapping table created successfully.');
      resolve();
    }
  });
  });
}

function initDefaultData(db: DbContext) : Promise<void> {
  return new Promise<void> ((resolve, reject) => {
    Promise.all([db.HttpMethodController.Save(new HttpMethodEntity({id: undefined, name: 'GET'})),
    db.HttpMethodController.Save(new HttpMethodEntity({id: undefined, name: 'POST'})),
    db.HttpMethodController.Save(new HttpMethodEntity({id: undefined, name: 'PUT'})),
    db.HttpMethodController.Save(new HttpMethodEntity({id: undefined, name: 'DELETE'}))
    ,
    initTestRequestStream(db)
    ]).then((values) => {
    console.log("Done");
    resolve();
    }, reasons => {console.error(reasons); reject();});

  });
}


async function initTestRequestStream(db: DbContext) : Promise<void> {
  var Request1 = await db.RequestController.Save(new RequestEntity({id : undefined, body: null, name: "echo1", path: "https://postman-echo.com/get?test=12", http_method_id: 2}));
  var Request2 = await db.RequestController.Save(new RequestEntity({id : undefined, body: '{"base-value": "base"}', name: "echo1", path: "https://postman-echo.com/get", http_method_id: 2}));

  var RequestStream = await db.RequestsStreamController.Save(new RequestsStreamEntity({id : undefined, name : "Base", last_start : null}));

  var reqyestItems = await Promise.all([
    db.RequestsStreamItemController.Save(new RequestsStreamItemEntity({id : undefined, position_index : 0, requests_stream_id : RequestStream.id, request_id : Request1.id })),
    db.RequestsStreamItemController.Save(new RequestsStreamItemEntity({id : undefined, position_index : 1, requests_stream_id : RequestStream.id, request_id : Request2.id }))
  ]) as RequestsStreamItemEntity[];


  var mappings = await db.MappingController.Save(new MappingEntity({id : undefined, requests_stream_item_id : reqyestItems[0].id, field_from_path : 'Response->body->args.test',
  field_to_path : "Request->body->maped_data"
  }))

  console.log(mappings);

  new CallerV1(RequestStream, undefined);
}

