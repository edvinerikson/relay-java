package com.github.edvinerikson.relay.types;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class Fragment extends Selection {

    public Object read(HashMap<String, Object> data) throws Exception {
        SelectorReader reader = new SelectorReader();
        HashMap<String, Object> fragmentRef = (HashMap<String, Object>) data.get("__fragment_ref_" + this.getName());
        if (fragmentRef == null) {
            return reader.read(this, data);
        }
        return reader.read(this, fragmentRef);
    };


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

    private String name;
    private String type;
    private List<ArgumentDefinition> argumentDefinitions;
    private List<Selection> selections;

}
