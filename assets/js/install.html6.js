const e=JSON.parse('{"key":"v-00fac020","path":"/posts/devops/nginx/install.html","title":"Nginx \u591A\u79CD\u5B89\u88C5\u65B9\u5F0F\u4EE5\u53CA\u7B2C\u4E09\u65B9\u6A21\u5757\u5B89\u88C5\u6B65\u9AA4","lang":"zh-CN","frontmatter":{"title":"Nginx \u591A\u79CD\u5B89\u88C5\u65B9\u5F0F\u4EE5\u53CA\u7B2C\u4E09\u65B9\u6A21\u5757\u5B89\u88C5\u6B65\u9AA4","date":"2022-02-18T18:51:45.000Z","tag":["nginx"],"category":["nginx","\u8FD0\u7EF4"],"image":"https://cdn.staticaly.com/gh/AnyFork/blog-images/main/markdown/202207201025944.jpg","summary":"\u2003\u65E5\u5E38\u5DE5\u4F5C\u4E2D\uFF0Cnginx \u4F7F\u7528\u975E\u5E38\u9891\u7E41\u3002\u4ECA\u65E5\u62BD\u7A7A\uFF0C\u987A\u4FBF\u6574\u7406\u4E00\u4E0B linux \u73AF\u5883\u4E0B nginx \u5E38\u7528\u7684 3 \u79CD\u5B89\u88C5\u65B9\u5F0F(yum,\u6E90\u7801\u7F16\u8BD1\uFF0Cdocker)\uFF0C\u4EE5\u5907\u65E5\u540E\u4F7F\u7528\uFF0C\u51CF\u5C11\u4E0D\u5FC5\u8981\u7684\u9519\u8BEF\u3002docker \u65B9\u5F0F\u6BD4\u8F83\u7B80\u5355\uFF0C\u4F46\u4E00\u5B9A\u8981\u6CE8\u610F\u6587\u4EF6\u76EE\u5F55\u6302\u8F7D\u914D\u7F6E\uFF0C\u914D\u7F6E\u4E0D\u6B63\u786E\uFF0C\u5373\u4F7F\u5BB9\u5668\u542F\u52A8\u8D77\u6765\uFF0Cnginx \u4E5F\u65E0\u6CD5\u8FD0\u884C\u3002\\n","head":[["meta",{"property":"og:url","content":"https://anyfork.github.io/blog-docs/posts/devops/nginx/install.html"}],["meta",{"property":"og:site_name","content":"\u6280\u672F\u7ECF\u9A8C\u603B\u7ED3"}],["meta",{"property":"og:title","content":"Nginx \u591A\u79CD\u5B89\u88C5\u65B9\u5F0F\u4EE5\u53CA\u7B2C\u4E09\u65B9\u6A21\u5757\u5B89\u88C5\u6B65\u9AA4"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-11-15T01:56:28.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"\u5C0F\u7D2B\u5FF5\u6C81"}],["meta",{"property":"article:tag","content":"nginx"}],["meta",{"property":"article:published_time","content":"2022-02-18T18:51:45.000Z"}],["meta",{"property":"article:modified_time","content":"2022-11-15T01:56:28.000Z"}]]},"excerpt":"<p>\u2003\u65E5\u5E38\u5DE5\u4F5C\u4E2D\uFF0Cnginx \u4F7F\u7528\u975E\u5E38\u9891\u7E41\u3002\u4ECA\u65E5\u62BD\u7A7A\uFF0C\u987A\u4FBF\u6574\u7406\u4E00\u4E0B linux \u73AF\u5883\u4E0B nginx \u5E38\u7528\u7684 3 \u79CD\u5B89\u88C5\u65B9\u5F0F(yum,\u6E90\u7801\u7F16\u8BD1\uFF0Cdocker)\uFF0C\u4EE5\u5907\u65E5\u540E\u4F7F\u7528\uFF0C\u51CF\u5C11\u4E0D\u5FC5\u8981\u7684\u9519\u8BEF\u3002docker \u65B9\u5F0F\u6BD4\u8F83\u7B80\u5355\uFF0C\u4F46\u4E00\u5B9A\u8981\u6CE8\u610F\u6587\u4EF6\u76EE\u5F55\u6302\u8F7D\u914D\u7F6E\uFF0C\u914D\u7F6E\u4E0D\u6B63\u786E\uFF0C\u5373\u4F7F\u5BB9\u5668\u542F\u52A8\u8D77\u6765\uFF0Cnginx \u4E5F\u65E0\u6CD5\u8FD0\u884C\u3002</p>\\n","headers":[{"level":2,"title":"\u4E00 yum \u5B89\u88C5 nginx","slug":"\u4E00-yum-\u5B89\u88C5-nginx","children":[{"level":3,"title":"1 \u66F4\u65B0 yum","slug":"_1-\u66F4\u65B0-yum","children":[]},{"level":3,"title":"2 \u5B89\u88C5 nginx \u6E90","slug":"_2-\u5B89\u88C5-nginx-\u6E90","children":[]},{"level":3,"title":"3 \u5B89\u88C5 nginx","slug":"_3-\u5B89\u88C5-nginx","children":[]},{"level":3,"title":"4 \u5F00\u653E 80 \u7AEF\u53E3\u6216\u8005\u5173\u95ED\u9632\u706B\u5899","slug":"_4-\u5F00\u653E-80-\u7AEF\u53E3\u6216\u8005\u5173\u95ED\u9632\u706B\u5899","children":[]},{"level":3,"title":"5 \u542F\u52A8 nginx","slug":"_5-\u542F\u52A8-nginx","children":[]},{"level":3,"title":"6 \u5F00\u673A\u81EA\u542F\u52A8","slug":"_6-\u5F00\u673A\u81EA\u542F\u52A8","children":[]},{"level":3,"title":"7 \u67E5\u770B nginx \u7248\u672C\u548C\u7F16\u8BD1\u53C2\u6570\u4FE1\u606F","slug":"_7-\u67E5\u770B-nginx-\u7248\u672C\u548C\u7F16\u8BD1\u53C2\u6570\u4FE1\u606F","children":[]}]},{"level":2,"title":"\u4E8C \u6E90\u7801\u7F16\u8BD1\u5B89\u88C5","slug":"\u4E8C-\u6E90\u7801\u7F16\u8BD1\u5B89\u88C5","children":[{"level":3,"title":"1\u3001\u4E0B\u8F7D Nginx","slug":"_1\u3001\u4E0B\u8F7D-nginx","children":[]},{"level":3,"title":"2\u3001\u89E3\u538B","slug":"_2\u3001\u89E3\u538B","children":[]},{"level":3,"title":"3\u3001\u8BD1\u73AF\u5883\u5B89\u88C5","slug":"_3\u3001\u8BD1\u73AF\u5883\u5B89\u88C5","children":[]},{"level":3,"title":"4\u3001\u9884\u7F16\u8BD1","slug":"_4\u3001\u9884\u7F16\u8BD1","children":[]},{"level":3,"title":"5\u3001\u7F16\u8BD1","slug":"_5\u3001\u7F16\u8BD1","children":[]},{"level":3,"title":"6\u3001\u5B89\u88C5","slug":"_6\u3001\u5B89\u88C5","children":[]},{"level":3,"title":"7\u3001\u521B\u5EFA linux \u5168\u5C40\u8F6F\u8FDE\u63A5","slug":"_7\u3001\u521B\u5EFA-linux-\u5168\u5C40\u8F6F\u8FDE\u63A5","children":[]},{"level":3,"title":"8\u3001nginx \u547D\u4EE4","slug":"_8\u3001nginx-\u547D\u4EE4","children":[]}]},{"level":2,"title":"\u4E09 Docker \u5B89\u88C5","slug":"\u4E09-docker-\u5B89\u88C5","children":[{"level":3,"title":"1\u3001\u62C9\u53D6 nginx \u955C\u50CF","slug":"_1\u3001\u62C9\u53D6-nginx-\u955C\u50CF","children":[]},{"level":3,"title":"2\u3001\u542F\u52A8 nginx \u5BB9\u5668","slug":"_2\u3001\u542F\u52A8-nginx-\u5BB9\u5668","children":[]},{"level":3,"title":"3\u3001\u521B\u5EFA\u6302\u8F7D\u76EE\u5F55","slug":"_3\u3001\u521B\u5EFA\u6302\u8F7D\u76EE\u5F55","children":[]},{"level":3,"title":"4\u3001\u590D\u5236\u5BB9\u5668\u4E2D\u6302\u8F7D\u6587\u4EF6","slug":"_4\u3001\u590D\u5236\u5BB9\u5668\u4E2D\u6302\u8F7D\u6587\u4EF6","children":[]},{"level":3,"title":"5\u3001\u5220\u9664\u65E7\u7684 nginx \u5BB9\u5668","slug":"_5\u3001\u5220\u9664\u65E7\u7684-nginx-\u5BB9\u5668","children":[]},{"level":3,"title":"6\u3001\u521B\u5EFA nginx \u6302\u8F7D\u76EE\u5F55\u5BB9\u5668","slug":"_6\u3001\u521B\u5EFA-nginx-\u6302\u8F7D\u76EE\u5F55\u5BB9\u5668","children":[]},{"level":3,"title":"7\u3001\u67E5\u770B nginx \u5BB9\u5668\u8FD0\u884C\u60C5\u51B5","slug":"_7\u3001\u67E5\u770B-nginx-\u5BB9\u5668\u8FD0\u884C\u60C5\u51B5","children":[]}]},{"level":2,"title":"\u56DB nginx \u5B89\u88C5\u7B2C\u4E09\u65B9\u6A21\u5757","slug":"\u56DB-nginx-\u5B89\u88C5\u7B2C\u4E09\u65B9\u6A21\u5757","children":[]}],"git":{"updatedTime":1668477388000,"contributors":[{"name":"Qiu-Qingyuan","email":"97420436+Qiu-Qingyuan@users.noreply.github.com","commits":1}]},"filePathRelative":"posts/devops/nginx/install.md","readingTime":{"minutes":8.48,"words":2544},"copyright":"\u8457\u4F5C\u6743\u5F52\u5C0F\u7D2B\u5FF5\u6C81\u6240\u6709\\n\u539F\u6587\u94FE\u63A5\uFF1Ahttps://anyfork.github.io/blog-docs/blog-docs/posts/devops/nginx/install.html"}');export{e as data};
