const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) return 0

    return blogs.reduce((sum, item) => {
        return sum + item.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length > 0) {
    return blogs.reduce((favorite, blog) => 
      blog.likes > favorite.likes ? blog : favorite
    )
  }
  return 0
}

const mostBlogs = (blogs) => {
  if (blogs.length > 0) {
    const counts = blogs.reduce((tally, blog) => {
        tally[blog.author] = (tally[blog.author] || 0) + 1
        return tally
    }, {})

    const topAuthor = Object.keys(counts).reduce((a, b) => 
        counts[a] > counts[b] ? a : b
    )

    return { author: topAuthor, blogs: counts[topAuthor] }
  } else return { author: '', blogs: 0 }
}

const mostLikes = (blogs) => {
  if (blogs.length > 0) {
    const likesCount = blogs.reduce((likes, blog) => {
        likes[blog.author] = (likes[blog.author] || 0) + blog.likes 
        return likes
    }, {})

    const topAuthor = Object.keys(likesCount).reduce((a, b) =>
        likesCount[a] > likesCount[b] ? a : b
    )

    return { author: topAuthor, likes: likesCount[topAuthor] }

  } else return { author: '', likes: 0 }
}

module.exports = {
    dummy,
    totalLikes, 
    favoriteBlog,
    mostBlogs,
    mostLikes
}
