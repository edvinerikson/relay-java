package com.github.edvinerikson.relay.types;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.HashMap;
import java.util.List;


@Builder
@Data
public class Root extends Selection {

    public Object read(HashMap<String, Object> data) throws Exception {
        SelectorReader reader = new SelectorReader();
        return reader.read(this, data);
    };

    private String name;


    private String type;

    private String operation;


    private List<ArgumentDefinition> argumentDefinitions;


    private List<Selection> selections;

}
