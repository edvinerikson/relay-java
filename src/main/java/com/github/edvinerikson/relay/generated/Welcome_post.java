package com.github.edvinerikson.relay.generated;



/* {
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
} */

import com.github.edvinerikson.relay.types.*;
import java.util.Arrays;

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
          .type("String")
          .alias("title")
          .args(Arrays.asList())
          .build()
      )
    );
  }
}

