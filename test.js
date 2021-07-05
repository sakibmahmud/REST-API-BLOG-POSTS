const express = require("express");
const app = express();
const utils = require("./utils.js");
const fs = require("fs");
var posts = require("./posts.js");
const supertest = require("supertest");
const request = supertest(app);

//hatchway url
const hatchways_url = "https://api.hatchways.io/assessment/blog/posts";

var port = process.env.PORT || 3000;
app.listen(port);
app.get("/api/ping", pingBack);

function pingBack(req, resp) {
  resp.send({ success: true });
}
// /api/posts route
app.get("/api/posts", sendUniqueSortedPosts);

//callback
async function sendUniqueSortedPosts(request, response) {
  var api = "https://localhost:3000" + request.url;
  
  try {
    let sortedUniquePosts = await posts.allPosts(hatchways_url, api);
    response.send({ posts: sortedUniquePosts });
  } catch (e) {
    response.send({ error: e.message });
  }
}

// //test 1
it("Tesing with tags=history and soryBy=likes", async () => {
  const response = await request.get("/api/posts?tags=history&sortBy=likes");
  let expected = fs.readFileSync("./test-dataset/test-data-1.json");
  expected = expected.toString();
  expect(response.status).toBe(200);
  expect(response.body).toEqual(JSON.parse(expected));
});

// //test 2

it("Tesing with tags=tech and soryBy=reads", async () => {
  const response = await request.get("/api/posts?tags=tech&sortBy=reads");
  let expected = fs.readFileSync("./test-dataset/test-data-2.json");
  expected = expected.toString();
  expect(response.status).toBe(200);
  expect(response.body).toEqual(JSON.parse(expected));
});

//test 3
it("Tesing with tags=science and soryBy=likes", async () => {
  const response = await request.get("/api/posts?tags=science&sortBy=likes");
  let expected = fs.readFileSync("./test-dataset/test-data-3.json");
  expected = expected.toString();
  expect(response.status).toBe(200);
  expect(response.body).toEqual(JSON.parse(expected));
});

//test 4
it("Tesing with tags=tech,history and soryBy=likes", async () => {
  const response = await request.get(
    "/api/posts?tags=tech,history&sortBy=likes"
  );
  let expected = fs.readFileSync("./test-dataset/test-data-4.json");
  expected = expected.toString();
  expect(response.status).toBe(200);
  expect(response.body).toEqual(JSON.parse(expected));
});

//test 5
it("Tesing with tags=tech,history,science and soryBy=likes", async () => {
  const response = await request.get(
    "/api/posts?tags=tech,history,science&sortBy=likes"
  );
  let expected = fs.readFileSync("./test-dataset/test-data-5.json");
  expected = expected.toString();
  expect(response.status).toBe(200);
  expect(response.body).toEqual(JSON.parse(expected));
});

//test 6
it("Tesing with tags=tech,history,science and soryBy=reads", async () => {
  const response = await request.get(
    "/api/posts?tags=tech,history,science&sortBy=reads"
  );
  let expected = fs.readFileSync("./test-dataset/test-data-6.json");
  expected = expected.toString();
  expect(response.status).toBe(200);
  expect(response.body).toEqual(JSON.parse(expected));
});

//test 7
it("Tesing with tags=tech and deault optional parameters", async () => {
  const response = await request.get("/api/posts?tags=tech");
  let expected = fs.readFileSync("./test-dataset/test-data-7.json");
  expected = expected.toString();
  expect(response.status).toBe(200);
  expect(response.body).toEqual(JSON.parse(expected));
});

//test 8

it("Tesing with tags=tech,science and default sortBy and direction=desc", async () => {
  const response = await request.get(
    "/api/posts?tags=tech,science&direction=desc"
  );
  let expected = fs.readFileSync("./test-dataset/test-data-8.json");
  expected = expected.toString();
  expect(response.status).toBe(200);
  expect(response.body).toEqual(JSON.parse(expected));
});
