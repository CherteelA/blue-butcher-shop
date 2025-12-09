package org.myshop.buyservice.service;

import org.myshop.buyservice.repository.Favorite;
import org.myshop.buyservice.repository.FavoritesRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class FavoritesService {

    private final FavoritesRepository favoritesRepository;

    public FavoritesService(FavoritesRepository favoritesRepository) {
        this.favoritesRepository = favoritesRepository;
    }

    public ResponseEntity<Favorite> setFavorites(Favorite favorites){
        favorites.setId(UUID.randomUUID());
        return ResponseEntity.ok(favoritesRepository.save(favorites));
    }

    public ResponseEntity<List<Favorite>> getFavorites(UUID userId){
        return ResponseEntity.ok(favoritesRepository.findFavoritesByUserId(userId));
    }

    public ResponseEntity<Favorite> deleteFavorites(UUID userId, UUID productId){
        List<Favorite> delete = favoritesRepository.findFavoriteByUserIdAndProductId(userId, productId);
        if(delete.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        favoritesRepository.delete(delete.get(0));
        return ResponseEntity.ok(delete.get(0));
    }


    public ResponseEntity<Map<String, Boolean>> getFavorites(UUID userID, UUID productId){

        List<Favorite> favorite = favoritesRepository.findFavoriteByUserIdAndProductId(userID, productId);
        if(favorite.isEmpty()){
            return ResponseEntity.ok(Map.of("answer", false));
        }
        else{
            return ResponseEntity.ok(Map.of("answer", true));
        }
    }

}
