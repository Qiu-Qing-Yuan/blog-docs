const l=JSON.parse('{"key":"v-db9b3b8e","path":"/posts/design-pattern/","title":"Java 23\u79CD\u8BBE\u8BA1\u6A21\u5F0F","lang":"zh-CN","frontmatter":{"title":"Java 23\u79CD\u8BBE\u8BA1\u6A21\u5F0F","description":"Java 23\u79CD\u8BBE\u8BA1\u6A21\u5F0F,\u8BBE\u8BA1\u6A21\u5F0F\uFF0CJava","date":"2022-08-19T21:55:00.000Z","sidebar":"auto","tag":["\u8BBE\u8BA1\u6A21\u5F0F"],"category":["java"],"image":"https://cdn.staticaly.com/gh/AnyFork/blog-images/main/markdown/202208242030437.jpg","head":[["meta",{"property":"og:url","content":"https://anyfork.github.io/blog-docs/posts/design-pattern/"}],["meta",{"property":"og:site_name","content":"\u6280\u672F\u7ECF\u9A8C\u603B\u7ED3"}],["meta",{"property":"og:title","content":"Java 23\u79CD\u8BBE\u8BA1\u6A21\u5F0F"}],["meta",{"property":"og:description","content":"Java 23\u79CD\u8BBE\u8BA1\u6A21\u5F0F,\u8BBE\u8BA1\u6A21\u5F0F\uFF0CJava"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2022-11-19T07:09:52.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"\u5C0F\u7D2B\u5FF5\u6C81"}],["meta",{"property":"article:tag","content":"\u8BBE\u8BA1\u6A21\u5F0F"}],["meta",{"property":"article:published_time","content":"2022-08-19T21:55:00.000Z"}],["meta",{"property":"article:modified_time","content":"2022-11-19T07:09:52.000Z"}]]},"excerpt":"<p>\u8F6F\u4EF6\u8BBE\u8BA1\u6A21\u5F0F\uFF08Software Design Pattern\uFF09\uFF0C\u53C8\u79F0\u8BBE\u8BA1\u6A21\u5F0F\uFF0C\u662F\u4E00\u5957\u88AB\u53CD\u590D\u4F7F\u7528\u3001\u591A\u6570\u4EBA\u77E5\u6653\u7684\u3001\u7ECF\u8FC7\u5206\u7C7B\u7F16\u76EE\u7684\u3001\u4EE3\u7801\u8BBE\u8BA1\u7ECF\u9A8C\u7684\u603B\u7ED3\u3002\u5B83\u63CF\u8FF0\u4E86\u5728\u8F6F\u4EF6\u8BBE\u8BA1\u8FC7\u7A0B\u4E2D\u7684\u4E00\u4E9B\u4E0D\u65AD\u91CD\u590D\u53D1\u751F\u7684\u95EE\u9898\uFF0C\u4EE5\u53CA\u8BE5\u95EE\u9898\u7684\u89E3\u51B3\u65B9\u6848\u3002\u4E5F\u5C31\u662F\u8BF4\uFF0C\u5B83\u662F\u89E3\u51B3\u7279\u5B9A\u95EE\u9898\u7684\u4E00\u7CFB\u5217\u5957\u8DEF\uFF0C\u662F\u524D\u8F88\u4EEC\u7684\u4EE3\u7801\u8BBE\u8BA1\u7ECF\u9A8C\u7684\u603B\u7ED3\uFF0C\u5177\u6709\u4E00\u5B9A\u7684\u666E\u904D\u6027\uFF0C\u53EF\u4EE5\u53CD\u590D\u4F7F\u7528\u3002</p>\\n","headers":[{"level":1,"title":"1\uFF0C\u8BBE\u8BA1\u6A21\u5F0F\u6982\u8FF0","slug":"_1-\u8BBE\u8BA1\u6A21\u5F0F\u6982\u8FF0","children":[{"level":2,"title":"1.1 \u8F6F\u4EF6\u8BBE\u8BA1\u6A21\u5F0F\u7684\u4EA7\u751F\u80CC\u666F","slug":"_1-1-\u8F6F\u4EF6\u8BBE\u8BA1\u6A21\u5F0F\u7684\u4EA7\u751F\u80CC\u666F","children":[]},{"level":2,"title":"1.2 \u8F6F\u4EF6\u8BBE\u8BA1\u6A21\u5F0F\u7684\u6982\u5FF5","slug":"_1-2-\u8F6F\u4EF6\u8BBE\u8BA1\u6A21\u5F0F\u7684\u6982\u5FF5","children":[]},{"level":2,"title":"1.3 \u5B66\u4E60\u8BBE\u8BA1\u6A21\u5F0F\u7684\u5FC5\u8981\u6027","slug":"_1-3-\u5B66\u4E60\u8BBE\u8BA1\u6A21\u5F0F\u7684\u5FC5\u8981\u6027","children":[]},{"level":2,"title":"1.4 \u8BBE\u8BA1\u6A21\u5F0F\u5206\u7C7B","slug":"_1-4-\u8BBE\u8BA1\u6A21\u5F0F\u5206\u7C7B","children":[]}]},{"level":1,"title":"2\uFF0CUML \u56FE","slug":"_2-uml-\u56FE","children":[{"level":2,"title":"2.1 \u7C7B\u56FE\u6982\u8FF0","slug":"_2-1-\u7C7B\u56FE\u6982\u8FF0","children":[]},{"level":2,"title":"2.2 \u7C7B\u56FE\u7684\u4F5C\u7528","slug":"_2-2-\u7C7B\u56FE\u7684\u4F5C\u7528","children":[]},{"level":2,"title":"2.3 \u7C7B\u56FE\u8868\u793A\u6CD5","slug":"_2-3-\u7C7B\u56FE\u8868\u793A\u6CD5","children":[{"level":3,"title":"2.3.1 \u7C7B\u7684\u8868\u793A\u65B9\u5F0F","slug":"_2-3-1-\u7C7B\u7684\u8868\u793A\u65B9\u5F0F","children":[]},{"level":3,"title":"2.3.2 \u7C7B\u4E0E\u7C7B\u4E4B\u95F4\u5173\u7CFB\u7684\u8868\u793A\u65B9\u5F0F","slug":"_2-3-2-\u7C7B\u4E0E\u7C7B\u4E4B\u95F4\u5173\u7CFB\u7684\u8868\u793A\u65B9\u5F0F","children":[{"level":4,"title":"2.3.2.1 \u5173\u8054\u5173\u7CFB","slug":"_2-3-2-1-\u5173\u8054\u5173\u7CFB","children":[]},{"level":4,"title":"2.3.2.2 \u805A\u5408\u5173\u7CFB","slug":"_2-3-2-2-\u805A\u5408\u5173\u7CFB","children":[]},{"level":4,"title":"2.3.2.3 \u7EC4\u5408\u5173\u7CFB","slug":"_2-3-2-3-\u7EC4\u5408\u5173\u7CFB","children":[]},{"level":4,"title":"2.3.2.4 \u4F9D\u8D56\u5173\u7CFB","slug":"_2-3-2-4-\u4F9D\u8D56\u5173\u7CFB","children":[]},{"level":4,"title":"2.3.2.5 \u7EE7\u627F\u5173\u7CFB","slug":"_2-3-2-5-\u7EE7\u627F\u5173\u7CFB","children":[]},{"level":4,"title":"2.3.2.6 \u5B9E\u73B0\u5173\u7CFB","slug":"_2-3-2-6-\u5B9E\u73B0\u5173\u7CFB","children":[]}]}]}]},{"level":1,"title":"3\uFF0C\u8F6F\u4EF6\u8BBE\u8BA1\u539F\u5219","slug":"_3-\u8F6F\u4EF6\u8BBE\u8BA1\u539F\u5219","children":[{"level":2,"title":"3.1 \u5F00\u95ED\u539F\u5219","slug":"_3-1-\u5F00\u95ED\u539F\u5219","children":[]},{"level":2,"title":"3.2 \u91CC\u6C0F\u4EE3\u6362\u539F\u5219","slug":"_3-2-\u91CC\u6C0F\u4EE3\u6362\u539F\u5219","children":[]},{"level":2,"title":"3.3 \u4F9D\u8D56\u5012\u8F6C\u539F\u5219","slug":"_3-3-\u4F9D\u8D56\u5012\u8F6C\u539F\u5219","children":[]},{"level":2,"title":"3.4 \u63A5\u53E3\u9694\u79BB\u539F\u5219","slug":"_3-4-\u63A5\u53E3\u9694\u79BB\u539F\u5219","children":[]},{"level":2,"title":"3.5 \u8FEA\u7C73\u7279\u6CD5\u5219","slug":"_3-5-\u8FEA\u7C73\u7279\u6CD5\u5219","children":[]},{"level":2,"title":"3.6 \u5408\u6210\u590D\u7528\u539F\u5219","slug":"_3-6-\u5408\u6210\u590D\u7528\u539F\u5219","children":[]}]},{"level":1,"title":"4\uFF0C\u521B\u5EFA\u8005\u6A21\u5F0F","slug":"_4-\u521B\u5EFA\u8005\u6A21\u5F0F","children":[{"level":2,"title":"4.1 \u5355\u4F8B\u8BBE\u8BA1\u6A21\u5F0F","slug":"_4-1-\u5355\u4F8B\u8BBE\u8BA1\u6A21\u5F0F","children":[{"level":3,"title":"4.1.1 \u5355\u4F8B\u6A21\u5F0F\u7684\u7ED3\u6784","slug":"_4-1-1-\u5355\u4F8B\u6A21\u5F0F\u7684\u7ED3\u6784","children":[]},{"level":3,"title":"4.1.2 \u5355\u4F8B\u6A21\u5F0F\u7684\u5B9E\u73B0","slug":"_4-1-2-\u5355\u4F8B\u6A21\u5F0F\u7684\u5B9E\u73B0","children":[]},{"level":3,"title":"4.1.3 \u5355\u4F8B\u6A21\u5F0F\u5B58\u5728\u7684\u95EE\u9898","slug":"_4-1-3-\u5355\u4F8B\u6A21\u5F0F\u5B58\u5728\u7684\u95EE\u9898","children":[{"level":4,"title":"4.1.3.1 \u95EE\u9898\u6F14\u793A","slug":"_4-1-3-1-\u95EE\u9898\u6F14\u793A","children":[]},{"level":4,"title":"4.1.3.2 \u95EE\u9898\u7684\u89E3\u51B3","slug":"_4-1-3-2-\u95EE\u9898\u7684\u89E3\u51B3","children":[]}]},{"level":3,"title":"4.1.4 JDK \u6E90\u7801\u89E3\u6790-Runtime \u7C7B","slug":"_4-1-4-jdk-\u6E90\u7801\u89E3\u6790-runtime-\u7C7B","children":[]}]},{"level":2,"title":"4.2 \u5DE5\u5382\u6A21\u5F0F","slug":"_4-2-\u5DE5\u5382\u6A21\u5F0F","children":[{"level":3,"title":"4.2.1 \u6982\u8FF0","slug":"_4-2-1-\u6982\u8FF0","children":[]},{"level":3,"title":"4.2.2 \u7B80\u5355\u5DE5\u5382\u6A21\u5F0F","slug":"_4-2-2-\u7B80\u5355\u5DE5\u5382\u6A21\u5F0F","children":[{"level":4,"title":"4.2.2.1 \u7ED3\u6784","slug":"_4-2-2-1-\u7ED3\u6784","children":[]},{"level":4,"title":"4.2.2.2 \u5B9E\u73B0","slug":"_4-2-2-2-\u5B9E\u73B0","children":[]},{"level":4,"title":"4.2.2.4 \u4F18\u7F3A\u70B9","slug":"_4-2-2-4-\u4F18\u7F3A\u70B9","children":[]},{"level":4,"title":"4.2.2.3 \u6269\u5C55","slug":"_4-2-2-3-\u6269\u5C55","children":[]}]},{"level":3,"title":"4.2.3 \u5DE5\u5382\u65B9\u6CD5\u6A21\u5F0F","slug":"_4-2-3-\u5DE5\u5382\u65B9\u6CD5\u6A21\u5F0F","children":[{"level":4,"title":"4.2.3.1 \u6982\u5FF5","slug":"_4-2-3-1-\u6982\u5FF5","children":[]},{"level":4,"title":"4.2.3.2 \u7ED3\u6784","slug":"_4-2-3-2-\u7ED3\u6784","children":[]},{"level":4,"title":"4.2.3.3 \u5B9E\u73B0","slug":"_4-2-3-3-\u5B9E\u73B0","children":[]},{"level":4,"title":"4.2.3.4 \u4F18\u7F3A\u70B9","slug":"_4-2-3-4-\u4F18\u7F3A\u70B9","children":[]}]},{"level":3,"title":"4.2.4 \u62BD\u8C61\u5DE5\u5382\u6A21\u5F0F","slug":"_4-2-4-\u62BD\u8C61\u5DE5\u5382\u6A21\u5F0F","children":[{"level":4,"title":"4.2.4.1 \u6982\u5FF5","slug":"_4-2-4-1-\u6982\u5FF5","children":[]},{"level":4,"title":"4.2.4.2 \u7ED3\u6784","slug":"_4-2-4-2-\u7ED3\u6784","children":[]},{"level":4,"title":"4.2.4.2 \u5B9E\u73B0","slug":"_4-2-4-2-\u5B9E\u73B0","children":[]},{"level":4,"title":"4.2.4.3 \u4F18\u7F3A\u70B9","slug":"_4-2-4-3-\u4F18\u7F3A\u70B9","children":[]},{"level":4,"title":"4.2.4.4 \u4F7F\u7528\u573A\u666F","slug":"_4-2-4-4-\u4F7F\u7528\u573A\u666F","children":[]}]},{"level":3,"title":"4.2.5 \u6A21\u5F0F\u6269\u5C55","slug":"_4-2-5-\u6A21\u5F0F\u6269\u5C55","children":[]},{"level":3,"title":"4.2.6 JDK \u6E90\u7801\u89E3\u6790-Collection.iterator \u65B9\u6CD5","slug":"_4-2-6-jdk-\u6E90\u7801\u89E3\u6790-collection-iterator-\u65B9\u6CD5","children":[]}]},{"level":2,"title":"4.3 \u539F\u578B\u6A21\u5F0F","slug":"_4-3-\u539F\u578B\u6A21\u5F0F","children":[{"level":3,"title":"4.3.1 \u6982\u8FF0","slug":"_4-3-1-\u6982\u8FF0","children":[]},{"level":3,"title":"4.3.2 \u7ED3\u6784","slug":"_4-3-2-\u7ED3\u6784","children":[]},{"level":3,"title":"4.3.3 \u5B9E\u73B0","slug":"_4-3-3-\u5B9E\u73B0","children":[]},{"level":3,"title":"4.3.4 \u6848\u4F8B","slug":"_4-3-4-\u6848\u4F8B","children":[]},{"level":3,"title":"4.3.5 \u4F7F\u7528\u573A\u666F","slug":"_4-3-5-\u4F7F\u7528\u573A\u666F","children":[]},{"level":3,"title":"4.3.6 \u6269\u5C55\uFF08\u6DF1\u514B\u9686\uFF09","slug":"_4-3-6-\u6269\u5C55-\u6DF1\u514B\u9686","children":[]}]},{"level":2,"title":"4.5 \u5EFA\u9020\u8005\u6A21\u5F0F","slug":"_4-5-\u5EFA\u9020\u8005\u6A21\u5F0F","children":[{"level":3,"title":"4.4.1 \u6982\u8FF0","slug":"_4-4-1-\u6982\u8FF0","children":[]},{"level":3,"title":"4.4.2 \u7ED3\u6784","slug":"_4-4-2-\u7ED3\u6784","children":[]},{"level":3,"title":"4.4.3 \u5B9E\u4F8B","slug":"_4-4-3-\u5B9E\u4F8B","children":[]},{"level":3,"title":"4.4.4 \u4F18\u7F3A\u70B9","slug":"_4-4-4-\u4F18\u7F3A\u70B9","children":[]},{"level":3,"title":"4.4.5 \u4F7F\u7528\u573A\u666F","slug":"_4-4-5-\u4F7F\u7528\u573A\u666F","children":[]},{"level":3,"title":"4.4.6 \u6A21\u5F0F\u6269\u5C55","slug":"_4-4-6-\u6A21\u5F0F\u6269\u5C55","children":[]}]},{"level":2,"title":"4.6 \u521B\u5EFA\u8005\u6A21\u5F0F\u5BF9\u6BD4","slug":"_4-6-\u521B\u5EFA\u8005\u6A21\u5F0F\u5BF9\u6BD4","children":[{"level":3,"title":"4.6.1 \u5DE5\u5382\u65B9\u6CD5\u6A21\u5F0F VS \u5EFA\u9020\u8005\u6A21\u5F0F","slug":"_4-6-1-\u5DE5\u5382\u65B9\u6CD5\u6A21\u5F0F-vs-\u5EFA\u9020\u8005\u6A21\u5F0F","children":[]},{"level":3,"title":"4.6.2 \u62BD\u8C61\u5DE5\u5382\u6A21\u5F0F VS \u5EFA\u9020\u8005\u6A21\u5F0F","slug":"_4-6-2-\u62BD\u8C61\u5DE5\u5382\u6A21\u5F0F-vs-\u5EFA\u9020\u8005\u6A21\u5F0F","children":[]}]}]},{"level":1,"title":"5\uFF0C\u7ED3\u6784\u578B\u6A21\u5F0F","slug":"_5-\u7ED3\u6784\u578B\u6A21\u5F0F","children":[{"level":2,"title":"5.1 \u4EE3\u7406\u6A21\u5F0F","slug":"_5-1-\u4EE3\u7406\u6A21\u5F0F","children":[{"level":3,"title":"5.1.1 \u6982\u8FF0","slug":"_5-1-1-\u6982\u8FF0","children":[]},{"level":3,"title":"5.1.2 \u7ED3\u6784","slug":"_5-1-2-\u7ED3\u6784","children":[]},{"level":3,"title":"5.1.3 \u9759\u6001\u4EE3\u7406","slug":"_5-1-3-\u9759\u6001\u4EE3\u7406","children":[]},{"level":3,"title":"5.1.4 JDK \u52A8\u6001\u4EE3\u7406","slug":"_5-1-4-jdk-\u52A8\u6001\u4EE3\u7406","children":[]},{"level":3,"title":"5.1.5 CGLIB \u52A8\u6001\u4EE3\u7406","slug":"_5-1-5-cglib-\u52A8\u6001\u4EE3\u7406","children":[]},{"level":3,"title":"5.1.6 \u4E09\u79CD\u4EE3\u7406\u7684\u5BF9\u6BD4","slug":"_5-1-6-\u4E09\u79CD\u4EE3\u7406\u7684\u5BF9\u6BD4","children":[]},{"level":3,"title":"5.1.7 \u4F18\u7F3A\u70B9","slug":"_5-1-7-\u4F18\u7F3A\u70B9","children":[]},{"level":3,"title":"5.1.8 \u4F7F\u7528\u573A\u666F","slug":"_5-1-8-\u4F7F\u7528\u573A\u666F","children":[]}]},{"level":2,"title":"5.2 \u9002\u914D\u5668\u6A21\u5F0F","slug":"_5-2-\u9002\u914D\u5668\u6A21\u5F0F","children":[{"level":3,"title":"5.2.1 \u6982\u8FF0","slug":"_5-2-1-\u6982\u8FF0","children":[]},{"level":3,"title":"5.2.2 \u7ED3\u6784","slug":"_5-2-2-\u7ED3\u6784","children":[]},{"level":3,"title":"5.2.3 \u7C7B\u9002\u914D\u5668\u6A21\u5F0F","slug":"_5-2-3-\u7C7B\u9002\u914D\u5668\u6A21\u5F0F","children":[]},{"level":3,"title":"5.2.4 \u5BF9\u8C61\u9002\u914D\u5668\u6A21\u5F0F","slug":"_5-2-4-\u5BF9\u8C61\u9002\u914D\u5668\u6A21\u5F0F","children":[]},{"level":3,"title":"5.2.5 \u5E94\u7528\u573A\u666F","slug":"_5-2-5-\u5E94\u7528\u573A\u666F","children":[]},{"level":3,"title":"5.2.6 JDK \u6E90\u7801\u89E3\u6790","slug":"_5-2-6-jdk-\u6E90\u7801\u89E3\u6790","children":[]}]},{"level":2,"title":"5.3 \u88C5\u9970\u8005\u6A21\u5F0F","slug":"_5-3-\u88C5\u9970\u8005\u6A21\u5F0F","children":[{"level":3,"title":"5.3.1 \u6982\u8FF0","slug":"_5-3-1-\u6982\u8FF0","children":[]},{"level":3,"title":"5.3.2 \u7ED3\u6784","slug":"_5-3-2-\u7ED3\u6784","children":[]},{"level":3,"title":"5.3.3 \u6848\u4F8B","slug":"_5-3-3-\u6848\u4F8B","children":[]},{"level":3,"title":"5.3.4 \u4F7F\u7528\u573A\u666F","slug":"_5-3-4-\u4F7F\u7528\u573A\u666F","children":[]},{"level":3,"title":"5.3.5 JDK \u6E90\u7801\u89E3\u6790","slug":"_5-3-5-jdk-\u6E90\u7801\u89E3\u6790","children":[]},{"level":3,"title":"5.3.6 \u4EE3\u7406\u548C\u88C5\u9970\u8005\u7684\u533A\u522B","slug":"_5-3-6-\u4EE3\u7406\u548C\u88C5\u9970\u8005\u7684\u533A\u522B","children":[]}]},{"level":2,"title":"5.4 \u6865\u63A5\u6A21\u5F0F","slug":"_5-4-\u6865\u63A5\u6A21\u5F0F","children":[{"level":3,"title":"5.4.1 \u6982\u8FF0","slug":"_5-4-1-\u6982\u8FF0","children":[]},{"level":3,"title":"5.4.2 \u7ED3\u6784","slug":"_5-4-2-\u7ED3\u6784","children":[]},{"level":3,"title":"5.4.3 \u6848\u4F8B","slug":"_5-4-3-\u6848\u4F8B","children":[]},{"level":3,"title":"5.4.4 \u4F7F\u7528\u573A\u666F","slug":"_5-4-4-\u4F7F\u7528\u573A\u666F","children":[]}]},{"level":2,"title":"5.5 \u5916\u89C2\u6A21\u5F0F","slug":"_5-5-\u5916\u89C2\u6A21\u5F0F","children":[{"level":3,"title":"5.5.1 \u6982\u8FF0","slug":"_5-5-1-\u6982\u8FF0","children":[]},{"level":3,"title":"5.5.2 \u7ED3\u6784","slug":"_5-5-2-\u7ED3\u6784","children":[]},{"level":3,"title":"5.5.3 \u6848\u4F8B","slug":"_5-5-3-\u6848\u4F8B","children":[]},{"level":3,"title":"5.5.4 \u4F7F\u7528\u573A\u666F","slug":"_5-5-4-\u4F7F\u7528\u573A\u666F","children":[]},{"level":3,"title":"5.5.5 \u6E90\u7801\u89E3\u6790","slug":"_5-5-5-\u6E90\u7801\u89E3\u6790","children":[]}]},{"level":2,"title":"5.6 \u7EC4\u5408\u6A21\u5F0F","slug":"_5-6-\u7EC4\u5408\u6A21\u5F0F","children":[{"level":3,"title":"5.6.1 \u6982\u8FF0","slug":"_5-6-1-\u6982\u8FF0","children":[]},{"level":3,"title":"5.6.2 \u7ED3\u6784","slug":"_5-6-2-\u7ED3\u6784","children":[]},{"level":3,"title":"5.6.3 \u6848\u4F8B\u5B9E\u73B0","slug":"_5-6-3-\u6848\u4F8B\u5B9E\u73B0","children":[]},{"level":3,"title":"5.6.4 \u7EC4\u5408\u6A21\u5F0F\u7684\u5206\u7C7B","slug":"_5-6-4-\u7EC4\u5408\u6A21\u5F0F\u7684\u5206\u7C7B","children":[]},{"level":3,"title":"5.6.5 \u4F18\u70B9","slug":"_5-6-5-\u4F18\u70B9","children":[]},{"level":3,"title":"5.6.6 \u4F7F\u7528\u573A\u666F","slug":"_5-6-6-\u4F7F\u7528\u573A\u666F","children":[]}]},{"level":2,"title":"5.7 \u4EAB\u5143\u6A21\u5F0F","slug":"_5-7-\u4EAB\u5143\u6A21\u5F0F","children":[{"level":3,"title":"5.7.1 \u6982\u8FF0","slug":"_5-7-1-\u6982\u8FF0","children":[]},{"level":3,"title":"5.7.2 \u7ED3\u6784","slug":"_5-7-2-\u7ED3\u6784","children":[]},{"level":3,"title":"5.7.3 \u6848\u4F8B\u5B9E\u73B0","slug":"_5-7-3-\u6848\u4F8B\u5B9E\u73B0","children":[]},{"level":3,"title":"5.7.5 \u4F18\u7F3A\u70B9\u548C\u4F7F\u7528\u573A\u666F","slug":"_5-7-5-\u4F18\u7F3A\u70B9\u548C\u4F7F\u7528\u573A\u666F","children":[]},{"level":3,"title":"5.7.6 JDK \u6E90\u7801\u89E3\u6790","slug":"_5-7-6-jdk-\u6E90\u7801\u89E3\u6790","children":[]}]}]},{"level":1,"title":"6\uFF0C\u884C\u4E3A\u578B\u6A21\u5F0F","slug":"_6-\u884C\u4E3A\u578B\u6A21\u5F0F","children":[{"level":2,"title":"6.1 \u6A21\u677F\u65B9\u6CD5\u6A21\u5F0F","slug":"_6-1-\u6A21\u677F\u65B9\u6CD5\u6A21\u5F0F","children":[{"level":3,"title":"6.1.1 \u6982\u8FF0","slug":"_6-1-1-\u6982\u8FF0","children":[]},{"level":3,"title":"6.1.2 \u7ED3\u6784","slug":"_6-1-2-\u7ED3\u6784","children":[]},{"level":3,"title":"6.1.3 \u6848\u4F8B\u5B9E\u73B0","slug":"_6-1-3-\u6848\u4F8B\u5B9E\u73B0","children":[]},{"level":3,"title":"6.1.3 \u4F18\u7F3A\u70B9","slug":"_6-1-3-\u4F18\u7F3A\u70B9","children":[]},{"level":3,"title":"6.1.4 \u9002\u7528\u573A\u666F","slug":"_6-1-4-\u9002\u7528\u573A\u666F","children":[]},{"level":3,"title":"6.1.5 JDK \u6E90\u7801\u89E3\u6790","slug":"_6-1-5-jdk-\u6E90\u7801\u89E3\u6790","children":[]}]},{"level":2,"title":"6.2 \u7B56\u7565\u6A21\u5F0F","slug":"_6-2-\u7B56\u7565\u6A21\u5F0F","children":[{"level":3,"title":"6.2.1 \u6982\u8FF0","slug":"_6-2-1-\u6982\u8FF0","children":[]},{"level":3,"title":"6.2.2 \u7ED3\u6784","slug":"_6-2-2-\u7ED3\u6784","children":[]},{"level":3,"title":"6.2.3 \u6848\u4F8B\u5B9E\u73B0","slug":"_6-2-3-\u6848\u4F8B\u5B9E\u73B0","children":[]},{"level":3,"title":"6.2.4 \u4F18\u7F3A\u70B9","slug":"_6-2-4-\u4F18\u7F3A\u70B9","children":[]},{"level":3,"title":"6.2.5 \u4F7F\u7528\u573A\u666F","slug":"_6-2-5-\u4F7F\u7528\u573A\u666F","children":[]},{"level":3,"title":"6.2.6 JDK \u6E90\u7801\u89E3\u6790","slug":"_6-2-6-jdk-\u6E90\u7801\u89E3\u6790","children":[]}]},{"level":2,"title":"6.3 \u547D\u4EE4\u6A21\u5F0F","slug":"_6-3-\u547D\u4EE4\u6A21\u5F0F","children":[{"level":3,"title":"6.3.1 \u6982\u8FF0","slug":"_6-3-1-\u6982\u8FF0","children":[]},{"level":3,"title":"6.3.2 \u7ED3\u6784","slug":"_6-3-2-\u7ED3\u6784","children":[]},{"level":3,"title":"6.3.3 \u6848\u4F8B\u5B9E\u73B0","slug":"_6-3-3-\u6848\u4F8B\u5B9E\u73B0","children":[]},{"level":3,"title":"6.3.4 \u4F18\u7F3A\u70B9","slug":"_6-3-4-\u4F18\u7F3A\u70B9","children":[]},{"level":3,"title":"6.3.5 \u4F7F\u7528\u573A\u666F","slug":"_6-3-5-\u4F7F\u7528\u573A\u666F","children":[]},{"level":3,"title":"6.3.6 JDK \u6E90\u7801\u89E3\u6790","slug":"_6-3-6-jdk-\u6E90\u7801\u89E3\u6790","children":[]}]},{"level":2,"title":"6.4 \u8D23\u4EFB\u94FE\u6A21\u5F0F","slug":"_6-4-\u8D23\u4EFB\u94FE\u6A21\u5F0F","children":[{"level":3,"title":"6.4.1 \u6982\u8FF0","slug":"_6-4-1-\u6982\u8FF0","children":[]},{"level":3,"title":"6.4.2 \u7ED3\u6784","slug":"_6-4-2-\u7ED3\u6784","children":[]},{"level":3,"title":"6.4.3 \u6848\u4F8B\u5B9E\u73B0","slug":"_6-4-3-\u6848\u4F8B\u5B9E\u73B0","children":[]},{"level":3,"title":"6.4.4 \u4F18\u7F3A\u70B9","slug":"_6-4-4-\u4F18\u7F3A\u70B9","children":[]},{"level":3,"title":"6.4.5 \u6E90\u7801\u89E3\u6790","slug":"_6-4-5-\u6E90\u7801\u89E3\u6790","children":[]}]},{"level":2,"title":"6.5 \u72B6\u6001\u6A21\u5F0F","slug":"_6-5-\u72B6\u6001\u6A21\u5F0F","children":[{"level":3,"title":"6.5.1 \u6982\u8FF0","slug":"_6-5-1-\u6982\u8FF0","children":[]},{"level":3,"title":"6.5.2 \u7ED3\u6784","slug":"_6-5-2-\u7ED3\u6784","children":[]},{"level":3,"title":"6.5.3 \u6848\u4F8B\u5B9E\u73B0","slug":"_6-5-3-\u6848\u4F8B\u5B9E\u73B0","children":[]},{"level":3,"title":"6.5.4 \u4F18\u7F3A\u70B9","slug":"_6-5-4-\u4F18\u7F3A\u70B9","children":[]},{"level":3,"title":"6.5.5 \u4F7F\u7528\u573A\u666F","slug":"_6-5-5-\u4F7F\u7528\u573A\u666F","children":[]}]},{"level":2,"title":"6.6 \u89C2\u5BDF\u8005\u6A21\u5F0F","slug":"_6-6-\u89C2\u5BDF\u8005\u6A21\u5F0F","children":[{"level":3,"title":"6.6.1 \u6982\u8FF0","slug":"_6-6-1-\u6982\u8FF0","children":[]},{"level":3,"title":"6.6.2 \u7ED3\u6784","slug":"_6-6-2-\u7ED3\u6784","children":[]},{"level":3,"title":"6.6.3 \u6848\u4F8B\u5B9E\u73B0","slug":"_6-6-3-\u6848\u4F8B\u5B9E\u73B0","children":[]},{"level":3,"title":"6.6.4 \u4F18\u7F3A\u70B9","slug":"_6-6-4-\u4F18\u7F3A\u70B9","children":[]},{"level":3,"title":"6.6.5 \u4F7F\u7528\u573A\u666F","slug":"_6-6-5-\u4F7F\u7528\u573A\u666F","children":[]},{"level":3,"title":"6.6.6 JDK \u4E2D\u63D0\u4F9B\u7684\u5B9E\u73B0","slug":"_6-6-6-jdk-\u4E2D\u63D0\u4F9B\u7684\u5B9E\u73B0","children":[]}]},{"level":2,"title":"6.7 \u4E2D\u4ECB\u8005\u6A21\u5F0F","slug":"_6-7-\u4E2D\u4ECB\u8005\u6A21\u5F0F","children":[{"level":3,"title":"6.7.1 \u6982\u8FF0","slug":"_6-7-1-\u6982\u8FF0","children":[]},{"level":3,"title":"6.7.2 \u7ED3\u6784","slug":"_6-7-2-\u7ED3\u6784","children":[]},{"level":3,"title":"6.7.3 \u6848\u4F8B\u5B9E\u73B0","slug":"_6-7-3-\u6848\u4F8B\u5B9E\u73B0","children":[]},{"level":3,"title":"6.7.4 \u4F18\u7F3A\u70B9","slug":"_6-7-4-\u4F18\u7F3A\u70B9","children":[]},{"level":3,"title":"6.7.5 \u4F7F\u7528\u573A\u666F","slug":"_6-7-5-\u4F7F\u7528\u573A\u666F","children":[]}]},{"level":2,"title":"6.8 \u8FED\u4EE3\u5668\u6A21\u5F0F","slug":"_6-8-\u8FED\u4EE3\u5668\u6A21\u5F0F","children":[{"level":3,"title":"6.8.1 \u6982\u8FF0","slug":"_6-8-1-\u6982\u8FF0","children":[]},{"level":3,"title":"6.8.2 \u7ED3\u6784","slug":"_6-8-2-\u7ED3\u6784","children":[]},{"level":3,"title":"6.8.3 \u6848\u4F8B\u5B9E\u73B0","slug":"_6-8-3-\u6848\u4F8B\u5B9E\u73B0","children":[]},{"level":3,"title":"6.8.4 \u4F18\u7F3A\u70B9","slug":"_6-8-4-\u4F18\u7F3A\u70B9","children":[]},{"level":3,"title":"6.8.5 \u4F7F\u7528\u573A\u666F","slug":"_6-8-5-\u4F7F\u7528\u573A\u666F","children":[]},{"level":3,"title":"6.8.6 JDK \u6E90\u7801\u89E3\u6790","slug":"_6-8-6-jdk-\u6E90\u7801\u89E3\u6790","children":[]}]},{"level":2,"title":"6.9 \u8BBF\u95EE\u8005\u6A21\u5F0F","slug":"_6-9-\u8BBF\u95EE\u8005\u6A21\u5F0F","children":[{"level":3,"title":"6.9.1 \u6982\u8FF0","slug":"_6-9-1-\u6982\u8FF0","children":[]},{"level":3,"title":"6.9.2 \u7ED3\u6784","slug":"_6-9-2-\u7ED3\u6784","children":[]},{"level":3,"title":"6.9.3 \u6848\u4F8B\u5B9E\u73B0","slug":"_6-9-3-\u6848\u4F8B\u5B9E\u73B0","children":[]},{"level":3,"title":"6.9.4 \u4F18\u7F3A\u70B9","slug":"_6-9-4-\u4F18\u7F3A\u70B9","children":[]},{"level":3,"title":"6.9.5 \u4F7F\u7528\u573A\u666F","slug":"_6-9-5-\u4F7F\u7528\u573A\u666F","children":[]},{"level":3,"title":"6.9.6 \u6269\u5C55","slug":"_6-9-6-\u6269\u5C55","children":[]}]},{"level":2,"title":"6.10 \u5907\u5FD8\u5F55\u6A21\u5F0F","slug":"_6-10-\u5907\u5FD8\u5F55\u6A21\u5F0F","children":[{"level":3,"title":"6.10.1 \u6982\u8FF0","slug":"_6-10-1-\u6982\u8FF0","children":[]},{"level":3,"title":"6.10.2 \u7ED3\u6784","slug":"_6-10-2-\u7ED3\u6784","children":[]},{"level":3,"title":"6.10.3 \u6848\u4F8B\u5B9E\u73B0","slug":"_6-10-3-\u6848\u4F8B\u5B9E\u73B0","children":[{"level":4,"title":"6.10.3.1 \u201C\u767D\u7BB1\u201D\u5907\u5FD8\u5F55\u6A21\u5F0F","slug":"_6-10-3-1-\u767D\u7BB1-\u5907\u5FD8\u5F55\u6A21\u5F0F","children":[]},{"level":4,"title":"6.10.3.2 \u201C\u9ED1\u7BB1\u201D\u5907\u5FD8\u5F55\u6A21\u5F0F","slug":"_6-10-3-2-\u9ED1\u7BB1-\u5907\u5FD8\u5F55\u6A21\u5F0F","children":[]}]},{"level":3,"title":"6.10.4 \u4F18\u7F3A\u70B9","slug":"_6-10-4-\u4F18\u7F3A\u70B9","children":[]},{"level":3,"title":"6.10.5 \u4F7F\u7528\u573A\u666F","slug":"_6-10-5-\u4F7F\u7528\u573A\u666F","children":[]}]},{"level":2,"title":"6.11 \u89E3\u91CA\u5668\u6A21\u5F0F","slug":"_6-11-\u89E3\u91CA\u5668\u6A21\u5F0F","children":[{"level":3,"title":"6.11.1 \u6982\u8FF0","slug":"_6-11-1-\u6982\u8FF0","children":[]},{"level":3,"title":"6.11.2 \u7ED3\u6784","slug":"_6-11-2-\u7ED3\u6784","children":[]},{"level":3,"title":"6.11.3 \u6848\u4F8B\u5B9E\u73B0","slug":"_6-11-3-\u6848\u4F8B\u5B9E\u73B0","children":[]},{"level":3,"title":"6.11.4 \u4F18\u7F3A\u70B9","slug":"_6-11-4-\u4F18\u7F3A\u70B9","children":[]},{"level":3,"title":"6.11.5 \u4F7F\u7528\u573A\u666F","slug":"_6-11-5-\u4F7F\u7528\u573A\u666F","children":[]}]}]},{"level":1,"title":"7\uFF0C\u81EA\u5B9A\u4E49 Spring \u6846\u67B6","slug":"_7-\u81EA\u5B9A\u4E49-spring-\u6846\u67B6","children":[{"level":2,"title":"7.1 spring \u4F7F\u7528\u56DE\u987E","slug":"_7-1-spring-\u4F7F\u7528\u56DE\u987E","children":[]},{"level":2,"title":"7.2 spring \u6838\u5FC3\u529F\u80FD\u7ED3\u6784","slug":"_7-2-spring-\u6838\u5FC3\u529F\u80FD\u7ED3\u6784","children":[{"level":3,"title":"7.1.1 bean \u6982\u8FF0","slug":"_7-1-1-bean-\u6982\u8FF0","children":[]}]},{"level":2,"title":"7.3 Spring IOC \u76F8\u5173\u63A5\u53E3\u5206\u6790","slug":"_7-3-spring-ioc-\u76F8\u5173\u63A5\u53E3\u5206\u6790","children":[{"level":3,"title":"7.3.1 BeanFactory \u89E3\u6790","slug":"_7-3-1-beanfactory-\u89E3\u6790","children":[]},{"level":3,"title":"7.3.2 BeanDefinition \u89E3\u6790","slug":"_7-3-2-beandefinition-\u89E3\u6790","children":[]},{"level":3,"title":"7.3.3 BeanDefinitionReader \u89E3\u6790","slug":"_7-3-3-beandefinitionreader-\u89E3\u6790","children":[]},{"level":3,"title":"7.3.4 BeanDefinitionRegistry \u89E3\u6790","slug":"_7-3-4-beandefinitionregistry-\u89E3\u6790","children":[]},{"level":3,"title":"7.3.5 \u521B\u5EFA\u5BB9\u5668","slug":"_7-3-5-\u521B\u5EFA\u5BB9\u5668","children":[]}]},{"level":2,"title":"7.4 \u81EA\u5B9A\u4E49 SpringIOC","slug":"_7-4-\u81EA\u5B9A\u4E49-springioc","children":[{"level":3,"title":"7.4.1 \u5B9A\u4E49 bean \u76F8\u5173\u7684 pojo \u7C7B","slug":"_7-4-1-\u5B9A\u4E49-bean-\u76F8\u5173\u7684-pojo-\u7C7B","children":[{"level":4,"title":"7.4.1.1 PropertyValue \u7C7B","slug":"_7-4-1-1-propertyvalue-\u7C7B","children":[]},{"level":4,"title":"7.4.1.2 MutablePropertyValues \u7C7B","slug":"_7-4-1-2-mutablepropertyvalues-\u7C7B","children":[]},{"level":4,"title":"7.4.1.3 BeanDefinition \u7C7B","slug":"_7-4-1-3-beandefinition-\u7C7B","children":[]}]},{"level":3,"title":"7.4.2 \u5B9A\u4E49\u6CE8\u518C\u8868\u76F8\u5173\u7C7B","slug":"_7-4-2-\u5B9A\u4E49\u6CE8\u518C\u8868\u76F8\u5173\u7C7B","children":[{"level":4,"title":"7.4.2.1 BeanDefinitionRegistry \u63A5\u53E3","slug":"_7-4-2-1-beandefinitionregistry-\u63A5\u53E3","children":[]},{"level":4,"title":"7.4.2.2 SimpleBeanDefinitionRegistry \u7C7B","slug":"_7-4-2-2-simplebeandefinitionregistry-\u7C7B","children":[]}]},{"level":3,"title":"7.4.3 \u5B9A\u4E49\u89E3\u6790\u5668\u76F8\u5173\u7C7B","slug":"_7-4-3-\u5B9A\u4E49\u89E3\u6790\u5668\u76F8\u5173\u7C7B","children":[{"level":4,"title":"7.4.3.1 BeanDefinitionReader \u63A5\u53E3","slug":"_7-4-3-1-beandefinitionreader-\u63A5\u53E3","children":[]},{"level":4,"title":"7.4.3.2 XmlBeanDefinitionReader \u7C7B","slug":"_7-4-3-2-xmlbeandefinitionreader-\u7C7B","children":[]}]},{"level":3,"title":"7.4.4 IOC \u5BB9\u5668\u76F8\u5173\u7C7B","slug":"_7-4-4-ioc-\u5BB9\u5668\u76F8\u5173\u7C7B","children":[{"level":4,"title":"7.4.4.1 BeanFactory \u63A5\u53E3","slug":"_7-4-4-1-beanfactory-\u63A5\u53E3","children":[]},{"level":4,"title":"7.4.4.2 ApplicationContext \u63A5\u53E3","slug":"_7-4-4-2-applicationcontext-\u63A5\u53E3","children":[]},{"level":4,"title":"7.4.4.3 AbstractApplicationContext \u7C7B","slug":"_7-4-4-3-abstractapplicationcontext-\u7C7B","children":[]},{"level":4,"title":"7.4.4.4 ClassPathXmlApplicationContext \u7C7B","slug":"_7-4-4-4-classpathxmlapplicationcontext-\u7C7B","children":[]}]},{"level":3,"title":"7.4.5 \u81EA\u5B9A\u4E49 Spring IOC \u603B\u7ED3","slug":"_7-4-5-\u81EA\u5B9A\u4E49-spring-ioc-\u603B\u7ED3","children":[{"level":4,"title":"7.4.5.1 \u4F7F\u7528\u5230\u7684\u8BBE\u8BA1\u6A21\u5F0F","slug":"_7-4-5-1-\u4F7F\u7528\u5230\u7684\u8BBE\u8BA1\u6A21\u5F0F","children":[]},{"level":4,"title":"7.4.5.2 \u7B26\u5408\u5927\u90E8\u5206\u8BBE\u8BA1\u539F\u5219","slug":"_7-4-5-2-\u7B26\u5408\u5927\u90E8\u5206\u8BBE\u8BA1\u539F\u5219","children":[]},{"level":4,"title":"7.4.5.3 \u6574\u4E2A\u8BBE\u8BA1\u548C Spring \u7684\u8BBE\u8BA1\u8FD8\u662F\u6709\u4E00\u5B9A\u7684\u51FA\u5165","slug":"_7-4-5-3-\u6574\u4E2A\u8BBE\u8BA1\u548C-spring-\u7684\u8BBE\u8BA1\u8FD8\u662F\u6709\u4E00\u5B9A\u7684\u51FA\u5165","children":[]}]}]}]}],"git":{"updatedTime":1668841792000,"contributors":[{"name":"Qiu-Qingyuan","email":"97420436+Qiu-Qingyuan@users.noreply.github.com","commits":1}]},"filePathRelative":"posts/design-pattern/README.md","readingTime":{"minutes":164.7,"words":49409},"copyright":"\u8457\u4F5C\u6743\u5F52\u5C0F\u7D2B\u5FF5\u6C81\u6240\u6709\\n\u539F\u6587\u94FE\u63A5\uFF1Ahttps://anyfork.github.io/blog-docs/blog-docs/posts/design-pattern/"}');export{l as data};
