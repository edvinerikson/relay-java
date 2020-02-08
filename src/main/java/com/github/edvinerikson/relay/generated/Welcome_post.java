package com.github.edvinerikson.relay.generated;

import com.github.edvinerikson.relay.types.*;
import java.util.Arrays;

/*
{
  "kind": "Fragment",
  "name": "Welcome_post",
  "type": "Post",
  "metadata": null,
  "argumentDefinitions": [],
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
*/

public class Welcome_post extends Fragment {

  public Welcome_post() {
    super(
      "Welcome_post",
      "Post",
      Arrays.asList(),
      Arrays.asList(
        ScalarField
          .builder()
          .name("title")
          .alias("title")
          .type("String")
          .args(Arrays.asList())
          .build()
      )
    );
  }
}
