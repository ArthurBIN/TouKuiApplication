package com.Toukui.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Result {
    private Integer code;
    private String msg;
    private Object data;
    public static Result success() {
        return new Result(0, "true", null);
    }
    public static Result success(Object data) {
        return new Result(0, "true", data);
    }
    public static Result error(String msg) {
        return new Result(40000, msg, null);
    }
}
