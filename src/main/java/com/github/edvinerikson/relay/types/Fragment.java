package com.github.edvinerikson.relay.types;

import lombok.Getter;

import java.util.List;

@Getter
public abstract class Fragment {

    public Fragment(String name, String type, List<ArgumentDefinition> argumentDefinitions, List<Selection> selections) {
        this.name = name;
        this.type = type;
        this.argumentDefinitions = argumentDefinitions;
        this.selections = selections;
    }

    public static class ReaderFragmentMetadata {
        private boolean mask;
        private boolean plural;
    }

    private String kind = "Fragment";
    private String name;
    private String type;
    private List<ArgumentDefinition> argumentDefinitions;
    private List<Selection> selections;

}
