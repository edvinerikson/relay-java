package com.github.edvinerikson.relay.generated;


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
}
*/


/* (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "title",
    "args": null,
    "storageKey": null
  }
];
return {
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
            "selections": (v0/*: any*/)
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
        "selections": (v0/*: any*/)
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "WelcomeQuery",
    "id": null,
    "text": "query WelcomeQuery {\n  user {\n    ...Welcome_user\n  }\n  post {\n    ...Welcome_post\n  }\n}\n\nfragment Welcome_post on Post {\n  title\n}\n\nfragment Welcome_user on User {\n  name\n  picture(size: \"50x50\")\n  posts {\n    title\n  }\n}\n",
    "metadata": {}
  }
};
})() */

import com.github.edvinerikson.relay.types.*;
import java.util.Arrays;

