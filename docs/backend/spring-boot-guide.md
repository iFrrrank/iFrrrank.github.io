---
title: Spring Boot 入门指南
icon: spring
date: 2026-05-03
category:
  - 后端
tag:
  - Spring Boot
  - Java
  - 微服务
---

# Spring Boot 入门指南

## 前言

Spring Boot 让 Spring 应用的搭建变得 **极其简单**，通过约定大于配置的理念，开发者可以快速构建生产级别的应用。

<!-- more -->

## 一、快速开始

### 1. 创建项目

推荐使用 [Spring Initializr](https://start.spring.io/) 创建项目，选择以下依赖：

- Spring Web
- Spring Data JPA
- MySQL Driver
- Lombok

### 2. 项目结构

```
src/
├── main/
│   ├── java/
│   │   └── com/frank/demo/
│   │       ├── DemoApplication.java
│   │       ├── controller/
│   │       ├── service/
│   │       ├── mapper/
│   │       └── entity/
│   └── resources/
│       ├── application.yml
│       └── static/
└── test/
```

## 二、核心注解

```java
@SpringBootApplication  // 组合注解，包含以下三个
@SpringBootConfiguration // 配置类
@EnableAutoConfiguration // 自动配置
@ComponentScan           // 组件扫描
```

### 常用注解速查

| 注解              | 作用           | 使用场景     |
| ----------------- | -------------- | ------------ |
| `@RestController` | RESTful 控制器 | API 接口     |
| `@Service`        | 业务逻辑层     | Service 类   |
| `@Repository`     | 数据访问层     | DAO / Mapper |
| `@Autowired`      | 自动注入       | 依赖注入     |
| `@Value`          | 读取配置       | 配置项注入   |

## 三、RESTful API 示例

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public Result<List<UserVO>> list() {
        return Result.success(userService.list());
    }

    @PostMapping
    public Result<Long> create(@RequestBody @Valid UserCreateReq req) {
        return Result.success(userService.create(req));
    }

    @PutMapping("/{id}")
    public Result<Boolean> update(@PathVariable Long id,
                                   @RequestBody @Valid UserUpdateReq req) {
        req.setId(id);
        return Result.success(userService.update(req));
    }

    @DeleteMapping("/{id}")
    public Result<Boolean> delete(@PathVariable Long id) {
        return Result.success(userService.delete(id));
    }
}
```

## 四、配置文件

```yaml
# application.yml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/demo?useSSL=false
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
```

## 总结

Spring Boot 大幅降低了 Spring 应用的开发门槛，是 Java 后端开发者必须掌握的框架。后续我们会深入探讨自动配置原理和 Starter 机制。

