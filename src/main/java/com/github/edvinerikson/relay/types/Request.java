package com.github.edvinerikson.relay.types;

import lombok.Getter;

public abstract class Request {

    @Getter
    private Fragment fragment;

    @Getter
    private Root root;

    protected Request(Fragment fragment, Root root) {
        this.fragment = fragment;
        this.root = root;
    }
}
