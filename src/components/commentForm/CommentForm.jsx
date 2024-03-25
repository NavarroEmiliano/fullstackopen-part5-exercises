import { useState } from 'react'
import { commentBlogAction } from '../../features/blogs/blogsSlice'
import { useDispatch } from 'react-redux'

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const inputHandler = event => {
    setComment(event.target.value)
  }

  const createCommentHandle = event => {
    event.preventDefault()
    const commentObj = { comment }
    dispatch(commentBlogAction(blogId, commentObj))
    setComment('')
  }

  return (
    <form onSubmit={createCommentHandle}>
      <input
        className="rounded-md h-8 bg-slate-700 p-1"
        onChange={inputHandler}
      />
      <button
        className="bg-secondary ml-2 mx-auto  p-2 rounded-lg"
        type="submit"
      >
        Comment
      </button>
    </form>
  )
}

export default CommentForm
