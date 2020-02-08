package com.github.edvinerikson.relay.types;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Argument {
    private String kind;
    private String name;
    private String type;
    private ArgumentValue value;
}
