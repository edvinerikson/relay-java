package com.github.edvinerikson.relay.types;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class LinkedField extends Selection {
    private String name;
    private String type;
    private String alias;
    private List<Argument> args;
    private List<Selection> selections;
}
