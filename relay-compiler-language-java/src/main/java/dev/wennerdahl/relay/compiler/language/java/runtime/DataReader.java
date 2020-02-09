package dev.wennerdahl.relay.compiler.language.java.runtime;

import java.util.HashMap;
import java.util.List;

public class DataReader {
    private static final String FRAGMENT_REF_KEY = "__fragment_ref__%s";

    public Object readFragment(FragmentSelector selector, Object parentData) throws Exception {
        Fragment fragment = selector.getFragment();
        if (fragment.getPlural()) {
            // TODO
        } else {
            HashMap<String, Object> result = new HashMap<>();
            HashMap<String, Object> data = (HashMap<String, Object>) getFragmentData(fragment.getName(), (HashMap<String, Object>) parentData);

            for (Selection selection : fragment.getSelections()) {
                if (selection instanceof FragmentSpread) {
                    setFragmentData(((FragmentSpread) selection).getName(), data, result);

                } else if (selection instanceof LinkedField) {

                }
            }
        }
    }

    private Object getFragmentData(String fragmentName, HashMap<String, Object> data) throws Exception {
        String key = String.format(FRAGMENT_REF_KEY, fragmentName);
        if (data.containsKey(key)) {
            Object fragmentData = data.get(key);
            if (fragmentData instanceof HashMap) {
                return fragmentData;
            } else if (fragmentData instanceof List) {
                return fragmentData;
            }
        }

        throw new Exception("");
    };

    private void setFragmentData(String fragmentName, Object data, HashMap<String, Object> result) {
        String key = String.format(FRAGMENT_REF_KEY, fragmentName);
        result.put(key, data);
    }
}
