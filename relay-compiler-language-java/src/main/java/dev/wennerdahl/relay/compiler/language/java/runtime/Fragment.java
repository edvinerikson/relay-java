package dev.wennerdahl.relay.compiler.language.java.runtime;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
public class Fragment {

    public Fragment(String name, Boolean masked, Boolean plural, List<Selection> selections) {
        this.name = name;
        this.masked = masked;
        this.plural = plural;
        this.selections = selections;
    }

    @Getter
    private String name;

    @Getter
    private Boolean masked;

    @Getter
    private Boolean plural;

    @Getter
    private List<Selection> selections;
}
