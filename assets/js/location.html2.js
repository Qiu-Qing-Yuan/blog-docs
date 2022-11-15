const t=JSON.parse('{"key":"v-267068b2","path":"/posts/devops/nginx/location.html","title":"Nginx location\u5339\u914D\u89C4\u5219","lang":"zh-CN","frontmatter":{"title":"Nginx location\u5339\u914D\u89C4\u5219","date":"2022-03-14T11:29:50.000Z","tag":["nginx"],"category":["nginx","\u8FD0\u7EF4"],"image":"https://cdn.staticaly.com/gh/AnyFork/blog-images/main/markdown/202207201031629.jpg","summary":"\u2003nginx \u7684 location \u6307\u4EE4\u7684\u4F5C\u7528\u662F\u6839\u636E\u7528\u6237\u8BF7\u6C42\u7684 URI \u6765\u6267\u884C\u4E0D\u540C\u7684\u5E94\u7528\uFF0CURI \u5C31\u662F\u6839\u636E\u7528\u6237\u8BF7\u6C42\u5230\u7684\u7F51\u5740 URL \u8FDB\u884C\u5339\u914D\uFF0C\u5339\u914D\u6210\u529F\u4E86\u8FDB\u884C\u76F8\u5173\u7684\u64CD\u4F5C\u3002\u4E00\u4E2A location \u53EF\u4EE5\u7528 prefix string(\u524D\u7F00\u5B57\u7B26\u4E32)\u5B9A\u4E49\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7 regular expression\uFF08\u6B63\u5219\u8868\u8FBE\u5F0F\u6765\u5B9A\u4E49\uFF09\u3002\u901A\u4FD7\u7684\u8BF4\u4E5F\u5C31\u662F\uFF1A\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u4F7F\u7528\u4E0D\u540C\u7684\u524D\u7F00\uFF0C\u8868\u8FBE\u4E0D\u540C\u7684\u542B\u4E49\uFF0C\u5BF9\u4E8E\u4E0D\u540C\u7684\u524D\u7F00\u53EF\u4EE5\u5206\u4E3A\u4E24\u5927\u7C7B\uFF1A\u666E\u901A location \u548C\u6B63\u5219 location\\n","head":[["meta",{"property":"og:url","content":"https://anyfork.github.io/blog-docs/posts/devops/nginx/location.html"}],["meta",{"property":"og:site_name","content":"\u6280\u672F\u7ECF\u9A8C\u603B\u7ED3"}],["meta",{"property":"og:title","content":"Nginx location\u5339\u914D\u89C4\u5219"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-11-15T01:46:03.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"\u5C0F\u7D2B\u5FF5\u6C81"}],["meta",{"property":"article:tag","content":"nginx"}],["meta",{"property":"article:published_time","content":"2022-03-14T11:29:50.000Z"}],["meta",{"property":"article:modified_time","content":"2022-11-15T01:46:03.000Z"}]]},"excerpt":"<p>\u2003nginx \u7684 location \u6307\u4EE4\u7684\u4F5C\u7528\u662F\u6839\u636E\u7528\u6237\u8BF7\u6C42\u7684 URI \u6765\u6267\u884C\u4E0D\u540C\u7684\u5E94\u7528\uFF0CURI \u5C31\u662F\u6839\u636E\u7528\u6237\u8BF7\u6C42\u5230\u7684\u7F51\u5740 URL \u8FDB\u884C\u5339\u914D\uFF0C\u5339\u914D\u6210\u529F\u4E86\u8FDB\u884C\u76F8\u5173\u7684\u64CD\u4F5C\u3002\u4E00\u4E2A location \u53EF\u4EE5\u7528 prefix string(\u524D\u7F00\u5B57\u7B26\u4E32)\u5B9A\u4E49\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7 regular expression\uFF08\u6B63\u5219\u8868\u8FBE\u5F0F\u6765\u5B9A\u4E49\uFF09\u3002\u901A\u4FD7\u7684\u8BF4\u4E5F\u5C31\u662F\uFF1A\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u4F7F\u7528\u4E0D\u540C\u7684\u524D\u7F00\uFF0C\u8868\u8FBE\u4E0D\u540C\u7684\u542B\u4E49\uFF0C\u5BF9\u4E8E\u4E0D\u540C\u7684\u524D\u7F00\u53EF\u4EE5\u5206\u4E3A\u4E24\u5927\u7C7B\uFF1A\u666E\u901A location \u548C\u6B63\u5219 location</p>\\n","headers":[{"level":2,"title":"location","slug":"location","children":[]},{"level":2,"title":"location \u5339\u914D\u89C4\u5219\u987A\u5E8F\u56FE","slug":"location-\u5339\u914D\u89C4\u5219\u987A\u5E8F\u56FE","children":[]}],"git":{"updatedTime":1668476763000,"contributors":[{"name":"Qiu-Qingyuan","email":"97420436+Qiu-Qingyuan@users.noreply.github.com","commits":1}]},"filePathRelative":"posts/devops/nginx/location.md","readingTime":{"minutes":2.62,"words":787},"copyright":"\u8457\u4F5C\u6743\u5F52\u5C0F\u7D2B\u5FF5\u6C81\u6240\u6709\\n\u539F\u6587\u94FE\u63A5\uFF1Ahttps://anyfork.github.io/blog-docs/blog-docs/posts/devops/nginx/location.html"}');export{t as data};
