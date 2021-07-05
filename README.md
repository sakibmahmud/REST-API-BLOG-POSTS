# REST-API-BLOG-POSTS
Development of REST API endpoints to output blog posts fetched from a third party API.

About the files 

test.js:  It contains a test suite to test the application (APIs) against some possible scenarios.We are making calls to our API and validating the response with the correct result.  It has the following routes and their corresponding callbacks:

      i) http://localhost:3000/api/posts: Will respond back the blog posts when associated  
         with the required and optional query parameters.  

     ii) http://localhost:3000/api/ping: Will give the success message if the server is up and 
          Running.
Please feel free to add any tests to check the API.

posts.js:  It contains the async function inside which:

We are making separate API calls to https://api.hatchways.io/assessment/blog/posts for each tag parameter associated with tags parameter of our API. Some examples of valid tag parameters are science, tech, history etc.
Combining all the results from the API requests above and saving them into the data.json file for record.
Calling the removeDuplicates() function to make sure there are no repeated posts.
After that, calling the sortPosts() function that sorts all the posts based on the sortBy and direction parameter. If the parameters are not provided , the posts will be sorted based on the ids.
      
     3) utils.js: It contains the following helper functions:


saveData(): for saving data onto the data.json files. 
loadData(): to read from the file.
removeDuplicates(): the function makes sure that no post is repeated. The posts are getting filtered based on their ids (as all posts should have unique ids). We are using the set data structure and the algorithm runs in O(n) time. 
sortPosts(): sorting the posts based on the sortBy parameter or by default in ascending order.
 sortPostsDescending() : sorting the posts in descending order if required.

 Data Source:
 We are using a third party API as data source.
 
 Running the project:

We are using the jest test framework to test the application. To run the application and test it against the possible test cases , we need to go to the root folder and type in the following command:
           
                                  npm test



Next, we can head over to the browser and type in : https://localhost:3000/api/ping (as the app is running on port 3000) to check if the server is up and running. After that we can test the other endpoint (https://localhost:3000/api/posts) of our APIS on the browser side.


Installing modules:

 To install any node modules, you have to run npm install .
 Please install the required modules in the package.json file.
 