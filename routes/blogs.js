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

router.get("/all-blogs", (req, res) => {
  res.status(200).json({ success: true, data: listBlogs });
});

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


module.exports = router