const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.post('/', blogController.handleNewPost); // post로 /blog 가 입력되면 blogController의 handleNewPost 함수가 실행된다.
router.get('/', blogController.fetchAllPosts); // get으로 /blog 가 입력되면 blogController의 fetchAllPosts 함수가 실행된다.
router.get('/:post_id', blogController.fetchSinglePost); // get으로 /post_id가 입력되면, blogController의 fetchSinglePost 함수가 실행된다.
module.exports = router;

// 라우터를 servlet-context.xml 로 받아들이기
// 여기서는 특정 경로가 입력될 시 그 경로를 controller 로 연결해주는 역할을 한다.
