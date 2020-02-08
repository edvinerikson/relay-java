package com.github.edvinerikson;

import com.github.edvinerikson.relay.generated.WelcomeQuery;

import com.github.edvinerikson.relay.generated.Welcome_user;
import com.github.edvinerikson.relay.types.Fragment;
import com.github.edvinerikson.relay.types.LinkedField;
import com.github.edvinerikson.relay.types.Request;
import com.github.edvinerikson.relay.types.ScalarField;

import java.util.ArrayList;
import java.util.HashMap;

public class MyApp {
    public static void main(String[] args) throws Exception {
        WelcomeQuery welcomeQuery = new WelcomeQuery();

        HashMap<String, Object> welcomeQueryResponse = new HashMap<String, Object>() {{
            put("user", new HashMap<String, Object>() {{
                put("name", "Edvin");
                put("picture", null);
                put("posts", new ArrayList<HashMap<String, Object>>(){{
                    add(new HashMap<String, Object>(){{
                        put("title", "Post 1");
                    }});
                    add(new HashMap<String, Object>(){{
                        put("title", "Post 2");
                    }});
                }});
                put("weirdList", null);
            }});
            put("post", new HashMap<String, Object>() {{
                put("title", "Post 1");
            }});
        }};

        HashMap<String, Object> maskedData = (HashMap<String, Object>) welcomeQuery.getFragment().read(welcomeQueryResponse);

        // System.out.println(welcomeQuery.getRoot().read(welcomeQueryResponse));


        Welcome_user welcome_user = new Welcome_user();
        Object result = welcome_user.read((HashMap<String, Object>) maskedData.get("user"));
        System.out.println(result);

    }
}
