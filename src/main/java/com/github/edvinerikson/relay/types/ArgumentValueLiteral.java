package com.github.edvinerikson.relay.types;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ArgumentValueLiteral extends ArgumentValue {
    private Object value;
}
