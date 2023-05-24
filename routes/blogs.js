const { Variable } = require("eslint-scope");
const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");

const listBlogs = [
  {
    id: "blog1",
    title: "Introduction to JavaScript",
    description: "Learn the basics of JavaScript programming language.",
    author: "Michael Johnson",
    createdAt: "2023-05-22T19:16:00.821Z",
    lastModified: "2023-05-22T19:16:00.821Z",
  },
  {
    id: "blog2",
    title: "Mastering React Framework",
    description: "Become proficient in building web applications using React.",
    author: "Jane Smith",
    createdAt: "2023-05-22T19:16:00.821Z",
    lastModified: "2023-05-22T19:16:00.821Z",
  },
  {
    id: "blog3",
    title: "Deep Dive into Node.js",
    description:
      "Explore the advanced concepts of Node.js and server-side development.",
    author: "Michael Johnson",
    createdAt: "2023-05-22T19:16:00.821Z",
    lastModified: "2023-05-22T19:16:00.821Z",
  },
  {
    id: "blog4",
    title: "CSS Tricks for Web Designers",
    description: "Discover useful CSS techniques to enhance your web designs.",
    author: "Emily Davis",
    createdAt: "2023-05-22T19:16:00.821Z",
    lastModified: "2023-05-22T19:16:00.821Z",
  },
  {
    id: "blog5",
    title: "Effective Database Management",
    description:
      "Learn best practices for managing databases and optimizing performance.",
    author: "Robert Johnson",
    createdAt: "2023-05-22T19:16:00.821Z",
    lastModified: "2023-05-22T19:16:00.821Z",
  },
];

router.get("/", (req, res) => {
  res.json({ message: "hello form blogs" });
});

// ◀︎ get all blogs ▶︎ ///////////////////////////////////////////////////////////////////
router.get("/all-blogs", (req, res) => {
  res.status(200).json({ success: true, data: listBlogs });
});

// ◀︎ delete by id ▶︎ ////////////////////////////////////////////////////////////////////
router.delete("/delete-blog/:id", (req, res) => {
  //.indexOf
  const id = req.params.id;
  //implicit returns
  const findIndexOfBlog = listBlogs.findIndex((blog) => blog.id === id);
  console.log(findIndexOfBlog);
  if (findIndexOfBlog === -1) {
    return res.status(400).json({ success: false, message: "blog not found" });
  }
  //.splice(index, how many)
  listBlogs.splice(findIndexOfBlog, 1);
  // console.log(movies);
  res.status(200).json({ success: true, data: "blog deleted" });
});

// ◀︎ get blog by id ▶︎ //////////////////////////////////////////////////////////////////
router.get("/get-blog/:id", (req, res) => {
  const id = req.params.id; // grab id
  const findIndexOfBlog = listBlogs.findIndex((blog) => blog.id === id); // grab index of blog id and set it to findIndexOfBlog

  let blogInfo = null; // place holder for data

  if (findIndexOfBlog === -1) {
    // use findIndexOfBlog to make sure the blog exists
    res.status(400).json({ success: false, message: "blog not found" });
  }

  for (const blog of listBlogs) {
    // listBlogs is looped over and ids are match and data is set to blogInfo
    if (blog.id === id) {
      blogInfo = ` Title: ${blog.title}, Description: ${blog.description}, author: ${blog.author}`;
    }
  }
  res.status(200).json({ success: true, data: blogInfo });
});

// ◀︎ get some blogs by author ▶︎ /////////////////////////////////////////////////////////
router.get("/get-blog-by-author/:author/", (req, res) => {
  const author = req.params.author.toLowerCase(); // grab author
  const findIndex = listBlogs.findIndex(
    (blog) => blog.author.toLowerCase() === author
  ); // grab index

  const blogInfo = []; // place holder for author blog or multiple blogs

  if (findIndex === -1) {
    // check to see if author exist
    res.status(400).json({ success: false, message: "author not found" });
  }
  for (const blog of listBlogs) {
    // loop grabs blogs that correspond to author and pusses them to blogInfo Array
    if (blog.author.toLowerCase() === author) {
      blogInfo.push(blog);
    }
  }
  res.status(200).json({ success: true, data: blogInfo });
});

// ◀︎ post a new-blog ▶︎ /////////////////////////////////////////////////////////////
router.post("/new-blog", (req, res) => {
  //let blogID = `blog${listBlogs.length + 1}`; // creates a id for new post

  const newBlog = {
    // create a new object with request body input
    id: uuid(),
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    createdAt: new Date().toISOString(),
    lastModified: new Date().toISOString(),
  };
  let errorArray = []; //Variable to hold errors

  //checks to make sure we're not saving something that is empty or undefined and then pushes to errorArray
  for (let key in newBlog) {
    if (newBlog[key] === "" || newBlog[key] === undefined) {
      errorArray.push(`${key} cannot be empty`);
    }
  }

  // check if errorArray is empty if not throw error els pushes newBlog to listBlog
  if (errorArray.length > 0) {
    return res.status(200).json({ error: true, message: errorArray });
  } else {
    listBlogs.push(newBlog);
  }
  res
    .status(200)
    .json({ success: true, message: "new blog was successfully posted" });
});

// ⚠️ this is my code ⚠️
// ◀︎ update (put) one by id route ▶︎ ////////////////////////////////////////////////////
// router.put("/update-blog/:id", (req, res) => {
//   let id = req.params.id;
//   const findIndex = listBlogs.findIndex((blog) => blog.id === id);

//   if (findIndex === -1) {
//     return res.status(400).json({ success: false, message: "blog not found" });
//   }

//   // grab all the current blog original information
//   const currentBlog = listBlogs[findIndex];

//   // make new object
//   const updateBlogInfo = { ...currentBlog };

//   for (let key in req.body) {
//     // loop through the request body to check if any keys have objects as values
//     //console.log(typeof req.body[key]); string
//     if (typeof req.body[key] === "object") {
//       updateBlogInfo[key] = {
//         ...updateBlogInfo[key],
//         ...req.body[key],
//       };
//     } else {
//       updateBlogInfo[key] = req.body[key];
//       updateBlogInfo.lastModified = new Date().toISOString();
//     }
//   }
//   listBlogs.splice(findIndex, 1, updateBlogInfo); // erase it replace it
//   res.status(200).json({ success: true });
// });

// ⛔️ this is not my code this is ChatGPT assisted code
router.put("/update-blog/:id", (req, res) => {
  const { title, description, author } = req.body;
  const requiredFields = ["title", "description", "author"];

  // Check if all required fields are present in the request body
  const isValid = requiredFields.every(
    (field) => req.body[field]
  );

  if (!isValid) {
    // If any required field is missing, return a 400 error with a message
    return res.status(400).json({
      success: false,
      message: `${requiredFields.join(", ")} must all be included in the request`,
    });
  }

  const id = req.params.id;
  const findIndex = listBlogs.findIndex((blog) => blog.id === id);

  if (findIndex === -1) {
    // If the blog with the specified id is not found, return a 400 error with a message
    return res.status(400).json({
      success: false,
      message: "blog not found",
    });
  }

  // Create a new object with the current blog's information
  const updateBlogInfo = { ...listBlogs[findIndex] };

  for (let key in req.body) {
    if (typeof req.body[key] === "object") {
      // If the value of a key is an object, merge it with the existing value
      updateBlogInfo[key] = {
        ...updateBlogInfo[key],
        ...req.body[key],
      };
    } else {
      // If the value of a key is not an object, update it directly
      updateBlogInfo[key] = req.body[key];
      updateBlogInfo.lastModified = new Date().toISOString();
    }
  }

  // Update the blog in the list of blogs
  listBlogs[findIndex] = updateBlogInfo;

  // Return a success response
  res.status(200).json({ success: true });
});


module.exports = router;
