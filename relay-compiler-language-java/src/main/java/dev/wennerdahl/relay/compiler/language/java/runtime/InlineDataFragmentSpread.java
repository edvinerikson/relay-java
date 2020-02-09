package dev.wennerdahl.relay.compiler.language.java.runtime;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
public class InlineDataFragmentSpread implements Selection {

    @Getter
    private String name;

    @Getter
    private List<Selection> selections;
}
