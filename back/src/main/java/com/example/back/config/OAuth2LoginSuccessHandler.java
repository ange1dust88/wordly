package com.example.back.config;

import com.example.back.models.User;
import com.example.back.repositories.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;

    public OAuth2LoginSuccessHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    
    @Override
public void onAuthenticationSuccess(
        HttpServletRequest request,
        HttpServletResponse response,
        Authentication authentication
) throws IOException, ServletException {

    OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
    String email = oauthUser.getAttribute("email");

    Optional<User> userOptional = userRepository.findByEmail(email);

    if (userOptional.isPresent()) {
        User user = userOptional.get();

        String userJson = new ObjectMapper().writeValueAsString(user);
        System.out.println("Sending user data: " + userJson);
        response.setContentType("text/html");
        response.getWriter().write(
            "<script>" +
                "window.opener.postMessage(" + userJson + ", 'http://localhost:5173');" +
                "window.close();" +
            "</script>"
        );
    } else {
        response.sendRedirect("/login?error");
    }
}



}
