package com.Toukui.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Zp {
    private Integer id;
    private Integer zpid;
    private String zptitle;
    private String zpcontent;
    private Integer zpdz;
    private Integer zppl;
    private byte[] zpimg;
    private String username;
    private byte[] usertx;
    private String zptime;
}
