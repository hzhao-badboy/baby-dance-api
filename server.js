const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// 中间件示例：解析 JSON 请求体
app.use(express.json());

app.use(cors({
  origin: '*', // 允许所有域名
  methods: 'GET,POST,PUT,DELETE', // 允许的 HTTP 方法
  allowedHeaders: 'Content-Type,Authorization' // 允许的请求头
}));

// 定义一个根路由
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/notion', async (req, res) => {
  try {
    const response = addToNotion(req.body)
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 创建一个 Axios 实例
const api = axios.create({
  baseURL: 'https://api.notion.com', // 替换为你的 API 基础 URL
  timeout: 10000, // 请求超时时间
  headers: { 
    'Notion-Version': '2022-06-28', 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer secret_svT4shxJcxvZ3Ag8CfGrlvILaloW4Q3WSHNvJ8a5iJf', 
  },
});

const addToNotion = async (data) => {
    const res = await api.post('/v1/pages', data);
    return res
}


// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
