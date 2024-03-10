package com.Toukui.service.impl;

import com.Toukui.mapper.UserMapper;
import com.Toukui.pojo.User;
import com.Toukui.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public void register(User user) {
        userMapper.register(user);
    }

    @Override
    public List<String> AllAccount(String account) {
        return userMapper.AllAccount(account);
    }

    @Override
    public List<User> getUserInfo(String id) {
        return userMapper.getUserInfoByZh(id);
    }

    @Override
    public String HandlePassword(User user) {
        return userMapper.HandlePassword(user);
    }

    @Override
    public int changeStyleList(String id, String stylelist) {
        return userMapper.changeStyleList(id, stylelist);
    }

    @Override
    public int changeName(String id, String username) {
        return userMapper.changeName(id, username);
    }

    @Override
    public int changeTx(String id, byte[] tximg) {
        return userMapper.changeTx(id, tximg);
    }
}
