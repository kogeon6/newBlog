const path = require('path');
const fsPromises = require('fs').promises
const Blog = {
    posts: require(path.join(__dirname, '..', 'models', 'BlogPost.json')), // BlogPost.json 의 정보를 갖고 오는 posts 속성
    setPost: function (data) { this.posts = data }, // 
    getNumOfPosts: function () { return this.posts.length } // 현재 게시물의 개수를 반환하는 함수
}

const fetchAllPosts = (req, res) => res.status(200).json({ msg: Blog.posts }) // 모든 게시물들을 반환하는 코드
const handleNewPost = async (req, res) => { // 새 게시물을 추가하는 코드
    const { author, title, content } = req.body; //구조 분해 할당(destructuring assignment)을 통해 author, title, content 필드를 추출
    if (author == null || title == null || content == null)
        return res.status(400).json({ msg: '작성자, 제목, 본문 필드가 모두 필요합니다.' });
    const newPost = { "id": Blog.getNumOfPosts()+1, "author": author, "title": title, "content": content };
    Blog.setPost([...Blog.posts, newPost]); //spread 연산자를 통해 기존 블로그 posts와 방금 만든 newPost를 모은다.
    try { //파일I/O 등 작업을 할때는 try..catch문 등으로 예외처리 필수
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'models', 'BlogPost.json'),
            JSON.stringify(Blog.posts)
        );
        res.status(201).json({ 'msg': "새 게사글이 생성되었습니다. "});
    } catch {
        res.status(500).json({ 'msg': "알 수 없는 오류 발생 "});
    }
}
const fetchSinglePost = (req, res) => {
    idx = req.params.post_id - 1;
    res.status(200).json({ msg: Blog.posts[idx] })
} 


module.exports = { fetchAllPosts, handleNewPost, fetchSinglePost } // 다른 파일에서 이 함수를 사용할 수 있도록 내보낸다.