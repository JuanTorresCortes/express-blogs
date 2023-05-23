const express = require("express");
const router = express.Router();

const listBlogs = [
  {
    id: '1',
    title: "First Blog",
    description: "Description of the first blog",
    author: "John Doe",
    createdAt: '2023-05-22T19:16:00.821Z',
    lastModified: '2023-05-22T19:16:00.821Z'
  },
  {
    id: '2',
    title: "Second Blog",
    description: "Description of the second blog",
    author: "Jane Smith",
    createdAt: '2023-05-22T19:16:00.821Z',
    lastModified: '2023-05-22T19:16:00.821Z'
  },
  {
    id: '3',
    title: "Third Blog",
    description: "Description of the third blog",
    author: "Alex Johnson",
    createdAt: '2023-05-22T19:16:00.821Z',
    lastModified: '2023-05-22T19:16:00.821Z'
  },
  {
    id: '4',
    title: "Fourth Blog",
    description: "Description of the fourth blog",
    author: "Emily Davis",
    createdAt: '2023-05-22T19:16:00.821Z',
    lastModified: '2023-05-22T19:16:00.821Z'
  },
  {
    id: '5',
    title: "Fifth Blog",
    description: "Description of the fifth blog",
    author: "Michael Brown",
    createdAt: '2023-05-22T19:16:00.821Z',
    lastModified: '2023-05-22T19:16:00.821Z'
  }
];

router.get("/",(req,res) => {
    res.json({message: "hello form blogs"})
})

// ◀︎ get all blogs ▶︎ /////////////////////////////////////////////////
router.get("/all-blogs", (req, res) => {
  res.status(200).json({ success: true, data: listBlogs });
});

// ◀︎ delete by id ▶︎ /////////////////////////////////////////////////////
router.delete("/delete-blog/:id", (req, res) => {
	//.indexOf
	const id = req.params.id;
	//implicit returns
	const findIndexOfBlog = listBlogs.findIndex((blog) => blog.id === id);
  console.log(findIndexOfBlog)
  if (findIndexOfBlog === -1) {
		return res.status(400).json({ success: false, message: "blog not found" });
	}
	//.splice(index, how many)
	listBlogs.splice(findIndexOfBlog, 1);
	// console.log(movies);
	res.status(200).json({ success: true, data: "blog deleted" });
});

// ◀︎ get blog by id ▶︎ /////////////////////////////////////////////////
router.get("/get-blog/:id", (req, res) => {
  const id = req.params.id; // grab id
  const findIndexOfBlog = listBlogs.findIndex((blog) => blog.id === id); // grab index of blog id and set it to findIndexOfBlog

  let blogInfo = null; // place holder for data

  if(findIndexOfBlog === -1) { // use findIndexOfBlog to make sure the blog exists 
    res.status(400).json({success: false, message: "blog not found"});
  }

  for(const blog of listBlogs){ // listBlogs is looped over and ids are match and data is set to blogInfo
    if(blog.id === id){
      blogInfo = ` Title: ${blog.title}, Description: ${blog.description}, author: ${blog.author}`
    }
  }
res.status(200).json({success: true, data: blogInfo})
})


module.exports = router

//get one blog route by id
//get some blogs route by author
//post one blog route