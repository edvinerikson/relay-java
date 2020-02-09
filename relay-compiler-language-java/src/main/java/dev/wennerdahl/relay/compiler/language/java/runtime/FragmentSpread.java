package dev.wennerdahl.relay.compiler.language.java.runtime;

import lombok.Builder;
import lombok.Getter;

@Builder
public class FragmentSpread implements Selection {

    @Getter
    private String name;
}
