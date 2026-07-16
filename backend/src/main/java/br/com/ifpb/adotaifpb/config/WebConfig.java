package br.com.ifpb.adotaifpb.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Expondo a pasta 'uploads' na raiz do seu projeto para acesso público
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}