export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    const lowerPath = path.toLowerCase();
    if (url.pathname === "/ME" || url.pathname.startsWith("/ME/")) {
      // 把 /a 前缀剥掉
      const newPath = url.pathname.replace(/^\/ME/, "") || "/";

      const target =
        "https://me.19491007.xyz" + newPath + url.search;

      return fetch(target, request);
    }
    if (url.pathname === "/VIL" || url.pathname.startsWith("/VIL/")) {
      // 把 /a 前缀剥掉
      const newPath = url.pathname.replace(/^\/VIL/, "") || "/";

      const target =
        "https://vil.19491007.xyz" + newPath + url.search;
      return fetch(target, request);
    }

    // 一级路径代理（前缀）
    const prefixRoutes = {
      "/vil": "https://vil.19491007.xyz",
      "/me": "https://me.19491007.xyz",
    };


    for (const prefix in prefixRoutes) {
      if (lowerPath === prefix || lowerPath.startsWith(prefix + "/")) {
        const target =
          prefixRoutes[prefix] +
          path.slice(prefix.length) +
          url.search;
        return fetch(target, request);
      }
    }

    // 其他固定前缀 → me
    const mePrefixes = ["/ME/"];
    for (const p of mePrefixes) {
      if (lowerPath.startsWith(p)) {
        return fetch("https://me.19491007.xyz" + path + url.search, request);
      }
    }

    const mePrefixes = ["/VIL/"];
    for (const p of mePrefixes) {
      if (lowerPath.startsWith(p)) {
        return fetch("https://vil.19491007.xyz" + path + url.search, request);
      }
    }


    // 未命中：直接透传或返回 404
    return new Response("Not Found", { status: 404 });
  },
};
