package org.myshop.buyservice.controller;


import jakarta.validation.Valid;
import org.myshop.buyservice.repository.BuyProduct;
import org.myshop.buyservice.repository.Favorite;
import org.myshop.buyservice.service.BuyProductService;
import org.myshop.buyservice.service.FavoritesService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping(path = "api/")
@CrossOrigin(origins = {"http://26.94.50.207:4200", "http://localhost:4200", "http://localhost:80", "http://localhost", "http://185.161.64.35"})
public class BuyProductController {

    private final BuyProductService buyProductService;

    private final FavoritesService favoritesService;

    public BuyProductController(BuyProductService buyProductService, FavoritesService favoritesService) {
        this.buyProductService = buyProductService;
        this.favoritesService = favoritesService;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping(path = "/buy")
    public ResponseEntity<BuyProduct> buyProduct(@Valid @RequestBody BuyProduct  buyProduct){
        return buyProductService.buyProduct(buyProduct);
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(path = "/buy")
    public ResponseEntity<List<BuyProduct>> getBuyProduct(@RequestParam UUID userID){
        return buyProductService.getBuyProduct(userID);
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping(path = "/favorites")
    public ResponseEntity<Favorite> setFavorites(@Valid @RequestBody Favorite favorites){
        return favoritesService.setFavorites(favorites);
    }
    @PreAuthorize("hasRole('USER')")
    @GetMapping(path = "/favorites")
    public ResponseEntity<List<Favorite>> getFavorites(@RequestParam UUID userID){
        return favoritesService.getFavorites(userID);
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping(path = "/favorites")
    public ResponseEntity<Favorite> deleteFavorites(@RequestParam UUID userId, @RequestParam UUID productId){
        return favoritesService.deleteFavorites(userId, productId);
    }


    @PreAuthorize("hasRole('USER')")
    @GetMapping(path = "/favorites_product")
    public ResponseEntity<Map<String, Boolean>> getFavoritesProduct(@RequestParam UUID userID, @RequestParam UUID productId){
        return favoritesService.getFavorites(userID,  productId);
    }
}
