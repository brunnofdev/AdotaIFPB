package br.com.ifpb.adotaifpb.controllers;

import br.com.ifpb.adotaifpb.dtos.LoginRequestDTO;
import br.com.ifpb.adotaifpb.dtos.LoginResponseDTO;
import br.com.ifpb.adotaifpb.config.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AutenticacaoController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AutenticacaoController(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> authenticate(@RequestBody LoginRequestDTO loginRequest) {

        // 1. O AuthenticationManager verifica se o email e a senha (criptografada) batem com o banco
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.email(),
                        loginRequest.senha()
                )
        );

        // 2. Se a senha estiver errada, o Spring lança exceção (BadCredentialsException) automaticamente.
        // Se chegou aqui, as credenciais estão corretas. Extraímos o UserDetails.
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // 3. Geramos o Token JWT
        String jwtToken = jwtService.generateToken(authentication);

        // 4. Devolvemos o Token para o frontend
        return ResponseEntity.ok(new LoginResponseDTO(jwtToken));
    }
}
