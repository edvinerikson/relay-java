package dev.wennerdahl.relay.compiler.language.java.runtime;

import lombok.Builder;
import lombok.Getter;

import java.util.HashMap;

@Builder
public class FragmentSelector {

    @Getter
    private Fragment fragment;

    @Getter
    private HashMap<String, Object> variables;
}
