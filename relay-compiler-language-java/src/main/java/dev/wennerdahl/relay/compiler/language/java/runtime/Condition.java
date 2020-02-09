package dev.wennerdahl.relay.compiler.language.java.runtime;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
public class Condition implements Selection {

    @Getter
    private String condition;

    @Getter
    private Boolean passingValue;

    @Getter
    private List<Selection> selections;

}
