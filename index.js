const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json()); // post요청의 body를 parsing할 수 있게하는 미들웨어

app.use('/blog', require('./routes/blog.js')) // /blog 로 들어오는 모든 요청은 blog.js에서 위임해간다.

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// index.js 는 서버를 설정하고 라우터를 연결하는 역할을 한다.
// node index.js 를 입력해서 여기서부터 코드가 시작된다.