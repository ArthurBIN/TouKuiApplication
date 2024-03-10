package com.Toukui.service;

import com.Toukui.pojo.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    /*
     * 用户注册
     */
    void register(User user);

//    查询用户账号
    List<String> AllAccount(String account);

    List<User> getUserInfo(String id);

    String HandlePassword(User user);

    int changeStyleList(String id, String stylelist);

    int changeName(String id, String username);

    //修改用户头像
    int changeTx(String id, byte[] tximg);
}
