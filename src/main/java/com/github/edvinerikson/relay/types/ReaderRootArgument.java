package com.github.edvinerikson.relay.types;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReaderRootArgument extends ArgumentDefinition {
    private String kind = "RootArgument";
}
