var fs = require("fs");

//save data to file
function saveData(data) {
  const dataJSON = JSON.stringify(data);
  fs.writeFileSync("data.json", dataJSON);
}

//reading data from a file
function loadData() {
  try {
    const dataBuffer = fs.readFileSync("data.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}

//Linear time removing duplicate posts
function removeDuplicates(posts) {
  const seen = new Set();

  const uniquePosts = posts.filter((post) => {
    const duplicate = seen.has(post.id);
    seen.add(post.id);
    return !duplicate;
  });

  return uniquePosts;
}
//soring posts
function sortPosts(sortField, posts, direction) {
  if (sortField === null) sortField = "id";
  if (direction === "asc" || direction === null) {
    posts.sort((a, b) => {
      return a[sortField] - b[sortField];
    });
  } else {
    posts.sort((a, b) => {
      return b[sortField] - a[sortField];
    });
  }

  saveData(posts);
  return posts;
}

module.exports = {
  saveData: saveData,
  loadData: loadData,
  removeDuplicates: removeDuplicates,
  sortPosts: sortPosts,
};
