package com.github.edvinerikson.relay.types;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ArgumentValueVariable extends ArgumentValue {
    private String type;
    private String variableName;
}
