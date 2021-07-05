const request = require("request");
const url = require("url");
const utils = require("./utils.js");

function getData(url) {
  return new Promise((resolve, reject) => {
    request({ url: url, json: true }, (error, response) => {
      if (error) reject(error);
      if (response.statusCode != 200) {
        reject("Invalid status code <" + response.statusCode + ">");
      }
      resolve(response.body.posts);
    });
  });
}

//function where we are making API calls, calling other helper functions
async function allPosts(hatchways_url, rawURL) {
  const myURL = new URL(rawURL);
  const param_arrays = ["likes", "reads", "popularity", "id", "asc", "desc"];
  //getting tags paramater value
  let tags = myURL.searchParams.get("tags");
  if (tags == null) {
    throw new Error("Tags parameter is required");
  }
  //getting sortBy parameter value
  const sortField = myURL.searchParams.get("sortBy");
  if (!param_arrays.includes(sortField) && sortField!=null) {
    throw new Error("sortBy parameter is invalid");
  }

  tags = tags.split(",");
  let data = [];
  let api_array = [];

  for (i = 0; i < tags.length; i++) {
    //making separate API call for each tag to hatchway api
    let temp_url = hatchways_url + "?tag=" + tags[i];
    api_array.push(getData(temp_url));
  }

  await Promise.all(api_array).then((results) => {
    data = [].concat.apply([], results);
    utils.saveData(data);
  });

  //getting direction parameter value
  const direction = myURL.searchParams.get("direction");
  //data = await utils.loadData();

  //removing duplicate posts
  let uniquePosts = await utils.removeDuplicates(data);

  //sorting the returned posts
  if (!param_arrays.includes(direction) && direction != null) {
    throw new Error("direction parameter is invalid");
  }
  let sortedPosts = utils.sortPosts(sortField, uniquePosts, direction);
  return sortedPosts;
 
  
  
}

module.exports = {
  allPosts: allPosts,
};
