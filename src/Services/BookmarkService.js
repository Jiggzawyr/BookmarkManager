import axios from "axios";

let config = {
    method: 'post',
    url: '',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '',
    },
    data: {}
};

function createBearerToken() {
  return "Bearer " + JSON.parse(localStorage.getItem("access_token"));
}


export async function getBookmarks(category) {  
  try {
    config.url = 'https://data.mongodb-api.com/app/data-nulxs/endpoint/data/v1/action/find';
    config.headers.Authorization = createBearerToken();
    config.data = JSON.stringify({
      "collection": "bookmarks",
      "database": "bookmark_manager",
      "dataSource": "Cluster0",
      "filter": category ? { "category": category } : null
    });
    const response = await axios(config);
    return response.data.documents;
  } catch (error) {
    throw error;
  }
}

export async function getCategories() {  
  try {
    config.url = 'https://data.mongodb-api.com/app/data-nulxs/endpoint/data/v1/action/aggregate';
    config.headers.Authorization = createBearerToken();
    config.data = JSON.stringify({
      "collection": "bookmarks",
      "database": "bookmark_manager",
      "dataSource": "Cluster0",
      "pipeline": [
        { "$group": { "_id" : "$category" }},
        { "$sort": { "_id": 1 } },
      ],
    });
    const response = await axios(config);
    return response.data.documents;
  } catch (error) {
    throw error;
  }
}

export async function createBookmark(bookmark) {  
  try {
    config.url = 'https://data.mongodb-api.com/app/data-nulxs/endpoint/data/v1/action/insertOne';
    config.headers.Authorization = createBearerToken();
    config.data = JSON.stringify({
      "collection": "bookmarks",
      "database": "bookmark_manager",
      "dataSource": "Cluster0",
      "document": bookmark
    });
    const response = await axios(config);
    return response.data.documents;
  } catch (error) {
    throw error;
  }
}

export async function deleteBookmark(id) {
  try {
    config.url = 'https://data.mongodb-api.com/app/data-nulxs/endpoint/data/v1/action/deleteOne';
    config.headers.Authorization = createBearerToken();
    config.data = JSON.stringify({
      "collection": "bookmarks",
      "database": "bookmark_manager",
      "dataSource": "Cluster0",
      "filter": {
        "_id": {
          "$oid": id
        }
      }
    });
    const response = await axios(config);
    return response.data.deletedCount;
  } catch (error) {
    throw error;
  }
}
