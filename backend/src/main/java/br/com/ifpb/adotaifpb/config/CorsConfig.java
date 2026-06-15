package br.com.ifpb.adotaifpb.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Libera todos os endpoints (ex: /animais, /usuarios)
                .allowedOrigins("http://localhost:5173", "http://localhost:3000") // Permite o teu Vite ou Create React App
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Permite os métodos essenciais
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
