# Maven 仓库代理 Cloudflare Worker

## 概述

本项目是一个用于 Maven 仓库代理的 Cloudflare Worker 脚本，它允许用户通过 Cloudflare 的边缘网络来访问多个公共 Maven 仓库，从而可能提高访问速度和稳定性。

## 前置条件

- 您需要有一个 Cloudflare 账户

## 手动部署

1. 登录到 Cloudflare Dashboard。
2. 导航到 Workers 部分。
3. 创建一个新的 Worker 或选择现有的 Worker。
4. 将 `worker.js` 中的代码粘贴到 Cloudflare Worker 编辑器中。
5. 保存并部署您的 Worker。

## 使用方法

- central: Maven Central
- google: Google Maven Repository
- jitpack: JitPack
- plugins: Gradle Plugins
- jcenter: JCenter
- spring-plugins: Spring Plugins
- spring-milestones: Spring Milestones
- spring-snapshots: Spring Snapshots
- atlassian: Atlassian
- apache-snapshots: Apache Snapshots
- redhat-ga: Redhat GA
- redhat-ea: Redhat EA

使用代理时，您需要在请求路径前添加仓库关键字。例如，如果您想从 Central 仓库访问一个包，您可以使用以下格式的 URL：

```url
https://<YOUR_DOMAIN>/central/<PATH_TO_PACKAGE>
```

请将 `<YOUR_WORKER_SUBDOMAIN>` 和 `<YOUR_CLOUDFLARE_ZONE>` 替换为您的 Cloudflare Worker 子域名和区域。

```gradle
repositories {
    maven {
        url 'https://<YOUR_DOMAIN>/central/'
    }
}
```

```kotlin
repositories {
    maven("https://<YOUR_DOMAIN>/central/")
}
```

## 包含的仓库

- Central: https://repo.maven.apache.org/maven2
- Google: https://maven.google.com
- JitPack: https://jitpack.io
- Gradle Plugins: https://plugins.gradle.org/m2
- JCenter: https://jcenter.bintray.com
- Spring Plugins: https://repo.spring.io/plugins-release
- Spring Milestones: https://repo.spring.io/milestone
- Spring Snapshots: https://repo.spring.io/snapshot
- Atlassian: https://maven.atlassian.com/repository/public
- Apache Snapshots: https://repository.apache.org/snapshots
- Redhat GA: https://maven.repository.redhat.com/ga
- Redhat EA: https://maven.repository.redhat.com/earlyaccess/all

## 许可证

本项目遵循 MIT 许可证。有关详细信息，请查看 LICENSE 文件。

## 免责声明

本项目不存储任何 Maven 仓库的数据，所有请求都是实时代理到相应的公共 Maven 仓库。使用本服务时，请遵守所有相关仓库的使用条款。