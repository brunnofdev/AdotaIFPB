package br.com.ifpb.adotaifpb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity; // <-- IMPORTANTE
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig { // adaptqado para testes. MUDAR!!!!!

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                // Mantém o CORS ativado para o React não ser bloqueado pelo navegador
                .cors(Customizer.withDefaults())

                // Desativa a proteção CSRF (necessário para testes de POST/PUT/DELETE)
                .csrf(csrf -> csrf.disable())

                // Permite TODAS as requisições em qualquer endpoint
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                )
                .build();
    }
}