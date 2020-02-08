package com.github.edvinerikson.relay.types;

import lombok.Data;

@Data
public abstract class ArgumentDefinition {
    private String kind;
    private String name;
    private String type;
}
