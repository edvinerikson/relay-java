package com.github.edvinerikson.relay.types;

import lombok.Builder;
import lombok.Data;

import java.util.HashMap;

@Builder
@Data
public class FragmentReference {
    private HashMap<String, Object> data;

}
