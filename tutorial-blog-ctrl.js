// from an online tutorial...
// to be deleted in time

const Blog = require('../models/blogs')

createBlog = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a blog',
        })
    }
    const blog = new Blog(body)
    if (!blog) {
        return res.status(400).json({ success: false, error: err })
    }
    blog
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: Blog._id,
                message: 'Blog created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Blog not created!',
            })
        })
}

updateBlog = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Blog.findOne({ _id: req.params.id }, (err, blog) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Blog not found!',
            })
        }
        blog.name = body.name
        blog.time = body.time
        blog.rating = body.rating
        blog
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: blog._id,
                    message: 'Blog updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Blog not updated!',
                })
            })
    })
}

deleteBlog = async (req, res) => {
    await Blog.findOneAndDelete({ _id: req.params.id }, (err, blog) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!blog) {
            return res
                .status(404)
                .json({ success: false, error: `Blog not found` })
        }

        return res.status(200).json({ success: true, data: blog })
    }).catch(err => console.log(err))
}

getBlogById = async (req, res) => {
    await Blog.findOne({ _id: req.params.id }, (err, blog) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!blog) {
            return res
                .status(404)
                .json({ success: false, error: `Blog not found` })
        }
        return res.status(200).json({ success: true, data: blog })
    }).catch(err => console.log(err))
}

getBlogs = async (req, res) => {
    await Blog.find({}, (err, blogs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!blogs.length) {
            return res
                .status(404)
                .json({ success: false, error: `Blog not found` })
        }
        return res.status(200).json({ success: true, data: blogs })
    }).catch(err => console.log(err))
}

module.exports = {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogs,
    getBlogById,
}