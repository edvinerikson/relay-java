package dev.wennerdahl.relay.compiler.language.java.runtime;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
public class LinkedField implements Selection {

    @Getter
    private String name;

    @Getter
    private String alias;

    @Getter
    private List<Selection> selections;
}
