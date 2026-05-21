// _worker.js
export default {
  async fetch(request) {
    const url = new URL(request.url);
    // 提取图片路径，例如 /images/abc.png
    const imagePath = url.pathname;

    // 你的 GitHub 仓库信息
    const owner = 'HYL-Wah';
    const repo = 'picx-images-hosting';
    const branch = 'master';

    // 构造 GitHub Raw 地址
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}${imagePath}`;

    // 请求原图
    const imageRes = await fetch(rawUrl);

    // 检查是否成功
    if (!imageRes.ok) {
      return new Response('Image not found', { status: 404 });
    }

    // 返回图片，并设置长效缓存（1年）
    const headers = new Headers(imageRes.headers);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    
    return new Response(imageRes.body, {
      status: imageRes.status,
      headers,
    });
  }
};
