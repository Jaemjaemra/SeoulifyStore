package Seoulify_backend;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(length = 100)
    private String category;

    @Column(length = 100)
    private String artist;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    private Integer stock;

    public Product() {
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public String getArtist(){
        return artist;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Integer getStock() {
        return stock;
    }

    public void setName(String name) {
    this.name = name;
}

public void setCategory(String category) {
    this.category = category;
}

public void setArtist(String artist) {
    this.artist = artist;
}

public void setPrice(BigDecimal price) {
    this.price = price;
}

public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
}

public void setStock(Integer stock) {
    this.stock = stock;
}
}
