package com.example.back.services;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class StripeService {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @Value("${stripe.success.url}")
    private String successUrl;

    @Value("${stripe.cancel.url}")
    private String cancelUrl;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    public Session createCheckoutSession() throws StripeException {
        List<SessionCreateParams.LineItem> lineItems = createLineItems();
        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(successUrl) 
                .setCancelUrl(cancelUrl)  
                .addExpand("customer_details")
                .addAllLineItem(lineItems)
                .build();
        return Session.create(params);
    }

    private List<SessionCreateParams.LineItem> createLineItems() {
        SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                .setQuantity(1L)
                .setPriceData(
                        SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount(1000L)
                                .setProductData(
                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                .setName("Premium Access")
                                                .build()
                                )
                                .build()
                )
                .build();

        return Collections.singletonList(lineItem);
    }
}
