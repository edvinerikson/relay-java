package com.github.edvinerikson.relay.generated;

import com.github.edvinerikson.relay.types.*;
import java.util.Arrays;

/*
{
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "WelcomeQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Welcome_user",
            "args": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "post",
        "storageKey": null,
        "args": null,
        "concreteType": "Post",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Welcome_post",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "WelcomeQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "picture",
            "args": [
              {
                "kind": "Literal",
                "name": "size",
                "value": "50x50"
              }
            ],
            "storageKey": "picture(size:\"50x50\")"
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "posts",
            "storageKey": null,
            "args": null,
            "concreteType": "Post",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "title",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "weirdList",
            "storageKey": null,
            "args": null,
            "concreteType": "Post",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "title",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "post",
        "storageKey": null,
        "args": null,
        "concreteType": "Post",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "WelcomeQuery",
    "id": null,
    "text": "query WelcomeQuery {\n  user {\n    ...Welcome_user\n  }\n  post {\n    ...Welcome_post\n  }\n}\n\nfragment Welcome_post on Post {\n  title\n}\n\nfragment Welcome_user on User {\n  name\n  picture(size: \"50x50\")\n  posts {\n    title\n  }\n  weirdList {\n    title\n  }\n}\n",
    "metadata": {}
  }
}
*/

/*
query WelcomeQuery {
  user {
    ...Welcome_user
  }
  post {
    ...Welcome_post
  }
}

fragment Welcome_post on Post {
  title
}

fragment Welcome_user on User {
  name
  picture(size: "50x50")
  posts {
    title
  }
  weirdList {
    title
  }
}
*/

public class WelcomeQuery extends Request {

  public WelcomeQuery() {
    super(
      Fragment
        .builder()
        .name("WelcomeQuery")
        .type("Query")
        .argumentDefinitions(Arrays.asList())
        .selections(
          Arrays.asList(
            LinkedField
              .builder()
              .name("user")
              .alias("user")
              .type("User")
              .args(Arrays.asList())
              .selections(
                Arrays.asList(
                  FragmentSpread
                    .builder()
                    .name("Welcome_user")
                    .args(Arrays.asList())
                    .build()
                )
              )
              .build(),
            LinkedField
              .builder()
              .name("post")
              .alias("post")
              .type("Post")
              .args(Arrays.asList())
              .selections(
                Arrays.asList(
                  FragmentSpread
                    .builder()
                    .name("Welcome_post")
                    .args(Arrays.asList())
                    .build()
                )
              )
              .build()
          )
        )
        .build(),
      Root
        .builder()
        .name("WelcomeQuery")
        .type("Query")
        .operation("query")
        .argumentDefinitions(Arrays.asList())
        .selections(
          Arrays.asList(
            LinkedField
              .builder()
              .name("user")
              .alias("user")
              .type("User")
              .args(Arrays.asList())
              .selections(
                Arrays.asList(
                  ScalarField
                    .builder()
                    .name("name")
                    .alias("name")
                    .type("String")
                    .args(Arrays.asList())
                    .build(),
                  ScalarField
                    .builder()
                    .name("picture")
                    .alias("picture")
                    .type("String")
                    .args(
                      Arrays.asList(
                        Argument
                          .builder()
                          .type("String")
                          .value(
                            ArgumentValueLiteral
                              .builder()
                              .value("50x50")
                              .build()
                          )
                          .build()
                      )
                    )
                    .build(),
                  LinkedField
                    .builder()
                    .name("posts")
                    .alias("posts")
                    .type("[Post]")
                    .args(Arrays.asList())
                    .selections(
                      Arrays.asList(
                        ScalarField
                          .builder()
                          .name("title")
                          .alias("title")
                          .type("String")
                          .args(Arrays.asList())
                          .build()
                      )
                    )
                    .build(),
                  LinkedField
                    .builder()
                    .name("weirdList")
                    .alias("weirdList")
                    .type("[[Post]]")
                    .args(Arrays.asList())
                    .selections(
                      Arrays.asList(
                        ScalarField
                          .builder()
                          .name("title")
                          .alias("title")
                          .type("String")
                          .args(Arrays.asList())
                          .build()
                      )
                    )
                    .build()
                )
              )
              .build(),
            LinkedField
              .builder()
              .name("post")
              .alias("post")
              .type("Post")
              .args(Arrays.asList())
              .selections(
                Arrays.asList(
                  ScalarField
                    .builder()
                    .name("title")
                    .alias("title")
                    .type("String")
                    .args(Arrays.asList())
                    .build()
                )
              )
              .build()
          )
        )
        .build()
    );
  }
}
