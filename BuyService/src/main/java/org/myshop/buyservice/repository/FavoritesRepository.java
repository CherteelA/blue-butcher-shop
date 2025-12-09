package org.myshop.buyservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface FavoritesRepository extends JpaRepository<Favorite, UUID> {

    @Query(value = "SELECT * FROM favorites WHERE user_id=:userId",  nativeQuery = true)
    List<Favorite> findFavoritesByUserId(UUID userId);

    @Query(value = "SELECT * FROM favorites WHERE user_id=:userId AND product_id=:productId",   nativeQuery = true)
    List<Favorite> findFavoriteByUserIdAndProductId(UUID userId, UUID productId);

}
