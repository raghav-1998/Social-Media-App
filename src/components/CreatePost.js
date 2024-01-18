import { useRef, useContext } from "react";
import { PostList } from "../store/post-list-store";

function CreatePost(){
    const {addPost} =useContext(PostList);

    const userIdElement = useRef();
    const postTitleElement = useRef();
    const postBodyElement = useRef();
    const tagsElement = useRef();

    const handleSubmit=(event)=>{
      event.preventDefault();

      const userId = userIdElement.current.value;
      const postTitle = postTitleElement.current.value;
      const postBody = postBodyElement.current.value;
      const tags = tagsElement.current.value.split(";");

      addPost(userId,postTitle,postBody,tags);

      userIdElement.current.value="";
      postTitleElement.current.value="";
      postBodyElement.current.value="";
      tagsElement.current.value="";
    }
    return (
      <form className="create-post" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">User Id</label>
          <input type="text" className="form-control" id="userId" ref={userIdElement} placeholder="Enter your User Id ??"/>
          
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">Post Title</label>
          <input type="text" className="form-control" id="title" ref={postTitleElement} placeholder="How are you feeling today ??"/>
          
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">Post Content</label>
          <textarea type="text" rows="5" className="form-control" id="body" ref={postBodyElement} placeholder="Tell me more about your feeling ??"/>
        </div>

        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tags</label>
          <input type="text" className="form-control" id="tags" ref={tagsElement} placeholder="Please enter tags separated by semicolon(;) !!"/>
          
        </div>
        
        <button type="submit" className="btn btn-primary">Post</button>
      </form>
    );
}

export default CreatePost;