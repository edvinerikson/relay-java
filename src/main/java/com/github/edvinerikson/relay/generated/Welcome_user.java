package com.github.edvinerikson.relay.generated;

import com.github.edvinerikson.relay.types.*;
import java.util.Arrays;

/*
{
  "kind": "Fragment",
  "name": "Welcome_user",
  "type": "User",
  "metadata": null,
  "argumentDefinitions": [],
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
}
*/

public class Welcome_user extends Fragment {

  public Welcome_user() {
    super(
      "Welcome_user",
      "User",
      Arrays.asList(),
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
                .value(ArgumentValueLiteral.builder().value("50x50").build())
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
    );
  }
}
