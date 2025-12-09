package org.myshop.buyservice.repository;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "favorites")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Favorite {

    @Id
    private UUID id;

    @NotNull(message = "productId must be")
    @Column(name = "product_id")
    private UUID productId;

    @NotNull(message = "userID must be")
    @Column(name = "user_id")
    private UUID userID;
}
