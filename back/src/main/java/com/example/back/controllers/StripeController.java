package com.example.back.controllers;

import com.example.back.services.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/stripe")
public class StripeController {

    private final StripeService stripeService;

    public StripeController(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession() {
        try {
            Session session = stripeService.createCheckoutSession();
            Map<String, String> responseData = new HashMap<>();
            responseData.put("url", session.getUrl());
            return ResponseEntity.ok(responseData); 

        } catch (StripeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error while creating Stripe session: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);  
        }
    }
}
