package com.github.edvinerikson.relay.types;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class ScalarField extends Selection {
    private String kind = "ScalarField";
    private String name;
    private String type;
    private String alias;
    private List<Argument> args;
}
