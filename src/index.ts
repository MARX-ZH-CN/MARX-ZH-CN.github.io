export default {
  async fetch(request, env, ctx) {  
  return new Response("OK from src/index.ts", {   
   headers: { 
"content-type": "text/plain; charset=utf-8" 
},  
  });  
},
};

