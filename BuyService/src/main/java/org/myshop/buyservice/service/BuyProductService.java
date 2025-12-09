package org.myshop.buyservice.service;

import org.myshop.buyservice.repository.BuyProduct;
import org.myshop.buyservice.repository.BuyProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class BuyProductService {

    private final BuyProductRepository buyProductRepository;
    private final KafkaProducer kafkaProducer ;

    public BuyProductService(BuyProductRepository buyProductRepository, KafkaProducer kafkaProducer) {
        this.buyProductRepository = buyProductRepository;
        this.kafkaProducer = kafkaProducer;
    }

    public ResponseEntity<BuyProduct> buyProduct(BuyProduct buyProduct){
        buyProduct.setBuyAt(LocalDate.now());
        buyProduct.setId(UUID.randomUUID());
        BuyProduct res = buyProductRepository.save(buyProduct);
        kafkaProducer.sendUpdate(buyProduct.getProductId());
        return ResponseEntity.ok(res);
    }


    public ResponseEntity<List<BuyProduct>> getBuyProduct(UUID userId){
        return ResponseEntity.ok(buyProductRepository.findBuyProductsByUserId(userId));
    }

}
