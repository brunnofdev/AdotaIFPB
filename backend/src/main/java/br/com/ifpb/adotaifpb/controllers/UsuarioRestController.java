package br.com.ifpb.adotaifpb.controllers;

import br.com.ifpb.adotaifpb.dtos.UsuarioCreateRequestDTO;
import br.com.ifpb.adotaifpb.dtos.UsuarioResponseDTO;
import br.com.ifpb.adotaifpb.entities.Usuario;
import br.com.ifpb.adotaifpb.services.CargoService;
import br.com.ifpb.adotaifpb.services.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioRestController {

    protected final UsuarioService userService;
    protected final CargoService roleService;
    protected final PasswordEncoder passwordEncoder;

    public UsuarioRestController(UsuarioService userService, CargoService roleService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    // Usamos o UsuarioCreateRequestDTO no RequestBody
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid UsuarioCreateRequestDTO dto) {
        try {
            UsuarioResponseDTO usuarioSalvo = userService.cadastrarUsuario(dto);

            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioSalvo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao registrar utilizador.");
        }
    }

    private void encriptPassword(Usuario user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setSenha(encodedPassword);
    }
}