package dev.wennerdahl.relay.compiler.language.java.runtime;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
public class InlineFragment implements Selection {

    @Getter
    private String type;

    @Getter
    private List<Selection> selections;
}
