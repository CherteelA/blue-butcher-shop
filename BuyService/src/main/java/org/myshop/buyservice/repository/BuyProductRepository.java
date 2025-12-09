package org.myshop.buyservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface BuyProductRepository extends JpaRepository<BuyProduct, UUID> {


    @Query(value = "SELECT * FROM buy_product WHERE user_id=:userId",  nativeQuery = true)
    List<BuyProduct> findBuyProductsByUserId(UUID userId);

}
