package com.example.back.controllers;

import com.example.back.models.User;
import com.example.back.repositories.UserRepository;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.PostConstruct;

import java.util.Optional;

@RestController
@RequestMapping("/api/webhook")
public class StripeWebhookController {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    private final UserRepository userRepository;

    public StripeWebhookController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    @PostMapping
    public ResponseEntity<String> handleStripeEvent(@RequestBody String payload,
                                                    @RequestHeader("Stripe-Signature") String sigHeader) {
        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
        } catch (SignatureVerificationException e) {
            return ResponseEntity.badRequest().body("Invalid signature");
        }

        if ("checkout.session.completed".equals(event.getType())) {
            EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();
            if (deserializer.getObject().isPresent()) {
                Session session = (Session) deserializer.getObject().get();

                String email = session.getCustomerDetails().getEmail();
        
                if (email != null) {
                    Optional<User> optionalUser = userRepository.findByEmail(email);
                    if (optionalUser.isPresent()) {
                        User user = optionalUser.get();
                        user.setIsPremium(true);
                        userRepository.save(user);
                        System.out.println("Premium activated for " + email);
                    } else {
                        String username = session.getCustomerDetails().getName();
                        System.out.println("Trying to find username " + username);
                        if (username != null) {
                            Optional<User> optionalUser1 = userRepository.findByUsername(username);
                            if (optionalUser1.isPresent()) {
                                User user = optionalUser1.get();
                                user.setIsPremium(true);
                                userRepository.save(user);
                                System.out.println("Premium activated for " + username);
                            } else {
                                System.out.println("User with username " + username + " not found.");
                            }
                        }
                    }
                } else {
                    String username = session.getCustomerDetails().getName();
                    System.out.println("Trying to find username " + username);
                    if (username != null) {
                        Optional<User> optionalUser = userRepository.findByUsername(username);
                        if (optionalUser.isPresent()) {
                            User user = optionalUser.get();
                            user.setIsPremium(true);
                            userRepository.save(user);
                            System.out.println("Premium activated for " + username);
                        } else {
                            System.out.println("User with username " + username + " not found.");
                        }
                    }
                }
            } else {
                System.out.println("Event data could not be deserialized.");
            }
        } else {
            System.out.println("Unsupported event type: " + event.getType());
        }
        
        return ResponseEntity.ok("Webhook received");
    }

}
