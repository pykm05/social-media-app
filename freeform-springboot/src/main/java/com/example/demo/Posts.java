package com.example.demo;

import java.util.Date;

public class Posts {
    public int post_id;
    public String title;
    public String contents;
    public String owner;
    public Date date;

    public Posts(int post_id, String title, String contents, String owner, Date date){
        this.post_id = post_id;
        this.title = title;
        this.contents = contents;
        this.owner = owner;
        this.date = date;
    }
}
