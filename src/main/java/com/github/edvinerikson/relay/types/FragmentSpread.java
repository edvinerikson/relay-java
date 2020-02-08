package com.github.edvinerikson.relay.types;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class FragmentSpread extends Selection {

    private String name;
    private List<Argument> args;
}
