<%@ taglib prefix = "graphql" uri = "http://java.sun.com/jsp/jstl/core" %>
<graphql:text key="welcomeQueryResponse">
  query WelcomeQuery { user { ...Welcome_user } post { ...Welcome_post } }
</graphql:text>

<graphql:fragment>
  <graphql:text key="user">
    fragment Welcome_user on User {
      name
      picture(size: "50x50")
      posts {
        title
      }
    }
  </graphql:text>
  <graphql:text key="post">
    fragment Welcome_post on Post { title }
  </graphql:text>
  <h1>Welcome ${user.name}</h1>
</graphql:fragment>
