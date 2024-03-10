package com.Toukui.controller;

import com.Toukui.pojo.Pl;
import com.Toukui.pojo.Result;
import com.Toukui.pojo.Zp;
import com.Toukui.service.ZpService;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@RestController
public class ZpController {
    @Autowired
    private ZpService zpService;

    /**
     * 用户新增作品
     * @param id
     * @param title
     * @param content
     * @param userzp
     * @return
     */
    @PostMapping("/setzp")
    @CrossOrigin
    public Result setNewZp(String id, String title, String content, @RequestParam("file") MultipartFile userzp) {
        try {
            byte[] originalImageData = userzp.getBytes();
            byte[] zpimg = compressImage(originalImageData);
            String zptime = getCurrentTime();
            int res = zpService.setNewZp(id, title, content, zpimg, zptime);
            if (res > 0) {
                return Result.success();
            } else {
                return Result.error("添加失败");
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    /**
     * 获取全部作品
     * @return
     */
    @GetMapping("/getallzp")
    @CrossOrigin
    private Result getAllZp() {
        List<Zp> zpList = zpService.getAllZp();
        if (zpList.size() > 0) {
            return Result.success(zpList);
        } else {
            return Result.error("暂无作品");
        }
    }

    /**
     *更新5条数据
     */
    @GetMapping("/getMore")
    public Result getMoreZp(@RequestParam int start, @RequestParam int limit) {
        List<Zp> zpList = zpService.getMoreZp(start, limit);
        if (zpList.size() > 0) {
            return Result.success(zpList);
        } else {
            return Result.error("暂无更多作品");
        }
    }

    /**
     * 通过作品id获取单个作品信息
     */
    @GetMapping("/getzpinfo")
    @CrossOrigin
    private Result getZpByZpid(String zpid) {
        List<Zp> zpitem = zpService.getZpByZpid(zpid);
        if (zpitem.size() > 0) {
            return Result.success(zpitem.get(0));
        } else {
            return Result.error("暂无作品");
        }
    }

    /**
     * 作品点赞
     */
    @PostMapping("/dz")
    @CrossOrigin
    private Result HandleDz(String id, String zpid) {
        int res = zpService.HandleDz(zpid);
        int res2 = zpService.HandleAddDz(id, zpid);
        if (res > 0 && res2 > 0) {
            return Result.success();
        } else {
            return Result.error("点赞失败");
        }
    }

    /**
     * 获取用户点赞的作品id
     */
    @GetMapping("/getdz")
    @CrossOrigin
    private Result GetDz(String id) {
        List<String> res = zpService.getDz(id);
        if (res.size() > 0) {
            return Result.success(res);
        } else {
            return Result.error("获取失败");
        }
    }

    /**
     * 用户取消点赞
     */
    @PostMapping("/cancledz")
    @CrossOrigin
    private Result CancleDz(String id, String zpid) {
        int res = zpService.CancleDz(zpid);
        int res2 = zpService.DeleteDzInfo(id, zpid);
        if (res > 0 && res2 > 0) {
            return Result.success();
        } else {
            return Result.error("点赞失败");
        }
    }

    /**
     * 添加作品评论
     */
    @PostMapping("/pl")
    @CrossOrigin
    private Result HandlePl(String zpid, String userid, String content) {
        String zptime = getCurrentTime();
        int res = zpService.HandlePl(zpid, userid, content, zptime);
        int res2 = zpService.AddPlNum(zpid);
        if (res > 0 && res2 > 0) {
            return Result.success();
        } else {
            return Result.error("点赞失败");
        }
    }

    /**
     * 获取作品评论
     */
    @GetMapping ("/getpl")
    @CrossOrigin
    private Result getPlByZpid(String zpid) {
        List<Pl> res = zpService.getPlByZpid(zpid);
        if (res.size() > 0) {
            return Result.success(res);
        } else {
            return Result.error("获取失败");
        }
    }



    /**
     * 压缩图片
     * @param originalImageData
     * @return
     * @throws IOException
     */
    private byte[] compressImage(byte[] originalImageData) throws IOException {
        // 使用 Thumbnails 库进行图片压缩
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Thumbnails.of(new ByteArrayInputStream(originalImageData))
                .scale(1) // 不改变图片尺寸
                .outputQuality(0.4) // 设置压缩后的图片质量
                .outputFormat("jpg") // 设置输出格式，可根据需要修改
                .toOutputStream(outputStream);

        return outputStream.toByteArray();
    }

    /**
     * 获取当前时间
     * @return
     */
    public String getCurrentTime() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM月dd日 HH时mm分");
        return now.format(formatter);
    }
}
