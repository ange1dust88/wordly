package com.example.back.services;

import com.example.back.models.User;
import com.example.back.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.stereotype.Service;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    @Autowired
    private UserRepository userRepository;


    private final OAuth2UserService<OAuth2UserRequest, OAuth2User> oauth2UserService = new DefaultOAuth2UserService();

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
   
        OAuth2User oauth2User = oauth2UserService.loadUser(userRequest);

        String username = oauth2User.getAttribute("login"); 
        String email = oauth2User.getAttribute("email");

        User existingUser = userRepository.findByEmail(email);
        if (existingUser != null) {
            return oauth2User;
        }

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(""); 
        newUser.setIsPremium(false);

        userRepository.save(newUser);

        return oauth2User; 
    }
}

