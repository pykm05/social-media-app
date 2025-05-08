package com.example.demo;

import java.util.Date;

public class Comment {
    public int post_id;
    public String contents;
    public String owner;
    public int comment_id;
    public Date date;

    public Comment(int post_id, int comment_id, String contents, String owner, Date date){
        this.post_id = post_id;
        this.comment_id = comment_id;
        this.contents = contents;
        this.owner = owner;
        this.date = date;
    }

    @Override
    public String toString() {
        return this.post_id + " | " + this.comment_id;
    }
}
