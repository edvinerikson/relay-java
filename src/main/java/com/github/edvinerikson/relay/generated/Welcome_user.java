package com.github.edvinerikson.relay.generated;



/* {
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
    }
  ]
} */

import com.github.edvinerikson.relay.types.*;
import java.util.Arrays;

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
          .type("String")
          .alias("name")
          .args(Arrays.asList())
          .build(),
        ScalarField
          .builder()
          .name("picture")
          .type("String")
          .alias("picture")
          .args(
            Arrays.asList(
              Argument
                .builder()
                .name("size")
                .type("String")
                .value(ArgumentValueLiteral.builder().value("50x50").build())
                .build()
            )
          )
          .build(),
        LinkedField
          .builder()
          .name("posts")
          .type("[Post]")
          .selections(
            Arrays.asList(
              ScalarField
                .builder()
                .name("title")
                .type("String")
                .alias("title")
                .args(Arrays.asList())
                .build()
            )
          )
          .args(Arrays.asList())
          .build()
      )
    );
  }
}

