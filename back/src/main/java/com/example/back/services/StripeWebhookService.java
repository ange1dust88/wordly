package com.example.back.services;

import com.example.back.models.User;
import com.example.back.repositories.UserRepository;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StripeWebhookService {

    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    @Value("${stripe.cancel.url}")
    private String cancelUrl;  

    private final UserRepository userRepository;

    public StripeWebhookService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String handleStripeEvent(String payload, String sigHeader) throws SignatureVerificationException {
        Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);

        if ("checkout.session.completed".equals(event.getType())) {
            EventDataObjectDeserializer deserializer = event.getDataObjectDeserializer();
            if (deserializer.getObject().isPresent()) {
                Session session = (Session) deserializer.getObject().get();
                return processSession(session);
            }
        }
        return "Unsupported event type: " + event.getType();
    }

    private String processSession(Session session) {
        String email = session.getCustomerDetails().getEmail();
        if (email != null) {
            return activatePremiumForUserByEmail(email);
        } else {
            String username = session.getCustomerDetails().getName();
            if (username != null) {
                return activatePremiumForUserByUsername(username);
            }
        }
        return cancelUrl;
    }

    private String activatePremiumForUserByEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setIsPremium(true);
            userRepository.save(user);
            return "Premium activated for " + email;
        } else {
            return cancelUrl;  
        }
    }

    private String activatePremiumForUserByUsername(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setIsPremium(true);
            userRepository.save(user);
            return "Premium activated for " + username;
        } else {
            return cancelUrl;  
        }
    }
}
