import { createContext, useReducer } from "react";

export const PostList=createContext(
    {
        postList:[],
        addPost: ()=>{},
        deletePost: ()=>{}
    }
);

const postListReducer = (currPostList,action)=>{
    let newPostList=currPostList;
    if(action.type==="DELETE"){
        newPostList=currPostList.filter(
            (post)=>post.id!==action.payload.postId
        );
    }
    else if(action.type === "ADD"){
        newPostList=[action.payload,...currPostList];
    }
    return newPostList;
}

const PostListProvider=({children})=>{
    const [postList,dispatchPostList]=useReducer(postListReducer,DEFAULT_LIST);
    console.log(postList);

    const addPost=(userId,postTitle,postBody,tags)=>{
        console.log(`${userId},${postTitle},${postBody},${tags}`);
        dispatchPostList(
            {
                type:"ADD",
                payload:{
                    id:Date.now(),
                    title:postTitle,
                    body:postBody,
                    reactions:100,
                    userId:userId,
                    tags:tags
                }
            }
        )
    };

    const deletePost=(postId)=>{
        dispatchPostList(
            {
                type:"DELETE",
                payload:{
                    postId
                }
            }
        );
    };

    return (
        <PostList.Provider value={{postList,addPost,deletePost}}>
            {children}
        </PostList.Provider>
    );
}

const DEFAULT_LIST=[
    {
        id:"1",
        title:"Go to Mumbai for vacation",
        body:"Hi Friends, I am going to Mumbai for vacation. Hope to enjoy a lot",
        reactions:2,
        userId:"user-1",
        tags:["vacation","Travelling","Enjoying"]
    },

    {
        id:"2",
        title:"Winning of Match",
        body:"Bravo! We have won the cricket match.",
        reactions:10,
        userId:"user-2",
        tags:["cricket","winning","happiness"]
    }
];

export default PostListProvider;