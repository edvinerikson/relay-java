package com.github.edvinerikson;

import com.github.edvinerikson.relay.generated.Welcome_user;
import com.github.edvinerikson.relay.types.Fragment;
import com.github.edvinerikson.relay.types.ScalarField;

public class MyApp {
    public static void main(String[] args) {

        Fragment user = new Welcome_user();
        user.getSelections().stream().forEach(selection -> {
            if (selection instanceof ScalarField) {
                System.out.println(((ScalarField) selection).getName());
            }
        });
    }
}
