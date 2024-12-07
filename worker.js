/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


export default {
    async fetch(request, env, ctx) {
      const url = new URL(request.url);
  
      // 定义你要代理的Maven仓库
      const repositories = {
        'central': 'https://repo.maven.apache.org/maven2',
        'google': 'https://maven.google.com',
        'jitpack': 'https://jitpack.io',
        'gradle-plugins': 'https://plugins.gradle.org/m2',
        'jcenter': 'https://jcenter.bintray.com',
        'spring-plugins': 'https://repo.spring.io/plugins-release',
        'spring-milestones': 'https://repo.spring.io/milestone',
        'spring-snapshots': 'https://repo.spring.io/snapshot',
        'atlassian': 'https://maven.atlassian.com/repository/public',
        'apache-snapshots': 'https://repository.apache.org/snapshots',
        'redhat-ga': 'https://maven.repository.redhat.com/ga',
        'redhat-ea': 'https://maven.repository.redhat.com/earlyaccess/all'
      };
  
      // 解析请求路径，确定要代理的仓库
      const repo = Object.keys(repositories).find(key => url.pathname.startsWith(`/${key}`));
  
      console.log(`repo: ${repo}`);
      if (!repo) {
        return new Response('Repository not found', { status: 404 });
      }
  
      // 构建新的URL
      const targetUrl = repositories[repo] + url.pathname.replace(`/${repo}`, '') + url.search;
  
      // 进行代理请求
      const response = await fetch(targetUrl, {
        method: request.method,
        headers: request.headers
      });
  
      return new Response(response.body, {
        status: response.status,
        headers: response.headers
      });
    },
  };