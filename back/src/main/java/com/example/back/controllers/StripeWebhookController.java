package com.example.back.controllers;

import com.example.back.services.StripeWebhookService;
import com.stripe.exception.SignatureVerificationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/webhook")
public class StripeWebhookController {

    private final StripeWebhookService stripeWebhookService;

    public StripeWebhookController(StripeWebhookService stripeWebhookService) {
        this.stripeWebhookService = stripeWebhookService;
    }

    @PostMapping
    public ResponseEntity<String> handleStripeEvent(@RequestBody String payload,
                                                    @RequestHeader("Stripe-Signature") String sigHeader) {
        try {
            String result = stripeWebhookService.handleStripeEvent(payload, sigHeader);
            if (result.equals("/error")) {
                return ResponseEntity.status(HttpStatus.FOUND)
                                     .header("Location", "/fail") 
                                     .build();
            }
            
            return ResponseEntity.ok(result);
        } catch (SignatureVerificationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body("Invalid signature. Please verify your request.");
        }
    }
}
