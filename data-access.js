function storeData(tableName, dataArray, options) {
  if (options.grpc) {
    // Store the data to gRPC
    grpcStore(tableName, dataArray, options.grpcOptions);
  } else if (options.cassandraDb) {
    // Store the data to Cassandra DB
    cassandraStore(tableName, dataArray, options.cassandraOptions);
  } else {
    throw new Error("Invalid configuration options provided.");
  }
}

function grpcStore(tableName, dataArray, grpcOptions) {
  // Connect to the gRPC server using the provided options
  const client = new YourGRPCClient(grpcOptions);

  // Loop through the data array and send each item to the gRPC server
  dataArray.forEach(data => {
    client.storeData(tableName, data, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log(response);
      }
    });
  });
}

function cassandraStore(tableName, dataArray, cassandraOptions) {
  // Connect to the Cassandra DB using the provided options
  const client = new YourCassandraClient(cassandraOptions);

  // Loop through the data array and insert each item into the database
  dataArray.forEach(data => {
    const fields = Object.keys(data);
    const values = Object.values(data);
    const query = `INSERT INTO ${tableName} (${fields.join(", ")}) VALUES (${values.map(() => "?").join(", ")})`;
    const params = [...values];

    client.execute(query, params, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
      }
    });
  });
}
