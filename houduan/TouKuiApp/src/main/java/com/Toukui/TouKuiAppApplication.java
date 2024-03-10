package com.Toukui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class TouKuiAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(TouKuiAppApplication.class, args);
    }

}
