package com.github.edvinerikson.relay.types;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

public class SelectorReader {
    public HashMap<String, Object> read(Selection selection, HashMap<String, Object> data) throws Exception {
        if (selection instanceof LinkedField) {
            return (HashMap<String, Object>) this.readLinkedField((LinkedField) selection, data);
        } else if (selection instanceof ScalarField) {
            return this.readScalar((ScalarField) selection, data);
        } else if (selection instanceof Fragment) {
            return this.readFragment((Fragment) selection, data);
        } else if (selection instanceof FragmentSpread) {
          return this.readFragmentSpread((FragmentSpread) selection, data);
        } else if (selection instanceof Root) {
            return this.readRoot((Root) selection, data);
        } else {
            throw new Exception(String.format("Got unexpected selector %s", selection));
        }

    }

    private HashMap<String, Object> readFragmentSpread(FragmentSpread selection, HashMap<String, Object> data) {

        HashMap<String, Object> result = new HashMap<>();
        result.put("__fragment_ref_" + selection.getName(), data);
        return result;
    }

    private Object readLinkedField(LinkedField linkedField, HashMap<String, Object> data) throws Exception {
        HashMap<String, Object> result = new HashMap<>();
        Object item = data.get(linkedField.getAlias());
        if (data.containsKey(linkedField.getAlias())) {
            if (item instanceof List) {
                result.put(linkedField.getAlias(), this.readPluralLinkedField(linkedField, (List) item));
            } else if (item instanceof HashMap){
                result.put(linkedField.getAlias(), this.readSingularLinkedField(linkedField, (HashMap<String, Object>) item));
            } else {
                result.put(linkedField.getAlias(), item);
            }
        } else {
            throw new MissingFieldException(linkedField.getAlias());
        }


        return result;
    }

    private List<Object> readPluralLinkedField(LinkedField field, List<Object> data) throws Exception {
        ArrayList<Object> items = new ArrayList<>();
        for (Object item : data) {
            if (item instanceof List) {
                items.add(this.readPluralLinkedField(field, (List) item));
            } else if (item instanceof HashMap) {

                items.add(this.readSingularLinkedField(field, (HashMap<String, Object>) item));
            } else {
                // item.getClass().getName();
            }
        }
        return items;
    }

    private HashMap<String, Object> readSingularLinkedField(LinkedField field, HashMap<String, Object> data) throws Exception {
        HashMap<String, Object> result = new HashMap<>();
        for (Selection selection : field.getSelections()) {
            result.putAll(this.read(selection, data));
        }
        return result;
    }

    private HashMap<String, Object> readScalar(ScalarField field, HashMap<String, Object> data) throws Exception {
        HashMap<String, Object> masked = new HashMap<>();
        String key = field.getAlias();
        if (data.containsKey(key)) {
            masked.put(key, data.get(key));
        } else {
            throw new MissingFieldException(key);
        }
        return masked;
    }

    private HashMap<String, Object> readFragment(Fragment fragment, HashMap<String, Object> data) throws Exception {
        HashMap<String, Object> result = new HashMap<>();
        for (Selection selection : fragment.getSelections()) {
            result.putAll(this.read(selection, data));
        }

        return result;
    }

    private HashMap<String, Object> readRoot(Root root, HashMap<String, Object> data) throws Exception {
        HashMap<String, Object> result = new HashMap<>();
        for (Selection selection : root.getSelections()) {
            result.putAll(this.read(selection, data));
        }

        return result;
    }
}

class MissingFieldException extends Exception {
    public MissingFieldException(String field) {
        super(String.format("Expected field \"%s\" to be part of the response.", field));
    }
}