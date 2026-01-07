export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 代理路由配置
    const proxyRoutes = {
      '/vil': 'https://vil.19491007.xyz',
      '/me': 'https://me.19491007.xyz',
    };
    
    // 精确路径匹配
    if (proxyRoutes[url.pathname]) {
      return fetch(proxyRoutes[url.pathname], {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });
    }
    
    // 路径前缀匹配
    if (url.pathname.startsWith('/MEA/')) {
      const targetUrl = 'https://me.19491007.xyz' + url.pathname;
      return fetch(targetUrl, request);
    }
    
    if (url.pathname.startsWith('/MEW/')) {
      const targetUrl = 'https://me.19491007.xyz' + url.pathname;
      return fetch(targetUrl, request);
    }
    
    if (url.pathname.startsWith('/MEW-ZH/')) {
      const targetUrl = 'https://me.19491007.xyz' + url.pathname;
      return fetch(targetUrl, request);
    }
    
    if (url.pathname.startsWith('/LENIN/')) {
      const targetUrl = 'https://vil.19491007.xyz' + url.pathname;
      return fetch(targetUrl, request);
    }
    
    
    // 其他请求返回默认响应
    return new Response("OK from src/index.js", {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};